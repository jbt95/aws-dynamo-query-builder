import { DynamoDB } from 'aws-sdk';
import Builder from '../builder.interface';

type Delete = DynamoDB.DeleteItemInput;

export default class DeleteBuilder implements Builder<Delete>, Delete {
	public ConditionExpression: DynamoDB.ConditionExpression;
	public ExpressionAttributeNames: DynamoDB.ExpressionAttributeNameMap;
	public ExpressionAttributeValues: DynamoDB.ExpressionAttributeValueMap;
	public Key: DynamoDB.Key;
	public ReturnConsumedCapacity: DynamoDB.ReturnConsumedCapacity;
	public ReturnItemCollectionMetrics: DynamoDB.ReturnItemCollectionMetrics;
	public ReturnValues: DynamoDB.ReturnValue;
	public TableName: DynamoDB.TableName;

	constructor(tableName?: DynamoDB.TableName) {
		this.TableName = tableName;
	}

	build() {
		return Object.freeze(this);
	}
}
