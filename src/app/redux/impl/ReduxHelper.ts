type TGetEnumActionTypes<K> = {[key in keyof K]: string};


export default class ReduxHelper {
  static generateActionTypes<TActionTypes>(actionTypes: TActionTypes, moduleName: string): TGetEnumActionTypes<TActionTypes> {
    const result = {} as TGetEnumActionTypes<TActionTypes>;
    Object.keys(actionTypes).map(key => {
      result[key] = `${moduleName}/${key}`;
    });

    return result;
  }


  static getRequestActionTypes(actionType: string): [string, string, string] {
    return [actionType, `${actionType}_SUCCESS`, `${actionType}_FAIL`];
  }
}
