import * as React from 'react';
import Page from 'app/ui/shared/Page/Page';
import {asyncConnect} from 'redux-connect';
import ProductsFetch from 'app/ui/containers/Products/ProductsFetch';
import Grid from 'app/ui/shared/Grid/Grid';
import ProductItem from 'app/ui/elements/products/ProductItem/ProductItem';
import CartLink from 'app/ui/elements/cart/CartLink/CartLink';
import ProductsRenderer, {IProductsRendererInjectProps} from 'app/ui/elements/products/ProductsRenderer/ProductsRenderer';
import autobind from 'autobind-decorator';


export interface IProductsProps {}


@asyncConnect([{promise: ProductsFetch.do}])
export default class Products extends React.PureComponent<IProductsProps> {
  @autobind
  private renderPage(props: IProductsRendererInjectProps): JSX.Element {
    const {products, loading} = props;

    return (
      <Page header="Products" loading={loading}>
        <CartLink />

        <Grid>
          {products.map(product => (
            <ProductItem
              key={product.id}
              product={product}
            />
          ))}
        </Grid>
      </Page>
    );
  }


  render(): JSX.Element {
    return (
      <ProductsRenderer render={this.renderPage} />
    );
  }
}
