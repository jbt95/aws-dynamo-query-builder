import DuplicatedExpressionName from './error.duplicated-expression-name.class';

export default abstract class AbstractExpression {
	protected _expressions: Record<string, any> = {};

	protected guardNameExists(name: string) {
		if (Object.keys(this._expressions).some((k) => k === name)) {
			throw new DuplicatedExpressionName(name);
		}
	}

	public get value() {
		return Object.freeze(this._expressions);
	}

	public abstract push<T = unknown>(key: string, value: T): string;
}
