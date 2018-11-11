import * as IActions from 'app/modules/products/IProductsActions';
import {ACTION_TYPES} from 'app/modules/products/productsReduxConfig';
import ApiClient from 'helpers/ApiClient';
import ReduxHelper from 'app/redux/impl/ReduxHelper';


export default class ProductsActions implements IActions.IProductsActions {
  fetchProducts(): IActions.IFetchProducts['action'] {
    return {
      types: ReduxHelper.getRequestActionTypes(ACTION_TYPES.FETCH_PRODUCTS),
      promise: (client: ApiClient): IActions.IFetchProducts['actionResult'] => client.get(`/api/products`),
    };
  }
}
