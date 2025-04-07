import { HttpMethod } from './http-method';
import { KeyValue } from './key-value';

export interface RequestResult<T = unknown> {
  status: number;
  headers: Record<string, string>;
  data: T;
  rawData: string;
  contentType?: string;
  parseError?: Error;
}

export interface RequestOptions {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  body?: string;
}

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  body: string;
  headers: KeyValue[];
}
