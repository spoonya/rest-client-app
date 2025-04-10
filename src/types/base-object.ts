import { HttpMethod } from './http-method';

export interface BaseObject {
  [key: string]: string | null;
}

export interface HttpObject {
  [key: string]: RequestObject;
}

export interface RequestObject {
  method: HttpMethod;
  url: string;
  headers?: [string, string][][];
  body?: string;
}
