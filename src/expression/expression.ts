import { Schema } from './schema.type';
import { comparatorExpression } from './comparator-expression';
import { conditionExpression } from './condition-expression';
import { Comparator, Condition } from './expressions.interface';

export const createExpression = <T extends Schema>() => {
	let _expression: string = '';
	const comparator: Comparator<T> = comparatorExpression<T>(
		(predicate) => (_expression = predicate(_expression)),
		() => condition,
	);
	const condition: Condition<T> = conditionExpression<T>(
		(predicate) => (_expression = predicate(_expression)),
		() => comparator,
	);

	return {
		comparator,
		condition,
		expression: () => _expression,
	};
};
