import * as React from 'react';
import {connect} from 'app/redux/config/connect';
import {IStateDTO} from 'app/redux/dto/IStateDTO';
import {cartSelector} from 'app/modules/cart/CartSelector';
import {ICartProductDTO} from 'app/modules/cart/ICartProductDTO';


export interface ICartProductsRendererInjectProps {
  cartProducts?: ICartProductDTO[];
  loading?: boolean;
}

export interface ICartProductsRendererProps extends ICartProductsRendererInjectProps {
  render(props: ICartProductsRendererInjectProps): JSX.Element;
}

@connect<IStateDTO, ICartProductsRendererInjectProps>(
  (state: IStateDTO): ICartProductsRendererInjectProps => ({
    cartProducts: cartSelector.selectCartProductsWithSorting(state),
    loading: state.cart.cartProductsList.loading,
  })
)
export default class CartProductsRenderer extends React.Component<ICartProductsRendererProps> {
  render(): JSX.Element {
    const {render, ...props} = this.props;
    return render(props);
  }
}
