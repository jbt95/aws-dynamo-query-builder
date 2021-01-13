import DuplicatedExpressionName from './error.duplicated-expression-name.class';
import { Operator } from '../operators.enum';
import { Comparator, Condition } from './expressions.interface';

type Schema = Record<string, unknown>;
type Keys<T extends Schema> = keyof T;

export default class Expression<T extends Schema> implements Comparator<T>, Condition<T> {
	private _expressionAttributeNames: Record<string, any> = {};
	private _expressionAttributeValues: Record<string, any> = {};
	private _expression = '';

	private buildExpression(key: string, operator: Operator, value: unknown) {
		const en = this.addExpressionName(key);
		const ev = this.addExpressionValue(key, value);

		return `${en}${operator}${ev}`;
	}

	public get conditionExpression() {
		return this._expression;
	}

	public get attributeValues() {
		return this._expressionAttributeValues;
	}

	public get attributeNames() {
		return this._expressionAttributeNames;
	}

	public and() {
		this._expression = this._expression.concat(' AND ');

		return (this as unknown) as Comparator<T>;
	}

	public or() {
		this._expression = this._expression.concat(' OR ');

		return (this as unknown) as Comparator<T>;
	}

	public not() {
		this._expression = this._expression.concat(' NOT ');

		return (this as unknown) as Comparator<T>;
	}

	public equal(key: Keys<T>, value: unknown) {
		this._expression = this._expression.concat(
			this.buildExpression(key as string, Operator.Equal, value),
		);

		return (this as unknown) as Condition<T>;
	}

	public notEqual(key: Keys<T>, value: unknown) {
		this._expression = this._expression.concat(
			this.buildExpression(key as string, Operator.NotEqual, value),
		);

		return (this as unknown) as Condition<T>;
	}

	public lessThan(key: Keys<T>, value: unknown) {
		this._expression = this._expression.concat(
			this.buildExpression(key as string, Operator.LessThan, value),
		);

		return (this as unknown) as Condition<T>;
	}

	public lessThanOrEqual(key: Keys<T>, value: unknown) {
		this._expression = this._expression.concat(
			this.buildExpression(key as string, Operator.LessThanOrEqual, value),
		);

		return (this as unknown) as Condition<T>;
	}

	public greaterThan(key: Keys<T>, value: unknown) {
		this._expression = this._expression.concat(
			this.buildExpression(key as string, Operator.GreaterThan, value),
		);

		return (this as unknown) as Condition<T>;
	}

	public greaterThanOrEqual(key: Keys<T>, value: unknown) {
		this._expression = this._expression.concat(
			this.buildExpression(key as string, Operator.GreaterThanOrEqual, value),
		);

		return (this as unknown) as Condition<T>;
	}

	private addExpressionValue(key: string, value: unknown): string {
		const expressionValue = `:${key}`;
		Object.assign(this._expressionAttributeValues, { [expressionValue]: value });

		return expressionValue;
	}

	private addExpressionName(key: string): string {
		const expressionName = `#${key}`;
		this.guardNameExists(expressionName);
		Object.assign(this._expressionAttributeNames, { [expressionName]: key });

		return expressionName;
	}

	private guardNameExists(name: string) {
		if (Object.keys(this._expressionAttributeNames).some((k) => k === name)) {
			throw new DuplicatedExpressionName(name);
		}
	}
}
