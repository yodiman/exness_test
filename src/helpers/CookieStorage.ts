import {Cookies} from 'react-cookie';
import * as Express from 'express';


export default class CookieStorage {
  cookies: Cookies;


  constructor(req?: Express.Request) {
    this.cookies = new Cookies(req ? req.headers.cookie : null);
  }


  set<DTO extends {} = {}>(name: string, value: string | DTO, expires?: Date): void {
    this.cookies.set(name, value, {path: '/', expires});
  }


  setAsBoolean(name: string, value: string | number | boolean, expires?: Date): void {
    this.set(name, Number(value).toString(), expires);
  }


  get<DTO extends {} = {}>(name: string): string | DTO {
    return this.cookies.get(name);
  }


  getAsNumber(name: string): number {
    return Number(this.get(name));
  }


  getAsBoolean(name: string): boolean {
    return !!this.getAsNumber(name);
  }
}
