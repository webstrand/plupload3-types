declare namespace moxie { namespace image {
interface ImageConstructor {
	prototype: Image;
	MAX_RESIZE_WIDTH: 8192;
	MAX_RESIZE_HEIGHT: 8192;

	new(): Image;
}
interface Image extends runtime.RuntimeClient, core.EventTarget<{}> {
			/**
			Unique id of the component
			@property uid
			@type {String}
			*/
			uid: string;

			/**
			Unique id of the connected runtime, if any.
			@property ruid
			@type {String}
			*/
			ruid: string|null;

			/**
			Name of the file, that was used to create an image, if available. If not equals to empty string.
			@property name
			@type {String}
			@default ""
			*/
			name: string;

			/**
			Size of the image in bytes. Actual value is set only after image is preloaded.
			@property size
			@type {Number}
			@default 0
			*/
			size: number;

			/**
			Width of the image. Actual value is set only after image is preloaded.
			@property width
			@type {Number}
			@default 0
			*/
			width: number;

			/**
			Height of the image. Actual value is set only after image is preloaded.
			@property height
			@type {Number}
			@default 0
			*/
			height: number;

			/**
			Mime type of the image. Currently only image/jpeg and image/png are supported. Actual value is set only after image is preloaded.
			@property type
			@type {String}
			@default ""
			*/
			type: string;

			/**
			Holds meta info (Exif, GPS). Is populated only for image/jpeg. Actual value is set only after image is preloaded.
			@property meta
			@type {Object}
			@default {}
			*/
			meta: { [key: string]: unknown }

			/**
			Alias for load method, that takes another moxie.image.Image object as a source (see load).
			@method clone
			@param {Image} src Source for the image
			@param {Boolean} [exact=false] Whether to activate in-depth clone mode
			*/
			clone(src: Image, exact?: boolean): void;

			/**
			Loads image from various sources. Currently the source for new image can be: moxie.image.Image,
			moxie.file.Blob/moxie.file.File, native Blob/File, dataUrl or URL. Depending on the type of the
			source, arguments - differ. When source is URL, Image will be downloaded from remote destination
			and loaded in memory.
			@example
				var img = new moxie.image.Image();
				img.onload = function() {
					var blob = img.getAsBlob();
					var formData = new moxie.xhr.FormData();
					formData.append('file', blob);
					var xhr = new moxie.xhr.XMLHttpRequest();
					xhr.onload = function() {
						// upload complete
					};
					xhr.open('post', 'upload.php');
					xhr.send(formData);
				};
				img.load("http://www.moxiecode.com/images/mox-logo.jpg"); // notice file extension (.jpg)
			@method load
			@param {Image|Blob|File|String} src Source for the image
			@param {Boolean|Object} [mixed]
			*/
			load(src: Image, exact?: boolean): void;
			load(src: file.Blob|Blob|File, options?: { [key: string]: any }): void;
			load(src: string, options?: { [key: string]: any }): void;


			/**
			Resizes the image to fit the specified width/height. If crop is specified, image will also be
			cropped to the exact dimensions.
			@method resize
			@since 3.0
			@param {Object} options
				@param {Number} options.width Resulting width
				@param {Number} [options.height=width] Resulting height (optional, if not supplied will default to width)
				@param {String} [options.type='image/jpeg'] MIME type of the resulting image
				@param {Number} [options.quality=90] In the case of JPEG, controls the quality of resulting image
				@param {Boolean} [options.crop='cc'] If not falsy, image will be cropped, by default from center
				@param {Boolean} [options.fit=true] Whether to upscale the image to fit the exact dimensions
				@param {Boolean} [options.preserveHeaders=true] Whether to preserve meta headers (on JPEGs after resize)
				@param {String} [options.resample='default'] Resampling algorithm to use during resize
				@param {Boolean} [options.multipass=true] Whether to scale the image in steps (results in better quality)
			*/
			resize(options: Image.ResizeOptions & { width: number }): void;


			/**
			Downsizes the image to fit the specified width/height. If crop is supplied, image will be cropped to exact dimensions.
			@method downsize
			@deprecated use resize()
			*/
			downsize(options: Image.ResizeOptions & { width: number }): void;
			downsize(width: number, height?: number, crop?: boolean|Image.CropType, preserveHeaders?: boolean): void;

			/**
			Alias for downsize(width, height, true). (see downsize)
			@method crop
			@param {Number} width Resulting width
			@param {Number} [height=width] Resulting height (optional, if not supplied will default to width)
			@param {Boolean} [preserveHeaders=true] Whether to preserve meta headers (on JPEGs after resize)
			*/
			crop(width: number, height?: number, preserveHeaders?: boolean): void;

			getAsCanvas(): HTMLCanvasElement & { id: string };

			/**
			Retrieves image in it's current state as moxie.file.Blob object. Cannot be run on empty or image in progress (throws
			DOMException.INVALID_STATE_ERR).
			@method getAsBlob
			@param {String} [type="image/jpeg"] Mime type of resulting blob. Can either be image/jpeg or image/png
			@param {Number} [quality=90] Applicable only together with mime type image/jpeg
			@return {Blob} Image as Blob
			*/
			getAsBlob(type?: Image.MimeType, quality?: number): file.File;

			/**
			Retrieves image in it's current state as dataURL string. Cannot be run on empty or image in progress (throws
			DOMException.INVALID_STATE_ERR).
			@method getAsDataURL
			@param {String} [type="image/jpeg"] Mime type of resulting blob. Can either be image/jpeg or image/png
			@param {Number} [quality=90] Applicable only together with mime type image/jpeg
			@return {String} Image as dataURL string
			*/
			getAsDataURL(type?: Image.MimeType, quality?: number): string;

			/**
			Retrieves image in it's current state as binary string. Cannot be run on empty or image in progress (throws
			DOMException.INVALID_STATE_ERR).
			@method getAsBinaryString
			@param {String} [type="image/jpeg"] Mime type of resulting blob. Can either be image/jpeg or image/png
			@param {Number} [quality=90] Applicable only together with mime type image/jpeg
			@return {String} Image as binary string
			*/
			getAsBinaryString(type?: Image.MimeType, quality?: number): string;

			/**
			Embeds a visual representation of the image into the specified node. Depending on the runtime,
			it might be a canvas, an img node or a thrid party shim object (Flash or SilverLight - very rare,
			can be used in legacy browsers that do not have canvas or proper dataURI support).
			@method embed
			@param {DOMElement} el DOM element to insert the image object into
			@param {Object} [options]
				@param {Number} [options.width] The width of an embed (defaults to the image width)
				@param {Number} [options.height] The height of an embed (defaults to the image height)
				@param {String} [options.type="image/jpeg"] Mime type
				@param {Number} [options.quality=90] Quality of an embed, if mime type is image/jpeg
				@param {Boolean} [options.crop=false] Whether to crop an embed to the specified dimensions
				@param {Boolean} [options.fit=true] By default thumbs will be up- or downscaled as necessary to fit the dimensions
			*/
			embed(el: Element, options: Image.ResizeOptions): void;

			/**
			Properly destroys the image and frees resources in use. If any. Recommended way to dispose
			moxie.image.Image object.
			@method destroy
			*/
			destroy(): void;
}
const Image: ImageConstructor;
namespace Image {
	type MimeType = 'image/jpeg'|'image/png';
	type CropType = 'rb'|'right-bottom'|'cb'|'center-bottom'|'lb'|'left-bottom'|'lt'|'left-top'|'ct'|'center-top'|'rt'|'right-top'|'rc'|'right-center'|'right-middle'|'lc'|'left-center'|'left-middle'|'cc'|'center-center'|'center-middle';
	type ResampleType = 'default'|'nearest'|'bilinear'|'bicubic';

	type ResizeOptions = {
		/** Resulting width */
		width?: number;
		/** Resulting height (optional, if not supplied will default to width) */
		height?: number;
		/** MIME type of the resulting image */
		type?: MimeType;
		/** In the case of JPEG, controls the quality of resulting image */
		quality?: number;
		/** If not falsy, image will be cropped, by default from center */
		crop?: boolean|CropType;
		/** Whether to upscale the image to fit the exact dimensions */
		fit?: boolean;
		/** Whether to preserve meta headers (on JPEGs after resize) */
		preserveHeaders?: boolean;
		/** Resampling algorithm to use during resize */
		resample?: ResampleType;
		/** Whether to scale the image in steps (results in better quality) */
		multipass?: boolean;
	}
}
}}
