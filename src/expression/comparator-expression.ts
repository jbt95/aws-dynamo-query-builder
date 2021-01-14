/* eslint-disable @typescript-eslint/no-unused-vars */
import { DynamoDB } from 'aws-sdk';
import { Comparator, Condition } from './interfaces/expression.interface';
import { Operator } from '../operators.enum';
import { Schema } from './types/schema.type';
import { ExpressionLinkedList, Kind } from './expression-linked-list';

type Keys<T extends Schema> = keyof T;

export const comparatorExpression = <T extends Schema>(
	getConditionExpressionRef: () => Condition<T>,
	linkedList: ExpressionLinkedList,
): Comparator<T> => ({
	equal: (key: Keys<T>, value: unknown) => {
		linkedList.add({
			kind: Kind.Comparator,
			data: { key: key as string, value, operator: Operator.Equal },
		});

		return getConditionExpressionRef();
	},
	notEqual: (key: Keys<T>, value: unknown) => {
		linkedList.add({
			kind: Kind.Comparator,
			data: { key: key as string, value, operator: Operator.NotEqual },
		});

		return getConditionExpressionRef();
	},
	lessThan: (key: Keys<T>, value: unknown) => {
		linkedList.add({
			kind: Kind.Comparator,
			data: { key: key as string, value, operator: Operator.LessThan },
		});

		return getConditionExpressionRef();
	},
	lessThanOrEqual: (key: Keys<T>, value: unknown) => {
		linkedList.add({
			kind: Kind.Comparator,
			data: { key: key as string, value, operator: Operator.LessThanOrEqual },
		});

		return getConditionExpressionRef();
	},
	greaterThan: (key: Keys<T>, value: unknown) => {
		linkedList.add({
			kind: Kind.Comparator,
			data: { key: key as string, value, operator: Operator.GreaterThan },
		});

		return getConditionExpressionRef();
	},
	greaterThanOrEqual: (key: Keys<T>, value: unknown) => {
		linkedList.add({
			kind: Kind.Comparator,
			data: { key: key as string, value, operator: Operator.GreaterThanOrEqual },
		});

		return getConditionExpressionRef();
	},
	attributeExits: (path: string) => {
		// Foo.Bar -> #FoorBarXd : Foo.Bar.Xd;
		// Foo -> #Foor : Foo;

		return getConditionExpressionRef();
	},
	attributeNotExits: (path: string) => {
		// Foo.Bar -> #FoorBarXd : Foo.Bar.Xd;
		// Foo -> #Foor : Foo;

		return getConditionExpressionRef();
	},
	attributeType: (path: string, type: keyof DynamoDB.AttributeValue) => {
		// attribute_type (ProductReviews.FiveStar, :v_sub)
		return getConditionExpressionRef();
	},
	beginsWith: (path: string, subStr: string) => {
		// begins_with (Pictures.FrontView, :v_sub)
		return getConditionExpressionRef();
	},
	contains: (path: string, operand: string) => {
		// contains (Brand, :v_sub)
		return getConditionExpressionRef();
	},
	size: (path: string) => {
		// size (Brand) <= :v_sub
		return getConditionExpressionRef();
	},
});
