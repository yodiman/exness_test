import * as React from 'react';
import * as classNames from 'classnames/bind';
import Thumb from 'app/ui/shared/Thumb/Thumb';

const styles = require('./ProductThumb.scss');

export interface IProductThumbProps {
  children?: JSX.Element | JSX.Element[];
  className?: string;
  url: string;
}


export default class ProductThumb extends React.PureComponent<IProductThumbProps> {
  render(): JSX.Element {
    const {url, className, children} = this.props;

    return (
      <div className={styles.thumbContainer}>
        <Thumb url={url} asBackground className={classNames(className, styles.thumb)} />
        {children}
      </div>
    );
  }
}
