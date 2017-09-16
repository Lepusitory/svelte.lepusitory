import { assign, callAll, init, noop, proto } from "svelte/shared.js";

var template = (function() {
	return {
		// this test should be removed in v2
		oncreate () {},
		ondestroy () {}
	};
}());

function create_main_fragment(state, component) {

	return {
		create: noop,

		mount: noop,

		update: noop,

		unmount: noop,

		destroy: noop
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = options.data || {};

	this._handlers.destroy = [template.ondestroy]

	var oncreate = template.oncreate.bind(this);

	if (!options._root) {
		this._oncreate = [oncreate];
	} else {
	 	this._root._oncreate.push(oncreate);
	 }

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.create();
		this._fragment.mount(options.target, options.anchor || null);

		callAll(this._oncreate);
	}
}

assign(SvelteComponent.prototype, proto);

export default SvelteComponent;