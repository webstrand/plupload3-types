declare namespace moxie { namespace file {
interface FileDropConstructor {
	prototype: FileDrop;

	/**
	Turn arbitrary DOM element to a drop zone accepting files. Converts selected files to _File_ objects, to be used
	in conjunction with _Image_, preloaded in memory with _FileReader_ or uploaded to a server through
	_XMLHttpRequest_.
	@example
		<div id="drop_zone">
			Drop files here
		</div>
		<br />
		<div id="filelist"></div>
		<script type="text/javascript">
			var fileDrop = new moxie.file.FileDrop('drop_zone'), fileList = moxie.utils.Dom.get('filelist');
			fileDrop.ondrop = function() {
				moxie.utils.Basic.each(this.files, function(file) {
					fileList.innerHTML += '<div>' + file.name + '</div>';
				});
			};
			fileDrop.init();
		</script>
	@class moxie/file/FileDrop
	@constructor
	@extends EventTarget
	@uses RuntimeClient
	@param {Object|String} options If options has typeof string, argument is considered as options.drop_zone
		@param {String|DOMElement} options.drop_zone DOM Element to turn into a drop zone
		@param {Array} [options.accept] Array of mime types to accept. By default accepts all
		@param {Object|String} [options.required_caps] Set of required capabilities, that chosen runtime must support
	*/
	new(options: FileDrop.Options): FileDrop;
}

interface FileDrop extends runtime.RuntimeClient, core.EventTarget<FileDrop.Dispatches> {
	uid: string;

	ruid: string|null;

	files: null|File[];

	init(): void;
	destroy(): void;
}
const FileDrop: FileDropConstructor;
namespace FileDrop {
	type Options = {
		drop_zone: Element|string;
		accept: core.utils.Mime.MimeType[];
		required_caps: runtime.Runtime.Caps;
	}
	type Dispatches = {
		/**
		Dispatched when runtime is connected and drop zone is ready to accept files.
		@event ready
		@param {Object} event
		*/
		ready: (event: { type: 'ready' }) => boolean|void;

		/**
		Dispatched when dragging cursor enters the drop zone.
		@event dragenter
		@param {Object} event
		*/
		dragenter: (event: { type: 'dragenter' }) => boolean|void;

		/**
		Dispatched when dragging cursor leaves the drop zone.
		@event dragleave
		@param {Object} event
		*/
		dragleave: (event: { type: 'dragleave' }) => boolean|void;

		/**
		Dispatched when file is dropped onto the drop zone.
		@event drop
		@param {Object} event
		*/
		drop: (event: { type: 'drop' }) => boolean|void;

		/**
		Dispatched if error occurs.
		@event error
		@param {Object} event
		*/
		error: (event: { type: 'error' }) => boolean|void;
	};
}
}}
