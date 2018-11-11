import {ICartProductDTO} from 'app/modules/cart/ICartProductDTO';
import {IIdMap} from 'app/interfaces/IIdMap';
import {OrderDirection} from 'app/constants/OrderDirection';
import {TCartStateOrderField} from 'app/modules/cart/ICartStateDTO';


export interface ICartService {
  getIdMap(products: ICartProductDTO[]): IIdMap;

  processCartProduct(product: ICartProductDTO): ICartProductDTO;

  processCartProducts(products: ICartProductDTO[]): ICartProductDTO[];

  sortCartProducts(products: ICartProductDTO[], orderDirection: OrderDirection, orderField: TCartStateOrderField): ICartProductDTO[];

  updateCartStorage(cartProducts: ICartProductDTO[]): void;
}
