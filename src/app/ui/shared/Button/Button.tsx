import * as React from 'react';
import * as classNames from 'classnames';
import Loader from 'app/ui/shared/Loader/Loader';
import autobind from 'autobind-decorator';

export type TButtonTheme =
  'danger' |
  'default' |
  'info' |
  'primary' |
  'success' |
  'warning';

export interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children?: JSX.Element | JSX.Element[] | string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?(ev: React.MouseEvent<HTMLButtonElement>): any;
  theme?: TButtonTheme;
  type?: 'button' | 'submit';
}

export default class Button extends React.PureComponent<IButtonProps> {
  static defaultProps: Partial<IButtonProps> = {
    loading: false,
    type: 'button',
  };


  @autobind
  private onClick(ev: React.MouseEvent<HTMLButtonElement>): void {
    const {loading, disabled, onClick} = this.props;
    if (onClick && !loading && !disabled) {
      return onClick(ev);
    }
  }


  render(): JSX.Element {
    const {loading, className, children, disabled, type, theme, ...rest} = this.props;
    const themeClass = theme ? `btn-${theme}` : '';

    return (
      <button
        {...rest}
        type={type}
        className={classNames(className, themeClass)}
        disabled={loading || disabled}
        onClick={this.onClick}
      >
        {children}
        <Loader mask show={loading} />
      </button>
    );
  }
}
