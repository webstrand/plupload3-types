declare namespace plupload {
interface ChunkUploaderConstructor {
	prototype: ChunkUploader;
	new(): ChunkUploader;
}
interface ChunkUploader extends core.Queueable<ChunkUploader.Options> {
	start(): void;
	stop(): void;
	destroy(): void;
}
const ChunkUploader: ChunkUploaderConstructor;
namespace ChunkUploader {
	type Options = {
		file_data_name: string;
		headers: boolean;
		http_method: 'GET'|'HEAD'|'POST'|'PUT'|'DELETE'|'CONNECT'|'OPTIONS'|'TRACE'|'PATCH';
		multipart: boolean;
		params: { [key: string]: string };
		send_file_name: boolean;
		url: string|false;
	};
}
}
