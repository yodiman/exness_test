import {ICartProductDTO} from 'app/modules/cart/ICartProductDTO';
import {OrderDirection} from 'app/constants/OrderDirection';


export interface ICartStateDTO {
  readonly activeOrderField: TCartStateOrderField;
  readonly cartProductsList: {
    data: ICartProductDTO[];
    loading: boolean;
  };
  readonly order: TCartStateOrder;
}


export type TCartStateOrderField = keyof ICartStateDTO['order'];
export type TCartStateOrder = {[key in keyof Pick<ICartProductDTO, 'count' | 'name' | 'price'>]: OrderDirection};
