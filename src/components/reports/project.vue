<template>
  <div class="c-reports-project">
    <header
      class="c-reports-project__header"
      v-if="!hideHeader"
      @click="$emit('expand', data.projectId)"
    >
      <div class="c-reports-project__header-title">{{ data.name }}</div>
      <div class="c-reports-project__header-title">Total: 10,065 USD</div>
    </header>
    <base-table v-if="expand" :headers="header" :data="reports" class="mt-3" />
  </div>
</template>

<script lang="ts">
/* eslint-disable no-constant-condition */
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IProject } from '../../types/models';

@Component
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
    ...(false
      ? [
          {
            title: 'Gateway',
            value: 'gatewayName'
          }
        ]
      : []),
    {
      title: 'Transaction ID',
      value: 'paymentId'
    },
    {
      title: 'Amount',
      value: 'amount'
    }
  ];

  reports = [];
}
</script>

<style lang="scss" scoped>
.c-reports-project {
  &__header {
    @apply w-full flex justify-between bg-white px-[24px] py-[26px] cursor-pointer;
  }
}
</style>
