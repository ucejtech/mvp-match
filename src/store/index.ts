import Vue from 'vue';
import Vuex from 'vuex';
import { GatewayModule } from './modules/gateway';
import { ProjectModule } from './modules/project';
import { RootState } from './store.interface';
import { FiltersModule } from './modules/filters';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    isReportAnalyticsVisible: false
  },
  mutations: {
    SET_GRAPH_VISIBILITY(state, status) {
      state.isReportAnalyticsVisible = status;
    }
  },
  modules: {
    gateway: GatewayModule,
    project: ProjectModule,
    filters: FiltersModule
  }
});
