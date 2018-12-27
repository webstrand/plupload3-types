declare namespace moxie { namespace core { namespace utils {
interface Url {
	/**
	Parse url into separate components and fill in absent parts with parts from current url,
	based on https://raw.github.com/kvz/phpjs/master/functions/url/parse_url.js
	@method parseUrl
	@static
	@param {String} url Url to parse (defaults to empty string if undefined)
	@return {Object} Hash containing extracted uri components
	*/
	parseUrl(url: string, currentUrl?: string|false): Url.Parsed;

	/**
	Resolve url - among other things will turn relative url to absolute
	@method resolveUrl
	@static
	@param {String|Object} url Either absolute or relative, or a result of parseUrl call
	@return {String} Resolved, absolute url
	*/
	resolveUrl(url: string|Url.Resolvable): string;

	/**
	Check if specified url has the same origin as the current document
	@method hasSameOrigin
	@static
	@param {String|Object} url
	@return {Boolean}
	*/
	hasSameOrigin(url: string|Url.Parsed): boolean;
}
const Url: Url;

namespace Url {
	interface Parsed {
		source?: string
		scheme?: string
		authority?: string
		userInfo?: string
		user?: string
		pass?: string
		host?: string
		port?: string|number
		relative?: string
		path?: string
		directory?: string
		file?: string
		query?: string
		fragment?: string
	}

	interface Resolvable extends Parsed {
		scheme: string;
		host: string;
		port?: string|number;
		path: string;
		query?: string;
	}
}
}}}
