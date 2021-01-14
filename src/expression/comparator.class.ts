import { Comparator, Condition } from './expressions.interface';
import { Operator } from '../operators.enum';
import DuplicatedExpressionName from './error.duplicated-expression-name.class';
import { Schema } from './schema.type';
import { UpdateExpressionFunctor } from './functor.update-expression.type';

type Keys<T extends Schema> = keyof T;

export default class ComparatorExpression<T extends Schema> implements Comparator<T> {
	private _expressionAttributeNames: Record<string, any> = {};
	private _expressionAttributeValues: Record<string, any> = {};

	constructor(
		private updateExpression: UpdateExpressionFunctor,
		private getConditionRef: () => Condition<T>,
	) {}

	private guardNameExists(name: string) {
		if (Object.keys(this._expressionAttributeNames).some((k) => k === name)) {
			throw new DuplicatedExpressionName(name);
		}
	}

	private buildExpression(key: string, operator: Operator, value: unknown) {
		const en = this.addExpressionName(key);
		const ev = this.addExpressionValue(key, value);

		return `${en}${operator}${ev}`;
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

	public equal(key: Keys<T>, value: unknown) {
		this.updateExpression((ex) =>
			ex.concat(this.buildExpression(key as string, Operator.Equal, value)),
		);

		return this.getConditionRef();
	}

	public notEqual(key: Keys<T>, value: unknown) {
		this.updateExpression((ex) =>
			ex.concat(this.buildExpression(key as string, Operator.NotEqual, value)),
		);

		return this.getConditionRef();
	}

	public lessThan(key: Keys<T>, value: unknown) {
		this.updateExpression((ex) =>
			ex.concat(this.buildExpression(key as string, Operator.LessThan, value)),
		);

		return this.getConditionRef();
	}

	public lessThanOrEqual(key: Keys<T>, value: unknown) {
		this.updateExpression((ex) =>
			ex.concat(this.buildExpression(key as string, Operator.LessThanOrEqual, value)),
		);

		return this.getConditionRef();
	}

	public greaterThan(key: Keys<T>, value: unknown) {
		this.updateExpression((ex) =>
			ex.concat(this.buildExpression(key as string, Operator.GreaterThan, value)),
		);

		return this.getConditionRef();
	}

	public greaterThanOrEqual(key: Keys<T>, value: unknown) {
		this.updateExpression((ex) =>
			ex.concat(this.buildExpression(key as string, Operator.GreaterThanOrEqual, value)),
		);

		return this.getConditionRef();
	}
}
