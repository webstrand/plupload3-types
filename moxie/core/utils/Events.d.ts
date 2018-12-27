declare namespace moxie { namespace core { namespace utils {
interface Events {
	/**
	Adds an event handler to the specified object and store reference to the handler
	in objects internal Plupload registry (@see removeEvent).

	@method addEvent
	@static
	@param {Object} obj DOM element like object to add handler to.
	@param {String} name Name to add event listener to.
	@param {Function} callback Function to call when event occurs.
	@param {String} [key] that might be used to add specifity to the event record.
	*/
	addEvent(obj: Events.AddableEventSource, name: string, callback: EventListener, key?: string): void;

	/**
	Remove event handler from the specified object. If third argument (callback)
	is not specified remove all events with the specified name.

	@method removeEvent
	@static
	@param {Object} obj DOM element to remove event listener(s) from.
	@param {String} name Name of event listener to remove.
	@param {Function|String} [callback] might be a callback or unique key to match.
	*/
	removeEvent(obj: Events.RemovableEventSource, name: string, callback: EventListener): void;

	/**
	Remove all kind of events from the specified object

	@method removeAllEvents
	@static
	@param {Object} obj DOM element to remove event listeners from.
	@param {String} [key] unique key to match, when removing events.
	*/
	removeAllEvents(obj: Events.RemovableEventSource): void;
}

namespace Events {
	interface HavingAddEventListener {
		addEventListener(type: string, listener: EventListener, options: false): void;
	}

	interface HavingAttachEvent {
		attachEvent(type: string, listener: () => void): void;
	}

	interface HavingRemoveEventListener {
		removeEventListener(type: string, listener: EventListener, options: false): void;
	}

	interface HavingDetachEvent {
		detachEvent(type: string, listener: () => void): void;
	}


	type AddableEventSource = HavingAddEventListener|HavingAttachEvent;
	type RemovableEventSource = HavingRemoveEventListener|HavingDetachEvent;
}


export var Events: Events;
}}}
