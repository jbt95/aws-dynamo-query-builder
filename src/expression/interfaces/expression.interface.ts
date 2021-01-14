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
	attributeExits(path: string): Condition<T>;
	attributeNotExits(path: string): Condition<T>;
	attributeType(path: string, type: string): Condition<T>;
	beginsWith(path: string, subStr: string): Condition<T>;
	contains(path: string, operand: string): Condition<T>;
	size(path: string): Condition<T>;
}
