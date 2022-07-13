<template>
  <div class="reports">
    <reports-header />
    <div v-if="true" class="flex gap-[31px]">
      <div class="reports__content flex-1">
        <p>All Projects | All Gateways</p>
        <div class="mt-10">
          <reports-project
            v-for="(project, index) in projects"
            :key="index"
            @expand="expandProject"
            :expand="selectedProject === project.projectId"
            class="mt-2"
            :data="project"
          />
        </div>
      </div>
      <reports-analytics class="flex-1" v-if="isGraphVisible" />
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
import ReportsAnalytics from '../components/reports/analytics.vue';

@Component({
  components: {
    ReportsHeader,
    ReportsAnalytics,
    ReportsProject
  }
})
export default class ReportsView extends Vue {
  selectedProject = '';

  isGraphVisible = true;

  projects = [
    {
      projectId: 'bgYhx',
      userIds: ['rahej'],
      rule: 'Manual Selection',
      gatewayIds: ['gDJ2s'],
      structure: 'Sole proprietorship',
      industry: 'IT',
      website: 'https://mvpmatch.co/',
      description:
        'Sit amet luctus venenatis lectus magna fringilla urna porttitor.',
      image: 'https://mvpmatch.co/images/logo.svg',
      name: 'Project 1'
    },
    {
      projectId: 'ERdPQ',
      userIds: ['rahej'],
      rule: 'Manual Selection',
      gatewayIds: ['WU50G'],
      structure: 'Partnership',
      industry: 'IT',
      website: 'https://mvpmatch.co/',
      description:
        'Sit amet luctus venenatis lectus magna fringilla urna porttitor.',
      image: 'https://mvpmatch.co/images/logo.svg',
      name: 'Project 2'
    }
  ];

  expandProject(id: string) {
    if (id !== this.selectedProject) this.selectedProject = id;
    else this.selectedProject = '';
  }
}
</script>

<style lang="scss" scoped>
.reports {
  @apply pt-10;

  &__content {
    @apply font-bold mt-[27px] w-full px-[24px] py-[18px] rounded-[10px];
    color: picker(black, base);
    background-color: picker(light-blue, base);

    &--empty {
      @apply w-full text-center flex justify-center items-center;
      height: 36em;
      .details {
        @apply flex justify-center items-center flex-col gap-2 max-w-[470px] text-base font-bold;
        color: picker(dark-grey, base);
        .title {
          color: picker(black, base);
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
