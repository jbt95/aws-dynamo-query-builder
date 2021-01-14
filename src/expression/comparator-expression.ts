import { Comparator, Condition } from './interfaces/expression.interface';
import { Operator } from '../operators.enum';
import { Schema } from './types/schema.type';
import { ExpressionLinkedList, Kind } from './expression-linked-list';

type Keys<T extends Schema> = keyof T;

export const comparatorExpression = <T extends Schema>(
	getConditionExpressionRef: () => Condition<T>,
	linkedList: ExpressionLinkedList,
): Comparator<T> => ({
	equal: (key: Keys<T>, value: unknown) => {
		linkedList.add({
			kind: Kind.Comparator,
			data: { key: key as string, value, operator: Operator.Equal },
		});

		return getConditionExpressionRef();
	},

	notEqual: (key: Keys<T>, value: unknown) => {
		linkedList.add({
			kind: Kind.Comparator,
			data: { key: key as string, value, operator: Operator.NotEqual },
		});

		return getConditionExpressionRef();
	},

	lessThan: (key: Keys<T>, value: unknown) => {
		linkedList.add({
			kind: Kind.Comparator,
			data: { key: key as string, value, operator: Operator.LessThan },
		});

		return getConditionExpressionRef();
	},

	lessThanOrEqual: (key: Keys<T>, value: unknown) => {
		linkedList.add({
			kind: Kind.Comparator,
			data: { key: key as string, value, operator: Operator.LessThanOrEqual },
		});

		return getConditionExpressionRef();
	},

	greaterThan: (key: Keys<T>, value: unknown) => {
		linkedList.add({
			kind: Kind.Comparator,
			data: { key: key as string, value, operator: Operator.GreaterThan },
		});

		return getConditionExpressionRef();
	},

	greaterThanOrEqual: (key: Keys<T>, value: unknown) => {
		linkedList.add({
			kind: Kind.Comparator,
			data: { key: key as string, value, operator: Operator.GreaterThanOrEqual },
		});

		return getConditionExpressionRef();
	},
});
