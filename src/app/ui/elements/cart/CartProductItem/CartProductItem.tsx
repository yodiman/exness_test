import * as React from 'react';
import * as classNames from 'classnames/bind';
import {ICartProductDTO} from 'app/modules/cart/ICartProductDTO';
import ListItem from 'app/ui/shared/ListItem/ListItem';
import ProductPrice from 'app/ui/elements/products/ProductPrice/ProductPrice';
import ProductName from 'app/ui/elements/products/ProductName/ProductName';
import Button from 'app/ui/shared/Button/Button';
import autobind from 'autobind-decorator';
import withCartActions from 'app/ui/elements/cart/WithCartActions/WithCartActions';
import {IWithCartActionsInjectedProps} from 'app/ui/elements/cart/WithCartActions/IWithCartActions';

const styles = require('./CartProductItem.scss');

export interface ICartProductItemProps extends IWithCartActionsInjectedProps {
  className?: string;
  product: ICartProductDTO;
}


@(withCartActions as any)
export default class CartProductItem extends React.PureComponent<ICartProductItemProps> {
  @autobind
  private increaseCount(): void {
    const {changeCount, product} = this.props;
    changeCount(product.id, 1);
  }

  @autobind
  private decreaseCount(): void {
    const {changeCount, product} = this.props;
    changeCount(product.id, -1);
  }

  @autobind
  private delete(): void {
    const {deleteFromCart, product} = this.props;
    deleteFromCart(product.id);
  }


  render(): JSX.Element {
    const {className, product} = this.props;

    return (
      <ListItem className={classNames(styles.item, className)}>
        <ProductName name={product.name} />
        <ProductPrice price={product.price} />
        <div>{product.count}</div>
        <div className={styles.buttons}>
          <Button theme={'warning'} onClick={this.decreaseCount}>−</Button>
          <Button theme={'success'} onClick={this.increaseCount}>+</Button>
          <Button theme={'danger'} onClick={this.delete}>✘</Button>
        </div>
      </ListItem>
    );
  }
}
