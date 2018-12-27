declare namespace moxie { namespace xhr {
interface FormDataConstructor {
	prototype: FormData;
	new(): FormData;
}
interface FormData {
			/**
			Append another key-value pair to the FormData object
			@method append
			@param {String} name Name for the new field
			@param {String|Blob|Array|Object} value Value for the field
			*/
			append(name: string, value: FormData.Value): void;

			/**
			Checks if FormData contains Blob.
			@method hasBlob
			@return {Boolean}
			*/
			hasBlob(): boolean;

			/**
			Retrieves blob.
			@method getBlob
			@return {Object} Either Blob if found or null
			*/
			getBlob(): file.Blob|null;

			/**
			Retrieves blob field name.
			@method getBlobName
			@return {String} Either Blob field name or null
			*/
			getBlobName(): string|null;

			/**
			Loop over the fields in FormData and invoke the callback for each of them.
			@method each
			@param {Function} cb Callback to call for each field
			*/
			each(cb: (value: FormData.Single, name: string) => void): void;
			destroy(): void;
}
const FormData: FormDataConstructor;
namespace FormData {
	type Single = string|number|null|undefined|file.Blob;
	type Value = Single|{ [key: string]: Single; [key: number]: Single }|Single[];
}
}}
