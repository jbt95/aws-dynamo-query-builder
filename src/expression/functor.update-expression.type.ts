type UpdateExpressionPredicate = (ex: string) => string;

export type UpdateExpressionFunctor = (predicate: UpdateExpressionPredicate) => void;
