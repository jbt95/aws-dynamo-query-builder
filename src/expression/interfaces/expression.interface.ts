/* eslint-disable @typescript-eslint/ban-types */
export type BooleanMap<T> = {
	[K in keyof T]: T[K] extends (infer U)[]
		? U extends object
			? BooleanMap<U>
			: boolean
		: T[K] extends object
		? BooleanMap<T[K]>
		: boolean;
};

export interface Operand {
	alias: string;
	value: unknown;
}

export interface Condition<T> {
	and(): Comparator<T>;
	or(): Comparator<T>;
	not(): Comparator<T>;
}

export interface Comparator<T extends Record<string, any>> {
	equal(key: keyof T, value: unknown): Condition<T>;
	notEqual(key: keyof T, value: unknown): Condition<T>;
	lessThan(key: keyof T, value: unknown): Condition<T>;
	lessThanOrEqual(key: keyof T, value: unknown): Condition<T>;
	greaterThan(key: keyof T, value: unknown): Condition<T>;
	greaterThanOrEqual(key: keyof T, value: unknown): Condition<T>;
	attributeExits(path: Partial<BooleanMap<T>>): Condition<T>;
	attributeNotExits(path: Partial<BooleanMap<T>>): Condition<T>;
	attributeType(path: Partial<BooleanMap<T>>, type: string): Condition<T>;
	beginsWith(path: Partial<BooleanMap<T>>, subStr: string): Condition<T>;
	contains(path: Partial<BooleanMap<T>>, operand: Operand): Condition<T>;
	size(path: Partial<BooleanMap<T>>): Condition<T>;
}
