import * as React from 'react';
import {connect} from 'app/redux/config/connect';
import {IStateDTO} from 'app/redux/dto/IStateDTO';
import {productsSelector} from 'app/modules/products/ProductsSelector';
import {IProductDTO} from 'app/modules/products/IProductDTO';


export interface IProductsRendererInjectProps {
  loading?: boolean;
  products?: IProductDTO[];
}

export interface IProductsRendererProps extends IProductsRendererInjectProps {
  render(props: IProductsRendererInjectProps): JSX.Element;
}

@connect<IStateDTO, IProductsRendererInjectProps>(
  (state: IStateDTO): IProductsRendererInjectProps => ({
    loading: state.products.productsList.loading,
    products: productsSelector.selectProducts(state),
  })
)
export default class ProductsRenderer extends React.Component<IProductsRendererProps> {
  render(): JSX.Element {
    const {render, ...props} = this.props;
    return render(props);
  }
}
