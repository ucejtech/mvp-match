<template>
  <div class="reports">
    <reports-header />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ReportsHeader from '@/components/reports/header.vue';

@Component({
  components: {
    ReportsHeader
  }
})
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>
.reports {
  @apply pt-10;
}
</style>
