import {IAction} from 'app/redux/IAction';

export interface IBaseReducer<State> {
  action: IAction<any, any>;
  initialState: State;
  state: State;
  reducer: (state: State, action: IAction) => State;
}
