declare namespace plupload {
interface FileConstructor {
	prototype: File;
	new(): File;
}
interface File extends core.Queueable {
	/**
	For backward compatibility

	@property id
	@type {String}
	@deprecated
	*/
	id: string;

	/**
	When send_file_name is set to true, will be sent with the request as `name` param.
	Can be used on server-side to override original file name.
	@property name
	@type {String}
	*/
	name: string;

	/**
	@property target_name
	@type {String}
	@deprecated use name
	*/
	target_name: string|null;

	/**
	File type, `e.g image/jpeg`

	@property type
	@type String
	*/
	type: string;

	/**
	File size in bytes (may change after client-side manupilation).

	@property size
	@type Number
	*/
	size: number;

	/**
	Original file size in bytes.

	@property origSize
	@type Number
	*/
	origSize: number;

	start(): boolean;

	/**
	* Get the file for which this File is responsible
	*
	* @method getSource
	* @returns {moxie.file.File}
	*/
	getSource(): moxie.file.File;

	/**
	* Returns file representation of the current runtime. For HTML5 runtime
	* this is going to be native browser File object
	* (for backward compatibility)
	*
	* @method getNative
	* @deprecated
	* @returns {File|Blob|Object}
	*/
	getNative(): moxie.file.File.Native;

	resizeAndUpload(): void;
	upload(): void;
	destroy(): boolean;
}
const File: FileConstructor;
}
