declare namespace plupload {
interface QueueUploadConstructor {
	prototype: QueueUpload;
	new(options: QueueUpload.Options): QueueUpload;
}
interface QueueUpload extends core.Queue<QueueUpload.Options> {

}
const QueueUpload: QueueUploadConstructor;
namespace QueueUpload {
	type Options = core.Queue.Options & {}
}
}
