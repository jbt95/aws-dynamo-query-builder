/* eslint-disable no-console */
import Expression from '../expression/expression.class';
import { Comparator } from '../expression/expressions.interface';
import { Schema } from '../expression/schema.type';

export default class QueryBuilder<T extends Schema = Schema> {
	private _filterExpression = new Expression<T>();
	private _keyConditionExpression = new Expression<T>();

	public filterExpression(predicate: (expression: Comparator<T>) => void) {
		predicate(this._filterExpression.comparator);
		console.log(this._filterExpression._expression);

		return this;
	}

	public keyConditionExpression(predicate: (expression: Comparator<T>) => void) {
		predicate(this._keyConditionExpression.comparator);
		console.log(this._keyConditionExpression._expression);

		return this;
	}
}

new QueryBuilder()
	.filterExpression((ex) => ex.equal('test', 20).and().equal('manolo', 20))
	.keyConditionExpression((ex) => ex.equal('test2', 10).and().equal('manolo2', 10));
