import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./List.scss');

export interface IListProps {
  children?: JSX.Element | Array<JSX.Element | JSX.Element[]>;
  className?: string;
}

export default class List extends React.PureComponent<IListProps> {
  render(): JSX.Element {
    const {children, className} = this.props;

    return (
      <div className={styles.wrapper}>
        <ul className={classNames(styles.container, className)}>
          {children}
        </ul>
      </div>
    );
  }
}
