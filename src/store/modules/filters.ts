import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { RootState } from '../store.interface';

export interface IFilterState {
  toDate: string | null;
  fromDate: string | null;
  gatewayId: string | null;
  projectId: string | null;
}

@Module({
  namespaced: true
})
export class FiltersModule extends VuexModule<IFilterState, RootState> {
  toDate: IFilterState['toDate'] = '2021-12-31';
  fromDate: IFilterState['fromDate'] = '2021-01-01';
  projectId: IFilterState['projectId'] = null;
  gatewayId: IFilterState['gatewayId'] = null;

  get isFilteredByGateway() {
    return !!this.gatewayId;
  }

  get isFilteredByProject() {
    return !!this.projectId;
  }

  get filters() {
    return {
      toDate: this.toDate,
      fromDate: this.fromDate,
      projectId: this.projectId,
      gatewayId: this.gatewayId
    };
  }

  @Mutation
  SET_FILTERS(filters: IFilterState) {
    if (filters.toDate) this.toDate = filters.toDate;
    if (filters.fromDate) this.fromDate = filters.fromDate;
    if (filters.gatewayId && filters.gatewayId !== 'all')
      this.gatewayId = filters.gatewayId;
    else this.gatewayId = null;
    if (filters.projectId && filters.projectId !== 'all')
      this.projectId = filters.projectId;
    else this.projectId = null;
  }
}
