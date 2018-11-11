import {IProductsService} from 'app/modules/products/IProductsService';
import {IProductDTO} from 'app/modules/products/IProductDTO';


export default class ProductsService implements IProductsService {
  processProduct(product: IProductDTO): IProductDTO {
    // may be some data processing here
    return product;
  }


  processProducts(products: IProductDTO[]): IProductDTO[] {
    return products.map(this.processProduct);
  }
}
