import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./Grid.scss');

export interface IGridProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}


export default class Grid extends React.PureComponent<IGridProps> {
  static defaultProps: Partial<IGridProps> = {
    children: null,
  };


  render(): JSX.Element {
    const {className, children} = this.props;

    return (
      <div className={classNames(styles.container, className)}>
        {children}
      </div>
    );
  }
}
