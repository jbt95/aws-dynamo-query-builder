import { Comparator, Condition } from './interfaces/expression.interface';
import { ExpressionLinkedList, Kind } from './expression-linked-list';

export const conditionExpression = <T>(
	getComparatorExpressionRef: () => Comparator<T>,
	linkedList: ExpressionLinkedList,
): Condition<T> => ({
	and: () => {
		linkedList.add({ kind: Kind.Condition, data: { type: ' AND ' } });

		return getComparatorExpressionRef();
	},
	or: () => {
		linkedList.add({ kind: Kind.Condition, data: { type: ' OR ' } });

		return getComparatorExpressionRef();
	},
	not: () => {
		linkedList.add({ kind: Kind.Condition, data: { type: ' NOT ' } });

		return getComparatorExpressionRef();
	},
});
