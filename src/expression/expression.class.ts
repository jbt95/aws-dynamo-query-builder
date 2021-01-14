import { Schema } from './schema.type';
import ComparatorExpression from './comparator.class';
import ConditionExpression from './condition.class';

export default class Expression<T extends Schema> {
	public readonly comparator: ComparatorExpression<T> = new ComparatorExpression<T>(
		(predicate) => (this._expression = predicate(this._expression)),
		() => this.condition,
	);
	public readonly condition: ConditionExpression<T> = new ConditionExpression<T>(
		(predicate) => (this._expression = predicate(this._expression)),
		() => this.comparator,
	);
	public _expression: string = '';
}
