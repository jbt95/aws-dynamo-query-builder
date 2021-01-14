import { Comparator } from '../interfaces/expression.interface';

export type ExpressionBuilderPredicate<T> = (expression: Comparator<T>) => void;
