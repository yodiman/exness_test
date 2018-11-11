import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from 'app/ui/shared/Button/Button';
import autobind from 'autobind-decorator';
import {IProductDTO} from 'app/modules/products/IProductDTO';
import withRouterRedux from 'app/ui/shared/WithRouterRedux/WithRouterRedux';
import {IWithRouterReduxInjectedProps} from 'app/ui/shared/WithRouterRedux/IWithRouterRedux';
import RoutesHelper from 'app/routes/RoutesHelper';
import {connect} from 'app/redux/config/connect';
import {IStateDTO} from 'app/redux/dto/IStateDTO';
import {cartSelector} from 'app/modules/cart/CartSelector';
import {IIdMap} from 'app/interfaces/IIdMap';
import withCartActions from 'app/ui/elements/cart/WithCartActions/WithCartActions';
import {IWithCartActionsInjectedProps} from 'app/ui/elements/cart/WithCartActions/IWithCartActions';

const styles = require('./AddToCartButton.scss');


interface IStateToProps {
  productsIdMap?: IIdMap;
}

export interface IAddToCartButtonProps extends IWithRouterReduxInjectedProps, IWithCartActionsInjectedProps, IStateToProps {
  className?: string;
  product: IProductDTO;
}


@connect<IStateDTO, IStateToProps>(
  (state: IStateDTO): IStateToProps => ({
    productsIdMap: cartSelector.selectCartProductsIdMap(state),
  })
)
@(withRouterRedux as any)
@(withCartActions as any)
export default class AddToCartButton extends React.PureComponent<IAddToCartButtonProps> {
  static defaultProps: Partial<IAddToCartButtonProps> = {
    product: {} as IProductDTO,
  };


  private isProductInCart(): boolean {
    const {product, productsIdMap} = this.props;
    return productsIdMap[product.id];
  }


  @autobind
  private onClickHandler(): void {
    const {product, pushState, addToCart} = this.props;
    const isInCart = this.isProductInCart();
    if (isInCart) {
      pushState(RoutesHelper.getPath(RoutesHelper.paths.cart));
    } else {
      addToCart(product);
    }
  }


  render(): JSX.Element {
    const {className} = this.props;
    const isInCart = this.isProductInCart();
    const title = isInCart ? 'Go to cart' : 'Add to cart';

    return (
      <Button
        theme={isInCart ? 'success' : 'primary'}
        className={classNames(styles.button, className)}
        onClick={this.onClickHandler}
      >
        {title}
      </Button>
    );
  }
}
