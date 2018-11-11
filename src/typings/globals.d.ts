/* tslint:disable */
import * as React from 'react';

declare global {
  const R: typeof React;
  const __SERVER__: boolean;
  const __CLIENT__: boolean;
  interface Window {
    __INITIAL_STATE__: any;
    React: typeof React;
    requestIdleCallback: Function;
  }
  namespace NodeJS {
    interface Global {
      __SERVER__: boolean;
      __CLIENT__: boolean;
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    }
    interface Process {
      noDeprecation: boolean;
    }
  }
}
/* tslint:enable */
