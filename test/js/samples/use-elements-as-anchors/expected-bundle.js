function noop () {}

function assign ( target ) {
	var k, source, i = 1, len = arguments.length;
	for ( ; i < len; i++ ) {
		source = arguments[i];
		for ( k in source ) target[k] = source[k];
	}

	return target;
}

function appendNode ( node, target ) {
	target.appendChild( node );
}

function insertNode ( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function detachNode ( node ) {
	node.parentNode.removeChild( node );
}

function createElement ( name ) {
	return document.createElement( name );
}

function createText ( data ) {
	return document.createTextNode( data );
}

function createComment () {
	return document.createComment( '' );
}

function differs ( a, b ) {
	return ( a !== b ) || ( a && ( typeof a === 'object' ) || ( typeof a === 'function' ) );
}

function dispatchObservers ( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( differs( newValue, oldValue ) ) {
			var callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}
}

function get ( key ) {
	return key ? this._state[ key ] : this._state;
}

function fire ( eventName, data ) {
	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
	if ( !handlers ) return;

	for ( var i = 0; i < handlers.length; i += 1 ) {
		handlers[i].call( this, data );
	}
}

function observe ( key, callback, options ) {
	var group = ( options && options.defer ) ? this._observers.post : this._observers.pre;

	( group[ key ] || ( group[ key ] = [] ) ).push( callback );

	if ( !options || options.init !== false ) {
		callback.__calling = true;
		callback.call( this, this._state[ key ] );
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[ key ].indexOf( callback );
			if ( ~index ) group[ key ].splice( index, 1 );
		}
	};
}

function on ( eventName, handler ) {
	if ( eventName === 'teardown' ) return this.on( 'destroy', handler );

	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
	handlers.push( handler );

	return {
		cancel: function () {
			var index = handlers.indexOf( handler );
			if ( ~index ) handlers.splice( index, 1 );
		}
	};
}

function set ( newState ) {
	this._set( assign( {}, newState ) );
	this._root._flush();
}

function _flush () {
	if ( !this._renderHooks ) return;

	while ( this._renderHooks.length ) {
		this._renderHooks.pop()();
	}
}

var proto = {
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	_flush: _flush
};

