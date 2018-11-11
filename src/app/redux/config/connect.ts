/* https://github.com/DefinitelyTyped/DefinitelyTyped/issues/9951 */
import * as React from 'react';
import {
  connect as originalConnect,
  MapDispatchToPropsParam,
  MapStateToPropsParam,
  MergeProps,
  Options,
} from 'react-redux';

export type TDispatchParams<TDispatchToProps> = {
  [key in keyof TDispatchToProps]: any
};

export type InferableComponentEnhancerWithProps<IInjectedProps, INeedsProps> =
  <IComponent extends React.ComponentType<IInjectedProps & INeedsProps>>(component: IComponent) => IComponent;

export interface IConnect {
  <IState = {}, IStateProps = {}, IDispatchProps = {}, IOwnProps = {}>(
    mapStateToProps?: MapStateToPropsParam<IStateProps, IOwnProps, IState>,
    mapDispatchToProps?: MapDispatchToPropsParam<IDispatchProps, IOwnProps> | TDispatchParams<IDispatchProps>,
  ): InferableComponentEnhancerWithProps<IStateProps & IDispatchProps, IOwnProps>;

  <IState = {}, IStateProps = {}, IDispatchProps = {}, IOwnProps = {}, IMergedProps = {}>(
    mapStateToProps?: MapStateToPropsParam<IStateProps, IOwnProps, IState>,
    mapDispatchToProps?: MapDispatchToPropsParam<IDispatchProps, IOwnProps> | TDispatchParams<IDispatchProps>,
    mergeProps?: MergeProps<IStateProps, IDispatchProps, IOwnProps, IMergedProps>,
    options?: Options<IStateProps, IOwnProps, IMergedProps>,
  ): InferableComponentEnhancerWithProps<IMergedProps, IOwnProps>;

}

export const connect = originalConnect as IConnect;
