import {IProductDTO} from 'app/modules/products/IProductDTO';

export interface IProductsStateDTO {
  readonly productsList: {
    data: IProductDTO[];
    loading: boolean;
  };
}
