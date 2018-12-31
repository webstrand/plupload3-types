declare namespace plupload { namespace core {
interface QueueableConstructor{
	prototype: Queueable<any, any>;
	IDLE: QueueableState.Idle;
	PROCESSING: QueueableState.Processing;
	PAUSED: QueueableState.Paused;
	RESUMED: QueueableState.Resumed;
	DONE: QueueableState.Done;
	FAILED: QueueableState.Failed;
	DESTROYED: QueueableState.Destroyed;

	new<Options = {}, Dispatches extends moxie.core.EventTarget.Dispatchable=Queueable.Dispatches.Top<Options>>(): Queueable<Options, Dispatches>;
}
const enum QueueableState {
	Idle = 1,
	Processing = 2,
	Paused = 6,
	Resumed = 7,
	Done = 5,
	Failed = 4,
	Destroyed = 8
}
interface Queueable<Options = {}, Dispatches extends moxie.core.EventTarget.Dispatchable=Queueable.Dispatches.Top<Options>> extends Optionable<Options & Queueable.Options, Dispatches> {
	/**
	Unique identifier
	@property uid
	@type {String}
	*/
	uid: string;

	state: QueueableState;

	processed: number;

	/** @deprecated */
	loaded?: number;
	total: number;
	percent: number;
	retries: number;

	/**
	* Can be 0-Infinity - item with higher priority will have well... higher priority
	* @property [priority=0]
	* @type {Number}
	*/
	priority: number;

	startedTimestamp: number;

	/**
	* Set when item becomes Queueable.DONE or Queueable.FAILED.
	* Used to calculate proper processedPerSec for the queue stats.
	* @property processedTimestamp
	* @type {Number}
	*/
	processedTimestamp: number;

	start(): boolean|void;
	pause(): boolean|void;
	resume(): boolean|void;
	stop(): boolean|void;
	done(result: any): boolean|void;
	failed(result: any): boolean|void;
	progress(processed: number, total?: number): void;
	destroy(): boolean|void;
}
const Queueable: QueueableConstructor;
namespace Queueable {
	type Options = Optionable.Options & {};

	type Event<K extends string=string,T=Queueable<any>> = Optionable.Event<K,T>;
	namespace Event {
		type Progress<K extends string=string,T=Queueable<any>> = Optionable.Event.Progress<K,T>
	}

	type Dispatches<T> = Optionable.Dispatches<T> & {
		/**
		* Dispatched every time the state of queue changes
		*
		* @event statechanged
		* @param {Object} event
		* @param {Number} state New state
		* @param {Number} prevState Previous state
		*/
		statechanged: (event: Event<'statechanged', T>, state: QueueableState, prevState: QueueableState) => boolean|void;

		/**
		* Dispatched when the item is put on pending list
		*
		* @event queued
		* @param {Object} event
		*/
		queued: (event: Event<'queued', T>) => boolean|void;

		/**
		* Dispatched as soon as activity starts
		*
		* @event started
		* @param {Object} event
		*/
		started: (event: Event<'started', T>) => boolean|void;

		paused: (event: Event<'paused', T>) => boolean|void;

		resumed: (event: Event<'resumed', T>) => boolean|void;

		stopped: (event: Event<'stopped', T>) => boolean|void;

		/**
		* Dispatched as the activity progresses
		*
		* @event
		* @param {Object} event
		*      @param {Number} event.percent
		*      @param {Number} [event.processed]
		*      @param {Number} [event.total]
		*/
		progress: (event: Event.Progress<'progress', T>) => boolean|void;

		failed: (event: Event<'failed', T>, result: any) => boolean|void;

		done: (event: Event<'done', T>, result: any) => boolean|void;

		processed: (event: Event<'processed', T>) => boolean|void;

		destroy: (event: Event<'destroy', T>) => boolean|void;
	}
	namespace Dispatches {
		type Top<Options> = Dispatches<Queueable<Options,Dispatches<Queueable<Options,any>>>>;
	}
}

}}
