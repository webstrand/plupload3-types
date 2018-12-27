declare namespace moxie { namespace core { namespace utils {
interface Env {
	uaParser: Env.UAParser,

	browser: string;
	version: string;
	os: string;
	osVersion: string;

	/**
	for backward compatibility
	@deprecated Use `Env.os` instead
	 */
	OS: string;

	swf_url: string;
	xap_url: string;
	global_event_dispatcher: string;

	can(cap: "access_global_ns"): boolean;
	can(cap: "define_property"): false;
	can(cap: "create_canvas"): boolean;
	can(cap: "return_response_type", responseType: string): boolean;
	can(cap: "use_blob_uri"): boolean;
	can(cap: "use_data_uri"): boolean;
	can(cap: "use_data_uri_over32kb"): boolean;
	can(cap: "use_data_uri_of", bytes: number): boolean;
	can(cap: "use_fileinput"): boolean;
	can(cap: "use_webgl"): boolean;
	can(cap: string, ...args: any): boolean;

	verComp(v1: string, v2: string, operator: string): boolean;
}

export var Env: Env;

namespace Env {
	/**
	 * UAParser.js v0.7.7
	 * Lightweight JavaScript-based User-Agent string parser
	 * https://github.com/faisalman/ua-parser-js
	 *
	 * Copyright © 2012-2015 Faisal Salman <fyzlman@gmail.com>
	 * Dual licensed under GPLv2 & MIT
	 */
	interface UAParser {
		constructor(uastring: string): UAParser;

		getBrowser(): UAParser.Browser;
		getEngine(): UAParser.Engine;
		getOS(): UAParser.OS;
		getResult(): UAParser.Result;
		getUA(): string;
		setUA(uastring: string): UAParser;
	}

	namespace UAParser {
		interface Browser {
			name: string;
			version: string;
		}

		interface Engine {
			name: string;
			version: string;
		}

		interface OS {
			name: string;
			version: string;
		}

		interface Result {
			ua: string;
			browser: Browser;
			engine: Engine;
			os: OS;
		}
	}
}
}}}
