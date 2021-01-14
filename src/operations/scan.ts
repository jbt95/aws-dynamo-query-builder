/* eslint-disable no-console */
import { createExpression } from '../expression/expression';
import { Comparator } from '../expression/interfaces/expression.interface';
import { Schema } from '../expression/types/schema.type';
import { ExpressionBuilderPredicate } from '../expression/types/expression-builder-predicate.type';

interface ScanBuilder<T> {
	filterExpression: (predicate: ExpressionBuilderPredicate<T>) => ScanBuilder<T>;
}

export const scanBuilder = <T extends Schema = Schema>(
	filterExpression = createExpression<T>(),
): ScanBuilder<T> => ({
	filterExpression: (predicate: (expression: Comparator<T>) => void) => {
		predicate(filterExpression.comparator);
		console.log(filterExpression.build());

		return scanBuilder(filterExpression);
	},
});

/* TEST*/
scanBuilder().filterExpression((expression) =>
	expression.equal('test', 20).and().equal('test2', 20),
);
