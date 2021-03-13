import LinkedListItem, { ComparatorData, ConditionData } from './item.interface';
import { Kind } from './kind.enum';
import { Operator } from '../../operators.enum';

export interface ExpressionLinkedList {
	add: (item: Omit<LinkedListItem, 'next'>) => void;
}

const comparatorComposer = {
	[Operator.Equal]: (data: ComparatorData) => `#${data.key}${data.operator.raw}:${data.key}`,
	[Operator.NotEqual]: (data: ComparatorData) => `#${data.key}${data.operator.raw}:${data.key}`,
	[Operator.LessThan]: (data: ComparatorData) => `#${data.key}${data.operator.raw}:${data.key}`,
	[Operator.LessThanOrEqual]: (data: ComparatorData) => `#${data.key}${data.operator.raw}:${data.key}`,
	[Operator.GreaterThan]: (data: ComparatorData) => `#${data.key}${data.operator.raw}:${data.key}`,
	[Operator.GreaterThanOrEqual]: (data: ComparatorData) => `#${data.key}${data.operator.raw}:${data.key}`,
	[Operator.Between]: (data: ComparatorData) => `${data.operator.raw}`,
	[Operator.In]: (data: ComparatorData) => `${data.operator.raw}`,
	[Operator.AttributeExist]: (data: ComparatorData) => `${data.operator.raw}`,
	[Operator.AttributeNotExist]: (data: ComparatorData) => `${data.operator.raw}`,
	[Operator.AttributeType]: (data: ComparatorData) => `${data.operator.raw}`,
	[Operator.BeginsWith]: (data: ComparatorData) => `${data.operator.raw}`,
	[Operator.Contains]: (data: ComparatorData) => `${data.operator.raw}`,
	[Operator.Size]: (data: ComparatorData) => `${data.operator.raw}`,
};

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
						dynamoString = dynamoString.concat(comparatorComposer[comparatorData.operator.type](comparatorData));
						break;
				}
				current = current.next;
			}

			return dynamoString;
		},
	};
};
