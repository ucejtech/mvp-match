import qs from 'qs';
import { Http } from './http.init';
import { ResponseWrapper, ErrorWrapper } from './util';
import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

export class BaseService {
  static get entity(): string {
    throw new Error('entity getter not defined');
  }
  /**
   * ------------------------------
   * @HELPERS
   * ------------------------------
   */

  static request(status = { auth: false }): AxiosInstance {
    return new Http(status).init();
  }

  static responseWrapper(
    ...rest: [AxiosResponse, Record<string, never>]
  ): ResponseWrapper {
    return new ResponseWrapper(...rest);
  }

  static errorWrapper(...rest: [AxiosError]): void {
    throw new ErrorWrapper(...rest);
  }

  static querystring(obj: Record<string, unknown>): string {
    return qs.stringify(obj, {
      encode: false
    });
  }
}
