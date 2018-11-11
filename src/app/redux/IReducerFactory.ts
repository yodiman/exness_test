import {Request} from 'express';


export interface IReducerFactory<TReducer, TState> {
  req: Request;
  initialState: TState;
  create(): TReducer;
}
