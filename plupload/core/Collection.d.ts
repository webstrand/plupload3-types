declare namespace plupload { namespace core {
class Collection<T extends {}> {
	count(): number;
	hasKey(key: string): boolean;
	get(key: string): T|undefined;
	first(): T|undefined;
	last(): T|undefined;
	toObject(): { [key: string]: T };
	add(key: string, obj: T): number;
	remove(key: string): void;
	extract(key: string): T|undefined;
	shift(): T|undefined;
	update(key: string, obj: T): void;
	each(callback: (value: T, key: string) => boolean): void;
	combineWith<U>(...args: { [key: string]: U }[]): Collection<T|U>;
	clear(): void;
}
}}
