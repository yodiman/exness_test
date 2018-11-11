import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./Thumb.scss');

export interface IThumbProps {
  asBackground?: boolean;
  className?: string;
  url?: string;
}


export default class Thumb extends React.PureComponent<IThumbProps> {
  render() {
    const {url, className, asBackground} = this.props;

    if (asBackground) {
      return (
        <div
          style={{backgroundImage: `url('${url}')`}}
          className={classNames(styles.background, className)}
        />
      );
    }

    return (
      <img
        alt=""
        src={url}
        className={className}
        draggable={false}
      />
    );
  }
}
