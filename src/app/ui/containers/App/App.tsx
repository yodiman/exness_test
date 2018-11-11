import * as React from 'react';
import renderRoutes from 'react-router-config/renderRoutes';
import config from 'app/config/config';
import Helmet from 'react-helmet';
import {IRoute} from 'app/routes/IRoute';
import {toast, ToastContainer} from 'react-toastify';


export interface IAppProps {
  route: IRoute;
}

export default class App extends React.PureComponent<IAppProps> {
  static defaultProps: Partial<IAppProps> = {
    route: {} as IRoute,
  };


  render(): JSX.Element {
    const {route: {routes}} = this.props;

    return (
      <div>
        <Helmet {...config.app.head} />

        {renderRoutes(routes)}

        <ToastContainer
          position={toast.POSITION.BOTTOM_RIGHT}
          autoClose={3000}
        />
      </div>
    );
  }
}
