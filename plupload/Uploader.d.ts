declare namespace _plupload {
	type GlobalFile = File;
	type GlobalBlob = Blob;
}

declare namespace plupload {


interface FileUploader {}

interface UploaderConstructor {
	prototype: Uploader;
	STOPPED: core.QueueableState.Idle;
	STARTED: core.QueueableState.Processing;

	new(options: Uploader.Options): Uploader;
}

interface Uploader extends Uploader.Patch<core.Queue<Uploader.Options>> {
	/**
	 * Unique id for the Uploader instance.
	 *
	 * @property id
	 * @type String
	*/
	id: string;

	/**
	 * Current state of the total uploading progress. This one can either be plupload.STARTED or plupload.STOPPED.
	 * These states are controlled by the stop/start methods. The default value is STOPPED.
	 *
	 * @property state
	 * @type Number
	*/
	state: core.QueueableState;

	/**
	 * Map of features that are available for the uploader runtime. Features will be filled
	 * before the init event is called, these features can then be used to alter the UI for the end user.
	 * Some of the current features that might be in this map is: dragdrop, chunks, jpgresize, pngresize.
	 *
	 * @property features
	 * @type Object
	 * @deprecated
	*/
	features: { [key: string]: string };

	/**
	 * Object with name/value settings.
	 *
	 * @property settings
	 * @type Object
	 * @deprecated Use `getOption()/setOption()`
	*/
	settings: Uploader.Options;

	/**
	 * Current runtime name
	 *
	 * @property runtime
	 * @type String
	 * @deprecated There might be multiple runtimes per uploader
	*/
	runtime: string|null;

	/**
	 * Current upload queue, an array of File instances
	 *
	 * @property files
	 * @deprecated use forEachItem(callback) to cycle over the items in the queue
	 * @type Array
	*/
	files: unknown;

	/**
	 * Total progess information. How many files has been uploaded, total percent etc.
	 *
	 * @property total
	 * @deprecated use stats
	*/
	total: number; //this.stats,

	/**
	 * Initializes the Uploader instance and adds internal event listeners.
	 *
	 * @method init
	*/

	//constructor(options: Uploader.Options);
	/**
	 * Initializes the Uploader instance and adds internal event listeners.
	 *
	 * @method init
	*/
	init(): void;

	/**
	 * Set the value for the specified option(s).
	 *
	 * @method setOption
	 * @since 2.1
	 * @param {String|Object} option Name of the option to change or the set of key/value pairs
	 * @param {Mixed} [value] Value for the option (is ignored, if first argument is object)
	*/
	setOption<K extends string>(option: K, value: K extends keyof Uploader.ModifiableOptions ? Uploader.ModifiableOptions[K] : K extends keyof Uploader.Options ? never : any): void;
	setOption<T extends Partial<Uploader.ModifiableOptions>>(option: T): void;

	/**
	 * Refreshes the upload instance by dispatching out a refresh event to all runtimes.
	 * This would for example reposition flash/silverlight shims on the page.
	 *
	 * @method refresh
	*/
	refresh(): void;

	/**
	 * Stops the upload of the queued files.
	 *
	 * @method stop
	*/
	stop(): void;

	/**
	 * Disables/enables browse button on request.
	 *
	 * @method disableBrowse
	 * @param {Boolean} disable Whether to disable or enable (default: true)
	*/
	disableBrowse(disable: boolean): void;

	/**
	 * Returns the specified FileUploader object by id
	 *
	 * @method getFile
	 * @deprecated use getItem()
	 * @param {String} id FileUploader id to look for
	 * @return {plupload.FileUploader}
	*/
	getFile(id: string): FileUploader;

	/**
	 * Adds file to the queue programmatically. Can be native file, instance of Plupload.File,
	 * instance of mOxie.File, input[type="file"] element, or array of these. Fires FilesAdded,
	 * if any files were added to the queue. Otherwise nothing happens.
	 *
	 * @method addFile
	 * @since 2.0
	 * @param {plupload.File|mOxie.File|File|Node|Array} file File or files to add to the queue.
	 * @param {String} [fileName] If specified, will be used as a name for the file
	*/
	addFile(file: File|moxie.file.File|HTMLInputElement|_plupload.GlobalFile|_plupload.GlobalBlob, fileName?: string): void;
	addFile(files: (File|moxie.file.File|HTMLInputElement|_plupload.GlobalFile|_plupload.GlobalBlob)[]): void;


