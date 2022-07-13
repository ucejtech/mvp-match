<template>
  <div>
    <apex-charts type="donut" :options="chartOptions" :series="series" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import VueApexCharts from 'vue-apexcharts';

@Component({
  components: {
    'apex-charts': VueApexCharts
  }
})
export default class DougnutChart extends Vue {
  @Prop({ required: true, default: () => [] })
  series!: number[];

  @Prop({ required: true, default: () => [] })
  labels!: string[];

  chartOptions = {
    tooltip: {
      enabled: false
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          size: '45%',
          labels: {
            name: {
              show: false
            }
          }
        }
      }
    },
    labels: [] as string[],
    chart: {
      type: 'donut'
    },
    legend: {
      position: 'top',
      onItemHover: {
        highlightDataSeries: false
      }
    }
  };

  @Watch('labels', { immediate: true })
  onLabelsChanged(val: string[]) {
    this.chartOptions.labels = val;
  }
}
</script>

<style lang="scss">
.c-reports-analytics {
  .apexcharts-legend {
    background: picker(light-blue, base);
    @apply px-[34px] py-[18px] flex text-base rounded-[10px] justify-between #{!important};

    .apexcharts-legend-series {
      .apexcharts-legend-marker {
        @apply w-[15px] h-[15px] rounded-[5px] mr-[7px] #{!important};
      }
    }
  }
}
</style>
