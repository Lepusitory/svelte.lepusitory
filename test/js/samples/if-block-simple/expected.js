/* generated by Svelte vX.Y.Z */
import { assign, createComment, createElement, detachNode, init, insertNode, noop, proto } from "svelte/shared.js";

function create_main_fragment(component, state) {
	var if_block_anchor;

	var if_block = (state.foo) && create_if_block(component, state);

	return {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = createComment();
		},

		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insertNode(if_block_anchor, target, anchor);
		},

		p: function update(changed, state) {
			if (state.foo) {
				if (!if_block) {
					if_block = create_if_block(component, state);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.u();
				if_block.d();
				if_block = null;
			}
		},

		u: function unmount() {
			if (if_block) if_block.u();
			detachNode(if_block_anchor);
		},

		d: function destroy() {
			if (if_block) if_block.d();
		}
	};
}

// (1:0) {#if foo}
function create_if_block(component, state) {
	var p;

	return {
		c: function create() {
			p = createElement("p");
			p.textContent = "foo!";
		},

		m: function mount(target, anchor) {
			insertNode(p, target, anchor);
		},

		u: function unmount() {
			detachNode(p);
		},

		d: noop
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);
	}
}

assign(SvelteComponent.prototype, proto);
export default SvelteComponent;