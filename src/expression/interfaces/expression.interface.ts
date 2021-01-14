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
}
