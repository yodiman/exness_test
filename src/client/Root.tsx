import * as React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {ReduxAsyncConnect} from 'redux-connect';
import {Store} from 'redux';
import {IStateDTO} from 'app/redux/dto/IStateDTO';
import {History} from 'history';
import {IRoute} from 'app/routes/IRoute';

export interface IRootProps {
  history: History;
  routes: IRoute[];
  store: Store<IStateDTO>;
}

export default function Root(props: IRootProps) {
  const {history, routes, store} = props;

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ReduxAsyncConnect routes={routes} />
      </ConnectedRouter>
    </Provider>
  );
}
