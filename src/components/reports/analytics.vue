<template>
  <div class="c-reports-analytics">
    <doughnut-chart :series="series" :labels="labels" />
    <div class="c-reports-analytics__total">
      <slot>GATEWAY TOTAL | 14,065 USD</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DoughnutChart from './Chart.vue';

@Component({
  components: {
    DoughnutChart
  }
})
export default class ReportsAnalytics extends Vue {
  series = [60, 20, 99];
  labels = ['Project 1', 'Project 2', 'Project 3'];
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
