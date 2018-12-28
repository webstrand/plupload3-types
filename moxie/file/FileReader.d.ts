declare namespace moxie { namespace file {
interface FileReaderConstructor {
	prototype: FileReader;

	/**
	Initial FileReader state
	@property EMPTY
	@type {Number}
	@final
	@static
	@default 0
	*/
	EMPTY: FileReaderState.Empty;

	/**
	FileReader switches to this state when it is preloading the source
	@property LOADING
	@type {Number}
	@final
	@static
	@default 1
	*/
	LOADING: FileReaderState.Loading;

	/**
	Preloading is complete, this is a final state
	@property DONE
	@type {Number}
	@final
	@static
	@default 2
	*/
	DONE: FileReaderState.Done;

	/**
	Utility for preloading o.Blob/o.File objects in memory. By design closely follows [W3C FileReader](http://www.w3.org/TR/FileAPI/#dfn-filereader)
	interface. Where possible uses native FileReader, where - not falls back to shims.
	@class moxie/file/FileReader
	@constructor FileReader
	@extends EventTarget
	@uses RuntimeClient
	*/
	new(): FileReader;
}
const enum FileReaderState {
	Empty = 0,
	Loading = 1,
	Done = 2
}
interface FileReader extends runtime.RuntimeClient, core.EventTarget<FileReader.Dispatches> {
	/**
	UID of the component instance.
	@property uid
	@type {String}
	*/
	uid: string;

	/**
	Contains current state of FileReader object. Can take values of FileReader.EMPTY, FileReader.LOADING
	and FileReader.DONE.
	@property readyState
	@type {Number}
	@default FileReader.EMPTY
	*/
	readyState: FileReaderState;

	/**
	Result of the successful read operation.
	@property result
	@type {String}
	*/
	result: string|null;

	/**
	Stores the error of failed asynchronous read operation.
	@property error
	@type {DOMError}
	*/
	error: Error|null,

	/**
	Initiates reading of File/Blob object contents to binary string.
	@method readAsBinaryString
	@param {Blob|File} blob Object to preload
	*/
	readAsBinaryString(blob: File|Blob): void;

	/**
	Initiates reading of File/Blob object contents to dataURL string.
	@method readAsDataURL
	@param {Blob|File} blob Object to preload
	*/
	readAsDataURL(blob: File|Blob): void;

	/**
	Initiates reading of File/Blob object contents to string.
	@method readAsText
	@param {Blob|File} blob Object to preload
	*/
	readAsText(blob: File|Blob): void;

	/**
	Aborts preloading process.
	@method abort
	*/
	abort(): void;

	/**
	Destroy component and release resources.
	@method destroy
	*/
	destroy(): void;
}
const FileReader: FileReaderConstructor;
namespace FileReader {
	type Dispatches = {
		/**
		Dispatched when the read starts.
		@event loadstart
		@param {Object} event
		*/
		loadstart: (event: { type: 'loadstart' }) => boolean|void;

		/**
		Dispatched while reading (and decoding) blob, and reporting partial Blob data (progess.loaded/progress.total).
		@event progress
		@param {Object} event
		*/
		progress: (event: { type: 'progress' }) => boolean|void;

		/**
		Dispatched when the read has successfully completed.
		@event load
		@param {Object} event
		*/
		load: (event: { type: 'load' }) => boolean|void;

		/**
		Dispatched when the read has been aborted. For instance, by invoking the abort() method.
		@event abort
		@param {Object} event
		*/
		abort: (event: { type: 'abort' }) => boolean|void;

		/**
		Dispatched when the read has failed.
		@event error
		@param {Object} event
		*/
		error: (event: { type: 'error' }) => boolean|void;

		/**
		Dispatched when the request has completed (either in success or failure).
		@event loadend
		@param {Object} event
		*/
		loadend: (event: { type: 'loadend' }) => boolean|void;
	};
}
}}
