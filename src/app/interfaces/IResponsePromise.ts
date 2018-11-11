export interface IResponsePromise<T = any> {
  response: T;
  code: number;
  message: string;
  date: number;
  success: boolean;
}
