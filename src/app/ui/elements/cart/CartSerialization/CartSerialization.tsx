import * as React from 'react';
import {ICartProductDTO} from 'app/modules/cart/ICartProductDTO';

const styles = require('./CartSerialization.scss');

export interface ICartSerializationProps {
  products: ICartProductDTO[];
}


export default class CartSerialization extends React.PureComponent<ICartSerializationProps> {
  static defaultProps: Partial<ICartSerializationProps> = {
    products: [],
  };


  render(): JSX.Element {
    const {products} = this.props;

    if (!products.length) {
      return null;
    }

    return (
    <div className={styles.serialize}>
      В любой момент текущий список покупок может быть сериализован и отправлен на сервер
      <pre>
        {JSON.stringify(products)}
      </pre>
    </div>
    );
  }
}
