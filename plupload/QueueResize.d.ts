declare namespace plupload {
interface QueueResizeConstructor {
	prototype: QueueResize;
	new(): QueueResize;
}
interface QueueResize extends core.Queue {

}
const QueueResize: QueueResizeConstructor;
}
