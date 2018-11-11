import {createSelector} from 'reselect';
import {IStateDTO} from 'app/redux/dto/IStateDTO';
import {ICartService} from 'app/modules/cart/ICartService';
import {ICartProductDTO} from 'app/modules/cart/ICartProductDTO';
import {IIdMap} from 'app/interfaces/IIdMap';
import {OrderDirection} from 'app/constants/OrderDirection';
import {TCartStateOrder, TCartStateOrderField} from 'app/modules/cart/ICartStateDTO';
import CartService from 'app/modules/cart/CartService';


export default class CartSelector {
  private cartService: ICartService;
  private getCartProducts = (state: IStateDTO): ICartProductDTO[] => state.cart.cartProductsList.data;
  private getCartOrder = (state: IStateDTO): TCartStateOrder => state.cart.order;
  private getCartOrderField = (state: IStateDTO): TCartStateOrderField => state.cart.activeOrderField;


  constructor(cartService: ICartService) {
    this.cartService = cartService;
  }


  selectCartProducts = createSelector<IStateDTO, ICartProductDTO[], ICartProductDTO[]>(
    [this.getCartProducts],
    (products: ICartProductDTO[]): ICartProductDTO[] => this.cartService.processCartProducts(products)
  );


  selectCartOrder = createSelector<IStateDTO, TCartStateOrder, TCartStateOrder>(
    [this.getCartOrder],
    (orderDirection: TCartStateOrder): TCartStateOrder => orderDirection,
  );


  selectCartOrderDirection = createSelector<IStateDTO, TCartStateOrder, TCartStateOrderField, OrderDirection>(
    [this.selectCartOrder, this.getCartOrderField],
    (order: TCartStateOrder, orderField: TCartStateOrderField): OrderDirection => order[orderField],
  );


  selectCartProductsWithSorting = createSelector<IStateDTO, ICartProductDTO[], OrderDirection, TCartStateOrderField, ICartProductDTO[]>(
    [this.selectCartProducts, this.selectCartOrderDirection, this.getCartOrderField],
    (products: ICartProductDTO[], orderDirection: OrderDirection, orderField: TCartStateOrderField): ICartProductDTO[] =>
      this.cartService.sortCartProducts([...products], orderDirection, orderField),
  );


  selectCartProductsIdMap = createSelector<IStateDTO, ICartProductDTO[], IIdMap>(
    [this.getCartProducts],
    (products: ICartProductDTO[]): IIdMap => this.cartService.getIdMap(products),
  );
}


export const cartSelector = new CartSelector(new CartService());
