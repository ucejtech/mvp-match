<template>
  <header class="c-reports-header">
    <div>
      <h1 class="c-reports-header__title">Reports</h1>
      <p class="c-reports-header__caption">
        Easily generate a report of your transactions
      </p>
    </div>
    <reports-actions />
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ReportsActions from './actions.vue';

@Component({
  components: {
    ReportsActions
  }
})
export default class ReportsHeader extends Vue {}
</script>

<style lang="scss" scoped>
.c-reports-header {
  @apply flex justify-between w-full;

  &__title {
    @apply text-2xl font-bold;
    color: color(black, base);
  }

  &__caption {
    @apply text-base font-bold;
    color: color(dark-grey, base);
  }
}
</style>