function create_main_fragment ( state, component ) {
	var div = createElement( 'div' );

	var if_block = (state.a) && create_if_block( state, component );

	if ( if_block ) if_block.mount( div, null );
	var text = createText( "\n\n\t" );
	appendNode( text, div );
	var p = createElement( 'p' );
	appendNode( p, div );
	appendNode( createText( "this can be used as an anchor" ), p );
	appendNode( createText( "\n\n\t" ), div );

	var if_block_1 = (state.b) && create_if_block_1( state, component );

	if ( if_block_1 ) if_block_1.mount( div, null );
	var text_3 = createText( "\n\n\t" );
	appendNode( text_3, div );

	var if_block_2 = (state.c) && create_if_block_2( state, component );

	if ( if_block_2 ) if_block_2.mount( div, null );
	var text_4 = createText( "\n\n\t" );
	appendNode( text_4, div );
	var p_1 = createElement( 'p' );
	appendNode( p_1, div );
	appendNode( createText( "so can this" ), p_1 );
	appendNode( createText( "\n\n\t" ), div );

	var if_block_3 = (state.d) && create_if_block_3( state, component );

	if ( if_block_3 ) if_block_3.mount( div, null );
	var text_7 = createText( "\n\n\t" );
	appendNode( text_7, div );
	var text_8 = createText( "\n\n" );

	var if_block_4 = (state.e) && create_if_block_4( state, component );

	var if_block_4_anchor = createComment();

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			insertNode( text_8, target, anchor );
			if ( if_block_4 ) if_block_4.mount( target, anchor );
			insertNode( if_block_4_anchor, target, anchor );
		},

		update: function ( changed, state ) {
			if ( state.a ) {
				if ( !if_block ) {
					if_block = create_if_block( state, component );
					if_block.mount( div, text );
				}
			} else if ( if_block ) {
				if_block.unmount();
				if_block.destroy();
				if_block = null;
			}

			if ( state.b ) {
				if ( !if_block_1 ) {
					if_block_1 = create_if_block_1( state, component );
					if_block_1.mount( div, text_3 );
				}
			} else if ( if_block_1 ) {
				if_block_1.unmount();
				if_block_1.destroy();
				if_block_1 = null;
			}

			if ( state.c ) {
				if ( !if_block_2 ) {
					if_block_2 = create_if_block_2( state, component );
					if_block_2.mount( div, text_4 );
				}
			} else if ( if_block_2 ) {
				if_block_2.unmount();
				if_block_2.destroy();
				if_block_2 = null;
			}

			if ( state.d ) {
				if ( !if_block_3 ) {
					if_block_3 = create_if_block_3( state, component );
					if_block_3.mount( div, text_7 );
				}
			} else if ( if_block_3 ) {
				if_block_3.unmount();
				if_block_3.destroy();
				if_block_3 = null;
			}

			if ( state.e ) {
				if ( !if_block_4 ) {
					if_block_4 = create_if_block_4( state, component );
					if_block_4.mount( if_block_4_anchor.parentNode, if_block_4_anchor );
				}
			} else if ( if_block_4 ) {
				if_block_4.unmount();
				if_block_4.destroy();
				if_block_4 = null;
			}
		},

		unmount: function () {
			detachNode( div );
			if ( if_block ) if_block.unmount();
			if ( if_block_1 ) if_block_1.unmount();
			if ( if_block_2 ) if_block_2.unmount();
			if ( if_block_3 ) if_block_3.unmount();
			detachNode( text_8 );
			if ( if_block_4 ) if_block_4.unmount();
			detachNode( if_block_4_anchor );
		},

		destroy: function () {
			if ( if_block ) if_block.destroy();
			if ( if_block_1 ) if_block_1.destroy();
			if ( if_block_2 ) if_block_2.destroy();
			if ( if_block_3 ) if_block_3.destroy();
			if ( if_block_4 ) if_block_4.destroy();
		}
	};
}

function create_if_block ( state, component ) {
	var p = createElement( 'p' );
	appendNode( createText( "a" ), p );

	return {
		mount: function ( target, anchor ) {
			insertNode( p, target, anchor );
		},

		unmount: function () {
			detachNode( p );
		},

		destroy: noop
	};
}

function create_if_block_1 ( state, component ) {
	var p = createElement( 'p' );
	appendNode( createText( "b" ), p );

	return {
		mount: function ( target, anchor ) {
			insertNode( p, target, anchor );
		},

		unmount: function () {
			detachNode( p );
		},

		destroy: noop
	};
}

function create_if_block_2 ( state, component ) {
	var p = createElement( 'p' );
	appendNode( createText( "c" ), p );

	return {
		mount: function ( target, anchor ) {
			insertNode( p, target, anchor );
		},

		unmount: function () {
			detachNode( p );
		},

		destroy: noop
	};
}

function create_if_block_3 ( state, component ) {
	var p = createElement( 'p' );
	appendNode( createText( "d" ), p );

	return {
		mount: function ( target, anchor ) {
			insertNode( p, target, anchor );
		},

		unmount: function () {
			detachNode( p );
		},

		destroy: noop
	};
}

function create_if_block_4 ( state, component ) {
	var p = createElement( 'p' );
	appendNode( createText( "e" ), p );

	return {
		mount: function ( target, anchor ) {
			insertNode( p, target, anchor );
		},

		unmount: function () {
			detachNode( p );
		},

		destroy: noop
	};
}

function SvelteComponent ( options ) {
	options = options || {};
	this._state = options.data || {};

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;

	this._fragment = create_main_fragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

assign( SvelteComponent.prototype, proto );

SvelteComponent.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

SvelteComponent.prototype.teardown = SvelteComponent.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	if ( detach !== false ) this._fragment.unmount();
	this._fragment.destroy();
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

export default SvelteComponent;
