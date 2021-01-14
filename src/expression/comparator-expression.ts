import { Comparator, Condition } from './expressions.interface';
import { Operator } from '../operators.enum';
import DuplicatedExpressionName from './error.duplicated-expression-name.class';
import { Schema } from './schema.type';
import { UpdateExpressionFunctor } from './functor.update-expression.type';

type Keys<T extends Schema> = keyof T;

export const comparatorExpression = <T extends Schema>(
	updateExpression: UpdateExpressionFunctor,
	getConditionExpressionRef: () => Condition<T>,
): Comparator<T> => {
	const _expressionAttributeNames: Record<string, any> = {};
	const _expressionAttributeValues: Record<string, any> = {};
	const _updateExpression = updateExpression;
	const _getConditionExpressionRef = getConditionExpressionRef;

	const guardNameExists = (name: string) => {
		if (Object.keys(_expressionAttributeNames).some((k) => k === name)) {
			throw new DuplicatedExpressionName(name);
		}
	};

	const buildExpression = (key: string, operator: Operator, value: unknown) => {
		const en = addExpressionName(key);
		const ev = addExpressionValue(key, value);

		return `${en}${operator}${ev}`;
	};

	const addExpressionValue = (key: string, value: unknown): string => {
		const expressionValue = `:${key}`;
		Object.assign(_expressionAttributeValues, { [expressionValue]: value });

		return expressionValue;
	};

	const addExpressionName = (key: string): string => {
		const expressionName = `#${key}`;
		guardNameExists(expressionName);
		Object.assign(_expressionAttributeNames, { [expressionName]: key });

		return expressionName;
	};

	return {
		equal: (key: Keys<T>, value: unknown) => {
			_updateExpression((ex) => ex.concat(buildExpression(key as string, Operator.Equal, value)));

			return _getConditionExpressionRef();
		},

		notEqual: (key: Keys<T>, value: unknown) => {
			_updateExpression((ex) =>
				ex.concat(buildExpression(key as string, Operator.NotEqual, value)),
			);

			return _getConditionExpressionRef();
		},

		lessThan: (key: Keys<T>, value: unknown) => {
			_updateExpression((ex) =>
				ex.concat(buildExpression(key as string, Operator.LessThan, value)),
			);

			return _getConditionExpressionRef();
		},

		lessThanOrEqual: (key: Keys<T>, value: unknown) => {
			_updateExpression((ex) =>
				ex.concat(buildExpression(key as string, Operator.LessThanOrEqual, value)),
			);

			return _getConditionExpressionRef();
		},

		greaterThan: (key: Keys<T>, value: unknown) => {
			_updateExpression((ex) =>
				ex.concat(buildExpression(key as string, Operator.GreaterThan, value)),
			);

			return _getConditionExpressionRef();
		},

		greaterThanOrEqual: (key: Keys<T>, value: unknown) => {
			_updateExpression((ex) =>
				ex.concat(buildExpression(key as string, Operator.GreaterThanOrEqual, value)),
			);

			return _getConditionExpressionRef();
		},
	};
};
