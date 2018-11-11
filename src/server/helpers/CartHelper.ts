import CookieStorage from 'helpers/CookieStorage';
import {ICartDTO, ICartProductDTO} from 'app/modules/cart/ICartProductDTO';
import CART_CONFIG from 'app/modules/cart/CartConfig';
import {IProductDTO} from 'app/modules/products/IProductDTO';
import ProductsHelper from './ProductsHelper';
import * as Express from 'express';


export default class CartHelper {
  static getCartProducts(req: Express.Request): ICartProductDTO[] {
    const cookieStorage = new CookieStorage(req);
    const cart: ICartDTO[] = cookieStorage.get<ICartDTO[]>(CART_CONFIG.cookieName) as ICartDTO[];
    let cartProducts: ICartProductDTO[] = [];

    if (cart) {
      cartProducts = cart.map(
        cartItem => {
          const product: IProductDTO = ProductsHelper.getProductById(cartItem.id);
          return {...product, ...cartItem};
        }
      );
    }

    return cartProducts;
  }
}
