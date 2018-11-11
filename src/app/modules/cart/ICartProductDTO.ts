import {IProductDTO} from 'app/modules/products/IProductDTO';

export interface ICartDTO {
  count: number;
  id: number;
}

export interface ICartProductDTO extends IProductDTO, ICartDTO {}
