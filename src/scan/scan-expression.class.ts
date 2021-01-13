import { DynamoDB } from 'aws-sdk';
import Builder from '../builder.interface';
import { Operator } from '../operators.enum';
import ExpressionAttributeNames from '../expressions/expression.attribute-names.class';
import ExpressionAttributeValues from '../expressions/expression.attribute-value.class';
import FilterExpression from '../expressions/expression.filter.class';

type Scan = DynamoDB.ScanInput;

type Schema = Record<string, any>;

interface WhereInput<Attributes, Value> {
	key: keyof Attributes;
	operator: Operator;
	value: Value;
	expressionAttributeName?: string;
}

export default class ScanBuilder<Attributes extends Schema> implements Builder<Scan> {
	private ConsistentRead: DynamoDB.ConsistentRead;
	private ExclusiveStartKey: DynamoDB.Key;
	private Select: DynamoDB.Select;
	private ExpressionAttributeNames: ExpressionAttributeNames = new ExpressionAttributeNames();
	private ExpressionAttributeValues: ExpressionAttributeValues = new ExpressionAttributeValues();
	private FilterExpression: FilterExpression = new FilterExpression();
	private IndexName: DynamoDB.IndexName;
	private Limit: DynamoDB.PositiveIntegerObject;
	private ProjectionExpression: DynamoDB.ProjectionExpression;
	private ReturnConsumedCapacity: DynamoDB.ReturnConsumedCapacity;
	private Segment: DynamoDB.ScanSegment;
	private readonly TableName: DynamoDB.TableName;
	private TotalSegments: DynamoDB.ScanTotalSegments;

	constructor(tableName?: DynamoDB.TableName) {
		this.TableName = tableName;
	}

	public where<T = unknown>(input: WhereInput<Attributes, T>) {
		const en = this.ExpressionAttributeNames.push(
			input.key as string,
			input.expressionAttributeName,
		);
		this.ExpressionAttributeValues.push<T>(input.key as string, input.value);
		this.FilterExpression.add({ ...input, expressionAttributeName: en });

		return this;
	}

	public limit(limit: number) {
		this.Limit = limit;

		return this;
	}

	public startAt(exclusiveStartKey: Record<string, unknown>) {
		this.ExclusiveStartKey = exclusiveStartKey;

		return this;
	}

	public index(indexName: string) {
		this.IndexName = indexName;

		return this;
	}

	public consistentRead(x: boolean) {
		this.ConsistentRead = x;

		return this;
	}

	public select(select: DynamoDB.Select) {
		this.Select = select;

		return this;
	}

	public projectionExpression(projectionExpression: string) {
		this.ProjectionExpression = projectionExpression;

		return this;
	}

	public consumedCapacity(capacity: DynamoDB.ReturnConsumedCapacity) {
		this.ReturnConsumedCapacity = capacity;

		return this;
	}

	public segment(segment: DynamoDB.ScanSegment) {
		this.Segment = segment;

		return this;
	}

	public totalSegments(totalSegments: DynamoDB.ScanTotalSegments) {
		this.TotalSegments = totalSegments;

		return this;
	}

	build(): Scan {
		return {
			ConsistentRead: this.ConsistentRead,
			ExclusiveStartKey: this.ExclusiveStartKey,
			Select: this.Select,
			ExpressionAttributeNames: this.ExpressionAttributeNames.value,
			ExpressionAttributeValues: this.ExpressionAttributeValues.value,
			FilterExpression: this.FilterExpression.value,
			IndexName: this.IndexName,
			Limit: this.Limit,
			ProjectionExpression: this.ProjectionExpression,
			ReturnConsumedCapacity: this.ReturnConsumedCapacity,
			Segment: this.Segment,
			TableName: this.TableName,
			TotalSegments: this.TotalSegments,
		};
	}
}
