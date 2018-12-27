declare namespace moxie { namespace runtime {
interface RuntimeConstructor {
	prototype: Runtime;

	/**
	Default order to try different runtime types
	@property order
	@type String
	@static
	*/
	order: string;

	/**
	Common set of methods and properties for every runtime instance
	@class moxie/runtime/Runtime
	@param {Object} options
	@param {String} type Sanitized name of the runtime
	@param {Object} [caps] Set of capabilities that differentiate specified runtime
	@param {Object} [modeCaps] Set of capabilities that do require specific operational mode
	@param {String} [preferredMode='browser'] Preferred operational mode to choose if no required capabilities were requested
	*/
	new(options: Runtime.Options|undefined|null, type: string, caps?: Runtime.Caps, modeCaps?: Runtime.Caps, preferredMode?: string): Runtime;

	/**
	Retrieves runtime from private hash by it's uid
	@method getRuntime
	@private
	@static
	@param {String} uid Unique identifier of the runtime
	@return {Runtime|Boolean} Returns runtime, if it exists and false, if - not
	*/
	getRuntime(uid: string): Runtime|false;

	/**
	Register constructor for the Runtime of new (or perhaps modified) type
	@method addConstructor
	@static
	@param {String} type Runtime type (e.g. flash, html5, etc)
	@param {Function} construct Constructor for the Runtime type
	*/
	addConstructor(type: string, constructor: { new(options?: Runtime.Options): any }): void;

	/**
	Get the constructor for the specified type.
	method getConstructor
	@static
	@param {String} type Runtime type (e.g. flash, html5, etc)
	@return {Function} Constructor for the Runtime type
	*/
	getConstructor(type: string): { new(options?: Runtime.Options): any }|null;

	/**
	Get info about the runtime (uid, type, capabilities)
	@method getInfo
	@static
	@param {String} uid Unique identifier of the runtime
	@return {Mixed} Info object or null if runtime doesn't exist
	*/
	getInfo(uid: string): Runtime.Info|null;

	/**
	Convert caps represented by a comma-separated string to the object representation.
	@method parseCaps
	@static
	@param {String} capStr Comma-separated list of capabilities
	@return {Object}
	*/
	parseCaps(capStr: string): { [key: string]: true };
	parseCaps<T>(caps: T): T;

	/**
	Test the specified runtime for specific capabilities.
	@method can
	@static
	@param {String} type Runtime type (e.g. flash, html5, etc)
	@param {String|Object} caps Set of capabilities to check
	@return {Boolean} Result of the test
	*/
	can(type: string, caps: string|Runtime.Caps): boolean;

	/**
	Figure out a runtime that supports specified capabilities.
	@method thatCan
	@static
	@param {String|Object} caps Set of capabilities to check
	@param {String} [runtimeOrder] Comma-separated list of runtimes to check against
	@return {String} Usable runtime identifier or null
	*/
	thatCan(caps: string|Runtime.Caps, runtimeOrder: string): string|null;

	/**
	Figure out an operational mode for the specified set of capabilities.
	@method getMode
	@static
	@param {Object} modeCaps Set of capabilities that depend on particular runtime mode
	@param {Object} [requiredCaps] Supplied set of capabilities to find operational mode for
	@param {String|Boolean} [defaultMode='browser'] Default mode to use
	@return {String|Boolean} Compatible operational mode
	*/
	getMode(modeCaps: Runtime.Caps, requiredCaps?: Runtime.Caps, defaultMode?: string|false): string|false;

	/**
	Third party shims (Flash and Silverlight) require global event target against which they
	will fire their events. However when moxie is not loaded to global namespace, default
	event target is not accessible and we have to create artificial ones.

	@method getGlobalEventTarget
	@static
	@return {String} Name of the global event target
	*/
	getGlobalEventTarget(): string;

	/**
	Capability check that always returns true
	@private
	@static
	@return {True}
	*/
	capTrue(): true;

	/**
	Capability check that always returns false
	@private
	@static
	@return {False}
	*/
	capFalse(): false;

	/**
	Evaluate the expression to boolean value and create a function that always returns it.
	@private
	@static
	@param {Mixed} expr Expression to evaluate
	@return {Function} Function returning the result of evaluation
	*/
	capTest(expr: any): boolean;
}
interface Runtime {
	/**
	Specifies whether runtime instance was initialized or not
	@property initialized
	@type {Boolean}
	@default false
	*/
	initialized: boolean;

	/**
	Unique ID of the runtime
	@property uid
	@type {String}
	*/
	uid: string|null;

	/**
	Runtime type (e.g. flash, html5, etc)
	@property type
	@type {String}
	*/
	type: string;

	/**
	Runtime (not native one) may operate in browser or client mode.
	@property mode
	@private
	@type {String|Boolean} current mode or false, if none possible
	*/
	mode: string|false;

	/**
	id of the DOM container for the runtime (if available)
	@property shimid
	@type {String}
	*/
	shimid: string;

	/**
	Number of connected clients. If equal to zero, runtime can be destroyed
	@property clients
	@type {Number}
	*/
	clients: number;

	/**
	Runtime initialization options
	@property options
	@type {Object}
	*/
	options: Runtime.Options;

	/**
	Checks if the runtime has specific capability
	@method can
	@param {String} cap Name of capability to check
	@param {Mixed} [value] If passed, capability should somehow correlate to the value
	@param {Object} [refCaps] Set of capabilities to check the specified cap against (defaults to internal set)
	@return {Boolean} true if runtime has such capability and false, if - not
	*/
	can(cap: string, value?: any, refCaps?: Runtime.Caps): boolean;

	/**
	Returns container for the runtime as DOM element
	@method getShimContainer
	@return {DOMElement}
	*/
	getShimContainer(): Element;

	/**
	Returns runtime as DOM element (if appropriate)
	@method getShim
	@return {DOMElement}
	*/
	getShim(): Runtime.Shim|null;

	/**
	Invokes a method within the runtime itself (might differ across the runtimes)
	@method shimExec
	@param {Mixed} []
	@protected
	@return {Mixed} Depends on the action and component
	*/
	shimExec(component: string, action: string, ...args: any): unknown;

	/**
	Operaional interface that is used by components to invoke specific actions on the runtime
	(is invoked in the scope of component)
	@method exec
	@param {Mixed} []*
	@protected
	@return {Mixed} Depends on the action and component
	*/
	exec(component: string, action: string, ...args: any): unknown;

	/**
	Destroys the runtime (removes all events and deletes DOM structures)
	@method destroy
	*/
	destroy(): void;
}

namespace Runtime {
	interface Options {
		preferred_caps?: null|Caps;
		required_caps?: null|Caps;
		container?: Element;
		runtime_order?: string;
		ruid?: string;
	}

	interface Shim {
		exec(uid: string, comp: string, fn: string, args: IArguments): unknown;
		removeInstance(uid: string): void;
		removeAllInstances(): void;
	}

	interface Info {
		uid: string,
		type: string,
		mode: string,
		can(cap: string, value?: any, refCaps?: Runtime.Caps): boolean;
	}

	interface Caps {
			/** provide access to raw binary data of the file */
			access_binary?: boolean;
			/** provide access to raw binary data of the image (image extension is optional)  */
			access_image_binary?: boolean;
			/** display binary data as thumbs for example */
			display_media?: boolean;
			/** make cross-domain requests */
			do_cors?: boolean;
			/** accept files dragged and dropped from the desktop */
			drag_and_drop?: boolean;
			/** filter files in selection dialog by their extensions */
			filter_by_extension?: boolean;
			/** resize image (and manipulate it raw data of any file in general) */
			resize_image?: boolean;
			/** periodically report how many bytes of total in the file were uploaded (loaded) */
			report_upload_progress?: boolean;
			/** provide access to the headers of http response  */
			return_response_headers?: boolean;
			/** support response of specific type, which should be passed as an argument e.g. runtime.can('return_response_type', 'blob') */
			return_response_type?: boolean;
			/** return http status code of the response */
			return_status_code?: boolean;
			/** send custom http header with the request */
			send_custom_headers?: boolean;
			/** pick up the files from a dialog */
			select_file?: boolean;
			/** select whole folder in file browse dialog */
			select_folder?: boolean;
			/** select multiple files at once in file browse dialog */
			select_multiple?: boolean;
			/** send raw binary data, that is generated after image resizing or manipulation of other kind */
			send_binary_string?: boolean;
			/** send cookies with http request and therefore retain session */
			send_browser_cookies?: boolean;
			/** send data formatted as multipart/form-data */
			send_multipart?: boolean;
			/** slice the file or blob to smaller parts */
			slice_blob?: boolean;
			/** upload file without preloading it to memory, stream it out directly from disk */
			stream_upload?: boolean;
			/** programmatically trigger file browse dialog */
			summon_file_dialog?: boolean;
			/** upload file of specific size, size should be passed as argument e.g. runtime.can('upload_filesize', '500mb') */
			upload_filesize?: boolean;
			/** initiate http request with specific http method, method should be passed as argument e.g. runtime.can('use_http_method', 'put') */
			use_http_method?: boolean;

			[key: string]: boolean|undefined;
	}
}

}}
