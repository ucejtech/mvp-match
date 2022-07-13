import iziToast, { IziToastPosition } from 'izitoast';

export default {
  success: (
    message: string,
    header = 'Success',
    position: IziToastPosition = 'topRight'
  ) => {
    const title = header || 'Success';
    iziToast.success({ title, position, message });
  },
  error: (
    message: string,
    header = 'Error',
    position: IziToastPosition = 'topRight'
  ) => {
    const title = header || 'Error';
    iziToast.error({ title, position, message });
  },
  info: (
    message: string,
    header = 'Info',
    position: IziToastPosition = 'topRight'
  ) => {
    const title = header || 'Error';
    iziToast.info({ title, position, message });
  },
  warning: (
    message: string,
    header = 'Warning',
    position: IziToastPosition = 'topRight'
  ) => {
    const title = header || 'Warning';
    iziToast.warning({ title, position, message });
  }
};
