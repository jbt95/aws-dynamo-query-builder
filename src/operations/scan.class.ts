/* eslint-disable no-console */
import { DynamoDB } from 'aws-sdk';
import Expression from '../expression/expression.class';
import Builder from '../builder.interface';
import { Comparator } from '../expression/expressions.interface';

type Scan = DynamoDB.ScanInput;

export default class ScanBuilder<T = Record<string, unknown>> implements Builder<Scan> {
	private Segment: DynamoDB.ScanSegment;
	private TotalSegments: DynamoDB.ScanTotalSegments;
	private ConsistentRead: DynamoDB.ConsistentRead;
	private ExclusiveStartKey: DynamoDB.Key;
	private IndexName: DynamoDB.IndexName;
	private Limit: DynamoDB.PositiveIntegerObject;
	private ProjectionExpression: DynamoDB.ProjectionExpression;
	private ReturnConsumedCapacity: DynamoDB.ReturnConsumedCapacity;
	private Select: DynamoDB.Select;
	private TableName: DynamoDB.TableName;

	private expression = new Expression<T>();

	public filterExpression(predicate: (expression: Comparator<T>) => void) {
		predicate(this.expression);

		return this;
	}

	build(): Scan {
		return {
			ConsistentRead: this.ConsistentRead,
			ExclusiveStartKey: this.ExclusiveStartKey,
			ExpressionAttributeNames: this.expression.attributeNames,
			ExpressionAttributeValues: this.expression.attributeValues,
			FilterExpression: this.expression.conditionExpression,
			IndexName: this.IndexName,
			Limit: this.Limit,
			ProjectionExpression: this.ProjectionExpression,
			ReturnConsumedCapacity: this.ReturnConsumedCapacity,
			Segment: this.Segment,
			Select: this.Select,
			TableName: this.TableName,
			TotalSegments: this.TotalSegments,
		};
	}
}

console.log(
	new ScanBuilder()
		.filterExpression((expression) => expression.equal('test', 20).and().equal('test2', 20))
		.build(),
);
