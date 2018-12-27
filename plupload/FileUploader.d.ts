declare namespace plupload {
interface FileUploaderConstructor {
	prototype: FileUploader;
	new(): FileUploader;
}
interface FileUploader extends core.Queueable<FileUploader.Options> {
			/**
			When send_file_name is set to true, will be sent with the request as `name` param.
			Can be used on server-side to override original file name.
			@property name
			@type {String}
			*/
			name: string

			start(): void;
			uploadChunk(seq?: number, dontStop?: boolean): boolean;
			destroy(): void;
}
const FileUploader: FileUploaderConstructor;
namespace FileUploader {
	type Options = {
		chunk_size: number;
		params: { [key: string]: string };
		send_file_name: boolean;
		stop_on_fail: boolean;
	}
}
}
