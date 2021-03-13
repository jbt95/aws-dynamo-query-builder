import { Comparator, Condition } from './interfaces/expression.interface';
import { ExpressionLinkedList } from './linked-list/expression-linked-list';
import { Kind } from './linked-list/kind.enum';

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
