import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./ListItem.scss');

export interface IListItemProps {
  children?: JSX.Element | JSX.Element[];
  className?: string;
  isTitle?: boolean;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
}

export default class ListItem extends React.PureComponent<IListItemProps> {
  static defaultProps: Partial<IListItemProps> = {
    children: null,
    onClick: () => null,
  };


  render(): JSX.Element {
    const {children, className, onClick, isTitle} = this.props;

    return (
      <li
        className={classNames(className, styles.item, {[styles.title]: isTitle})}
        onClick={onClick}
      >
        {children}
      </li>
    );
  }
}
