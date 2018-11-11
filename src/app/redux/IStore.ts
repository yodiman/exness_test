import {IStateDTO} from 'app/redux/dto/IStateDTO';
import {Store} from 'redux';
import {IAction, IThunkAction} from 'app/redux/IAction';
import {IResponse} from 'app/interfaces/IResponse';
import {Omit} from 'app/interfaces/Omit';

export interface IStore<TState = IStateDTO> extends Omit<Store<TState>, 'dispatch'> {
  dispatch: <TResult = any>(action: IAction<any, any> | IThunkAction<any, any>) => IResponse<TResult>;
  getState(): TState;
}
