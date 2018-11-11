import * as React from 'react';
import {connect} from 'app/redux/config/connect';
import {IStateDTO} from 'app/redux/dto/IStateDTO';
import {IWithCartActionsDispatchToProps, TWithCartActionsComponent} from 'app/ui/elements/cart/WithCartActions/IWithCartActions';
import CartActions from 'app/modules/cart/CartActions';

const cartActions = new CartActions();


export default function withCartActions(Component: TWithCartActionsComponent) {
  @connect<IStateDTO, {}, IWithCartActionsDispatchToProps>(
    null,
    {
      addToCart: cartActions.addToCart,
      changeCount: cartActions.changeCount,
      deleteFromCart: cartActions.deleteFromCart,
      reorder: cartActions.reorder,
    },
  )
  class WithCartActions extends React.Component<IWithCartActionsDispatchToProps> {
    render(): JSX.Element {
      return <Component {...this.props} />;
    }
  }

  return WithCartActions;
}
