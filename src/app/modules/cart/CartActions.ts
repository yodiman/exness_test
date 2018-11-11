import * as IActions from 'app/modules/cart/ICartActions';
import ApiClient from 'helpers/ApiClient';
import {ACTION_TYPES} from 'app/modules/cart/cartReduxConfig';
import ReduxHelper from 'app/redux/impl/ReduxHelper';
import {IProductDTO} from 'app/modules/products/IProductDTO';
import CartService from 'app/modules/cart/CartService';
import {TCartStateOrderField} from 'app/modules/cart/ICartStateDTO';

const cartService = new CartService();


export default class CartActions implements IActions.ICartActions {
  addToCart(product: IProductDTO): IActions.IAddToCart['action'] {
    return (dispatch, getState) => {
      dispatch({
        type: ACTION_TYPES.ADD_TO_CART,
        payload: {product},
      });

      cartService.updateCartStorage(getState().cart.cartProductsList.data);
    };
  }


  changeCount(productId: number, increment: number): IActions.IChangeCount['action'] {
    return (dispatch, getState) => {
      dispatch({
        type: ACTION_TYPES.CHANGE_COUNT,
        payload: {productId, increment},
      });

      cartService.updateCartStorage(getState().cart.cartProductsList.data);
    };
  }


  deleteFromCart(productId: number): IActions.IDeleteFromCart['action'] {
    return (dispatch, getState) => {
      dispatch({
        type: ACTION_TYPES.DELETE_FROM_CART,
        payload: {productId},
      });

      cartService.updateCartStorage(getState().cart.cartProductsList.data);
    };
  }


  fetchCartProducts(): IActions.IFetchCartProducts['action'] {
    return {
      types: ReduxHelper.getRequestActionTypes(ACTION_TYPES.FETCH_CART_PRODUCTS),
      promise: (client: ApiClient): IActions.IFetchCartProducts['actionResult'] => client.get(`/api/cart`),
    };
  }


  reorder(fieldName: TCartStateOrderField): IActions.IReorder['action'] {
    return {
      type: ACTION_TYPES.REORDER,
      payload: {fieldName},
    };
  }
}
