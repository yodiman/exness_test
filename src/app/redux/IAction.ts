import {IResponse} from 'app/interfaces/IResponse';
import ApiClient from 'helpers/ApiClient';
import {IResponsePromise} from 'app/interfaces/IResponsePromise';
import {IStateDTO} from 'app/redux/dto/IStateDTO';
import {Omit} from 'app/interfaces/Omit';


export interface IActionResponseResult<TResponseData> {
  result?: TResponseData extends never ? never : IResponsePromise<TResponseData>;
  error?: TResponseData extends never ? never : any;
}

export interface IAction<TPayload = any, TResponseData = never> extends IActionResponseResult<TResponseData> {
  promise?: (client: ApiClient) => TResponseData extends IResponse<any> ? TResponseData : IResponse<TResponseData>;
  type?: string;
  types?: [string, string, string];
  payload?: TPayload;
}

export interface IReducerAction<TPayload = any, TResponseData = any>
  extends Omit<IAction<TPayload, TResponseData>, 'promise' | 'types'> {}

export type IThunkAction<TPayload = any, TResponseData = never> = (
  dispatch: (action: IAction<TPayload, TResponseData> | IThunkAction) => any,
  getState?: () => IStateDTO,
) => any;


export type IActionTypes = [string, string, string];
