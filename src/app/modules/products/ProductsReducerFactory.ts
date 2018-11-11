import {IReducerFactory} from 'app/redux/IReducerFactory';
import {ReducerFactory} from 'app/redux/impl/ReducerFactory';
import {ProductsReducer} from 'app/modules/products/ProductsReducer';
import {IProductsStateDTO} from 'app/modules/products/IProductsStateDTO';
import {INITIAL_STATE} from 'app/modules/products/productsReduxConfig';


export class ProductsReducerFactory extends ReducerFactory<IProductsStateDTO>
  implements IReducerFactory<ProductsReducer, IProductsStateDTO> {

  constructor(req) {
    super(req, INITIAL_STATE as IProductsStateDTO);
  }


  create() {
    return new ProductsReducer(this.initialState, this.req);
  }
}
