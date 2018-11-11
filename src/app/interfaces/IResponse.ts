import {Request} from 'superagent';
import {IResponsePromise} from 'app/interfaces/IResponsePromise';
import {Omit} from 'app/interfaces/Omit';


export type TErrorResponse<T = null> = Omit<IResponsePromise<T>, 'response'>;

export interface IResponse<T> {
  promise: Promise<IResponsePromise<T>>;
  awaiter: Promise<[IResponsePromise<T>, TErrorResponse<T>]>;
  request: Request;
}
