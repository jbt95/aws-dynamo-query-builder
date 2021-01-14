/* eslint-disable no-console */
import { Schema } from '../expression/types/schema.type';
import { createExpression } from '../expression/expression';
import { ExpressionBuilderPredicate } from '../expression/types/expression-builder-predicate.type';

interface QueryBuilder<T> {
	filterExpression: (predicate: ExpressionBuilderPredicate<T>) => QueryBuilder<T>;
	keyConditionExpression: (predicate: ExpressionBuilderPredicate<T>) => QueryBuilder<T>;
}

export const queryBuilder = <T extends Schema = Schema>(
	filterExpression = createExpression<T>(),
	keyConditionExpression = createExpression<T>(),
): QueryBuilder<T> => ({
	filterExpression: (predicate: ExpressionBuilderPredicate<T>) => {
		predicate(filterExpression.comparator);
		console.log(filterExpression.build());

		return queryBuilder(filterExpression, keyConditionExpression);
	},
	keyConditionExpression: (predicate: ExpressionBuilderPredicate<T>) => {
		predicate(keyConditionExpression.comparator);
		console.log(keyConditionExpression.build());

		return queryBuilder(filterExpression, keyConditionExpression);
	},
});

/* TEST*/
queryBuilder()
	.filterExpression((ex) => ex.equal('test', 20).and().equal('manolo', 20))
	.keyConditionExpression((ex) => ex.equal('test2', 10).and().equal('manolo2', 10));
