<template>
  <div class="c-reports-header-actions">
    <base-dropdown v-model="project" :items="projects">
      All Projects</base-dropdown
    >
    <base-dropdown v-model="gateway" :items="gateways"
      >All Gateways</base-dropdown
    >
    <base-calendar v-model="calendar">From Date</base-calendar>
    <base-calendar v-model="calendar">To Date </base-calendar>
    <base-button variant="secondary"> Generate Report</base-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ReportsActions extends Vue {
  gateway = '';
  project = '';
  calendar = '';

  gateways = [
    { title: 'All Gateways', value: 'all' },
    { title: 'Gateway 1', value: 'gateway-1' }
  ];
  projects = [
    { title: 'All Projects', value: 'all' },
    { title: 'Project 1', value: 'project-1' }
  ];
}
</script>

<style lang="scss" scoped>
.c-reports-header-actions {
  @apply flex items-center gap-[23px];
}
</style>
