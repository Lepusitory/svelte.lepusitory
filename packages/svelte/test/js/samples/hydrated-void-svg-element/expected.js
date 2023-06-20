/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	append_hydration,
	children,
	claim_svg_element,
	claim_text,
	detach,
	init,
	insert_hydration,
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
		l(nodes) {
			svg = claim_svg_element(nodes, "svg", {});
			var svg_nodes = children(svg);
			title = claim_svg_element(svg_nodes, "title", {});
			var title_nodes = children(title);
			t = claim_text(title_nodes, "a title");
			title_nodes.forEach(detach);
			svg_nodes.forEach(detach);
		},
		m(target, anchor) {
			insert_hydration(target, svg, anchor);
			append_hydration(svg, title);
			append_hydration(title, t);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(svg);
			}
		}
	};
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal, {});
	}
}

export default Component;