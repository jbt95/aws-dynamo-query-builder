import { Schema } from './types/schema.type';
import { comparatorExpression } from './comparator-expression';
import { conditionExpression } from './condition-expression';
import { Comparator, Condition } from './interfaces/expression.interface';
import { expressionLinkedList } from './linked-list/expression-linked-list';

interface Expression<T> {
	comparator: Comparator<T>;
	condition: Condition<T>;
	build: () => string;
}

export const createExpression = <T extends Schema>(): Expression<T> => {
	const expressionsLinkedList = expressionLinkedList();
	const comparator: Comparator<T> = comparatorExpression<T>(() => condition, expressionsLinkedList);
	const condition: Condition<T> = conditionExpression<T>(() => comparator, expressionsLinkedList);

	return {
		comparator,
		condition,
		build: () => expressionsLinkedList.toDynamoString(),
	};
};
