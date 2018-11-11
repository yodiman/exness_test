import {IReducerFactory} from 'app/redux/IReducerFactory';
import {ReducerFactory} from 'app/redux/impl/ReducerFactory';
import {ICartStateDTO} from 'app/modules/cart/ICartStateDTO';
import {INITIAL_STATE} from 'app/modules/cart/cartReduxConfig';
import {CartReducer} from 'app/modules/cart/CartReducer';


export class CartReducerFactory extends ReducerFactory<ICartStateDTO>
  implements IReducerFactory<CartReducer, ICartStateDTO> {

  constructor(req) {
    super(req, INITIAL_STATE as ICartStateDTO);
  }


  create() {
    return new CartReducer(this.initialState, this.req);
  }
}
