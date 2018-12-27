declare namespace moxie { namespace core {
namespace Exception {
	class RuntimeError extends Error {
		code: RuntimeError.Code;
		name: string;
		message: string;
		constructor(code: number, message: string);
	}

	namespace RuntimeError {
		const NOT_INIT_ERR: Code.NotInitErr;
		const EXCEPTION_ERR: Code.ExceptionErr;
		const NOT_SUPPORTED_ERR: Code.NotSupportedErr;
		const JS_ERR: Code.JsErr;

		enum Code {
			NotInitErr = 1,
			ExceptionErr = 3,
			NotSupportedErr = 9,
			JsErr = 4
		}
	}

	class OperationNotAllowedException extends Error {
		code: OperationNotAllowedException.Code;
		name: string;
		message: string;
		constructor(code: number);
	}

	namespace OperationNotAllowedException {
		const NOT_ALLOWED_ERR: Code.NotAllowedErr;

		enum Code {
			NotAllowedErr = 1
		}
	}

	class ImageError extends Error {
		code: ImageError.Code;
		name: string;
		message: string;
		constructor(code: number);
	}

	namespace ImageError {
		const WRONG_FORMAT: Code.WrongFormat;
		const MAX_RESOLUTION_ERR: Code.MaxResolutionErr;
		const INVALID_META_ERR: Code.InvalidMetaErr;

		enum Code {
			WrongFormat = 1,
			MaxResolutionErr = 2,
			InvalidMetaErr = 3
		}
	}

	class FileException extends Error {
		code: FileException.Code;
		name: string;
		message: string;
		constructor(code: number);
	}

	namespace FileException {
		const NOT_FOUND_ERR: Code.NotFoundErr;
		const SECURITY_ERR: Code.SecurityErr;
		const ABORT_ERR: Code.AbortErr;
		const NOT_READABLE_ERR: Code.NotReadableErr;
		const ENCODING_ERR: Code.EncodingErr;
		const NO_MODIFICATION_ALLOWED_ERR: Code.NoModificationAllowedErr;
		const INVALID_STATE_ERR: Code.InvalidStateErr;
		const SYNTAX_ERR: Code.SyntaxErr;

		enum Code {
				NotFoundErr = 1,
				SecurityErr = 2,
				AbortErr = 3,
				NotReadableErr = 4,
				EncodingErr = 5,
				NoModificationAllowedErr = 6,
				InvalidStateErr = 7,
				SyntaxErr = 8
		}
	}

	class DOMException extends Error {
		code: DOMException.Code;
		name: string;
		message: string;
		constructor(code: number);
	}

	namespace DOMException {
		const INDEX_SIZE_ERR: Code.IndexSizeErr;
		const DOMSTRING_SIZE_ERR: Code.DomstringSizeErr;
		const HIERARCHY_REQUEST_ERR: Code.HierarchyRequestErr;
		const WRONG_DOCUMENT_ERR: Code.WrongDocumentErr;
		const INVALID_CHARACTER_ERR: Code.InvalidCharacterErr;
		const NO_DATA_ALLOWED_ERR: Code.NoDataAllowedErr;
		const NO_MODIFICATION_ALLOWED_ERR: Code.NoModificationAllowedErr;
		const NOT_FOUND_ERR: Code.NotFoundErr;
		const NOT_SUPPORTED_ERR: Code.NotSupportedErr;
		const INUSE_ATTRIBUTE_ERR: Code.InuseAttributeErr;
		const INVALID_STATE_ERR: Code.InvalidStateErr;
		const SYNTAX_ERR: Code.SyntaxErr;
		const INVALID_MODIFICATION_ERR: Code.InvalidModificationErr;
		const NAMESPACE_ERR: Code.NamespaceErr;
		const INVALID_ACCESS_ERR: Code.InvalidAccessErr;
		const VALIDATION_ERR: Code.ValidationErr;
		const TYPE_MISMATCH_ERR: Code.TypeMismatchErr;
		const SECURITY_ERR: Code.SecurityErr;
		const NETWORK_ERR: Code.NetworkErr;
		const ABORT_ERR: Code.AbortErr;
		const URL_MISMATCH_ERR: Code.UrlMismatchErr;
		const QUOTA_EXCEEDED_ERR: Code.QuotaExceededErr;
		const TIMEOUT_ERR: Code.TimeoutErr;
		const INVALID_NODE_TYPE_ERR: Code.InvalidNodeTypeErr;
		const DATA_CLONE_ERR: Code.DataCloneErr;

		enum Code {
			IndexSizeErr = 1,
			DomstringSizeErr = 2,
			HierarchyRequestErr = 3,
			WrongDocumentErr = 4,
			InvalidCharacterErr = 5,
			NoDataAllowedErr = 6,
			NoModificationAllowedErr = 7,
			NotFoundErr = 8,
			NotSupportedErr = 9,
			InuseAttributeErr = 10,
			InvalidStateErr = 11,
			SyntaxErr = 12,
			InvalidModificationErr = 13,
			NamespaceErr = 14,
			InvalidAccessErr = 15,
			ValidationErr = 16,
			TypeMismatchErr = 17,
			SecurityErr = 18,
			NetworkErr = 19,
			AbortErr = 20,
			UrlMismatchErr = 21,
			QuotaExceededErr = 22,
			TimeoutErr = 23,
			InvalidNodeTypeErr = 24,
			DataCloneErr = 25
		}
	}


	class EventException extends Error {
		code: EventException.Code;
		name: string;
		message: string;
		constructor(code: number);
	}

	namespace EventException {
		const UNSPECIFIED_EVENT_TYPE_ERR: Code.UnspecifiedEventTypeErr;

		enum Code {
			UnspecifiedEventTypeErr = 1
		}
	}
}
}}
