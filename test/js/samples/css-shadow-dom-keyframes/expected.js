/* generated by Svelte vX.Y.Z */
import { assign, createElement, detachNode, init, insertNode, noop, proto } from "svelte/shared.js";

function create_main_fragment(state, component) {
	var div;

	return {
		c: function create() {
			div = createElement("div");
			div.textContent = "fades in";
			this.c = noop;
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
		},

		p: noop,

		u: function unmount() {
			detachNode(div);
		},

		d: noop
	};
}

class SvelteComponent extends HTMLElement {
	constructor(options = {}) {
		super();
		init(this, options);
		this._state = assign({}, options.data);

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `<style>div{animation:foo 1s}@keyframes foo{0%{opacity:0}100%{opacity:1}}</style>`;

		this._fragment = create_main_fragment(this._state, this);

		this._fragment.c();
		this._fragment.m(this.shadowRoot, null);

		if (options.target) this._mount(options.target, options.anchor || null);
	}

	static get observedAttributes() {
		return [];
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		this.set({ [attr]: newValue });
	}
}

customElements.define("custom-element", SvelteComponent);
assign(SvelteComponent.prototype, proto, {
	_mount(target, anchor) {
		target.insertBefore(this, anchor);
	},

	_unmount() {
		this.parentNode.removeChild(this);
	}
});
export default SvelteComponent;