import {combineReducers, Reducer} from 'redux';
import {routerReducer as router} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';
import {Request} from 'express';
import {ProductsReducerFactory} from 'app/modules/products/ProductsReducerFactory';
import {CartReducerFactory} from 'app/modules/cart/CartReducerFactory';
import {IStateDTO} from 'app/redux/dto/IStateDTO';


export default function createReducer(req: Request) {
  const productsReducer = new ProductsReducerFactory(req).create();
  const cartReducer = new CartReducerFactory(req).create();

  const appReducers: {[key in keyof IStateDTO]: Reducer<any> } = {
    cart: cartReducer.reducer,
    products: productsReducer.reducer,
  };

  return combineReducers({
    router,
    reduxAsyncConnect,
    ...appReducers,
  });
}
