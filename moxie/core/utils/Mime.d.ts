declare namespace moxie { namespace core { namespace utils {
interface Mime {
	/**
	 * Map of mimes to extensions
	 *
	 * @property mimes
	 * @type {Object}
	 */
	mimes: { [key: string]: string };

	/**
	 * Map of extensions to mimes
	 *
	 * @property extensions
	 * @type {Object}
	 */
	extensions: { [key: string]: string };


	/**
	* Parses mimeData string into a mimes and extensions lookup maps. String should have the
	* following format:
	*
	* application/msword,doc dot,application/pdf,pdf, ...
	*
	* so mime-type followed by comma and followed by space-separated list of associated extensions,
	* then comma again and then another mime-type, etc.
	*
	* If invoked externally will replace override internal lookup maps with user-provided data.
	*
	* @method addMimeType
	* @param {String} mimeData
	*/
	addMimeType(mimeData: string): void;

	extList2mimes(filters: { extensions: string }[], addMissingExtensions: boolean): string[];

	mimes2exts(mimes: string[]): string[];
	mimes2extList(mimes: string|string[]): MimeType[];

	/**
	 * Extract extension from the given filename
	 *
	 * @method getFileExtension
	 * @param {String} fileName
	 * @return {String} File extension
	 */
	getFileExtension(fileName: string): string;

	/**
	 * Get file mime-type from it's filename - will try to match the extension
	 * against internal mime-type lookup map
	 *
	 * @method getFileMime
	 * @param {String} fileName
	 * @return File mime-type if found or an empty string if not
	 */
	getFileMime(fileName: string): string;
}
const Mime: Mime;
namespace Mime {
	type MimeType = { title: string; extensions: string };
}
}}}
