declare namespace moxie { namespace core {
interface I18n {
	/**
	 * Extends the language pack object with new items.
	 *
	 * @param {Object} pack Language pack items to add.
	 * @return {Object} Extended language pack object.
	 */
	addI18n(pack: { [key: string]: string }): void;

	/**
	 * Translates the specified string by checking for the english string in the language pack lookup.
	 *
	 * @param {String} str String to look for.
	 * @return {String} Translated string or the input string if it wasn't found.
	 */
	translate(str: string): string;

	/**
	 * Shortcut for translate function
	 *
	 * @param {String} str String to look for.
	 * @return {String} Translated string or the input string if it wasn't found.
	 */
	_(str: string): string;

	/**
	 * Pseudo sprintf implementation - simple way to replace tokens with specified values.
	 *
	 * @param {String} str String with tokens
	 * @return {String} String with replaced tokens
	 */
	sprintf(str: string, ...args: any): string;
}
const I18n: I18n;
}}
