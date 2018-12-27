declare namespace moxie { namespace core { namespace utils {
interface Dom {
	/**
	Get DOM Element by it's id.
	@method get
	@param {String} id Identifier of the DOM Element
	@return {DOMElement}
	*/
	get(id: string): Element;

	/**
	Checks if specified DOM element has specified class.
	@method hasClass
	@static
	@param {Object} obj DOM element like object to add handler to.
	@param {String} name Class name
	*/
	hasClass(obj: { className?: string }, name: string): boolean;

	/**
	Adds specified className to specified DOM element.
	@method addClass
	@static
	@param {Object} obj DOM element like object to add handler to.
	@param {String} name Class name
	*/
	addClass(obj: { className?: string }, name: string): void;

	/**
	Removes specified className from specified DOM element.
	@method removeClass
	@static
	@param {Object} obj DOM element like object to add handler to.
	@param {String} name Class name
	*/
	removeClass(obj: { className?: string }, name: string): boolean;

	/**
	Returns a given computed style of a DOM element.
	@method getStyle
	@static
	@param {Object} obj DOM element like object.
	@param {String} name Style you want to get from the DOM element
	*/
	getStyle(obj: Element, name: string): string|null;

	/**
	Returns the absolute x, y position of an Element. The position will be returned in a object with x, y fields.
	@method getPos
	@static
	@param {Element} node HTML element or element id to get x, y position from.
	@param {Element} root Optional root element to stop calculations at.
	@return {object} Absolute position of the specified element object with x, y fields.
	*/
	getPos(node: Element, root?: Element): { x: number, y: number }

	/**
	Returns the size of the specified node in pixels.
	@method getSize
	@static
	@param {Node} node Node to get the size of.
	@return {Object} Object with a w and h property.
	*/
	getSize(node: Element): { w: number, h: number };
}

export var Dom: Dom;
}}}