	/**
	 * Removes a specific item from the queue
	 *
	 * @method removeFile
	 * @param {plupload.FileUploader|String} file
	*/
	removeFile(file: File|string): void;

	/**
	 * Removes part of the queue and returns removed files.
	 * Triggers FilesRemoved and consequently QueueChanged events.
	 *
	 * @method splice
	 * @param {Number} [start=0] Start index to remove from
	 * @param {Number} [length] Length of items to remove
	*/
	splice(start?: number, length?: number): core.Queueable[];
}

const Uploader: UploaderConstructor;
namespace Uploader {
	/**
	 * For some reason, the developers of plupload decided that Uploader needed
	 * a new interface for managing events that's incompatible with the parent
	 * moxie.core.EventTarget interface. (The real class still inherits from
	 * EventTarget, though!)
	 */
	type EventTarget = {
		/**
		Dispatches the specified event name and its arguments to all listeners.
		@method trigger
		@param {String} name Event name to fire.
		@param {Object..} Multiple arguments to pass along to the listener functions.
		*/
		// moxie.core.EventTarget provides both dispatchEvent and trigger
		// as aliases to send messages to listeners. plupload.Uploader
		// events have a different arguments structure, so we don't pass
		// them onto the EventTarget.
		dispatchEvent<K extends string|number>(type: K, ...args: Array<K extends keyof Dispatches ? Parameters<Dispatches[K]> : any[]>): boolean;

		/**
		Check whether uploader has any listeners to the specified event.
		@method hasEventListener
		@param {String} name Event name to check for.
		*/
		hasEventListener<K extends string|number>(type: K): moxie.core.EventTarget.ListenerHandle<K extends keyof Dispatches ? Dispatches[K] : never, unknown>|false;

		/**
		Adds an event listener by name.
		@method bind
		@param {String} name Event name to listen for.
		@param {function} fn Function to call ones the event gets fired.
		@param {Object} [scope] Optional scope to execute the specified function in.
		@param {Number} [priority=0] Priority of the event handler - handlers with higher priorities will be called first
		*/
		bind<K extends string|number, T>(type: K, fn: moxie.core.EventTarget.Listener<K extends keyof Dispatches ? Dispatches[K] : never, T>, scope: T, priority?: number): void;
		bind<K extends string|number, T>(this: T, type: K, fn: moxie.core.EventTarget.Listener<K extends keyof Dispatches ? Dispatches[K] : never, T>): void;


		/**
		Removes the specified event listener.
		@method unbind
		@param {String} name Name of event to remove.
		@param {function} fn Function to remove from listener.
		*/
		unbind<K extends string|number>(type: K, fn?: moxie.core.EventTarget.Listener<K extends keyof Dispatches ? Dispatches[K] : never, any>): void
	}

