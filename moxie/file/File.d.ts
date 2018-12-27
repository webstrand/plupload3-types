declare namespace moxie { namespace file {
class File {
	/**
	File name
	@property name
	@type {String}
	@default UID
	*/
	name: string;

	/**
	Relative path to the file inside a directory
	@property relativePath
	@type {String}
	@default ''
	*/
	relativePath: string;

	/**
	Date of last modification
	@property lastModifiedDate
	@type {String}
	@default now
	*/
	lastModifiedDate: Date|string

	/**
	@class moxie/file/File
	@extends Blob
	@constructor
	@param {String} ruid Unique id of the runtime, to which this blob belongs to
	@param {Object} file Object "Native" file object, as it is represented in the runtime
	*/
	constructor(ruid: string|null, file: File.Native);
}

namespace File {
	interface Native extends Blob.Native {
		__file_native: "File.Native"

		name?: string;
		lastModified?: string;
		lastModifiedDate?: Date;
	}
}
}}
