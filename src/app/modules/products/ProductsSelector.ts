import {createSelector} from 'reselect';
import {IStateDTO} from 'app/redux/dto/IStateDTO';
import {IProductDTO} from 'app/modules/products/IProductDTO';
import {IProductsService} from 'app/modules/products/IProductsService';
import ProductsService from 'app/modules/products/ProductsService';


export default class ProductsSelector {
  private productsService: IProductsService;
  private getProducts = (state: IStateDTO): IProductDTO[] => state.products.productsList.data;


  constructor(productsService: IProductsService) {
    this.productsService = productsService;
  }

  selectProducts = createSelector<IStateDTO, IProductDTO[], IProductDTO[]>(
    [this.getProducts],
    (products: IProductDTO[]): IProductDTO[] => this.productsService.processProducts(products)
  );
}


export const productsSelector = new ProductsSelector(new ProductsService());
