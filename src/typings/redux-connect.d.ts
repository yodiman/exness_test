/* tslint:disable */
declare module 'redux-connect' {
  import * as React from 'react';

  export interface ReduxAsyncConnectProps {
    routes?: any,
    helpers?: any,
  }

  export class ReduxAsyncConnect extends React.Component<ReduxAsyncConnectProps, {}> { }

  export function loadOnServer(params: any): void

  export function reducer(params: any): any

  export function asyncConnect(params: any): any
}
/* tslint:enable */
