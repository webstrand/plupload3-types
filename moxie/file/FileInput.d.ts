declare namespace moxie { namespace file {
interface FileInputConstructor {
	prototype: FileInput;

	/**
	Provides a convenient way to create cross-browser file-picker. Generates file selection dialog on click,
	converts selected files to _File_ objects, to be used in conjunction with _Image_, preloaded in memory
	with _FileReader_ or uploaded to a server through _XMLHttpRequest_.
	@class moxie/file/FileInput
	@constructor
	@extends EventTarget
	@uses RuntimeClient
	@param {Object|String|DOMElement} options If options is string or node, argument is considered as _browse\_button_.
		@param {String|DOMElement} options.browse_button DOM Element to turn into file picker.
		@param {Array} [options.accept] Array of mime types to accept. By default accepts all.
		@param {Boolean} [options.multiple=false] Enable selection of multiple files.
		@param {Boolean} [options.directory=false] Turn file input into the folder input (cannot be both at the same time).
		@param {String|DOMElement} [options.container] DOM Element to use as a container for file-picker. Defaults to parentNode
		for _browse\_button_.
		@param {Object|String} [options.required_caps] Set of required capabilities, that chosen runtime must support.
	@example
		<div id="container">
			<a id="file-picker" href="javascript:;">Browse...</a>
		</div>
		<script>
			var fileInput = new moxie.file.FileInput({
				browse_button: 'file-picker', // or document.getElementById('file-picker')
				container: 'container',
				accept: [
					{title: "Image files", extensions: "jpg,gif,png"} // accept only images
				],
				multiple: true // allow multiple file selection
			});
			fileInput.onchange = function(e) {
				// do something to files array
				console.info(e.target.files); // or this.files or fileInput.files
			};
			fileInput.init(); // initialize
		</script>
	*/
	new(options: FileInput.Options): FileInput;
	new(browse_button: FileInput.Opt<'browse_button'>): FileInput;
}

interface FileInput extends runtime.RuntimeClient, core.EventTarget<FileInput.Dispatches> {
	/**
	Unique id of the component
	@property uid
	@protected
	@readOnly
	@type {String}
	@default UID
	*/
	uid: string;

	/**
	Unique id of the connected runtime, if any.
	@property ruid
	@protected
	@type {String}
	*/
	ruid: null|string;

	/**
	Unique id of the runtime container. Useful to get hold of it for various manipulations.
	@property shimid
	@protected
	@type {String}
	*/
	shimid: null|string;

	/**
	Array of selected moxie.file.File objects
	@property files
	@type {Array}
	@default null
	*/
	files: null|File[];

	/**
	Initializes the file-picker, connects it to runtime and dispatches event ready when done.
	@method init
	*/
	init(): void;


	/**
	 * Get current option value by its name
	 *
	 * @method getOption
	 * @param name
	 * @return {Mixed}
	 */
	getOption<K extends string|number>(name: K): K extends keyof FileInput.Options ? FileInput.Options[K] : unknown;

	/**
	 * Sets a new value for the option specified by name
	 *
	 * @method setOption
	 * @param name
	 * @param value
	 */
	setOption<K extends string|number>(name: K, value: K extends keyof FileInput.Options ? FileInput.Options[K] : unknown): void;

	/**
	Disables file-picker element, so that it doesn't react to mouse clicks.
	@method disable
	@param {Boolean} [state=true] Disable component if - true, enable if - false
	*/
	disable(state: boolean): void;

	/**
	Reposition and resize dialog trigger to match the position and size of browse_button element.
	@method refresh
	*/
	refresh(): void;

	/**
	Destroy component.
	@method destroy
	*/
	destroy(): void;
}
const FileInput: FileInputConstructor;
namespace FileInput {
	type Opt<T> = T extends keyof Options ? Options[T] : never;
	type Options = {
		browse_button: string|Element;
		accept: core.utils.Mime.MimeType[];
		multiple: boolean;
		directory: boolean;
		container: string|Element;
		required_caps: false|runtime.Runtime.Caps;
	}
	type Dispatches = {
		/**
		Dispatched when runtime is connected and file-picker is ready to be used.
		@event ready
		@param {Object} event
		*/
		ready: (event: { type: 'ready' }) => boolean|undefined|void;

		/**
		Dispatched right after [ready](#event_ready) event, and whenever [refresh()](#method_refresh) is invoked.
		Check [corresponding documentation entry](#method_refresh) for more info.
		@event refresh
		@param {Object} event
		*/
		refresh: (event: { type: 'refresh' }) => boolean|undefined|void;
		/**
		Dispatched when selection of files in the dialog is complete.
		@event change
		@param {Object} event
		*/
		change: (event: { type: 'change' }) => boolean|undefined|void;

		cancel: (event: { type: 'cancel' }) => boolean|undefined|void; // TODO: might be useful

		/**
		Dispatched when mouse cursor enters file-picker area. Can be used to style element
		accordingly.
		@event mouseenter
		@param {Object} event
		*/
		mouseenter: (event: { type: 'mouseenter' }) => boolean|undefined|void;

		/**
		Dispatched when mouse cursor leaves file-picker area. Can be used to style element
		accordingly.
		@event mouseleave
		@param {Object} event
		*/
		mouseleave: (event: { type: 'mouseleave' }) => boolean|undefined|void;

		/**
		Dispatched when functional mouse button is pressed on top of file-picker area.
		@event mousedown
		@param {Object} event
		*/
		mousedown: (event: { type: 'mousedown' }) => boolean|undefined|void;

		/**
		Dispatched when functional mouse button is released on top of file-picker area.
		@event mouseup
		@param {Object} event
		*/
		mouseup: (event: { type: 'mouseup' }) => boolean|undefined|void;
	};
}
}}
