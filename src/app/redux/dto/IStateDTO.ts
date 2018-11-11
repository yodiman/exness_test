import {IProductsStateDTO} from 'app/modules/products/IProductsStateDTO';
import {ICartStateDTO} from 'app/modules/cart/ICartStateDTO';


export interface IStateDTO {
  cart: ICartStateDTO;
  products: IProductsStateDTO;
}
