declare namespace moxie { namespace core { namespace utils {
interface Encode {
	/**
	Encode string with UTF-8
	@method utf8_encode
	@static
	@param {String} str String to encode
	@return {String} UTF-8 encoded string
	*/
	utf8_encode(str: string): string;

	/**
	Decode UTF-8 encoded string
	@method utf8_decode
	@static
	@param {String} str String to decode
	@return {String} Decoded string
	*/
	utf8_decode(str: string): string;

	/**
	Decode Base64 encoded string (uses browser's default method if available),
	from: https://raw.github.com/kvz/phpjs/master/functions/url/base64_decode.js
	@method atob
	@static
	@param {String} data String to decode
	@return {String} Decoded string
	*/
	atob(data: string): string;

	/**
	Base64 encode string (uses browser's default method if available),
	from: https://raw.github.com/kvz/phpjs/master/functions/url/base64_encode.js
	@method btoa
	@static
	@param {String} data String to encode
	@return {String} Base64 encoded string
	*/
	btoa(data: string): string;
}

export var Encode: Encode;
}}}
