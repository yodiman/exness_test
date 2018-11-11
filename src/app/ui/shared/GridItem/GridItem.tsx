import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./GridItem.scss');

export interface IGridItemProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
  contentClassName?: string;
}


export default class GridItem extends React.PureComponent<IGridItemProps> {
  static defaultProps: Partial<IGridItemProps> = {
    children: null,
  };


  render(): JSX.Element {
    const {className, contentClassName, children} = this.props;

    return (
      <div className={classNames(styles.item, className)}>
        <div className={classNames(styles.content, contentClassName)}>
          {children}
        </div>
      </div>
    );
  }
}
