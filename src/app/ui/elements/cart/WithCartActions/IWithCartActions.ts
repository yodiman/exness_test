import * as React from 'react';
import * as IActions from 'app/modules/cart/ICartActions';


export interface IWithCartActionsDispatchToProps {
  addToCart?: IActions.TAddToCartFunc;
  changeCount?: IActions.TChangeCountFunc;
  deleteFromCart?: IActions.TDeleteFromCartFunc;
  reorder?: IActions.TReorderFunc;
}

export interface IWithCartActionsInjectedProps extends IWithCartActionsDispatchToProps {}

export type TWithCartActionsComponent<TProps = IWithCartActionsInjectedProps> = new() => React.Component<TProps>;
