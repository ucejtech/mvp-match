/* eslint-disable max-classes-per-file */
/* eslint-disable no-underscore-dangle */
import { AxiosError, AxiosResponse } from 'axios';

/**
 * Return message for HTTP status code
 * @param {number} status - HTTP status code
 * @returns {string} Message of network operation
 */
function _getStatusMessage(status: number): string {
  let message = '';
  switch (status) {
    case 200:
      message = 'All done. Request successfully executed';
      break;
    case 201:
      message = 'Data successfully created';
      break;
    case 400:
      message = 'Bad Request';
      break;
    case 401:
      message = 'Need auth';
      break;
    case 404:
      message = 'Not found';
      break;
    case 503:
      message = 'Service unavailable. Try again later';
      break;
    default:
      message = 'Something wrong. Client default error message';
      break;
  }
  return message;
}

function _getResponseErrorMessage(error: AxiosError): string {
  if (error.response && error.response.data)
    return (error.response.data as Record<string, string>).message;
  if (error.response && error.response.statusText)
    return error.response.statusText;
  return error.message === 'Network Error'
    ? 'Oops! Network Error. Try again later'
    : error.message;
}

/**
 * Create instance, which represent response object
 * @param {Object} [data] - custom data
 * @param {Object} [response] - axios response object
 * @param {String} [message] - custom message to display
 */
export class ResponseWrapper<T = any> {
  message!: string | null;

  status!: number;

  data!: T;

  statusMessage!: string;

  constructor(response: AxiosResponse, data: T, message?: string | null) {
    this.data = data ? data : ({} as T);
    this.status = response.status;
    this.statusMessage = _getStatusMessage(this.status);
    this.message = message || null;
  }
}

/**
 * Create instance, which represent error object
 * @param {Object} [error] - axios error object
 * @param {String} [message] - custom message to display
 */
export class ErrorWrapper extends Error {
  status: number | boolean;

  statusMessage: string;

  constructor(error: AxiosError, message?: string | undefined) {
    super();
    this.status = error.response ? error.response.status : false;
    this.statusMessage = _getStatusMessage(this.status as number);
    this.message = message || _getResponseErrorMessage(error);
  }
}
