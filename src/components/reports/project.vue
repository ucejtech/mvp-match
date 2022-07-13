<template>
  <div class="c-reports-project">
    <header class="c-reports-project__header">
      <div class="c-reports-project__header-title">Project 1</div>
      <div class="c-reports-project__header-title">Total: 10,065 USD</div>
    </header>
    <base-table v-if="expand" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ReportsProject extends Vue {
  @Prop({ default: false })
  expand!: boolean;
}
</script>

<style lang="scss" scoped>
.c-reports-project {
  &__header {
    @apply w-full flex justify-between bg-white px-[24px] py-[26px];
  }
}
</style>
