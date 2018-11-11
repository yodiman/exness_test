import BaseReducer from 'app/redux/impl/BaseReducer';
import {ICartStateDTO} from 'app/modules/cart/ICartStateDTO';
import {ACTION_TYPES} from 'app/modules/cart/cartReduxConfig';
import * as IActions from 'app/modules/cart/ICartActions';
import {ICartProductDTO} from 'app/modules/cart/ICartProductDTO';
import {OrderDirection} from 'app/constants/OrderDirection';


export class CartReducer extends BaseReducer<ICartStateDTO> {
  findProductById(productId) {
    const index: number =
      this.state.cartProductsList.data.findIndex(cartProduct => cartProduct.id === productId);
    const product = this.state.cartProductsList.data[index];

    return {index, product};
  }


  [ACTION_TYPES.FETCH_CART_PRODUCTS](): ICartStateDTO {
    return {
      ...this.state,
      cartProductsList: {
        ...this.state.cartProductsList,
        loading: true,
      },
    };
  }


  [ACTION_TYPES.FETCH_CART_PRODUCTS_FAIL](): ICartStateDTO {
    return {
      ...this.state,
      cartProductsList: {
        ...this.state.cartProductsList,
        loading: false,
      },
    };
  }


  [ACTION_TYPES.FETCH_CART_PRODUCTS_SUCCESS](): ICartStateDTO {
    const action: IActions.IFetchCartProducts['reducerAction'] = this.action;
    return {
      ...this.state,
      cartProductsList: {
        data: action.result.response,
        loading: false,
      },
    };
  }


  [ACTION_TYPES.ADD_TO_CART](): ICartStateDTO {
    const action: IActions.IAddToCart['reducerAction'] = this.action;
    const newProduct: ICartProductDTO = {
      ...action.payload.product,
      count: 1,
    };
    const searchResult = this.findProductById(action.payload.product.id);

    if (searchResult.product) {
      newProduct.count += searchResult.product.count;
    }

    return {
      ...this.state,
      cartProductsList: {
        ...this.state.cartProductsList,
        data: [...this.state.cartProductsList.data, newProduct],
      },
    };
  }


  [ACTION_TYPES.CHANGE_COUNT](): ICartStateDTO {
    const action: IActions.IChangeCount['reducerAction'] = this.action;
    const searchResult = this.findProductById(action.payload.productId);

    if (searchResult.product) {
      const updatedProduct: ICartProductDTO = {
        ...searchResult.product,
        count: searchResult.product.count + action.payload.increment,
      };

      if (updatedProduct.count < 1) {
        updatedProduct.count = 1;
      }
      const data: ICartProductDTO[] = [...this.state.cartProductsList.data];
      data[searchResult.index] = updatedProduct;

      return {
        ...this.state,
        cartProductsList: {
          ...this.state.cartProductsList,
          data,
        },
      };
    }

    return this.state;
  }


  [ACTION_TYPES.DELETE_FROM_CART](): ICartStateDTO {
    const action: IActions.IDeleteFromCart['reducerAction'] = this.action;
    const searchResult = this.findProductById(action.payload.productId);

    if (searchResult.product) {
      const data: ICartProductDTO[] = [...this.state.cartProductsList.data];
      data.splice(searchResult.index, 1);

      return {
        ...this.state,
        cartProductsList: {
          ...this.state.cartProductsList,
          data,
        },
      };
    }

    return this.state;
  }


  [ACTION_TYPES.REORDER](): ICartStateDTO {
    const action: IActions.IReorder['reducerAction'] = this.action;
    const isActiveField: boolean = this.state.activeOrderField === action.payload.fieldName;
    const newOrderDirection: OrderDirection = isActiveField
      ? (this.state.order[action.payload.fieldName] === OrderDirection.asc ? OrderDirection.desc : OrderDirection.asc)
      : this.state.order[action.payload.fieldName];

    return {
      ...this.state,
      activeOrderField: action.payload.fieldName,
      order: {
        ...this.state.order,
        [action.payload.fieldName]: newOrderDirection,
      },
    };
  }
}
