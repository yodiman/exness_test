import BaseReducer from 'app/redux/impl/BaseReducer';
import {IProductsStateDTO} from 'app/modules/products/IProductsStateDTO';
import {ACTION_TYPES} from 'app/modules/products/productsReduxConfig';
import * as IActions from 'app/modules/products/IProductsActions';


export class ProductsReducer extends BaseReducer<IProductsStateDTO> {
  [ACTION_TYPES.FETCH_PRODUCTS](): IProductsStateDTO {
    return {
      ...this.state,
      productsList: {
        ...this.state.productsList,
        loading: true,
      },
    };
  }


  [ACTION_TYPES.FETCH_PRODUCTS_FAIL](): IProductsStateDTO {
    return {
      ...this.state,
      productsList: {
        ...this.state.productsList,
        loading: false,
      },
    };
  }


  [ACTION_TYPES.FETCH_PRODUCTS_SUCCESS](): IProductsStateDTO {
    const action: IActions.IFetchProducts['reducerAction'] = this.action;
    return {
      ...this.state,
      productsList: {
        data: action.result.response,
        loading: false,
      },
    };
  }
}
