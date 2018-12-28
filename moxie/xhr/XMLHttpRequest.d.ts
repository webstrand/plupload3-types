declare namespace moxie { namespace xhr {
class XMLHttpRequestUpload {
	uid: string;
}
const enum XMLHttpRequestState {
	Unsent = 0,
	Opened = 1,
	HeadersReceived = 2,
	Loading = 3,
	Done = 4
}
class XMLHttpRequest extends core.EventTarget<XMLHttpRequest.Dispatches> {
	static UNSENT: XMLHttpRequestState.Unsent;
	static OPENED: XMLHttpRequestState.Opened;
	static HEADERS_RECEIVED: XMLHttpRequestState.HeadersReceived;
	static LOADING: XMLHttpRequestState.Loading;
	static DONE: XMLHttpRequestState.Done;

	/**
	The amount of milliseconds a request can take before being terminated. Initially zero. Zero means there is no timeout.
	@property timeout
	@type Number
	@default 0
	*/
	timeout: number;

	/**
	Current state, can take following values:
	UNSENT (numeric value 0)
	The object has been constructed.
	OPENED (numeric value 1)
	The open() method has been successfully invoked. During this state request headers can be set using setRequestHeader() and the request can be made using the send() method.
	HEADERS_RECEIVED (numeric value 2)
	All redirects (if any) have been followed and all HTTP headers of the final response have been received. Several response members of the object are now available.
	LOADING (numeric value 3)
	The response entity body is being received.
	DONE (numeric value 4)
	@property readyState
	@type Number
	@default 0 (UNSENT)
	*/
	readyState: XMLHttpRequestState;

	/**
	True when user credentials are to be included in a cross-origin request. False when they are to be excluded
	in a cross-origin request and when cookies are to be ignored in its response. Initially false.
	@property withCredentials
	@type Boolean
	@default false
	*/
	withCredentials: boolean;

	/**
	Returns the HTTP status code.
	@property status
	@type Number
	@default 0
	*/
	status: number;

	/**
	Returns the HTTP status text.
	@property statusText
	@type String
	*/
	statusText: string;

	/**
	Returns the response type. Can be set to change the response type. Values are:
	the empty string (default), "arraybuffer", "blob", "document", "json", and "text".
	@property responseType
	@type String
	*/
	responseType: 'arraybuffer'|'blob'|'document'|'json'|'text'|'';

	/**
	Returns the document response entity body.
	Throws an "InvalidStateError" exception if responseType is not the empty string or "document".
	@property responseXML
	@type Document
	*/
	responseXML: null|Document;

	/**
	Returns the text response entity body.
	Throws an "InvalidStateError" exception if responseType is not the empty string or "text".
	@property responseText
	@type String
	*/
	responseText: string|null;

	/**
	Returns the response entity body (http://www.w3.org/TR/XMLHttpRequest/#response-entity-body).
	Can become: ArrayBuffer, Blob, Document, JSON, Text
	@property response
	@type Mixed
	*/
	response: ArrayBuffer|file.Blob|Document|object|string;

	/**
	Unique id of the component
	@property uid
	@type String
	*/
	uid: string;

	/**
	Target for Upload events
	@property upload
	@type XMLHttpRequestUpload
	*/
	upload: XMLHttpRequestUpload;


	/**
	Sets the request method, request URL, synchronous flag, request username, and request password.
	Throws a "SyntaxError" exception if one of the following is true:
	method is not a valid HTTP method.
	url cannot be resolved.
	url contains the "user:password" format in the userinfo production.
	Throws a "SecurityError" exception if method is a case-insensitive match for CONNECT, TRACE or TRACK.
	Throws an "InvalidAccessError" exception if one of the following is true:
	Either user or password is passed as argument and the origin of url does not match the XMLHttpRequest origin.
	There is an associated XMLHttpRequest document and either the timeout attribute is not zero,
	the withCredentials attribute is true, or the responseType attribute is not the empty string.
	@method open
	@param {String} method HTTP method to use on request
	@param {String} url URL to request
	@param {Boolean} [async=true] If false request will be done in synchronous manner. Asynchronous by default.
	@param {String} [user] Username to use in HTTP authentication process on server-side
	@param {String} [password] Password to use in HTTP authentication process on server-side
	*/
	open(method: 'GET'|'HEAD'|'POST'|'PUT'|'DELETE'|'CONNECT'|'OPTIONS'|'TRACE'|'PATCH', url: string, async?: boolean, user?: string, password?: string): void;

	/**
	Appends an header to the list of author request headers, or if header is already
	in the list of author request headers, combines its value with value.
	Throws an "InvalidStateError" exception if the state is not OPENED or if the send() flag is set.
	Throws a "SyntaxError" exception if header is not a valid HTTP header field name or if value
	is not a valid HTTP header field value.
	@method setRequestHeader
	@param {String} header
	@param {String|Number} value
	*/
	setRequestHeader(header: string, value: string|number): void;

	/**
	 * Test if the specified header is already set on this request.
	 * Returns a header value or boolean false if it's not yet set.
	 *
	 * @method hasRequestHeader
	 * @param {String} header Name of the header to test
	 * @return {Boolean|String}
	 */
	hasRequestHeader(header: string): false|string;

	/**
	Returns all headers from the response, with the exception of those whose field name is Set-Cookie or Set-Cookie2.
	@method getAllResponseHeaders
	@return {String} reponse headers or empty string
	*/
	getAllResponseHeaders(): string;

	/**
	Returns the header field value from the response of which the field name matches header,
	unless the field name is Set-Cookie or Set-Cookie2.
	@method getResponseHeader
	@param {String} header
	@return {String} value(s) for the specified header or null
	*/
	getResponseHeader(header: string): string|null;

	/**
	Sets the Content-Type header for the response to mime.
	Throws an "InvalidStateError" exception if the state is LOADING or DONE.
	Throws a "SyntaxError" exception if mime is not a valid media type.
	@method overrideMimeType
	@param String mime Mime type to set
	*/
	overrideMimeType(mime: string): void;

	/**
	Initiates the request. The optional argument provides the request entity body.
	The argument is ignored if request method is GET or HEAD.
	Throws an "InvalidStateError" exception if the state is not OPENED or if the send() flag is set.
	@method send
	@param {Blob|Document|String|FormData} [data] Request entity body
	@param {Object} [options] Set of requirements and pre-requisities for runtime initialization
	*/
	send(data: file.Blob|Document|string|FormData): void;

	/**
	Cancels any network activity.
	@method abort
	*/
	abort(): void;

	destroy(): void;
}
namespace XMLHttpRequest {
	type Dispatches = {
		loadstart: (event: { type: 'loadstart' }) => boolean|void;
		progress: (event: { type: 'progress' }) => boolean|void;
		abort: (event: { type: 'abort' }) => boolean|void;
		error: (event: { type: 'error' }) => boolean|void;
		load: (event: { type: 'load' }) => boolean|void;
		timeout: (event: { type: 'timeout' }) => boolean|void;
		loadend: (event: { type: 'loadend' }) => boolean|void;
		readystatechange: (event: { type: 'readystatechange' }) => boolean|void;
	}
}
}}
