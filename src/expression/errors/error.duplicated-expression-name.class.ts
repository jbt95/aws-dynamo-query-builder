export default class DuplicatedExpressionName extends Error {
	constructor(name: string) {
		super('DuplicatedExpressionName');
		this.message = `${name} already exists`;
	}
}
