import store from '@/store';
import { BaseService } from './base.service';
import { ResponseWrapper } from './util';

export class GatewayService extends BaseService {
  static get entity(): string {
    return 'gateways';
  }

  static async fetchAll(): Promise<ResponseWrapper | void> {
    try {
      const response = await this.request().get(`${this.entity}`);
      store.commit('gateway/SET_GATEWAYS', response.data.data);
      return this.responseWrapper(response, response.data.data);
    } catch (e: any) {
      this.errorWrapper(e);
    }
  }
}
