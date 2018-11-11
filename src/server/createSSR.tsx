import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {loadOnServer, ReduxAsyncConnect} from 'redux-connect';
import getRoutes from 'app/routes/routes';
import Html from './Html';
import ApiClient from 'helpers/ApiClient';
import configureStore from 'app/redux/config/store';
import * as url from 'url';


export default function createSSR(assets) {
  return async (req, res) => {
    const context: any = {};
    const history = createMemoryHistory({initialEntries: [req.url]});
    const client = new ApiClient(req);
    const store = configureStore(history, client, undefined, req);

    const routes = getRoutes();

    try {
      const location = url.parse(req.url);
      await loadOnServer({store, location, routes});
      if (res.headersSent) {
        return;
      }

      const component = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <ReduxAsyncConnect routes={routes} />
          </StaticRouter>
        </Provider>
      );

      const content = renderToString(
        <Html
          assets={assets}
          component={component}
          store={store}
        />
      );

      res.status(context.status || 200);

      return res.send(`<!doctype html>\n${content}`);
    } catch (err) {
      console.log(err);
    }
  };
}
