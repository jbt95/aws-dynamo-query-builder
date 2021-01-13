import AbstractExpression from './abstract.expression.class';

export default class ExpressionAttributeValues extends AbstractExpression {
	public push<T>(key: string, expressionAttributeValue?: T) {
		const en = `#${expressionAttributeValue === undefined ? key : expressionAttributeValue}`;
		this.guardNameExists(en);
		this._expressions = Object.assign(this._expressions, { [en]: key });

		return en;
	}
}
