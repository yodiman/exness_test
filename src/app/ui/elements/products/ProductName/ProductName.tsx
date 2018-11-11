import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./ProductName.scss');

export interface IProductNameProps {
  className?: string;
  name: string;
}


export default class ProductName extends React.PureComponent<IProductNameProps> {
  render(): JSX.Element {
    const {name, className} = this.props;

    return (
      <div className={classNames(styles.name, className)}>{name}</div>
    );
  }
}
