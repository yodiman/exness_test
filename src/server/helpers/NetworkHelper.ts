import {IResponsePromise} from 'app/interfaces/IResponsePromise';


export default class NetworkHelper {
  static async getSuccessResponse<TData = never>(data?: TData): Promise<IResponsePromise<TData>> {
    const response: IResponsePromise<TData> = {
      message: 'ok',
      response: data,
      code: 0,
      date: Date.now(),
      success: true,
    };

    return new Promise<IResponsePromise<TData>>(resolve => {
      setTimeout(() => resolve(response), Math.random() * 400 + 100);
    });
  }
}
