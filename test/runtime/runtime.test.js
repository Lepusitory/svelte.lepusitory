// @vitest-environment jsdom

import * as fs from 'fs';
import * as path from 'path';
import glob from 'tiny-glob/sync.js';
import { beforeAll, afterAll, describe, it, assert } from 'vitest';
import { compile } from '../../src/compiler/index.js';
import { clear_loops, flush, set_now, set_raf } from 'svelte/internal';
import { show_output, try_load_config, mkdirp, create_loader } from '../helpers.js';
import { setTimeout } from 'timers/promises';
import { setup_html_equal } from '../html_equal.js';

let unhandled_rejection = false;
function unhandledRejection_handler(err) {
	unhandled_rejection = err;
}

const listeners = process.rawListeners('unhandledRejection');

const { assert_html_equal, assert_html_equal_with_options } = setup_html_equal({
	removeDataSvelte: true
});

describe('runtime', async () => {
	beforeAll(() => {
		process.prependListener('unhandledRejection', unhandledRejection_handler);
	});

	afterAll(() => {
		process.removeListener('unhandledRejection', unhandledRejection_handler);
	});

	const failed = new Set();

	async function run_test(dir) {
		if (dir[0] === '.') return;

		const config = await try_load_config(`${__dirname}/samples/${dir}/_config.js`);
		const solo = config.solo || /\.solo/.test(dir);

		const it_fn = config.skip ? it.skip : solo ? it.only : it;

		it_fn.each`
			hydrate  | from_ssr_html
			${false} | ${false}
			${true}  | ${false}
			${true}  | ${true}
		`(`${dir} hydrate: $hydrate, from_ssr: $from_ssr_html`, async ({ hydrate, from_ssr_html }) => {
			if (hydrate && config.skip_if_hydrate) return;
			if (hydrate && from_ssr_html && config.skip_if_hydrate_from_ssr) return;

			if (failed.has(dir)) {
				// this makes debugging easier, by only printing compiled output once
				assert.fail(`skipping ${dir}, already failed`);
			}

			unhandled_rejection = null;

			const cwd = path.resolve(`${__dirname}/samples/${dir}`);

			const compileOptions = Object.assign({}, config.compileOptions || {}, {
				format: 'cjs',
				hydratable: hydrate,
				immutable: config.immutable,
				accessors: 'accessors' in config ? config.accessors : true
			});

			const load = create_loader(compileOptions, cwd);

			let mod;
			let SvelteComponent;

			let unintendedError = null;

			glob('**/*.svelte', { cwd }).forEach((file) => {
				if (file[0] === '_') return;

				const dir = `${cwd}/_output/${hydrate ? 'hydratable' : 'normal'}`;
				const out = `${dir}/${file.replace(/\.svelte$/, '.js')}`;

				if (fs.existsSync(out)) {
					fs.unlinkSync(out);
				}

				mkdirp(dir);

				try {
					const { js } = compile(fs.readFileSync(`${cwd}/${file}`, 'utf-8').replace(/\r/g, ''), {
						...compileOptions,
						filename: file
					});

					fs.writeFileSync(out, js.code);
				} catch (err) {
					// do nothing
				}
			});

			if (config.expect_unhandled_rejections) {
				listeners.forEach((listener) => {
					process.removeListener('unhandledRejection', listener);
				});
			}

			await Promise.resolve()
				.then(async () => {
					// hack to support transition tests
					clear_loops();

					const raf = {
						time: 0,
						callback: null,
						tick: (now) => {
							raf.time = now;
							if (raf.callback) raf.callback();
						}
					};
					set_now(() => raf.time);
					set_raf((cb) => {
						raf.callback = () => {
							raf.callback = null;
							cb(raf.time);
							flush();
						};
					});

					try {
						mod = await load(`./main.svelte`);
						SvelteComponent = mod.default;
					} catch (err) {
						show_output(cwd, compileOptions); // eslint-disable-line no-console
						throw err;
					}

					// Put things we need on window for testing
					// @ts-ignore
					window.SvelteComponent = SvelteComponent;
					window.location.href = '';
					window.document.title = '';
					window.document.head.innerHTML = '';
					window.document.body.innerHTML = '<main></main>';

					const target = window.document.querySelector('main');
					let snapshot = undefined;

					if (hydrate && from_ssr_html) {
						const load_ssr = create_loader({ ...compileOptions, generate: 'ssr' }, cwd);

						// ssr into target
						if (config.before_test) config.before_test();
						const SsrSvelteComponent = (await load_ssr(`./main.svelte`)).default;
						const { html } = SsrSvelteComponent.render(config.props);
						target.innerHTML = html;

						if (config.snapshot) {
							snapshot = config.snapshot(target);
						}

						if (config.after_test) config.after_test();
					} else {
						target.innerHTML = '';
					}

					if (config.before_test) config.before_test();

					const warnings = [];
					const warn = console.warn;
					console.warn = (warning) => {
						warnings.push(warning);
					};

					const options = Object.assign(
						{},
						{
							target,
							hydrate,
							props: config.props,
							intro: config.intro
						},
						config.options || {}
					);

					const component = new SvelteComponent(options);

					console.warn = warn;

					if (config.error) {
						unintendedError = true;
						assert.fail('Expected a runtime error');
					}

					if (config.warnings) {
						assert.deepEqual(warnings, config.warnings);
					} else if (warnings.length) {
						unintendedError = true;
						assert.fail('Received unexpected warnings');
					}

					if (config.html) {
						assert_html_equal_with_options(target.innerHTML, config.html, {
							withoutNormalizeHtml: config.withoutNormalizeHtml
						});
					}

					try {
						if (config.test) {
							await config.test({
								assert: {
									...assert,
									htmlEqual: assert_html_equal,
									htmlEqualWithOptions: assert_html_equal_with_options
								},
								component,
								mod,
								target,
								snapshot,
								window,
								raf,
								compileOptions,
								load
							});
						}
					} finally {
						component.$destroy();
						assert_html_equal(target.innerHTML, '');

						// TODO: This seems useless, unhandledRejection is only triggered on the next task
						// by which time the test has already finished and the next test resets it to null above
						if (unhandled_rejection) {
							// eslint-disable-next-line no-unsafe-finally
							throw unhandled_rejection;
						}
					}
				})
				.catch((err) => {
					if (config.error && !unintendedError) {
						if (typeof config.error === 'function') {
							config.error(assert, err);
						} else {
							assert.equal(err.message, config.error);
						}
					} else {
						throw err;
					}
				})
				.catch((err) => {
					failed.add(dir);
					// print a clickable link to open the directory
					err.stack += `\n\ncmd-click: ${path.relative(process.cwd(), cwd)}/main.svelte`;

					throw err;
				})
				.finally(async () => {
					flush();

					if (config.after_test) config.after_test();

					// Free up the microtask queue, so that
					// 1. Vitest's test runner which uses setInterval can log progress
					// 2. Any expected unhandled rejections are ran before we reattach the listeners
					await setTimeout(0);

					if (config.expect_unhandled_rejections) {
						listeners.forEach((listener) => {
							process.on('unhandledRejection', listener);
						});
					}
				});
		});
	}

	const samples = fs.readdirSync(`${__dirname}/samples`);
	await Promise.all(samples.map((sample) => run_test(sample)));

	const load = create_loader({ generate: 'dom', dev: true, format: 'cjs' }, __dirname);
	const { default: App } = await load('App.svelte');

	it('fails if options.target is missing in dev mode', async () => {
		assert.throws(() => {
			new App();
		}, /'target' is a required option/);
	});

	it('fails if options.hydrate is true but the component is non-hydratable', async () => {
		assert.throws(() => {
			new App({
				target: { childNodes: [] },
				hydrate: true
			});
		}, /options\.hydrate only works if the component was compiled with the `hydratable: true` option/);
	});
});
