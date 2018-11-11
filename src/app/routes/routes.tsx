import App from 'app/ui/containers/App/App';
import NotFound from 'app/ui/containers/NotFound/NotFound';
import {IRoute} from 'app/routes/IRoute';
import Products from 'app/ui/containers/Products/Products';
import RoutesHelper from 'app/routes/RoutesHelper';
import Cart from 'app/ui/containers/Cart/Cart';


export default function routes(): IRoute[] {
  return [{
    component: App,
    routes: [{
      path: RoutesHelper.getRouterPath(RoutesHelper.paths.products),
      exact: true,
      component: Products,
    }, {
      path: RoutesHelper.getRouterPath(RoutesHelper.paths.cart),
      exact: true,
      component: Cart,
    }, {
      path: '*',
      component: NotFound,
    }],
  }];
}
