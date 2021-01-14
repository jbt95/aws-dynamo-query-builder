import { Operator } from '../operators.enum';

export enum Kind {
	Condition = 'Condition',
	Comparator = 'Comparator',
}

interface ComparatorData {
	key: string;
	value: unknown;
	operator: Operator;
}

interface ConditionData {
	type: string;
}

interface LinkedListItem {
	kind: Kind;
	data: ComparatorData | ConditionData;
	next?: LinkedListItem;
}

export interface ExpressionLinkedList {
	add: (item: Omit<LinkedListItem, 'next'>) => void;
}

export const expressionLinkedList = () => {
	const linkedList = {} as LinkedListItem;

	return {
		add: (item: Omit<LinkedListItem, 'next'>) => {
			let current = linkedList;
			if (Object.entries(linkedList).length === 0) {
				Object.assign(linkedList, { ...item, next: undefined });

				return;
			}
			while (current !== undefined) {
				if (current.next === undefined) {
					current.next = item;
					break;
				}
				current = current.next;
			}
		},
		toDynamoString: () => {
			let dynamoString = '';
			let current = linkedList;
			while (current !== undefined) {
				switch (current.kind) {
					case Kind.Condition:
						const conditionData = current.data as ConditionData;
						dynamoString = dynamoString.concat(` ${conditionData.type} `);
						break;
					case Kind.Comparator:
						const comparatorData = current.data as ComparatorData;
						dynamoString = dynamoString.concat(
							`#${comparatorData.key}${comparatorData.operator}:${comparatorData.key}`,
						);
						break;
				}
				current = current.next;
			}

			return dynamoString;
		},
	};
};
