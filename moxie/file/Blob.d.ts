declare namespace moxie { namespace file {
class Blob extends runtime.RuntimeClient {
	/**
	Unique id of the component
	@property uid
	@type {String}
	*/
	uid: string;

	/**
	Unique id of the connected runtime, if falsy, then runtime will have to be initialized
	before this Blob can be used, modified or sent
	@property ruid
	@type {String}
	*/
	ruid: string;

	/**
	Size of blob
	@property size
	@type {Number}
	@default 0
	*/
	size: number;

	/**
	Mime type of blob
	@property type
	@type {String}
	@default ''
	*/
	type: string;

	/**
	@class moxie/file/Blob
	@constructor
	@param {String} ruid Unique id of the runtime, to which this blob belongs to
	@param {Object} blob Object "Native" blob object, as it is represented in the runtime.
	*/
	constructor(ruid: string|null, blob: Blob.Native);

	/**
	@method slice
	@param {Number} [start=0]
	*/
	slice(start?: number, end?: number, type?: string): Blob;

	/**
	Returns "native" blob object (as it is represented in connected runtime) or null if not found
	@method getSource
	@return {Blob} Returns "native" blob object or null if not found
	*/
	getSource(): Blob.Native|null;

	/**
	Detaches blob from any runtime that it depends on and initialize with standalone value
	@method detach
	@protected
	@param {DOMString} [data=''] Standalone value
	*/
	detach(data?: string|null): void;

	/**
	Checks if blob is standalone (detached of any runtime)
	@method isDetached
	@protected
	@return {Boolean}
	*/
	isDetached(): boolean;

	/**
	Destroy Blob and free any resources it was using
	@method destroy
	*/
	destroy(): void;
}

namespace Blob {
	interface Native {
		__blob_native: "Blob.Native"
	}
}

}}
