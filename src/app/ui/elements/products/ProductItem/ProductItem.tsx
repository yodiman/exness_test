import * as React from 'react';
import {IProductDTO} from 'app/modules/products/IProductDTO';
import ProductName from 'app/ui/elements/products/ProductName/ProductName';
import ProductPrice from 'app/ui/elements/products/ProductPrice/ProductPrice';
import ProductThumb from 'app/ui/elements/products/ProductThumb/ProductThumb';
import GridItem from 'app/ui/shared/GridItem/GridItem';
import AddToCartButton from 'app/ui/elements/cart/AddToCartButton/AddToCartButton';

const styles = require('./ProductItem.scss');

export interface IProductItemProps {
  className?: string;
  product: IProductDTO;
}


export default class ProductItem extends React.PureComponent<IProductItemProps> {
  static defaultProps: Partial<IProductItemProps> = {
    product: {} as IProductDTO,
  };


  render(): JSX.Element {
    const {className, product} = this.props;

    return (
      <GridItem className={className} contentClassName={styles.content}>
        <ProductThumb url={product.imageUrl} className={styles.thumb}>
          <div className={styles.info}>
            <ProductPrice price={product.price} className={styles.price} />
            <ProductName name={product.name} className={styles.name} />
          </div>
        </ProductThumb>
        <AddToCartButton product={product} />
      </GridItem>
    );
  }
}
