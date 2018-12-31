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
	addEventListener<K extends string|number, T, U>(this: U, type: K, fn: EventTarget.Lookup<Dispatches, K, T extends (false|0|""|null|undefined) ? U : T>, priority?: number|undefined, scope?: T): void;

	/**
	Check if any handlers were registered to the specified event
	@method hasEventListener
	@param {String} [type] Type or basically a name of the event to check
	@return {Mixed} Returns a handler if it was found and false, if - not
	*/
	hasEventListener<K extends string|number>(type: K): EventTarget.LookupHandle<Dispatches, K, unknown>|false;

	/**
	Unregister the handler from the event, or if former was not specified - unregister all handlers
	@method removeEventListener
	@param {String} type Type or basically a name of the event
	@param {Function} [fn] Handler to unregister
	*/
	removeEventListener<K extends string|number>(type: K, fn?: EventTarget.Lookup<Dispatches, K, any>): void;

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
	dispatchEvent<K extends string|number>(type: EventTarget.Event.ProgressPartial): boolean;
	dispatchEvent<K extends string|number>(type: K, ...args: EventTarget.LookupArgs<Dispatches, K>): boolean;

	/**
	Register a handler to the event type that will run only once
	@method bindOnce
	@since >1.4.1
	@param {String} type Type or basically a name of the event to subscribe to
	@param {Function} fn Callback function that will be called when event happens
	@param {Number} [priority=0] Priority of the event handler - handlers with higher priorities will be called first
	@param {Object} [scope=this] A scope to invoke event handler in
	*/
	bindOnce: EventTarget<Dispatches>['addEventListener'];

	/**
	Alias for addEventListener
	@method bind
	@protected
	*/
	bind: EventTarget<Dispatches>['addEventListener'];

	/**
	Alias for removeEventListener
	@method unbind
	@protected
	*/
	unbind: EventTarget<Dispatches>['removeEventListener'];

	/**
	Alias for removeAllEventListeners
	@method unbindAll
	@protected
	*/
	unbindAll: EventTarget<Dispatches>['removeAllEventListeners'];

	/**
	Alias for dispatchEvent
	@method trigger
	@protected
	*/
	trigger: EventTarget<Dispatches>['dispatchEvent'];

	/**
	Handle properties of on[event] type.
	@method handleEventProps
	@private
	*/
	handleEventProps(dispatches: string[]): void;
}
namespace EventTarget {
	type Dispatches<T=never> = {};
	type Callable<T=any> = (this: any, _: any, ...args: any[]) => boolean|void;
	type Dispatchable = {
		[key: string]: Callable;
		[key: number]: Callable;
	};

	type Lookup<Dispatches, Key, Context>
		= OverrideListenerContext<Key extends keyof Dispatches ? Dispatches[Key] : (event: Event<string>) => boolean|void, Context>;

	type LookupArgs<Dispatches, Key>
		= Key extends keyof Dispatches ? Arguments<Dispatches[Key]> : any[];

	type LookupHandle<Dispatches, Key, Context> = {
		fn: Lookup<Dispatches, Key, Context>;
		priority: number;
		scope: Context;
	};

	type OverrideListenerContext<F, T>
		= F extends (this: infer P, ...args: infer Q) => infer R
		? (this: T, ...args: Q) => R : never;

	type Arguments<Fn> =
		Fn extends (_: any, ...args: infer P) => any ? P : never;

	interface Event<Key extends string=string, Context=unknown> {
		type: Key
		target: Context
	}

	namespace Event {
		type Progress<Key extends string=string, Context=unknown> = {
			type: Key;
			target: Context;
			total: number;
			loaded: number;
			async: boolean;
		};

		type ProgressPartial<Key extends string=string, Context=unknown> = Partial<Progress<Key, Context>> & {
			type: Key;
		};
	}
}

}}
