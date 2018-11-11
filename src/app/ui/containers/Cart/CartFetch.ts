import asyncResult from 'app/decorators/AsyncResult';
import {IFetchArgsDTO} from 'app/redux/dto/IFetchArgsDTO';
import CartActions from 'app/modules/cart/CartActions';

const cartActions = new CartActions();


export default class CartFetch {
  @asyncResult
  static do(props: IFetchArgsDTO) {
    const {store: {dispatch}} = props;
    const promises = [];
    promises.push(dispatch(cartActions.fetchCartProducts()).promise);
    return Promise.all(promises);
  }

  private constructor() {}
}
