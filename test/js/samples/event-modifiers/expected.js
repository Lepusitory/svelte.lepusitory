/* generated by Svelte vX.Y.Z */
import { SvelteComponent as SvelteComponent_1, addListener, append, createElement, createText, detachNode, init, insert, noop, preventDefault, run_all, safe_not_equal, stopPropagation } from "svelte/internal";

function create_fragment(ctx) {
	var div, button0, text1, button1, text3, button2, dispose;

	return {
		c() {
			div = createElement("div");
			button0 = createElement("button");
			button0.textContent = "click me";
			text1 = createText("\n\t");
			button1 = createElement("button");
			button1.textContent = "or me";
			text3 = createText("\n\t");
			button2 = createElement("button");
			button2.textContent = "or me!";
			dispose = [
				addListener(button0, "click", stopPropagation(preventDefault(handleClick))),
				addListener(button1, "click", handleClick, { once: true, capture: true }),
				addListener(button2, "click", handleClick, true),
				addListener(div, "touchstart", handleTouchstart, { passive: true })
			];
		},

		m(target, anchor) {
			insert(target, div, anchor);
			append(div, button0);
			append(div, text1);
			append(div, button1);
			append(div, text3);
			append(div, button2);
		},

		p: noop,
		i: noop,
		o: noop,

		d(detach) {
			if (detach) {
				detachNode(div);
			}

			run_all(dispose);
		}
	};
}

function handleTouchstart() {
	// ...
}

function handleClick() {
	// ...
}

class SvelteComponent extends SvelteComponent_1 {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal);
	}
}

export default SvelteComponent;