/* eslint-disable no-console */
import { Schema } from '../expression/schema.type';
import { createExpression } from '../expression/expression';
import { ExpressionBuilderPredicate } from '../expression/expression-builder-predicate.type';

interface QueryBuilder<T> {
	filterExpression: (predicate: ExpressionBuilderPredicate<T>) => QueryBuilder<T>;
	keyConditionExpression: (predicate: ExpressionBuilderPredicate<T>) => QueryBuilder<T>;
}

export const queryBuilder = <T extends Schema = Schema>(
	filterExpression = createExpression<T>(),
	keyConditionExpression = createExpression<T>(),
): QueryBuilder<T> => {
	const _filterExpression = filterExpression;
	const _keyConditionExpression = keyConditionExpression;

	return {
		filterExpression: (predicate: ExpressionBuilderPredicate<T>) => {
			predicate(_filterExpression.comparator);

			return queryBuilder(_filterExpression, _keyConditionExpression);
		},
		keyConditionExpression: (predicate: ExpressionBuilderPredicate<T>) => {
			predicate(_keyConditionExpression.comparator);

			return queryBuilder(_filterExpression, _keyConditionExpression);
		},
	};
};

queryBuilder()
	.filterExpression((ex) => ex.equal('test', 20).and().equal('manolo', 20))
	.keyConditionExpression((ex) => ex.equal('test2', 10).and().equal('manolo2', 10));
