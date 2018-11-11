import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./ProductPrice.scss');

export interface IProductPriceProps {
  className?: string;
  price: number;
}


export default class ProductPrice extends React.PureComponent<IProductPriceProps> {
  render(): JSX.Element {
    const {price, className} = this.props;

    return (
      <div className={classNames(styles.price, className)}>{price}</div>
    );
  }
}
