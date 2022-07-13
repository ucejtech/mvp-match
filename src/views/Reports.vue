<template>
  <div class="reports">
    <reports-header />
    <div class="reports__content" v-if="false">
      <p>All Projects | All Gateways</p>
      <reports-project class="mt-10" />
    </div>
    <div class="reports__content--empty" v-else>
      <div class="details">
        <span class="font-bold title">No reports</span>
        <p>
          Currently you have no data for the reports to be generated. Once you
          start generating traffic through the Balance application the reports
          will be shown.
        </p>
        <img src="@/assets/empty-report.svg" alt="empty report image" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ReportsHeader from '@/components/reports/header.vue';
import ReportsProject from '../components/reports/project.vue';

@Component({
  components: {
    ReportsHeader,
    ReportsProject
  }
})
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>
.reports {
  @apply pt-10;

  &__content {
    @apply font-bold mt-[27px] w-full px-[24px] py-[18px] rounded-[10px];
    color: color(black, base);
    background-color: color(light-blue, base);

    &--empty {
      @apply w-full text-center flex justify-center items-center;
      height: 36em;
      .details {
        @apply flex justify-center items-center flex-col gap-2 max-w-[470px] text-base font-bold;
        color: color(dark-grey, base);
        .title {
          color: color(black, base);
          @apply text-2xl font-bold;
        }
        img {
          @apply mt-5;
        }
      }
    }
  }
}
</style>
