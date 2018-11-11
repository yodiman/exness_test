import * as React from 'react';
import ListItem from 'app/ui/shared/ListItem/ListItem';
import * as classNames from 'classnames/bind';
import CartListHeadCell from 'app/ui/elements/cart/CartListHead/CartListHeadCell';

const styles = require('./CartListHead.scss');

export interface ICartListHeadProps {
  className?: string;
}

export default class CartListHead extends React.PureComponent<ICartListHeadProps> {
  render(): JSX.Element {
    const {className} = this.props;

    return (
      <ListItem isTitle className={classNames(className, styles.head)}>
        <CartListHeadCell title="Name" fieldName={'name'} />
        <CartListHeadCell title="Price" fieldName={'price'} />
        <CartListHeadCell title="Count" fieldName={'count'} />
        <div />
      </ListItem>
    );
  }
}
