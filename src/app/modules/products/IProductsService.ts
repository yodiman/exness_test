import {IProductDTO} from 'app/modules/products/IProductDTO';

export interface IProductsService {
  processProduct(product: IProductDTO): IProductDTO;

  processProducts(products: IProductDTO[]): IProductDTO[];
}
