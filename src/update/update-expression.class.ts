import { DynamoDB } from 'aws-sdk';
import Builder from '../builder.interface';

type Update = DynamoDB.UpdateItemInput;

export default class UpdateBuilder implements Builder<Update>, Update {
	public ConditionExpression: DynamoDB.ConditionExpression;
	public ExpressionAttributeNames: DynamoDB.ExpressionAttributeNameMap;
	public ExpressionAttributeValues: DynamoDB.ExpressionAttributeValueMap;
	public Key: DynamoDB.Key;
	public ReturnConsumedCapacity: DynamoDB.ReturnConsumedCapacity;
	public ReturnItemCollectionMetrics: DynamoDB.ReturnItemCollectionMetrics;
	public ReturnValues: DynamoDB.ReturnValue;
	public TableName: DynamoDB.TableName;
	public UpdateExpression: DynamoDB.UpdateExpression;

	constructor(tableName?: DynamoDB.TableName) {
		this.TableName = tableName;
	}

	build() {
		return Object.freeze(this);
	}
}
