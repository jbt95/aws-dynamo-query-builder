import { Operator } from '../operators.enum';

interface FilterInput<T> {
	operator: Operator;
	value: T;
	expressionAttributeName?: string;
}

export default class FilterExpression {
	private _filterExpression: string;

	public add<T>(input: FilterInput<T>) {
		this._filterExpression.concat(
			`${
				this._filterExpression.length > 0
					? ` AND ${input.expressionAttributeName} ${input.operator} ${input.value}`
					: `${input.expressionAttributeName} ${input.operator} ${input.value}`
			}`,
		);
	}

	public get value(): Readonly<string> {
		return this._filterExpression;
	}
}