	type ModifiableOptions = core.Queue.Options & {
		/** undocumented */
		init?: Partial<Dispatches>;

		/** undocumented */
		preinit?: Partial<Dispatches>;

		/**
		Chunk size in bytes to slice the file into. Shorcuts with b, kb, mb, gb,
		tb suffixes also supported. `e.g. 204800 or "204800b" or "200kb"`. By
		default - disabled.
		Default: 0
		*/
		chunk_size?: number|string;

		/**
		Whether to send chunks and chunk numbers, or total and offset bytes.
		Default: true
		*/
		send_chunk_number?: Boolean;

		/**
		Name for the file field in Multipart formated message.
		Default: "file"
		*/
		file_data_name?: string;

		/**
		Set of file type filters.
		Default: {}
		*/
		filters?: Options.Filters;

		/**
		Custom headers to send with the upload. Hash of name/value pairs.
		*/
		headers?: { [key: string]: string|number }

		/**
		HTTP method to use during upload (only PUT or POST allowed).
		Default: "POST"
		*/
		http_method?: string;

		/**
		How many times to retry the chunk or file, before triggering Error event.
		Default: 0
		*/
		max_retries?: number;

		/**
		Whether to send file and additional parameters as Multipart formated
		message.
		Default: true
		*/
		multipart?: boolean;

		/**
		Hash of key/value pairs to send with every file upload.
		*/
		params?: { [key: string]: string|number|undefined|null }

		/**
		Either comma-separated list or hash of required features that chosen
		runtime should absolutely possess.
		*/
		required_features?: string|{ [key: string]: string };

		/**
		Enable resizing of images on client-side. Applies to `image/jpeg` and
		`image/png` only. `e.g. {width : 200, height : 200, quality : 90, crop:
		true}`
		*/
		resize?: moxie.image.Image.ResizeOptions;

		/**
		Whether to send file name as additional argument - 'name' (required for
		chunked uploads and some other cases where file name cannot be sent via
		normal ways).
		Default: true
		*/
		send_file_name?: boolean;

		/**
		If true will generate unique filenames for uploaded files.
		Default: false
		*/
		unique_names?: boolean;

		/**
		URL of the server-side upload handler.
		*/
		url: string;

		/** undocumented */
		preferred_caps?: boolean;

		/** undocumented, class name to add to the button */
		browse_button_hover?: string;

		/** undocumented, class name to add to the button */
		browse_button_active?: string;

		/** undocumented, this option is automatically generated */
		re_ext_filter?: RegExp;
	}

	type Options = ModifiableOptions & {
		/**
		id of the DOM element or DOM element itself that will be used to wrap
		uploader structures. Defaults to immediate parent of the `browse_button`
		element.
		*/
		container?: string|HTMLElement;

		/**
		id of the DOM element or DOM element itself to use as file dialog
		trigger.
		*/
		browse_button: string|HTMLElement;

		/**
		id of the DOM element or DOM element itself to use as a drop zone for
		Drag-n-Drop.
		*/
		drop_element?: string|HTMLElement;

		/**
		Comma separated list of runtimes, that Plupload will try in turn, moving
		to the next if previous fails.
		Default: "html5,flash,silverlight,html4"
		*/
		runtimes?: string;

		/**
		Enable ability to select multiple files at once in file dialog.
		Default: true
		*/
		multi_selection?: boolean;

		/**
		URL of the Flash swf.
		*/
		flash_swf_url?: string;

		/**
		URL of the Silverlight xap.
		*/
		silverlight_xap_url?: string;
	}

