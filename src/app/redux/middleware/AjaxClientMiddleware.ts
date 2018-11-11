import {IResponse} from 'app/interfaces/IResponse';
import autobind from 'autobind-decorator';
import ApiClient from 'helpers/ApiClient';
import {IAction} from 'app/redux/IAction';
import {toast} from 'react-toastify';

type TNextFunc = (action: IAction<any, any>) => void;

export default class AjaxClientMiddleware {
  private readonly client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }


  private onSuccess(result, action: IAction, next: TNextFunc) {
    const [, SUCCESS] = action.types;
    const actionParams = this.getActionParams(action);

    return next({...actionParams, result, type: SUCCESS});
  }


  private onError(error, action: IAction, next: TNextFunc) {
    const [, , FAILURE] = action.types;
    const message = error.response && error.response.body ? error.response.body.message : error.toString();
    if (!__SERVER__) {
      toast(message, {type: toast.TYPE.ERROR});
    }
    const actionParams = this.getActionParams(action);

    return next({...actionParams, error, type: FAILURE});
  }


  private getActionParams(action: IAction): Partial<IAction> {
    const {promise, types, payload, ...actionParams} = action;

    return payload ? {payload} : actionParams;
  }


  @autobind
  middleware({dispatch, getState}) {
    return (next: TNextFunc) => (action: IAction | Function) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      if (!action.promise) {
        return next(action);
      }
      const actionParams = this.getActionParams(action);
      const [REQUEST] = action.types;

      next({...actionParams, type: REQUEST});

      const actionResult: IResponse<any> = action.promise(this.client);

      actionResult.promise
        .then(
          result => this.onSuccess(result, action, next),
          error => this.onError(error, action, next),
        )
        .catch(error => this.onError(error, action, next));

      actionResult.awaiter = new Promise(resolve => {
        actionResult.promise
          .then(
            resp => resolve([resp, null]),
            err => resolve([null, err]),
          )
          .catch(err => resolve([null, err]));
      });

      return actionResult;
    };
  }
}
