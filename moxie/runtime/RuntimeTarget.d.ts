declare namespace moxie { namespace runtime {
interface RuntimeTargetConstructor {
	prototype: RuntimeTarget;

	/**
	Instance of this class can be used as a target for the events dispatched by shims,
	when allowing them onto components is for either reason inappropriate
	@class moxie/runtime/RuntimeTarget
	@constructor
	@protected
	@extends EventTarget
	*/
	new(): RuntimeTarget;
}
interface RuntimeTarget extends EventTarget, RuntimeClient {
	uid: string;
	destroy(): void;
}
const RuntimeTarget: RuntimeTargetConstructor;
}}
