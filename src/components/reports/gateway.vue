<template>
  <div class="c-reports-project">
    <header
      class="c-reports-project__header"
      v-if="!hideHeader"
      @click="$emit('expand', data.gatewayId)"
    >
      <div class="c-reports-project__header-title">{{ data.name }}</div>
      <div class="c-reports-project__header-title">
        Total: {{ gatewayTotal | formatCurrency }}
      </div>
    </header>
    <base-table v-if="expand" :headers="header" :data="reports" class="mt-3">
      <template v-slot:created="{ item }">
        {{ item.created.split('-').reverse().join('/') }}
      </template>
    </base-table>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-constant-condition */
import { IReportForm } from '@/types/interfaces';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { IFilters, IGateway, IReport } from '../../types/models';
import { ReportService } from '../../services/report.service';
import { ResponseWrapper } from '@/services/util';

const filters = namespace('filters');
const gateways = namespace('gateway');

@Component({
  model: {
    event: 'setTotal'
  }
})
export default class ReportsGateways extends Vue {
  @Prop({ default: false })
  expand!: boolean;

  @Prop({ default: false })
  hideHeader!: boolean;

  @Prop()
  data!: IGateway;

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

  @Watch('gatewayTotal')
  changeTotal(val: string | number) {
    this.$emit('setTotal', val);
  }

  get gatewayTotal() {
    const total = Math.round(
      this.reports.reduce((acc, curr) => acc + curr.amount, 0)
    );
    return total;
  }

  async loadReports() {
    const data: IReportForm = {
      gatewayId: this.data.gatewayId,
      ...(this.filters.fromDate ? { from: this.filters.fromDate } : null),
      ...(this.filters.toDate ? { to: this.filters.toDate } : null),
      ...(this.filters.projectId ? { projectId: this.filters.projectId } : null)
    };

    try {
      const reports = await ReportService.fetch(data);
      this.reports = (reports as ResponseWrapper).data as IReport[];
    } catch (err: any) {
      this.$toast.error(err.message || err.statusMessage);
    }
  }

  @Watch('data', { immediate: true })
  refetchReports() {
    this.loadReports();
  }

  @Watch('filters', { deep: true })
  reFetch() {
    this.loadReports();
  }

  @filters.Getter
  isFilteredByGateway!: boolean;

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
