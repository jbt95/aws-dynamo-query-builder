import { DynamoDB } from 'aws-sdk';
import Builder from '../builder.interface';
import { Operator } from '../operators.enum';

type Scan = DynamoDB.ScanInput;

type Schema = Record<string, any>;

interface WhereInput<Keys, Value> {
	key: keyof Keys;
	operator: Operator;
	value: Value;
	expressionAttributeName?: string;
}

export default class ScanBuilder<Attributes extends Schema> implements Builder<Scan> {
	private ConsistentRead: DynamoDB.ConsistentRead;
	private ExclusiveStartKey: DynamoDB.Key;
	private Select: DynamoDB.Select;
	private ExpressionAttributeNames: DynamoDB.ExpressionAttributeNameMap = {};
	private ExpressionAttributeValues: DynamoDB.ExpressionAttributeValueMap = {};
	private FilterExpression: DynamoDB.ConditionExpression = '';
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
		const en = this.addExpressionAttributeName(input.key as string, input.expressionAttributeName);
		const ev = this.addExpressionAttributeValue<T>(input.key as string, input.value);
		this.FilterExpression = this.FilterExpression.concat(
			`${
				this.FilterExpression.length > 0
					? ` AND ${en} ${input.operator} ${ev}`
					: `${en} ${input.operator} ${ev}`
			}`,
		);

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

	private addExpressionAttributeName(key: string, expressionAttributeName?: string) {
		const en = `#${expressionAttributeName === undefined ? key : expressionAttributeName}`;
		this.ExpressionAttributeNames = Object.assign(this.ExpressionAttributeNames, {
			[en]: key,
		});

		return en;
	}

	private addExpressionAttributeValue<T = unknown>(key: string, value: T) {
		const ev = `:${key}`;
		this.ExpressionAttributeValues = Object.assign(this.ExpressionAttributeValues, { [ev]: value });

		return ev;
	}

	build(): Scan {
		return {
			ConsistentRead: this.ConsistentRead,
			ExclusiveStartKey: this.ExclusiveStartKey,
			Select: this.Select,
			ExpressionAttributeNames: this.ExpressionAttributeNames,
			ExpressionAttributeValues: this.ExpressionAttributeValues,
			FilterExpression: this.FilterExpression,
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
