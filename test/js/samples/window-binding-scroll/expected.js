/* generated by Svelte vX.Y.Z */
import { append, assign, createElement, createText, detachNode, init, insert, proto, setData } from "svelte/shared.js";

function create_main_fragment(component, ctx) {
	var window_updating = false, clear_window_updating = function() { window_updating = false; }, window_updating_timeout, p, text0, text1;

	function onwindowscroll(event) {
		if (window_updating) return;
		window_updating = true;

		component.set({
			y: this.pageYOffset
		});
		window_updating = false;
	}
	window.addEventListener("scroll", onwindowscroll);

	component.on("state", ({ changed, current }) => {
		if (changed["y"]) {
			window_updating = true;
			clearTimeout(window_updating_timeout);
			window.scrollTo(window.pageXOffset, current["y"]);
			window_updating_timeout = setTimeout(clear_window_updating, 100);
		}
	});

	return {
		c() {
			p = createElement("p");
			text0 = createText("scrolled to ");
			text1 = createText(ctx.y);
		},

		m(target, anchor) {
			insert(target, p, anchor);
			append(p, text0);
			append(p, text1);
		},

		p(changed, ctx) {
			if (changed.y) {
				setData(text1, ctx.y);
			}
		},

		d(detach) {
			window.removeEventListener("scroll", onwindowscroll);

			if (detach) {
				detachNode(p);
			}
		}
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);
	if ("y" in this._state) {
		window.scrollTo(window.pageXOffset, this._state.y);
	}

	this._state.y = window.pageYOffset;
	this._intro = true;

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);
	}
}

assign(SvelteComponent.prototype, proto);
export default SvelteComponent;