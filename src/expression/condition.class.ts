import { Comparator, Condition } from './expressions.interface';
import { UpdateExpressionFunctor } from './functor.update-expression.type';

export default class ConditionExpression<T> implements Condition<T> {
	constructor(
		private updateExpression: UpdateExpressionFunctor,
		private getComparatorRef: () => Comparator<T>,
	) {}

	public and() {
		this.updateExpression((ex) => ex.concat(' AND '));

		return this.getComparatorRef();
	}

	public or() {
		this.updateExpression((ex) => ex.concat(' OR '));

		return this.getComparatorRef();
	}

	public not() {
		this.updateExpression((ex) => ex.concat(' NOT '));

		return this.getComparatorRef();
	}
}
