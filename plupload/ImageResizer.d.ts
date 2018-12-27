declare namespace plupload {
interface ImageResizerConstructor {
	prototype: ImageResizer
	new(): ImageResizer;
}
interface ImageResizer extends core.Queueable<ImageResizer.Options> {
	start(): void;
}
const ImageResizer: ImageResizerConstructor;
namespace ImageResizer {
	type Options = Required<moxie.image.Image.ResizeOptions>;
}
}
