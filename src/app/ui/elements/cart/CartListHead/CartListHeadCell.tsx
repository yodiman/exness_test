import * as React from 'react';
import autobind from 'autobind-decorator';
import * as classNames from 'classnames/bind';
import {TCartStateOrderField} from 'app/modules/cart/ICartStateDTO';
import CartOrderRenderer, {ICartOrderRendererInjectProps} from 'app/ui/elements/cart/CartOrderRenderer/CartOrderRenderer';
import withCartActions from 'app/ui/elements/cart/WithCartActions/WithCartActions';
import {IWithCartActionsInjectedProps} from 'app/ui/elements/cart/WithCartActions/IWithCartActions';

const styles = require('./CartListHeadCell.scss');

export interface ICartListHeadCellProps extends IWithCartActionsInjectedProps {
  className?: string;
  fieldName: TCartStateOrderField;
  title: string;
}


@(withCartActions as any)
export default class CartListHeadCell extends React.PureComponent<ICartListHeadCellProps> {
  @autobind
  private reorder(): void {
    const {fieldName, reorder} = this.props;
    reorder(fieldName);
  }


  @autobind
  private renderChild(props: ICartOrderRendererInjectProps): JSX.Element {
    const {className, title, fieldName} = this.props;
    const {activeOrderField, order} = props;
    const cellClassName = classNames(className, styles.cell, order[fieldName], {
      [styles.active]: activeOrderField === fieldName,
    });

    return (
      <div
        onClick={this.reorder}
        className={cellClassName}
      >
        {title}
      </div>
    );
  }


  render(): JSX.Element {
    return (
      <CartOrderRenderer render={this.renderChild} />
    );
  }
}
