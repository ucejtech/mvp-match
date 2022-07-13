import { IziToastPosition } from 'izitoast';

export interface IToastObject {
  success: (
    message: string,
    header?: string,
    position?: IziToastPosition
  ) => void;
  error: (
    message: string,
    header?: string,
    position?: IziToastPosition
  ) => void;
  info: (message: string, header?: string, position?: IziToastPosition) => void;
  warning: (
    message: string,
    header?: string,
    position?: IziToastPosition
  ) => void;
}

export interface IReportForm {
  projectId?: string;
  from?: string;
  to?: string;
  gatewayId?: string;
}
