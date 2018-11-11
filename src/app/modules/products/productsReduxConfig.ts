import {IProductsStateDTO} from 'app/modules/products/IProductsStateDTO';
import ReduxHelper from 'app/redux/impl/ReduxHelper';

enum ActionTypesEnum {
  FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAIL,
}

export const INITIAL_STATE: Partial<IProductsStateDTO> = {
  productsList: {
    data: [],
    loading: false,
  },
};

export const MODULE_NAME = 'products';

export const ACTION_TYPES = ReduxHelper.generateActionTypes<typeof ActionTypesEnum>(ActionTypesEnum, MODULE_NAME);
