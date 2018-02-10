/* generated by Svelte vX.Y.Z */
import { assign, createElement, detachNode, differs, init, insertNode, noop, proto, setStyle } from "svelte/shared.js";

function create_main_fragment(state, component) {
	var div;

	return {
		c: function create() {
			div = createElement("div");
			this.h();
		},

		h: function hydrate() {
			setStyle(div, "color", state.color);
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
		},

		p: function update(changed, state) {
			if (changed.color) {
				setStyle(div, "color", state.color);
			}
		},

		u: function unmount() {
			detachNode(div);
		},

		d: noop
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._differs = differs;
	this._state = assign({}, options.data);

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);
	}
}

assign(SvelteComponent.prototype, proto);
export default SvelteComponent;