<template>
  <div class="c-reports-header-actions">
    <base-dropdown
      v-model="projectId"
      item-text="name"
      item-value="projectId"
      :items="projects"
    >
      All Projects</base-dropdown
    >
    <base-dropdown
      v-model="gatewayId"
      item-text="name"
      item-value="gatewayId"
      :items="gateways"
      >All Gateways</base-dropdown
    >
    <base-calendar v-model="fromDate">From Date</base-calendar>
    <base-calendar v-model="toDate">To Date </base-calendar>
    <base-button variant="secondary" @click="$emit('generate:report')">
      Generate Report</base-button
    >
  </div>
</template>

<script lang="ts">
import { IFilterState } from '@/store/modules/filters';
import { IGateway, IProject } from '@/types/models';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const filters = namespace('filters');
const projects = namespace('project');
const gateways = namespace('gateway');

@Component
export default class ReportsActions extends Vue {
  gatewayId = '';
  projectId = '';
  fromDate = '2021-01-01';
  toDate = '2021-12-31';

  @Watch('gatewayId')
  @Watch('projectId')
  @Watch('fromDate')
  @Watch('toDate')
  saveFilters(): void {
    this.SET_FILTERS({
      gatewayId: this.gatewayId,
      projectId: this.projectId,
      fromDate: this.fromDate,
      toDate: this.toDate
    });
  }

  get projects() {
    return [{ name: 'All Projects', projectId: 'all' }, ...this.projectList];
  }
  get gateways() {
    return [{ name: 'All Gateways', projectId: 'all' }, ...this.gatewayList];
  }

  @filters.Mutation('SET_FILTERS')
  SET_FILTERS!: (filters: IFilterState) => void;

  @projects.Getter
  projectList!: IProject[];

  @gateways.Getter
  gatewayList!: IGateway[];
}
</script>

<style lang="scss" scoped>
.c-reports-header-actions {
  @apply flex items-center gap-[23px];
  overflow-x: inherit;
}
</style>
