export type IDeepReadOnly<T> = {
  readonly [P in keyof T]?: IDeepReadOnly<T[P]>;
};
