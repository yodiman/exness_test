import * as Superagent from 'superagent';
import * as Express from 'express';
import {IResponse} from 'app/interfaces/IResponse';
import {IRequestOptions} from 'app/interfaces/IRequestOptions';
import autobind from 'autobind-decorator';
import config from 'app/config/config';

type TApiClientMethod = (url: string, options?: IRequestOptions) => IResponse<any>;


export default class ApiClient {
  get: TApiClientMethod = this.defineMethod('get');

  post: TApiClientMethod = this.defineMethod('post');

  put: TApiClientMethod = this.defineMethod('put');

  patch: TApiClientMethod = this.defineMethod('patch');

  del: TApiClientMethod = this.defineMethod('del');

  clientRequest: Express.Request;


  constructor(clientRequest?: Express.Request) {
    this.clientRequest = clientRequest;
  }


  @autobind
  private defineMethod(method: string): TApiClientMethod {
    const {hostUrl} = config.env;

    return (path: string, options: IRequestOptions = {}) => {
      const {params, data} = options;
      console.log(`[${method.toUpperCase()}] API request: ${path}`);
      const endpoint = __SERVER__ ? `${hostUrl}${path}` : path;
      const apiRequest: Superagent.Request = Superagent[method](endpoint);

      const promise = new Promise((resolve, reject) => {
        this.setServerHeaders(apiRequest);

        if (params) {
          apiRequest.query(params);
        }

        if (data) {
          apiRequest.send(data);
        }

        // should be here to have ability to use .on handler in components. In other case if .on after .end - handler never be triggered
        apiRequest.on('progress', () => null);

        apiRequest.end((err: Superagent.ResponseError, res: Superagent.Response) => {
          const error = err || res.error;
          return error ? reject(error) : resolve(res.body);
        });
      });

      return {promise, request: apiRequest} as IResponse<any>;
    };
  }


  @autobind
  private setServerHeaders(apiRequest: Superagent.Request) {
    if (__SERVER__) {
      const cookie = this.clientRequest.get('cookie');
      if (cookie) {
        apiRequest.set('cookie', cookie);
      }

      const userAgent = this.clientRequest.get('user-agent');
      if (userAgent) {
        apiRequest.set('User-Agent', userAgent);
      }
    }
  }
}
