import * as React from 'react';

export interface IRoute {
  component: Function | React.Component;
  exact?: boolean;
  path?: string;
  routes?: IRoute[];
}
