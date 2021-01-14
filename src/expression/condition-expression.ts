import { Comparator, Condition } from './expressions.interface';
import { UpdateExpressionFunctor } from './functor.update-expression.type';

export const conditionExpression = <T>(
	updateExpression: UpdateExpressionFunctor,
	getComparatorExpressionRef: () => Comparator<T>,
): Condition<T> => {
	const _updateExpression = updateExpression;
	const _getComparatorExpressionRef = getComparatorExpressionRef;

	return {
		and: () => {
			_updateExpression((ex) => ex.concat(' AND '));

			return _getComparatorExpressionRef();
		},
		or: () => {
			_updateExpression((ex) => ex.concat(' OR '));

			return _getComparatorExpressionRef();
		},
		not: () => {
			_updateExpression((ex) => ex.concat(' NOT '));

			return _getComparatorExpressionRef();
		},
	};
};
