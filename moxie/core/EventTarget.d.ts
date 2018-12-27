declare namespace moxie { namespace core {
class EventTarget<Dispatches extends EventTarget.Dispatchable=EventTarget.Dispatchable> {
	/**
	Unique id of the event dispatcher, usually overriden by children
	@property uid
	@type String
	*/
	uid: string;

	/**
	Parent object for all event dispatching components and objects
	@class moxie/core/EventTarget
	@constructor EventTarget
	*/
	constructor();

	/**
	Can be called from within a child  in order to acquire uniqie id in automated manner
	@method init
	*/
	init(): void;

	/**
	Register a handler to a specific event dispatched by the object
	@method addEventListener
	@param {String} type Type or basically a name of the event to subscribe to
	@param {Function} fn Callback function that will be called when event happens
	@param {Number} [priority=0] Priority of the event handler - handlers with higher priorities will be called first
	@param {Object} [scope=this] A scope to invoke event handler in
	*/
	addEventListener<K extends string|number, T>(         type: K, fn: EventTarget.Listener<K extends keyof Dispatches ? Dispatches[K] : EventTarget.Callable, T>, priority: number|undefined, scope: T): void;
	addEventListener<K extends string|number, T>(this: T, type: K, fn: EventTarget.Listener<K extends keyof Dispatches ? Dispatches[K] : EventTarget.Callable, T>, priority?: number): void;


	/**
	Check if any handlers were registered to the specified event
	@method hasEventListener
	@param {String} [type] Type or basically a name of the event to check
	@return {Mixed} Returns a handler if it was found and false, if - not
	*/
	hasEventListener<K extends string|number>(type: K): EventTarget.ListenerHandle<K extends keyof Dispatches ? Dispatches[K] : EventTarget.Callable, unknown>|false;

	/**
	Unregister the handler from the event, or if former was not specified - unregister all handlers
	@method removeEventListener
	@param {String} type Type or basically a name of the event
	@param {Function} [fn] Handler to unregister
	*/
	removeEventListener<K extends string|number>(type: K, fn?: EventTarget.Listener<K extends keyof Dispatches ? Dispatches[K] : EventTarget.Callable, any>): void;

	/**
	Remove all event handlers from the object
	@method removeAllEventListeners
	*/
	removeAllEventListeners(): void;

	/**
	Dispatch the event
	@method dispatchEvent
	@param {String/Object} Type of event or event object to dispatch
	@param {Mixed} [...] Variable number of arguments to be passed to a handlers
	@return {Boolean} true by default and false if any handler returned false
	*/
	dispatchEvent<K extends object>(type: K): boolean;
	dispatchEvent<K extends string|number>(type: K, ...args: K extends keyof Dispatches ? EventTarget.Arguments<Dispatches[K]> : any[]): boolean;

	/**
	Register a handler to the event type that will run only once
	@method bindOnce
	@since >1.4.1
	@param {String} type Type or basically a name of the event to subscribe to
	@param {Function} fn Callback function that will be called when event happens
	@param {Number} [priority=0] Priority of the event handler - handlers with higher priorities will be called first
	@param {Object} [scope=this] A scope to invoke event handler in
	*/
	bindOnce<K extends string|number, T>(         type: K, fn: EventTarget.Listener<K extends keyof Dispatches ? Dispatches[K] : EventTarget.Callable, T>, priority: number|undefined, scope: T): void;
	bindOnce<K extends string|number, T>(this: T, type: K, fn: EventTarget.Listener<K extends keyof Dispatches ? Dispatches[K] : EventTarget.Callable, T>, priority?: number): void;

	/**
	Alias for addEventListener
	@method bind
	@protected
	*/
	bind<K extends string|number, T>(         type: K, fn: EventTarget.Listener<K extends keyof Dispatches ? Dispatches[K] : EventTarget.Callable, T>, priority: number|undefined, scope: T): void;
	bind<K extends string|number, T>(this: T, type: K, fn: EventTarget.Listener<K extends keyof Dispatches ? Dispatches[K] : EventTarget.Callable, T>, priority?: number): void;

	/**
	Alias for removeEventListener
	@method unbind
	@protected
	*/
	unbind<K extends string|number>(type: K, fn?: EventTarget.Listener<K extends keyof Dispatches ? Dispatches[K] : EventTarget.Callable, any>): void;

	/**
	Alias for removeAllEventListeners
	@method unbindAll
	@protected
	*/
	unbindAll(): void;

	/**
	Alias for dispatchEvent
	@method trigger
	@protected
	*/
	trigger<K extends string|number, T>(         type: K, fn: EventTarget.Listener<K extends keyof Dispatches ? Dispatches[K] : EventTarget.Callable, T>, priority: number|undefined, scope: T): void;
	trigger<K extends string|number, T>(this: T, type: K, fn: EventTarget.Listener<K extends keyof Dispatches ? Dispatches[K] : EventTarget.Callable, T>, priority?: number): void;

	/**
	Handle properties of on[event] type.
	@method handleEventProps
	@private
	*/
	handleEventProps(dispatches: string[]): void;
}
namespace EventTarget {
	type Dispatches = {};
	type Callable = (this: any, event: any, ...args: any[]) => boolean|undefined|void;
	type Dispatchable = {
		[key: string]: Callable;
		[key: number]: Callable;
	};

	type Listener<F extends Callable=Callable, T=unknown>
		= F extends (this: infer P, ...args: infer Q) => infer R
		? (this: T, ...args: Q) => R : never;

	type ListenerHandle<F extends Callable=Callable, T=unknown> = {
		fn: Listener<F, T>,
		priority: number,
		scope: T
	}

	type Arguments<F extends Callable> =
		F extends (event: any, ...args: infer P) => any
		? P : never;

	interface Event<K extends string> {
		type: K
	}

	namespace Event {
		type Progress<K extends string> = {
			type: K;
			total: number;
			loaded: number;
			async: boolean;
		};

		namespace Progress {
			interface Partial<K extends string> {
				type: K;
				total?: number;
				loaded?: number;
				async?: number;
			}
		}
	}
}

}}
