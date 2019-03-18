/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent as SvelteComponent_1,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal
} from "svelte/internal";

function create_fragment(ctx) {
	var button, foo_action;

	return {
		c() {
			button = element("button");
			button.textContent = "foo";
		},

		m(target, anchor) {
			insert(target, button, anchor);
			foo_action = foo.call(null, button, ctx.foo_function) || {};
		},

		p: noop,
		i: noop,
		o: noop,

		d(detaching) {
			if (detaching) {
				detach(button);
			}

			if (foo_action && typeof foo_action.destroy === 'function') foo_action.destroy();
		}
	};
}

function handleFoo(bar) {
	console.log(bar);
}

function foo(node, callback) {
	// code goes here
}

function instance($$self, $$props, $$invalidate) {
	let { bar } = $$props;

	function foo_function() {
		return handleFoo(bar);
	}

	$$self.$set = $$props => {
		if ('bar' in $$props) $$invalidate('bar', bar = $$props.bar);
	};

	return { bar, foo_function };
}

class SvelteComponent extends SvelteComponent_1 {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, ["bar"]);
	}
}

export default SvelteComponent;