<template>
  <div class="c-reports-analytics">
    <doughnut-chart :series="data.series" :labels="data.labels" />
    <div class="c-reports-analytics__total">
      <slot
        >{{ isFilteredByGateway ? 'GATEWAY' : 'PROJECT' }} TOTAL |
        {{ total | formatCurrency }}</slot
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import DoughnutChart from './Chart.vue';

const filters = namespace('filters');

@Component({
  components: {
    DoughnutChart
  }
})
export default class ReportsAnalytics extends Vue {
  @Prop({
    default: 0
  })
  total!: number;

  @Prop()
  data!: { series: (string | number)[]; labels: string[] };

  @filters.Getter
  isFilteredByProject!: boolean;

  @filters.Getter
  isFilteredByGateway!: boolean;
}
</script>

<style lang="scss" scoped>
.c-reports-analytics {
  @apply py-[22px];
  &__total {
    background: picker(light-blue, base);
    color: picker(black, base);
    @apply px-[34px] py-[18px] font-bold;
  }
}
</style>
