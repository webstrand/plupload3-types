declare namespace plupload { namespace core {
interface OptionableConstructor {
	prototype: Optionable;
	new<Options={}, Dispatches extends moxie.core.EventTarget.Dispatchable=Optionable.Dispatches.Top<Options>>(): Optionable<Options,Dispatches>;
}
interface Optionable<Options={}, Dispatches extends moxie.core.EventTarget.Dispatchable=Optionable.Dispatches.Top<Options>> extends moxie.core.EventTarget<Dispatches> {
	_options: Options;

	/**
	Set the value for the specified option(s).

	@method setOption
	@since 2.1
	@param {String|Object} option Name of the option to change or the set of key/value pairs
	@param {Mixed} [value] Value for the option (is ignored, if first argument is object)
	@param {Boolean} [mustBeDefined] if truthy, any option that is not in defaults will be ignored
	*/
	setOption<K extends string|number>(option: K, value: K extends keyof Options ? Options[K] : unknown, mustBeDefined?: boolean): void;
	setOption(option: Optionable.Configuration<Options>, mustBeDefined?: boolean): void;

	/**
	Get the value for the specified option or the whole configuration, if not specified.

	@method getOption
	@since 2.1
	@param {String} [option] Name of the option to get
	@return {Mixed} Value for the option or the whole set
	*/
	getOption<K extends string|number>(option: K): (K extends keyof Options ? Options[K] : unknown)|undefined;
	getOption(): Optionable.Configuration<Options>;

	/**
	Set many options as once.

	@method setOptions
	@param {Object} options
	@param {Boolean} [mustBeDefined] if truthy, any option that is not in defaults will be ignored
	*/
	setOptions(options: Optionable.Configuration<Options>, mustBeDefined?: boolean): void;

	/**
	Gets all options.
	@method getOptions
	@return {Object}
	*/
	getOptions(): Optionable.Configuration<Options>;
}
const Optionable: OptionableConstructor;
namespace Optionable {
	type Options = {};
	type Dispatches<T> = moxie.core.EventTarget.Dispatches<T>;
	namespace Dispatches {
		type Top<Options> = Dispatches<Optionable<Options,Dispatches<Optionable<Options,any>>>>;
	}

	type Configuration<T> = Partial<T> & { [key: string]: any, [key: number]: any };
}

}}
