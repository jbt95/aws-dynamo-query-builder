import AbstractExpression from './abstract.expression.class';

export default class ExpressionAttributeNames extends AbstractExpression {
	public push<T = string>(key: string, expressionAttributeName?: T) {
		const en = `#${expressionAttributeName === undefined ? key : expressionAttributeName}`;
		this.guardNameExists(en);
		this._expressions = Object.assign(this._expressions, { [en]: key });

		return en;
	}
}
