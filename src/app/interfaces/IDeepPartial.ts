export type IDeepPartial<T> = {
  [P in keyof T]?: IDeepPartial<T[P]>;
};
