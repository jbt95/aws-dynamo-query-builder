/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/ban-types */
import { DynamoDB } from 'aws-sdk';
import { BooleanMap, Comparator, Condition, Operand } from './interfaces/expression.interface';
import { Operator, operatorsComposers } from '../operators.enum';
import { Schema } from './types/schema.type';
import { ExpressionLinkedList } from './linked-list/expression-linked-list';
import { Kind } from './linked-list/kind.enum';

type Keys<T extends Schema> = keyof T;

export const comparatorExpression = <T extends Schema>(
	getConditionExpressionRef: () => Condition<T>,
	linkedList: ExpressionLinkedList,
): Comparator<T> => {
	const buildNestedObjectPath = (obj: object, initial: string = '') => {
		let p = initial;
		Object.entries(obj).forEach(([k, v]) => {
			if (typeof v === 'object') {
				p = p.concat(`#${k}.`);
				p = buildNestedObjectPath(v, p);
			} else {
				p = p.concat(`#${k}`);
			}
		});

		return p;
	};

	return {
		equal: (key: Keys<T>, value: unknown) => {
			linkedList.add({
				kind: Kind.Comparator,
				data: {
					key: key as string,
					value,
					operator: { raw: operatorsComposers[Operator.Equal](), type: Operator.Equal },
				},
			});

			return getConditionExpressionRef();
		},
		notEqual: (key: Keys<T>, value: unknown) => {
			linkedList.add({
				kind: Kind.Comparator,
				data: {
					key: key as string,
					value,
					operator: { type: Operator.NotEqual, raw: operatorsComposers[Operator.NotEqual]() },
				},
			});

			return getConditionExpressionRef();
		},
		lessThan: (key: Keys<T>, value: unknown) => {
			linkedList.add({
				kind: Kind.Comparator,
				data: {
					key: key as string,
					value,
					operator: { raw: operatorsComposers[Operator.LessThan](), type: Operator.LessThan },
				},
			});

			return getConditionExpressionRef();
		},
		lessThanOrEqual: (key: Keys<T>, value: unknown) => {
			linkedList.add({
				kind: Kind.Comparator,
				data: {
					key: key as string,
					value,
					operator: {
						raw: operatorsComposers[Operator.LessThanOrEqual](),
						type: Operator.LessThanOrEqual,
					},
				},
			});

			return getConditionExpressionRef();
		},
		greaterThan: (key: Keys<T>, value: unknown) => {
			linkedList.add({
				kind: Kind.Comparator,
				data: {
					key: key as string,
					value,
					operator: { raw: operatorsComposers[Operator.GreaterThan](), type: Operator.GreaterThan },
				},
			});

			return getConditionExpressionRef();
		},
		greaterThanOrEqual: (key: Keys<T>, value: unknown) => {
			linkedList.add({
				kind: Kind.Comparator,
				data: {
					key: key as string,
					value,
					operator: {
						raw: operatorsComposers[Operator.GreaterThanOrEqual](),
						type: Operator.GreaterThanOrEqual,
					},
				},
			});

			return getConditionExpressionRef();
		},
		attributeExits: (path: Partial<BooleanMap<Schema>>) => {
			// Foo.Bar -> #FoorBarXd : Foo.Bar.Xd;
			// Foo -> #Foor : Foo;
			if (typeof path !== 'object') {
				throw new Error('invalid path type');
			}

			if (Object.entries(path).length > 1) {
				throw new Error('Too many values');
			}

			linkedList.add({
				kind: Kind.Comparator,
				data: {
					key: buildNestedObjectPath(path),
					operator: {
						raw: operatorsComposers[Operator.AttributeExist](buildNestedObjectPath(path)),
						type: Operator.AttributeExist,
					},
				},
			});

			return getConditionExpressionRef();
		},
		attributeNotExits: (path: Partial<BooleanMap<Schema>>) => {
			// Foo.Bar -> #FoorBarXd : Foo.Bar.Xd;
			// Foo -> #Foor : Foo;
			linkedList.add({
				kind: Kind.Comparator,
				data: {
					key: buildNestedObjectPath(path),
					operator: {
						raw: operatorsComposers[Operator.AttributeNotExist](buildNestedObjectPath(path)),
						type: Operator.AttributeNotExist,
					},
				},
			});

			return getConditionExpressionRef();
		},
		attributeType: (path: Partial<BooleanMap<Schema>>, type: keyof DynamoDB.AttributeValue) => {
			// attribute_type (ProductReviews.FiveStar, :v_sub)
			linkedList.add({
				kind: Kind.Comparator,
				data: {
					key: buildNestedObjectPath(path),
					operator: {
						raw: operatorsComposers[Operator.AttributeType](buildNestedObjectPath(path), type),
						type: Operator.AttributeType,
					},
				},
			});

			return getConditionExpressionRef();
		},
		beginsWith: (path: Partial<BooleanMap<Schema>>, subStr: string) => {
			// begins_with (Pictures.FrontView, :v_sub)
			linkedList.add({
				kind: Kind.Comparator,
				data: {
					key: buildNestedObjectPath(path),
					operator: {
						raw: operatorsComposers[Operator.BeginsWith](buildNestedObjectPath(path), subStr),
						type: Operator.BeginsWith,
					},
				},
			});

			return getConditionExpressionRef();
		},
		contains: (path: Partial<BooleanMap<Schema>>, operand: Operand) => {
			// contains (Brand, :v_sub)
			linkedList.add({
				kind: Kind.Comparator,
				data: {
					key: buildNestedObjectPath(path),
					operator: {
						raw: operatorsComposers[Operator.Contains](buildNestedObjectPath(path), operand.alias),
						type: Operator.Contains,
					},
				},
			});

			return getConditionExpressionRef();
		},
		size: (path: Partial<BooleanMap<Schema>>) => {
			// size (Brand) <= :v_sub
			linkedList.add({
				kind: Kind.Comparator,
				data: {
					key: buildNestedObjectPath(path),
					operator: { raw: operatorsComposers[Operator.Size](buildNestedObjectPath(path)), type: Operator.Size },
				},
			});

			return getConditionExpressionRef();
		},
	};
};
