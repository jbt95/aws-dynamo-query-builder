export default interface Builder<T> {
	build(): Readonly<T>;
}
