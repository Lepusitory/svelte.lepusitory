/* generated by Svelte vX.Y.Z */
import { appendNode, assign, createComment, createElement, createText, destroyEach, detachNode, init, insertNode, noop, proto } from "svelte/shared.js";

function create_main_fragment(component, ctx) {
	var each_anchor;

	var each_value = ctx.createElement;

	var each_blocks = [];

	for (var i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(component, assign(assign({}, ctx), {
			node: each_value[i]
		}));
	}

	return {
		c: function create() {
			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_anchor = createComment();
		},

		m: function mount(target, anchor) {
			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insertNode(each_anchor, target, anchor);
		},

		p: function update(changed, ctx) {
			if (changed.createElement) {
				each_value = ctx.createElement;

				for (var i = 0; i < each_value.length; i += 1) {
					var each_context = assign(assign({}, ctx), {
						node: each_value[i]
					});

					if (each_blocks[i]) {
						each_blocks[i].p(changed, each_context);
					} else {
						each_blocks[i] = create_each_block(component, each_context);
						each_blocks[i].c();
						each_blocks[i].m(each_anchor.parentNode, each_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
					each_blocks[i].d();
				}
				each_blocks.length = each_value.length;
			}
		},

		u: function unmount() {
			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].u();
			}

			detachNode(each_anchor);
		},

		d: function destroy() {
			destroyEach(each_blocks);
		}
	};
}

// (1:0) {#each createElement as node}
function create_each_block(component, ctx) {
	var span, text_value = ctx.node, text;

	return {
		c: function create() {
			span = createElement("span");
			text = createText(text_value);
		},

		m: function mount(target, anchor) {
			insertNode(span, target, anchor);
			appendNode(text, span);
		},

		p: function update(changed, ctx) {
			if ((changed.createElement) && text_value !== (text_value = ctx.node)) {
				text.data = text_value;
			}
		},

		u: function unmount() {
			detachNode(span);
		},

		d: noop
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);
	}
}

assign(SvelteComponent.prototype, proto);
export default SvelteComponent;