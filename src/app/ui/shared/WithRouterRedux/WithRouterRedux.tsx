import * as React from 'react';
import {IWithRouterReduxDispatchToProps, TWithRouterReduxComponent} from 'app/ui/shared/WithRouterRedux/IWithRouterRedux';
import {connect} from 'app/redux/config/connect';
import {IStateDTO} from 'app/redux/dto/IStateDTO';
import {push, replace} from 'react-router-redux';


export default function withRouterRedux(Component: TWithRouterReduxComponent) {
  @connect<IStateDTO, {}, IWithRouterReduxDispatchToProps>(
    null,
    {
      pushState: push,
      replaceState: replace,
    },
  )
  class WithRouterRedux extends React.Component<IWithRouterReduxDispatchToProps> {
    render(): JSX.Element {
      return <Component {...this.props} />;
    }
  }

  return WithRouterRedux;
}
