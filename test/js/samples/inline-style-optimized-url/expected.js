/* generated by Svelte vX.Y.Z */
import { SvelteComponent as SvelteComponent_1, createElement, detachNode, flush, init, insert, noop, safe_not_equal, setStyle } from "svelte/internal";

function create_fragment(ctx) {
	var div;

	return {
		c() {
			div = createElement("div");
			setStyle(div, "background", "url(data:image/png;base64," + ctx.data + ")");
		},

		m(target, anchor) {
			insert(target, div, anchor);
		},

		p(changed, ctx) {
			if (changed.data) {
				setStyle(div, "background", "url(data:image/png;base64," + ctx.data + ")");
			}
		},

		i: noop,
		o: noop,

		d(detach) {
			if (detach) {
				detachNode(div);
			}
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { data } = $$props;

	$$self.$set = $$props => {
		if ('data' in $$props) $$invalidate('data', data = $$props.data);
	};

	return { data };
}

class SvelteComponent extends SvelteComponent_1 {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, ["data"]);
	}

	get data() {
		return this.$$.ctx.data;
	}

	set data(data) {
		this.$set({ data });
		flush();
	}
}

export default SvelteComponent;