declare namespace plupload { namespace core {
class Stats {
	/**
	Total queue file size.

	@property size
	@deprecated use total
	@type Number
	*/
	size: number;

	/**
	Total size of the queue in units.

	@property total
	@since 3.0
	@type Number
	*/
	total: number;

	/**
	Total bytes uploaded.

	@property loaded
	@type Number
	*/
	loaded: number;


	/**
	Number of files uploaded successfully.

	@property uploaded
	@deprecated use done
	@type Number
	*/
	uploaded: number;

	/**
	Number of items processed successfully.

	@property done
	@since 3.0
	@type Number
	*/
	done: number;

	/**
	Number of failed items.

	@property failed
	@type Number
	*/
	failed: number;

	/**
	Number of items yet to be processed.

	@property queued
	@type Number
	*/
	queued: number;

	/**
	Number of items currently paused.

	@property paused
	@type Number
	*/
	paused: number;

	/**
	Number of items being processed.

	@property processing
	@type Number
	*/
	processing: number;

	/**
	Percent of processed units.

	@property percent
	@type Number
	*/
	percent: number;

	/**
	Bytes processed per second.

	@property bytesPerSec
	@deprecated use processedPerSec
	@type Number
	*/
	bytesPerSec: number;

	/**
	Units processed per second.

	@property processedPerSec
	@since 3.0
	@type Number
	*/
	processedPerSec: number;

	/**
	Resets the progress to its initial values.

	@method reset
	*/
	reset(): void;
}
}}
