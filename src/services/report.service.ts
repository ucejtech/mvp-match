import { BaseService } from './base.service';
import { ResponseWrapper } from './util';
import { IReportForm } from '../types/interfaces';
import { IReport } from '@/types/models';

export class ReportService extends BaseService {
  static get entity(): string {
    return 'report';
  }

  static async fetch(
    data: IReportForm
  ): Promise<ResponseWrapper<IReport> | void> {
    try {
      const response = await this.request().post(`${this.entity}`, data);

      return this.responseWrapper(response, response.data.data);
    } catch (e: any) {
      this.errorWrapper(e);
    }
  }
}
