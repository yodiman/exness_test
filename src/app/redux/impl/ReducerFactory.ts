import {Request} from 'express';
import * as clone from 'clone';


export abstract class ReducerFactory<TState> {
  req: Request;
  initialState: TState;

  protected constructor(req: Request, initialState: TState) {
    this.req = req;
    this.initialState = clone(initialState);
  }

  create() {} // tslint:disable-line:no-empty
}

