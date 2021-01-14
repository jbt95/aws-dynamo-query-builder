/* eslint-disable no-console */
import { createExpression } from '../expression/expression';
import { Comparator } from '../expression/expressions.interface';
import { Schema } from '../expression/schema.type';
import { ExpressionBuilderPredicate } from '../expression/expression-builder-predicate.type';

interface ScanBuilder<T> {
	filterExpression: (predicate: ExpressionBuilderPredicate<T>) => ScanBuilder<T>;
}

export const scanBuilder = <T extends Schema = Schema>(
	filterExpression = createExpression<T>(),
): ScanBuilder<T> => {
	const _filterExpression = filterExpression;

	return {
		filterExpression: (predicate: (expression: Comparator<T>) => void) => {
			predicate(_filterExpression.comparator);

			return scanBuilder(filterExpression);
		},
	};
};

scanBuilder().filterExpression((expression) =>
	expression.equal('test', 20).and().equal('test2', 20),
);
