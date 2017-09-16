import { assign, children, claimElement, createElement, detachNode, init, insertNode, noop, proto } from "svelte/shared.js";

function create_main_fragment(state, component) {
	var div;

	return {
		create: function() {
			div = createElement("div");
			this.hydrate();
		},

		claim: function(nodes) {
			div = claimElement(nodes, "DIV", { "class": true }, false);
			var div_nodes = children(div);

			div_nodes.forEach(detachNode);
			this.hydrate();
		},

		hydrate: function(nodes) {
			div.className = "foo";
		},

		mount: function(target, anchor) {
			insertNode(div, target, anchor);
		},

		update: noop,

		unmount: function() {
			detachNode(div);
		},

		destroy: noop
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = options.data || {};

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		var nodes = children(options.target);
		options.hydrate ? this._fragment.claim(nodes) : this._fragment.create();
		nodes.forEach(detachNode);
		this._fragment.mount(options.target, options.anchor || null);
	}
}

assign(SvelteComponent.prototype, proto);

export default SvelteComponent;