	type Dispatches = {
		/**
		Fires when the current RunTime has been initialized.
		@event Init
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		*/
		init: (uploader: Uploader) => boolean|void;

		/**
		Fires after the init event incase you need to perform actions there.
		@event PostInit
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		*/
		postinit: (uploader: Uploader) => boolean|void;

		/**
		Fires when the option is changed in via uploader.setOption().
		@event OptionChanged
		@since 2.1
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		@param {String} name Name of the option that was changed
		@param {Mixed} value New value for the specified option
		@param {Mixed} oldValue Previous value of the option
		*/
		optionschanged: (uploader: Uploader, name: string, value: unknown) => boolean|void;

		/**
		Fires when the silverlight/flash or other shim needs to move.
		@event Refresh
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		*/
		refresh: (uploader: Uploader) => boolean|void;

		/**
		Fires when the overall state is being changed for the upload queue.
		@event StateChanged
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		*/
		statechanged: (uploader: Uploader) => boolean|void;

		/**
		Fires when browse_button is clicked and browse dialog shows.
		@event Browse
		@since 2.1.2
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		*/
		browse: (uploader: Uploader) => boolean|void;

		/**
		Fires for every filtered file before it is added to the queue.
		@event FileFiltered
		@since 2.1
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		@param {plupload.File} file Another file that has to be added to the queue.
		*/
		filefiltered: (uploader: Uploader, file: File) => boolean|void;

		/**
		Fires when the file queue is changed. In other words when files are added/removed to the files array of the uploader instance.
		@event QueueChanged
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		*/
		queuechanged: (uploader: Uploader) => boolean|void;

		/**
		Fires after files were filtered and added to the queue.
		@event FilesAdded
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		@param {Array} files Array of FileUploader objects that were added to the queue by user.
		*/
		filesadded: (uploader: Uploader, files: File[]) => boolean|void;

		/**
		Fires when file is removed from the queue.
		@event FilesRemoved
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		@param {Array} files Array of files that got removed.
		*/
		filesremoved: (uploader: Uploader, files: File[]) => boolean|void;


		/**
		Fires just before a file is uploaded. Can be used to cancel upload of the current file
		by returning false from the handler.
		@event BeforeUpload
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		@param {plupload.File} file File to be uploaded.
		*/
		beforeupload: (uploader: Uploader, file: File) => boolean|void;

		/**
		Fires when a file is to be uploaded by the runtime.
		@event UploadFile
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		@param {plupload.File} file File to be uploaded.
		*/
		uploadfile: (uploader: Uploader, file: File) => boolean|void;

		/**
		Fires while a file is being uploaded. Use this event to update the current file upload progress.
		@event UploadProgress
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		@param {plupload.File} file File that is currently being uploaded.
		*/
		uploadprogress: (uploader: Uploader, file: File) => boolean|void;

		/**
		Fires when file chunk is uploaded.
		@event ChunkUploaded
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		@param {plupload.File} file File that the chunk was uploaded for.
		@param {Object} result Object with response properties.
			@param {Number} result.offset The amount of bytes the server has received so far, including this chunk.
			@param {Number} result.total The size of the file.
			@param {String} result.response The response body sent by the server.
			@param {Number} result.status The HTTP status code sent by the server.
			@param {String} result.responseHeaders All the response headers as a single string.
		*/
		chunkuploaded: (uploader: Uploader, file: File, result: { offset: number, total: number, response: string, status: number, responseHeaders: string }) => boolean|void;

		/**
		Fires when a file is successfully uploaded.
		@event FileUploaded
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		@param {plupload.File} file File that was uploaded.
		@param {Object} result Object with response properties.
			@param {String} result.response The response body sent by the server.
			@param {Number} result.status The HTTP status code sent by the server.
			@param {String} result.responseHeaders All the response headers as a single string.
		*/
		fileuploaded: (uploader: Uploader, file: File, result: { response: string, status: number, responseHeaders: string }) => boolean|void;

		/**
		Fires when all files in a queue are uploaded
		@event UploadComplete
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		*/
		uploadcomplete: (uploader: Uploader) => boolean|void;


		/**
		Fires whenever upload is aborted for some reason
		@event CancelUpload
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		*/
		cancelupload: (uploader: Uploader) => boolean|void;

		/**
		Fires when a error occurs.
		@event Error
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		@param {Object} error Contains code, message and sometimes file and other details.
			@param {Number} error.code The plupload error code.
			@param {String} error.message Description of the error (uses i18n).
		*/
		error: (uploader: Uploader, error: { code: number, message: string }) => boolean|void;

		/**
		Fires when destroy method is called.
		@event Destroy
		@param {plupload.Uploader} uploader Uploader instance sending the event.
		*/
		destroy: (uploader: Uploader) => boolean|void;
	};

	type Patch<Base> = { [P in keyof Base]: P extends keyof Uploader.EventTarget ? Uploader.EventTarget[P] : Base[P] };

	namespace Options {
		interface Filters {
			/**
			List of file types to accept, each one defined by title and list of
			extensions. `e.g. {title : "Image files", extensions :
			"jpg,jpeg,gif,png"}`. Dispatches `plupload.FILE_EXTENSION_ERROR`
			Default: []
			*/
			mime_types?: moxie.core.utils.Mime.MimeType[];

			/**
			Maximum file size that the user can pick, in bytes. Optionally
			supports b, kb, mb, gb, tb suffixes. `e.g. "10mb" or "1gb"`. By
			default - not set. Dispatches `plupload.FILE_SIZE_ERROR`.
			Default: 0 (unlimited)
			*/
			max_file_size?: number|string;

			/**
			Do not let duplicates into the queue. Dispatches
			`plupload.FILE_DUPLICATE_ERROR`.
			Default: false
			*/
			prevent_duplicates?: boolean;
		}
	}
}
}
