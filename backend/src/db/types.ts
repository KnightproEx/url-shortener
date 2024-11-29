export type OmitReadOnly<T> = Omit<
  T,
  "id" | "createdAt" | "createdBy" | "updatedAt" | "deletedAt"
>;

export type PickPartial<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  Partial<Pick<T, K>>;
