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

	new<Options = {}, Dispatches = {}>(): Queueable<Options, Dispatches>;
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
interface Queueable<Options = {}, Dispatches = {}> extends Optionable<Options & Queueable.Options, Dispatches & Queueable.Dispatches> {
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

	start(): boolean|undefined|void;
	pause(): boolean|undefined|void;
	resume(): boolean|undefined|void;
	stop(): boolean|undefined|void;
	done(result: any): boolean|undefined|void;
	failed(result: any): boolean|undefined|void;
	progress(processed: number, total?: number): void;
	destroy(): boolean|undefined|void;
}
const Queueable: QueueableConstructor;
namespace Queueable {
	type Options = Optionable.Options & {};
	type Dispatches = Optionable.Dispatches & {
		/**
		* Dispatched every time the state of queue changes
		*
		* @event statechanged
		* @param {Object} event
		* @param {Number} state New state
		* @param {Number} prevState Previous state
		*/
		statechanged: (event: { type: 'statechanged' }, state: QueueableState, prevState: QueueableState) => boolean|undefined|void;

		/**
		* Dispatched when the item is put on pending list
		*
		* @event queued
		* @param {Object} event
		*/
		queued: (event: { type: 'queued' }) => boolean|undefined|void;

		/**
		* Dispatched as soon as activity starts
		*
		* @event started
		* @param {Object} event
		*/
		started: (event: { type: 'started' }) => boolean|undefined|void;

		paused: (event: { type: 'paused' }) => boolean|undefined|void;

		resumed: (event: { type: 'resumed' }) => boolean|undefined|void;

		stopped: (event: { type: 'stopped' }) => boolean|undefined|void;

		/**
		* Dispatched as the activity progresses
		*
		* @event
		* @param {Object} event
		*      @param {Number} event.percent
		*      @param {Number} [event.processed]
		*      @param {Number} [event.total]
		*/
		progress: (event: moxie.core.EventTarget.Event.Progress<"progress">) => boolean|undefined|void;

		failed: (event: { type: 'failed' }, result: any) => boolean|undefined|void;

		done: (event: { type: 'done' }, result: any) => boolean|undefined|void;

		processed: (event: { type: 'processed' }) => boolean|undefined|void;

		destroy: (event: { type: 'destroy' }) => boolean|undefined|void;
	}
}

}}
