<template>
  <header class="c-reports-header">
    <div>
      <h1 class="c-reports-header__title">Reports</h1>
      <p class="c-reports-header__caption">
        Easily generate a report of your transactions
      </p>
    </div>
    <reports-actions @generate:report="generateReport" />
  </header>
</template>

<script lang="ts">
import { IFilters } from '@/types/models';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import ReportsActions from './actions.vue';

const filters = namespace('filters');

@Component({
  components: {
    ReportsActions
  }
})
export default class ReportsHeader extends Vue {
  isRendered = false;

  generateReport() {
    const graphStatus =
      (this.isFilteredByGateway && !this.isFilteredByProject) ||
      (this.isFilteredByProject && !this.isFilteredByGateway);
    this.isRendered = graphStatus;
    this.$store.commit('SET_GRAPH_VISIBILITY', graphStatus);
  }

  @Watch('filters', { deep: true })
  refresh() {
    if (this.isRendered) this.generateReport();
  }

  @filters.Getter
  filters!: IFilters;

  @filters.Getter
  isFilteredByProject!: boolean;

  @filters.Getter
  isFilteredByGateway!: boolean;
}
</script>

<style lang="scss" scoped>
.c-reports-header {
  @apply flex justify-between w-full;

  &__title {
    @apply text-2xl font-bold;
    color: picker(black, base);
  }

  &__caption {
    @apply text-base font-bold;
    color: picker(dark-grey, base);
  }
}
</style>
