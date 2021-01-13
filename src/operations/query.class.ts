/* eslint-disable no-console */
import { DynamoDB } from 'aws-sdk';
import Expression from '../expression/expression.class';
import { Comparator } from '../expression/expressions.interface';
import Builder from '../builder.interface';

type Query = DynamoDB.QueryInput;

export default class QueryBuilder<T = Record<string, unknown>> implements Builder<Query> {
	private ScanIndexForward: boolean;
	private ConsistentRead: DynamoDB.ConsistentRead;
	private ExclusiveStartKey: DynamoDB.Key;
	private IndexName: DynamoDB.IndexName;
	private Limit: DynamoDB.PositiveIntegerObject;
	private ProjectionExpression: DynamoDB.ProjectionExpression;
	private ReturnConsumedCapacity: DynamoDB.ReturnConsumedCapacity;
	private Select: DynamoDB.Select;
	private TableName: DynamoDB.TableName;
	private KeyConditions: DynamoDB.KeyConditions;

	private _filterExpression = new Expression<T>();
	private _keyConditionExpression = new Expression<T>();

	public filterExpression(predicate: (expression: Comparator<T>) => void) {
		predicate(this._filterExpression);

		return this;
	}

	public keyConditionExpression(predicate: (expression: Comparator<T>) => void) {
		predicate(this._keyConditionExpression);

		return this;
	}

	private getExpressionNames() {
		return Object.freeze({
			...this._filterExpression.attributeNames,
			...this._keyConditionExpression.attributeNames,
		});
	}

	private getExpressionValues() {
		return Object.freeze({
			...this._filterExpression.attributeValues,
			...this._keyConditionExpression.attributeValues,
		});
	}

	build(): Query {
		return {
			ConsistentRead: this.ConsistentRead,
			ExclusiveStartKey: this.ExclusiveStartKey,
			ExpressionAttributeNames: this.getExpressionNames(),
			ExpressionAttributeValues: this.getExpressionValues(),
			FilterExpression: this._filterExpression.conditionExpression,
			KeyConditionExpression: this._keyConditionExpression.conditionExpression,
			IndexName: this.IndexName,
			Limit: this.Limit,
			ProjectionExpression: this.ProjectionExpression,
			ReturnConsumedCapacity: this.ReturnConsumedCapacity,
			Select: this.Select,
			TableName: this.TableName,
			ScanIndexForward: this.ScanIndexForward,
			KeyConditions: this.KeyConditions,
		};
	}
}

interface Test {
	test: string;
	test2: string;
	manolo: string;
	manolo2: string;
}

console.log(
	new QueryBuilder<Test>()
		.filterExpression((ex) => ex.equal('test', 20).and().equal('manolo', 20))
		.keyConditionExpression((ex) => ex.equal('test2', 10).and().equal('manolo2', 10))
		.build(),
);
