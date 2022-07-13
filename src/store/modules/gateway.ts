import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { IGateway } from '../../types/models';
import { RootState } from '../store.interface';

export interface IGatewayState {
  gateways: IGateway[];
}

@Module({
  namespaced: true
})
export class GatewayModule extends VuexModule<IGatewayState, RootState> {
  gateways: IGatewayState['gateways'] = [];

  get gatewayList() {
    return this.gateways;
  }

  @Mutation
  SET_GATEWAYS(gateways: IGateway[]): void {
    this.gateways = gateways;
  }
}
