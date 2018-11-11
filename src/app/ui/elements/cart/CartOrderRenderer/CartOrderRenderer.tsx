import * as React from 'react';
import {connect} from 'app/redux/config/connect';
import {IStateDTO} from 'app/redux/dto/IStateDTO';
import {cartSelector} from 'app/modules/cart/CartSelector';
import {TCartStateOrder, TCartStateOrderField} from 'app/modules/cart/ICartStateDTO';


export interface ICartOrderRendererInjectProps {
  activeOrderField?: TCartStateOrderField;
  order?: TCartStateOrder;
}

export interface ICartOrderRendererProps extends ICartOrderRendererInjectProps {
  render(props: ICartOrderRendererInjectProps): JSX.Element;
}

@connect<IStateDTO, ICartOrderRendererInjectProps>(
  (state: IStateDTO): ICartOrderRendererInjectProps => ({
    activeOrderField: state.cart.activeOrderField,
    order: cartSelector.selectCartOrder(state),
  })
)
export default class CartOrderRenderer extends React.PureComponent<ICartOrderRendererProps> {
  render(): JSX.Element {
    const {render, ...props} = this.props;
    return render(props);
  }
}
