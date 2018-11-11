import * as React from 'react';


export interface IWithRouterReduxDispatchToProps {
  pushState?(path: string): void;
  replaceState?(path: string): void;
}

export interface IWithRouterReduxInjectedProps extends IWithRouterReduxDispatchToProps {}

export type TWithRouterReduxComponent<TProps = IWithRouterReduxInjectedProps> = new() => React.Component<TProps>;
