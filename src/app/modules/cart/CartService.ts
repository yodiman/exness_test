import {ICartService} from 'app/modules/cart/ICartService';
import {ICartDTO, ICartProductDTO} from 'app/modules/cart/ICartProductDTO';
import {IIdMap} from 'app/interfaces/IIdMap';
import CookieStorage from 'helpers/CookieStorage';
import CART_CONFIG from 'app/modules/cart/CartConfig';
import {OrderDirection} from 'app/constants/OrderDirection';
import {TCartStateOrderField} from 'app/modules/cart/ICartStateDTO';
import {StableSort} from 'helpers/StableSort';


export default class CartService implements ICartService {
  getIdMap(products: ICartProductDTO[]): IIdMap {
    return products.reduce(
      (accumulator: IIdMap, product: ICartProductDTO) => ({...accumulator, [product.id]: true}),
      {},
    );
  }


  processCartProduct(product: ICartProductDTO): ICartProductDTO {
    // may be some data processing here
    return product;
  }


  processCartProducts(products: ICartProductDTO[]): ICartProductDTO[] {
    return products.map(this.processCartProduct);
  }


  sortCartProducts(products: ICartProductDTO[], orderDirection: OrderDirection, orderField: TCartStateOrderField): ICartProductDTO[] {
    const sign = orderDirection === OrderDirection.asc ? 1 : -1;
    return StableSort.sort<ICartProductDTO>(products, ((product, nextProduct) => {
      if (product[orderField] > nextProduct[orderField]) {
        return sign;
      }
      if (product[orderField] < nextProduct[orderField]) {
        return -sign;
      }
      return 0;
    }));
  }


  updateCartStorage(cartProducts: ICartProductDTO[]): void {
    const cart: ICartDTO[] = cartProducts.map(cartProduct => ({id: cartProduct.id, count: cartProduct.count}));
    const cookieStorage = new CookieStorage();
    cookieStorage.set<ICartDTO[]>(CART_CONFIG.cookieName, cart);
  }
}
