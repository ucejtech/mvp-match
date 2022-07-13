import store from '@/store';
import { BaseService } from './base.service';
import { ResponseWrapper } from './util';

export class ProjectService extends BaseService {
  static get entity(): string {
    return 'projects';
  }

  static async fetchAll(): Promise<ResponseWrapper | void> {
    try {
      const response = await this.request().get(`${this.entity}`);
      store.commit('project/SET_PROJECTS', response.data.data);
      return this.responseWrapper(response, response.data.data);
    } catch (e: any) {
      this.errorWrapper(e);
    }
  }
}
