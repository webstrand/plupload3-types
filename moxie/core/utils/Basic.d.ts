declare namespace moxie { namespace core { namespace utils {
interface Basic {
	/**
	Generates an unique ID. The only way a user would be able to get the same ID is if the two persons
	at the same exact millisecond manage to get the same 5 random numbers between 0-65535; it also uses
	a counter so each ID is guaranteed to be unique for the given page. It is more probable for the earth
	to be hit with an asteroid.
	@method guid
	@static
	@param {String} prefix to prepend (by default 'o' will be prepended).
	@method guid
	@return {String} Virtually unique id.
	*/
	guid(prefix: string): string;

	/**
	Gets the true type of the built-in object (better version of typeof).
	@author Angus Croll (http://javascriptweblog.wordpress.com/)
	@method typeOf
	@static
	@param {Object} o Object to check.
	@return {String} Object [[Class]]
	*/
	typeOf(o: any): string;

	/**
	Extends the specified object with another object(s).
	@method extend
	@static
	@param {Object} target Object to extend.
	@param {Object} [obj]* Multiple objects to extend with.
	@return {Object} Same as target, the extended object.
	*/
	extend<T, A>(target: T, a: A): T & A;
	extend<T, A, B>(target: T, a: A, b: B): T & A & B;
	extend<T, A, B, C>(target: T, a: A, b: B, c: C): T & A & B & C;
	extend(target: any, ...args: any[]): unknown;

	/**
	Extends the specified object with another object(s), but only if the property exists in the target.
	@method extendIf
	@static
	@param {Object} target Object to extend.
	@param {Object} [obj]* Multiple objects to extend with.
	@return {Object} Same as target, the extended object.
	*/
	extendIf(target: object, ...obj: object[]): object;

	extendImmutable(target: object, ...obj: object[]): object;

	extendImmutableIf(target: object, ...obj: object[]): object;

	clone<T>(value: T): T;

	/**
	A way to inherit one `class` from another in a consisstent way (more or less)
	@method inherit
	@static
	@since >1.4.1
	@param {Function} child
	@param {Function} parent
	@return {Function} Prepared constructor
	*/
	inherit(child: Function, parent: Function): Function;

	/**
	Executes the callback function for each item in array/object. If you return false in the
	callback it will break the loop.
	@method each
	@static
	@param {Object} obj Object to iterate.
	@param {function} callback Callback function to execute for each item.
	*/
	each<V>(obj: { [key: string]: V }, callback: (value: V, key: string) => boolean|void): void;
	each<V>(obj: { [key: number]: V }, callback: (value: V, key: number) => boolean|void): void;
	each<V>(obj: V[], callback: (value: V, index: number) => boolean|void): void;

	/**
	Checks if object is empty.
	@method isEmptyObj
	@static
	@param {Object} o Object to check.
	@return {Boolean}
	*/
	isEmptyObj(o: any): boolean;

	/**
	Recieve an array of functions (usually async) to call in sequence, each  function
	receives a callback as first argument that it should call, when it completes. Finally,
	after everything is complete, main callback is called. Passing truthy value to the
	callback as a first argument will interrupt the sequence and invoke main callback
	immediately.
	@method inSeries
	@static
	@param {Array} queue Array of functions to call in sequence
	@param {Function} cb Main callback that is called in the end, or in case of error
	*/
	inSeries(queue: Array<(cb: () => void) => void>, cb: () => void): void;

	/**
	Recieve an array of functions (usually async) to call in parallel, each  function
	receives a callback as first argument that it should call, when it completes. After
	everything is complete, main callback is called. Passing truthy value to the
	callback as a first argument will interrupt the process and invoke main callback
	immediately.
	@method inParallel
	@static
	@param {Array} queue Array of functions to call in sequence
	@param {Function} cb Main callback that is called in the end, or in case of erro
	*/
	inParallel(queue: Array<(cb: () => void) => void>, cb: () => void): void;

	/**
	Find an element in array and return it's index if present, otherwise return -1.
	@method inArray
	@static
	@param {Mixed} needle Element to find
	@param {Array} array
	@return {Int} Index of the element, or -1 if not found
	*/
	inArray<T>(needle: T, array: T[]): number;

	/**
	Returns elements of first array if they are not present in second. And false - otherwise.
	@private
	@method arrayDiff
	@param {Array} needles
	@param {Array} array
	@return {Array|Boolean}
	*/
	arrayDiff<T,U>(needles: T[], array: U[]): Array<T|U>|false;

	/**
	Find intersection of two arrays.
	@private
	@method arrayIntersect
	@param {Array} array1
	@param {Array} array2
	@return {Array} Intersection of two arrays or null if there is none
	*/
	arrayIntersect<T,U>(array1: T[], array2: U[]): Array<T|U>|false;

	/**
	Forces anything into an array.
	@method toArray
	@static
	@param {Object} obj Object with length field.
	@return {Array} Array object containing all items.
	*/
	toArray<T>(obj: { length: number, [key: number]: T }): T[];

	/**
	Trims white spaces around the string
	@method trim
	@static
	@param {String} str
	@return {String}
	*/
	trim(str: string): string;

	/**
	 * Pseudo sprintf implementation - simple way to replace tokens with specified values.
	 *
	 * @param {String} str String with tokens
	 * @return {String} String with replaced tokens
	 */
	sprintf(str: string, ...args: any): string;

	/**
	Parses the specified size string into a byte value. For example 10kb becomes 10240.
	@method parseSizeStr
	@static
	@param {String/Number} size String to parse or number to just pass through.
	@return {Number} Size in bytes.
	*/
	parseSizeStr(size: string|number): number;


	delay<T>(this: T, cb: (this: T) => void): void;
}

export var Basic: Basic;
}}}
