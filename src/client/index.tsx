import * as React from 'react';
import {hydrate} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Redbox from 'redbox-react';
import createBrowserHistory from 'history/createBrowserHistory';
import {History} from 'history';
import Root, {IRootProps} from './Root';
import ApiClient from 'helpers/ApiClient';
import getRoutes from 'app/routes/routes';
import configureStore from 'app/redux/config/store';
import {Store} from 'redux';
import {IStateDTO} from 'app/redux/dto/IStateDTO';
import {IRoute} from 'app/routes/IRoute';
import config from 'app/config/config';

const {isProduction} = config.env;
const dest = document.getElementById('root');


function hydrateApp(props: IRootProps) {
  return hydrate(
    isProduction ?
      <Root {...props} />
      :
      <AppContainer errorReporter={Redbox} warnings={false}>
        <Root {...props} />
      </AppContainer>,
    dest,
  );
}


function hot(store: Store<IStateDTO>, history: History) {
  const isString = (str: any) => typeof str === 'string';
  const orgError = console.error;
  console.error = (...args: any[]) => {
    if (
      args
      && args.length === 1
      && isString(args[0])
      && args[0].indexOf('You cannot change <Router ') > -1
    ) {
      // React route changed
    } else {
      // Log the error as normally
      orgError.apply(console, args);
    }
  };

  (module as any).hot.accept('../app/routes/routes', () => {
    const nextRoutes: (store: Store<IStateDTO>) => IRoute[] = require('../app/routes/routes').default;
    hydrateApp({routes: nextRoutes(store), store, history});
  });
}


function init() {
  const apiClient = new ApiClient();
  const initialState = window.__INITIAL_STATE__;
  const history = createBrowserHistory();
  const store = configureStore(history, apiClient, initialState);
  const routes: IRoute[] = getRoutes();

  hydrateApp({store, history, routes});

  if (!isProduction && (module as any).hot) {
    hot(store, history);
  }
}


init();
