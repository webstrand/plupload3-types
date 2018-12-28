declare namespace plupload { namespace core {

interface QueueConstructor<Options = {}, Dispatches = {}> {
	prototype: Queue<Options, Dispatches>;
	new(options: Queue.Options): Queue<Options, Dispatches>;
}
interface Queue<Options = {}, Dispatches = {}> extends Queueable<Options & Queue.Options, Dispatches & Queue.Dispatches>{
	/**
	@property _queue
	@type {Collection}
	@private
	*/
	_queue: ArrCollection<Queueable>[];

	/**
	@property stats
	@type {Stats}
	@readOnly
	*/
	stats: Stats

	/**
	Returns number of items in the queue

	@method count
	@returns {Number}
	*/
	count(): number;

	/**
	Start the queue

	@method start
	*/
	start(): boolean|undefined|void;

	pause(): boolean|undefined|void;

	/**
	Stop the queue. If `finish_active=true` the queue will wait until active items are done, before
	stopping.

	@method stop
	*/
	stop(): boolean|undefined|void;

	forEachItem(cb: (value: Queueable, index: number) => boolean): void;

	getItem(uid: string): Queueable|null;

	/**
	Add instance of Queueable to the queue. If `auto_start=true` queue will start as well.

	@method addItem
	@param {Queueable} item
	*/
	addItem<O,D>(item: Queueable<O,D>): void;

	/**
	Extracts item from the queue by its uid and returns it.

	@method extractItem
	@param {String} uid
	@return {Queueable} Item that was removed
	*/
	extractItem(uid: string): Queueable|null;

	/**
	Removes item from the queue and destroys it

	@method removeItem
	@param {String} uid
	@returns {Boolean} Result of the operation
	*/
	removeItem(uid: string): boolean;

	stopItem(uid: string): boolean|undefined|void;
	pauseItem(uid: string): boolean|undefined|void;
	resumeItem(uid: string): boolean|undefined|void;
	splice(start?: number, length?: number): Queueable[];
	isActive(): boolean;
	isStopped(): boolean;
	countSpareSlots(): number;
	toArray(): Queueable[];
	clear(): boolean|undefined|void;
	calcStats(): boolean;
	destroy(): boolean|undefined|void;
}
const Queue: QueueConstructor;
namespace Queue {
	type Options = Queueable.Options & {
		max_slots?: number,
		max_retries?: number,
		auto_start?: boolean,
		finish_active?: boolean
	};
	type Dispatches = Queueable.Dispatches & {

		/**
		Dispatched as soon as activity starts

		@event started
		@param {Object} event
		*/
		started: (event: { type: "started" }) => boolean|undefined|void;

		/**
		Dispatched as activity progresses

		@event progress
		@param {Object} event
		@param {Number} processed
		@param {Number} total
		@param {plupload.core.Stats} stats
		*/
		progress: (event: { type: "progress" }, processed: number, total: number, stats: Stats) => boolean|undefined|void;

		/**
		Dispatched when activity is paused

		@event paused
		@param {Object} event
		*/
		paused: (event: { type: "paused" }) => boolean|undefined|void;

		/**
		Dispatched when there's no more items in processing

		@event done
		@param {Object} event
		*/
		done: (event: { type: "done" }) => boolean|undefined|void;

		/**
		Dispatched as soon as activity ends

		@event stopped
		@param {Object} event
		*/
		stopped: (event: { type: "stopped" }) => boolean|undefined|void;

		/**
		Dispatched when queue is destroyed

		@event destroy
		@param {Object} event
		*/
		destroy: (event: { type: "destroy" }) => boolean|undefined|void;
	};
}
}}
