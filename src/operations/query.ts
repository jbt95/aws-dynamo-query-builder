/* eslint-disable no-console */
import { Schema } from '../expression/types/schema.type';
import { createExpression } from '../expression/expression';
import { ExpressionBuilderPredicate } from '../expression/types/expression-builder-predicate.type';

interface QueryBuilder<T> {
	filter: (predicate: ExpressionBuilderPredicate<T>) => QueryBuilder<T>;
	keyCondition: (predicate: ExpressionBuilderPredicate<T>) => QueryBuilder<T>;
}

export const queryBuilder = <T extends Schema = Schema>(
	_filterExpression = createExpression<T>(),
	_keyConditionExpression = createExpression<T>(),
): QueryBuilder<T> => ({
	filter: (predicate: ExpressionBuilderPredicate<T>) => {
		predicate(_filterExpression.comparator);
		console.log(_filterExpression.build());

		return queryBuilder(_filterExpression, _keyConditionExpression);
	},
	keyCondition: (predicate: ExpressionBuilderPredicate<T>) => {
		predicate(_keyConditionExpression.comparator);

		return queryBuilder(_filterExpression, _keyConditionExpression);
	},
});

/* TEST*/
queryBuilder<{ test: { pepe: string }; pepe: string; manolo: string; test2: string; manolo2: string }>()
	.filter((ex) =>
		ex
			.equal('test', 20)
			.and()
			.equal('manolo', 20)
			.and()
			.attributeExits({ test: { pepe: true } })
			.and()
			.contains({ test: { pepe: true } }, { alias: 'haha', value: { mierda: '' } }),
	)
	.keyCondition((ex) => ex.equal('test2', 10).and().equal('manolo2', 10));
