import {IRoute} from 'app/routes/IRoute';
import {IStore} from 'app/redux/IStore';

export interface IFetchArgsDTO<TRouteParams = {}> {
  store: IStore;
  match: {
    path: string;
    url: string;
    isExact?: boolean;
    params: TRouteParams;
  };
  route: IRoute;
}
