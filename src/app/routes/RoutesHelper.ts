export default class RoutesHelper {
  static paths = {
    cart: '/cart',
    products: '/',
  };


  static getPath<TParams = {}>(path: string, params: TParams = {} as TParams, keepOptional = false): string {
    let result = path;
    const replaceFn = (value: string | number) =>
      (fullPath: string, prefix: string, match: string, postfix: string) =>
        match ? `${prefix}${value}${postfix || ''}` : fullPath;

    Object.entries(params).map(([param, value]: [string, string | number]) => {
      if (value !== undefined) {
        const regexp = new RegExp(`(.+\/)(:${param}[\?]?)(\/+.*)?$`);
        result = result.replace(regexp, replaceFn(value));
      }
    });

    if (!keepOptional) {
      const optionalRegexp = /(.+\/)(:.+[?])(\/+.*)?/;
      let optResult = result.replace(optionalRegexp, replaceFn(''));
      while (optResult !== result) {
        result = optResult;
        optResult = result.replace(optionalRegexp, replaceFn(''));
      }
    }

    result = result.replace(/\/{2,}$/igm, '/');

    return result;
  }


  static getRouterPath<TParams = {}>(path: string, params: TParams = {} as TParams) {
    return RoutesHelper.getPath<TParams>(path, params, true);
  }
}
