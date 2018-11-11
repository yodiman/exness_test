export interface IRouter {
  action: 'POP' | 'REPLACE';
  length: number;
  location: {
    hash: string;
    pathname: string;
    search: string;
  };
}
