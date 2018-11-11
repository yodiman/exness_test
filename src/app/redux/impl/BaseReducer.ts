import autobind from 'autobind-decorator';
import {IAction} from 'app/redux/IAction';
import {IBaseReducer} from 'app/redux/IBaseReducer';
import {Request} from 'express';


export default class BaseReducer<TState> implements IBaseReducer<TState> {
  action: IAction<any, any>;
  state: TState;
  initialState: TState;
  req: Express.Request;


  constructor(initialState: TState = {} as TState, req?: Request) {
    this.initialState = initialState;
    this.req = req;
  }


  RESET(): TState {
    return this.initialState;
  }


  @autobind
  reducer(state: TState = this.initialState, action: IAction = {}) {
    this.action = action;
    this.state = state;
    const method = this[action.type];
    return method ? method.apply(this, [action]) : this.state;
  }
}
