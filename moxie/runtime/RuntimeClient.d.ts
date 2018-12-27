declare namespace moxie { namespace runtime {

interface RuntimeClientConstructor {
	prototype: RuntimeClient;

	/**
	Set of methods and properties, required by a component to acquire ability to connect to a runtime
	@class moxie/runtime/RuntimeClient
	*/
	new(): RuntimeClient;
}
interface RuntimeClient {
	/**
	Connects to the runtime specified by the options. Will either connect to existing runtime or create a new one.
	Increments number of clients connected to the specified runtime.
	@private
	@method connectRuntime
	@param {Mixed} options Can be a runtme uid or a set of key-value pairs defining requirements and pre-requisites
	*/
	connectRuntime(options: Runtime.Options|string): void;

	/**
	Disconnects from the runtime. Decrements number of clients connected to the specified runtime.
	@private
	@method disconnectRuntime
	*/
	disconnectRuntime(): void;

	/**
	Returns the runtime to which the client is currently connected.
	@method getRuntime
	@return {Runtime} Runtime or null if client is not connected
	*/
	getRuntime(): Runtime|null;

	/**
	Handy shortcut to safely invoke runtime extension methods.
	@private
	@method exec
	@return {Mixed} Whatever runtime extension method returns
	*/
	exec(component: string, action: string, ...args: any): unknown;

	/**
	Test runtime client for specific capability
	@method can
	@param {String} cap
	@return {Bool}
	*/
	can(cap: string): boolean;
}
const RuntimeClient: RuntimeClientConstructor;
}}
