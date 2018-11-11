import {IResponse} from 'app/interfaces/IResponse';
import {IProductDTO} from 'app/modules/products/IProductDTO';
import {IAction, IReducerAction} from 'app/redux/IAction';

export interface IProductsActions {
  fetchProducts: TFetchProductsFunc<IFetchProducts['action']>;
}


export interface IFetchProducts {
  action: IAction<IFetchProducts['payload'], IFetchProducts['actionResult']>;
  actionResult: IResponse<IProductDTO[]>;
  payload: {};
  reducerAction: IReducerAction<IFetchProducts['payload'], IProductDTO[]>;
}
export type TFetchProductsFunc<TResult = IFetchProducts['actionResult']> = () => TResult;
