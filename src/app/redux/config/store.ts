import {applyMiddleware, compose, createStore, Middleware, Store} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import createReducer from './reducer';
import AjaxClientMiddleware from 'app/redux/middleware/AjaxClientMiddleware';
import {Request} from 'express';
import ApiClient from 'helpers/ApiClient';
import {History} from 'history';
import {IStateDTO} from 'app/redux/dto/IStateDTO';


export default function configureStore(
  history: History,
  apiClient: ApiClient,
  initialState: IStateDTO = {} as IStateDTO,
  req?: Request,
): Store<IStateDTO> {
  const reducer = createReducer(req);
  const ajaxClientMiddleware = new AjaxClientMiddleware(apiClient);
  const middlewares = [
    ajaxClientMiddleware.middleware as Middleware,
    routerMiddleware(history),
    thunk,
  ];

  const composeEnhancers =
    (global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    ) || compose;

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const initialValues = {...initialState, router: history};
  const store: Store<IStateDTO> = createStore(reducer, initialValues, enhancer) as Store<IStateDTO>;

  if ((module as any).hot) {
    (module as any).hot.accept('./reducer', () => {
      const createNextReducer = require('./reducer').default;
      const nextReducer = createNextReducer();
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
