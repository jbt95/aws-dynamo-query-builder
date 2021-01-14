/* eslint-disable no-console */
import Expression from '../expression/expression.class';
import { Comparator } from '../expression/expressions.interface';
import { Schema } from '../expression/schema.type';

export default class ScanBuilder<T extends Schema = Schema> {
	private expression = new Expression<T>();

	public filterExpression(predicate: (expression: Comparator<T>) => void) {
		predicate(this.expression.comparator);

		return this;
	}
}

new ScanBuilder().filterExpression((expression) =>
	expression.equal('test', 20).and().equal('test2', 20),
);
