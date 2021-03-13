import { Operator } from '../../operators.enum';
import { Kind } from './kind.enum';

export interface ComparatorData {
	key: string;
	operator: { type: Operator; raw: string };
	value?: unknown;
}

export interface ConditionData {
	type: string;
}

export default interface LinkedListItem {
	kind: Kind;
	data: ComparatorData | ConditionData;
	next?: LinkedListItem;
}
