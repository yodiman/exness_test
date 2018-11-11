import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./Loader.scss');


export interface ILoaderProps {
  alignCenter?: boolean;
  className?: string;
  color?: string;
  mask?: boolean;
  show?: boolean;
  size?: number;
  transparent?: boolean;
}

export default class Loader extends React.PureComponent<ILoaderProps> {
  static defaultProps: Partial<ILoaderProps> = {
    show: true,
    size: 40,
  };


  render(): JSX.Element {
    const {color, size, mask, className, transparent, alignCenter, show} = this.props;
    if (!show) {
      return null;
    }

    const loaderClass = classNames(className, styles.loader, {[styles.colored]: !color});

    const loadIndicator = (
      <div
        className={loaderClass}
        style={{width: `${size}px`}}
      >
        <svg className={styles.circular} viewBox="25 25 50 50">
          <circle className={styles.path} cx="50" cy="50" r="20" stroke={color || null} fill="none" />
        </svg>
      </div>
    );

    const indicator = (
      mask
        ? <div className={classNames(styles.mask, {[styles.transparent]: transparent})}>{loadIndicator}</div>
        : loadIndicator
    );

    if (alignCenter) {
      return <div className={styles.center}>{indicator}</div>;
    }

    return indicator;
  }
}
