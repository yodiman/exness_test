import ReduxHelper from 'app/redux/impl/ReduxHelper';
import {ICartStateDTO} from 'app/modules/cart/ICartStateDTO';
import {OrderDirection} from 'app/constants/OrderDirection';

enum ActionTypesEnum {
  ADD_TO_CART,
  CHANGE_COUNT,
  DELETE_FROM_CART,
  REORDER,

  FETCH_CART_PRODUCTS, FETCH_CART_PRODUCTS_SUCCESS, FETCH_CART_PRODUCTS_FAIL,
}

export const INITIAL_STATE: Partial<ICartStateDTO> = {
  activeOrderField: 'price',
  cartProductsList: {
    data: [],
    loading: false,
  },
  order: {
    count: OrderDirection.asc,
    name: OrderDirection.asc,
    price: OrderDirection.asc,
  },
};

export const MODULE_NAME = 'cart';

export const ACTION_TYPES = ReduxHelper.generateActionTypes<typeof ActionTypesEnum>(ActionTypesEnum, MODULE_NAME);
