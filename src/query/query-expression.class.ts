import { DynamoDB } from 'aws-sdk';
import Builder from '../builder.interface';

type Query = DynamoDB.QueryInput;

export default class QueryBuilder implements Builder<Query>, Query {
	public ConsistentRead: DynamoDB.ConsistentRead;
	public ExclusiveStartKey: DynamoDB.Key;
	public ExpressionAttributeNames: DynamoDB.ExpressionAttributeNameMap;
	public ExpressionAttributeValues: DynamoDB.ExpressionAttributeValueMap;
	public FilterExpression: DynamoDB.ConditionExpression;
	public IndexName: DynamoDB.IndexName;
	public KeyConditionExpression: DynamoDB.KeyExpression;
	public Limit: DynamoDB.PositiveIntegerObject;
	public ProjectionExpression: DynamoDB.ProjectionExpression;
	public ReturnConsumedCapacity: DynamoDB.ReturnConsumedCapacity;
	public ScanIndexForward: DynamoDB.BooleanObject;
	public Select: DynamoDB.Select;
	public TableName: DynamoDB.TableName;

	constructor(tableName?: DynamoDB.TableName) {
		this.TableName = tableName;
	}

	build() {
		return Object.freeze(this);
	}
}
