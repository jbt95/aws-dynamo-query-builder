import { DynamoDB } from 'aws-sdk';

type DynamoTypes = keyof DynamoDB.AttributeValue;

export enum Operator {
	Equal,
	NotEqual,
	LessThan,
	LessThanOrEqual,
	GreaterThan,
	GreaterThanOrEqual,
	Between,
	In,
	AttributeExist,
	AttributeNotExist,
	AttributeType,
	BeginsWith,
	Contains,
	Size,
}

export const operatorsComposers = {
	[Operator.Equal]: () => '=',
	[Operator.NotEqual]: () => '<>',
	[Operator.LessThan]: () => '<',
	[Operator.LessThanOrEqual]: () => '<=',
	[Operator.GreaterThan]: () => '>',
	[Operator.GreaterThanOrEqual]: () => '>=',
	[Operator.Between]: () => '=',
	[Operator.In]: () => '=',
	[Operator.AttributeExist]: (path: string) => `attribute_exists(${path})`,
	[Operator.AttributeNotExist]: (path: string) => `attribute_not_exists(${path})`,
	[Operator.AttributeType]: (path: string, type: DynamoTypes) => `attribute_type(${path}, ${type})`,
	[Operator.BeginsWith]: (path: string, subStr: string) => `begins_with(${path}, ${subStr})`,
	[Operator.Contains]: (path: string, operand: string) => `contains(${path}, :${operand})`,
	[Operator.Size]: (path: string) => `size(${path})`,
};
