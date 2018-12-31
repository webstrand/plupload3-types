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
	type Dispatches<T> = Optionable.Dispatches<T> & {
		/**
		* Dispatched every time the state of queue changes
		*
		* @event statechanged
		* @param {Object} event
		* @param {Number} state New state
		* @param {Number} prevState Previous state
		*/
		statechanged: (event: { type: 'statechanged'; target: T }, state: QueueableState, prevState: QueueableState) => boolean|void;

		/**
		* Dispatched when the item is put on pending list
		*
		* @event queued
		* @param {Object} event
		*/
		queued: (event: { type: 'queued'; target: T }) => boolean|void;

		/**
		* Dispatched as soon as activity starts
		*
		* @event started
		* @param {Object} event
		*/
		started: (event: { type: 'started'; target: T }) => boolean|void;

		paused: (event: { type: 'paused'; target: T }) => boolean|void;

		resumed: (event: { type: 'resumed'; target: T }) => boolean|void;

		stopped: (event: { type: 'stopped'; target: T }) => boolean|void;

		/**
		* Dispatched as the activity progresses
		*
		* @event
		* @param {Object} event
		*      @param {Number} event.percent
		*      @param {Number} [event.processed]
		*      @param {Number} [event.total]
		*/
		progress: (event: moxie.core.EventTarget.Event.Progress<"progress">) => boolean|void;

		failed: (event: { type: 'failed'; target: T }, result: any) => boolean|void;

		done: (event: { type: 'done'; target: T }, result: any) => boolean|void;

		processed: (event: { type: 'processed'; target: T }) => boolean|void;

		destroy: (event: { type: 'destroy'; target: T }) => boolean|void;
	}
	namespace Dispatches {
		type Top<Options> = Dispatches<Queueable<Options,Dispatches<Queueable<Options,any>>>>;
	}
}

}}
