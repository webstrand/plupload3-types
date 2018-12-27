declare namespace plupload { namespace core {
class ArrCollection<T extends UidObject> {
	count(): number;
	hasKey(key: string): boolean;
	get(key: string): T|null;
	getIdx(key: string): number|-1;
	getByIdx(idx: number): T|undefined;
	first(): T|undefined;
	last(): T|undefined;
	add(obj: T): number;
	add(_: unknown, obj: T): number;
	remove(key: string): boolean;
	splice(start?: number, length?: number): T[];
	extract(key: string): T|null;
	shift(): T|undefined;
	update(key: string, obj: T): boolean;
	each(callback: (value: T, index: number) => boolean): void;
	combineWith<U>(...args: U[][]): (T|U)[];
	sort(cb?: (a: T, b: T) => number): void;
	clear(): void;
	toObject(): { [key: string]: T };
	toArray(): T[];
}

interface UidObject {
	uid: string
}
}}
