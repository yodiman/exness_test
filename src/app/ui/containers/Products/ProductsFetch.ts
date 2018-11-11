import ProductsActions from 'app/modules/products/ProductsActions';
import asyncResult from 'app/decorators/AsyncResult';
import {IFetchArgsDTO} from 'app/redux/dto/IFetchArgsDTO';
import CartActions from 'app/modules/cart/CartActions';

const productsActions = new ProductsActions();
const cartActions = new CartActions();


export default class ProductsFetch {
  @asyncResult
  static do(props: IFetchArgsDTO) {
    const {store: {dispatch}} = props;
    const promises = [];
    promises.push(dispatch(productsActions.fetchProducts()).promise);
    promises.push(dispatch(cartActions.fetchCartProducts()).promise);
    return Promise.all(promises);
  }

  private constructor() {}
}
