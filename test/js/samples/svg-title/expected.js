import {
	SvelteComponent,
	append,
	detach,
	init,
	insert,
	noop,
	safe_not_equal,
	svg_element,
	text
} from "svelte/internal";

function create_fragment(ctx) {
	let svg;
	let title;
	let t;

	return {
		c() {
			svg = svg_element("svg");
			title = svg_element("title");
			t = text("a title");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, title);
			append(title, t);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal, []);
	}
}

export default Component;