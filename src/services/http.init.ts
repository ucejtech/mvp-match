/**
 * HTTP request layer
 * if auth is required return patched axios instance(with access token in headers)
 * else return clear axios instance
 */
import axios, { AxiosInstance } from 'axios';

import { API_URL } from '../env';

interface IStatus {
  auth: unknown;
}

export class Http {
  isAuth: unknown;

  instance: AxiosInstance;

  constructor(status: IStatus | null) {
    this.isAuth = status && status.auth ? status.auth : false;
    this.instance = axios.create({
      baseURL: API_URL
    });
  }

  init(): AxiosInstance {
    return this.instance;
  }
}
