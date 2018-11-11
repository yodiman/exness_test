import {IResponse} from 'app/interfaces/IResponse';
import {IAction, IReducerAction, IThunkAction} from 'app/redux/IAction';
import {ICartProductDTO} from 'app/modules/cart/ICartProductDTO';
import {IProductDTO} from 'app/modules/products/IProductDTO';
import {TCartStateOrderField} from 'app/modules/cart/ICartStateDTO';

export interface ICartActions {
  addToCart: TAddToCartFunc<IAddToCart['action']>;
  changeCount: TChangeCountFunc<IChangeCount['action']>;
  deleteFromCart: TDeleteFromCartFunc<IDeleteFromCart['action']>;
  fetchCartProducts: TFetchCartProductsFunc<IFetchCartProducts['action']>;
  reorder: TReorderFunc<IReorder['action']>;
}


export interface IFetchCartProducts {
  action: IAction<IFetchCartProducts['payload'], IFetchCartProducts['actionResult']>;
  actionResult: IResponse<ICartProductDTO[]>;
  payload: {};
  reducerAction: IReducerAction<IFetchCartProducts['payload'], ICartProductDTO[]>;
}
export type TFetchCartProductsFunc<TResult = IFetchCartProducts['actionResult']> = () => TResult;


export interface IChangeCount {
  action: IThunkAction<IChangeCount['payload']>;
  actionResult: null;
  payload: {productId: number; increment: number;};
  reducerAction: IReducerAction<IChangeCount['payload']>;
}
export type TChangeCountFunc<TResult = IChangeCount['actionResult']> = (productId: number, increment: number) => TResult;


export interface IDeleteFromCart {
  action: IThunkAction<IDeleteFromCart['payload']>;
  actionResult: null;
  payload: {productId: number;};
  reducerAction: IReducerAction<IDeleteFromCart['payload']>;
}
export type TDeleteFromCartFunc<TResult = IDeleteFromCart['actionResult']> = (productId: number) => TResult;


export interface IReorder {
  action: IAction<IReorder['payload']>;
  actionResult: null;
  payload: {fieldName: TCartStateOrderField};
  reducerAction: IReducerAction<IReorder['payload']>;
}
export type TReorderFunc<TResult = IReorder['actionResult']> = (fieldName: TCartStateOrderField) => TResult;


export interface IAddToCart {
  action: IThunkAction<IAddToCart['payload']>;
  actionResult: null;
  payload: {product: IProductDTO;};
  reducerAction: IReducerAction<IAddToCart['payload']>;
}
export type TAddToCartFunc<TResult = IAddToCart['actionResult']> = (product: IProductDTO) => TResult;
