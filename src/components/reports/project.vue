<template>
  <div class="c-reports-project">
    <header
      class="c-reports-project__header"
      v-if="!hideHeader"
      @click="$emit('expand', data.projectId)"
    >
      <div class="c-reports-project__header-title">{{ data.name }}</div>
      <div class="c-reports-project__header-title">
        Total: {{ projectTotal | formatCurrency }}
      </div>
    </header>
    <base-table v-if="expand" :headers="header" :data="reports" class="mt-3">
      <template v-slot:created="{ item }">
        {{ item.created.split('-').reverse().join('/') }}
      </template>
      <template v-slot:gatewayId="{ item }">
        {{ getGatewayName(item.gatewayId) }}
      </template>
    </base-table>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-constant-condition */
import { IReportForm } from '@/types/interfaces';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { IFilters, IGateway, IProject, IReport } from '../../types/models';
import { ReportService } from '../../services/report.service';
import { ResponseWrapper } from '@/services/util';

const filters = namespace('filters');
const gateways = namespace('gateway');

@Component({
  model: {
    event: 'setTotal'
  }
})
export default class ReportsProject extends Vue {
  @Prop({ default: false })
  expand!: boolean;

  @Prop({ default: false })
  hideHeader!: boolean;

  @Prop()
  data!: IProject;

  header = [
    {
      title: 'Date',
      value: 'created'
    },
    {
      title: 'Transaction ID',
      value: 'paymentId'
    },
    {
      title: 'Amount (USD)',
      value: 'amount'
    }
  ];

  reports: IReport[] = [];

  @Watch('projectTotal')
  changeTotal(val: string | number) {
    this.$emit('setTotal', val);
  }

  get projectTotal() {
    const total = Math.round(
      this.reports.reduce((acc, curr) => acc + curr.amount, 0)
    );
    return total;
  }

  async loadReports() {
    const data: IReportForm = {
      projectId: this.data.projectId,
      ...(this.filters.fromDate ? { from: this.filters.fromDate } : null),
      ...(this.filters.toDate ? { to: this.filters.toDate } : null),
      ...(this.filters.gatewayId ? { gatewayId: this.filters.gatewayId } : null)
    };

    try {
      const reports = await ReportService.fetch(data);
      this.reports = (reports as ResponseWrapper).data as IReport[];
    } catch (err: any) {
      this.$toast.error(err.message || err.statusMessage);
    }
  }

  getGatewayName(id: string) {
    const gateway = this.gatewaysObject[id];
    return gateway ? gateway.name : '-';
  }

  // By looping over the shorter array and converting to an object, computation time is reduced for getting gatewayName
  get gatewaysObject(): Record<string, IGateway> {
    return this.gateways.reduce((acc, curr) => {
      return { ...acc, [curr.gatewayId]: curr };
    }, {} as Record<string, IGateway>);
  }

  @Watch('data', { immediate: true })
  refetchReports() {
    this.loadReports();
  }

  @Watch('filters', { deep: true })
  reFetch() {
    this.loadReports();
  }

  @Watch('isFilteredByGateway', { immediate: true })
  changeHeader(val: boolean) {
    if (!val) {
      this.header.splice(1, 0, {
        title: 'Gateway',
        value: 'gatewayId'
      });
      this.header.join();
    } else {
      const index = this.header.findIndex((item) => item.value === 'gatewayId');
      if (index > -1) this.header.splice(index, 1);
    }
  }

  @Watch('isFilteredByProject')
  sendTotal() {
    this.$emit('setTotal', this.projectTotal);
  }

  @filters.Getter
  isFilteredByGateway!: boolean;

  @filters.Getter
  isFilteredByProject!: boolean;

  @filters.Getter
  filters!: IFilters;

  @gateways.Getter('gatewayList')
  gateways!: IGateway[];
}
</script>

<style lang="scss" scoped>
.c-reports-project {
  &__header {
    @apply w-full flex justify-between bg-white px-[24px] py-[26px] cursor-pointer;
  }
}
</style>
