import { Comparator } from './expressions.interface';

export type ExpressionBuilderPredicate<T> = (expression: Comparator<T>) => void;
