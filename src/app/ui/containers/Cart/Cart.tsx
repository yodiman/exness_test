import * as React from 'react';
import Page from 'app/ui/shared/Page/Page';
import {asyncConnect} from 'redux-connect';
import CartFetch from 'app/ui/containers/Cart/CartFetch';
import ProductsLink from 'app/ui/elements/products/ProductsLink/ProductsLink';
import CartProductItem from 'app/ui/elements/cart/CartProductItem/CartProductItem';
import List from 'app/ui/shared/List/List';
import CartListHead from 'app/ui/elements/cart/CartListHead/CartListHead';
import CartProductsRenderer, {ICartProductsRendererInjectProps} from 'app/ui/elements/cart/CartProductsRenderer/CartProductsRenderer';
import autobind from 'autobind-decorator';
import CartSerialization from 'app/ui/elements/cart/CartSerialization/CartSerialization';

const styles = require('./Cart.scss');


export interface ICartProps {}


@asyncConnect([{promise: CartFetch.do}])
export default class Cart extends React.PureComponent<ICartProps> {
  @autobind
  private renderPage(props: ICartProductsRendererInjectProps): JSX.Element {
    const {cartProducts, loading} = props;

    return (
      <Page header="Cart" loading={loading}>
        <ProductsLink />

        <List className={styles.list}>
          <CartListHead />

          {cartProducts.map(product => (
            <CartProductItem
              key={product.id}
              product={product}
            />
          ))}
        </List>

        <CartSerialization products={cartProducts} />
      </Page>
    );
  }


  render(): JSX.Element {
    return (
      <CartProductsRenderer render={this.renderPage} />
    );
  }
}
