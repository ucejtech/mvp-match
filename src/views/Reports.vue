<template>
  <div class="reports">
    <reports-header />
    <div v-if="projects.length > 0" class="flex gap-[31px]">
      <div class="reports__content flex-1">
        <p>
          {{
            filters.projectId
              ? getProjectName(filters.projectId)
              : 'All Projects'
          }}
          |
          {{
            filters.gatewayId
              ? getGatewayName(filters.gatewayId)
              : 'All Gateways'
          }}
        </p>
        <div class="mt-10">
          <div v-if="isFilteredByProject && !isFilteredByGateway">
            <reports-gateways
              class="mt-2"
              v-for="(project, index) in dataList"
              :key="index"
              v-model="
                projectsTotal[randomIdForProjectsTotalCalculation][index]
              "
              @expand="expandProject"
              :expand="selectedProject === project.gatewayId"
              :data="project"
            />
          </div>
          <div v-else>
            <reports-project
              class="mt-2"
              v-for="(project, index) in dataList"
              :key="index"
              :hide-header="isFilteredByProject && isFilteredByGateway"
              v-model="
                projectsTotal[randomIdForProjectsTotalCalculation][index]
              "
              @expand="expandProject"
              :expand="
                selectedProject === project.projectId || isFilteredByProject
              "
              :data="project"
            />
          </div>
        </div>
      </div>
      <reports-analytics
        class="flex-1"
        v-if="$store.state.isReportAnalyticsVisible"
        :data="analyticsData"
        :total="total"
      />
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
    <div class="total" v-if="!$store.state.isReportAnalyticsVisible">
      TOTAL |
      {{ total | formatCurrency }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ReportsHeader from '@/components/reports/header.vue';
import ReportsProject from '../components/reports/project.vue';
import ReportsAnalytics from '../components/reports/analytics.vue';
import { GatewayService } from '../services/gateway.service';
import { ProjectService } from '../services/project.service';
import { namespace } from 'vuex-class';
import { IFilters, IGateway, IProject } from '@/types/models';
import ReportsGateways from '../components/reports/gateway.vue';

const projects = namespace('project');
const filters = namespace('filters');
const gateways = namespace('gateway');

@Component({
  components: {
    ReportsHeader,
    ReportsAnalytics,
    ReportsProject,
    ReportsGateways
  }
})
export default class ReportsView extends Vue {
  selectedProject = '';

  loading = true;

  isGraphVisible = false;

  projectsTotal: Record<string, string[]> = {};

  randomIdForProjectsTotalCalculation = '';

  expandProject(id: string) {
    if (id !== this.selectedProject) this.selectedProject = id;
    else this.selectedProject = '';
  }

  get projectList() {
    return this.filters.projectId
      ? this.projects.filter(
          (project) => project.projectId === this.filters.projectId
        )
      : this.projects;
  }

  async mounted() {
    try {
      Promise.all([
        await GatewayService.fetchAll(),
        await ProjectService.fetchAll()
      ]);
    } catch (err: any) {
      this.$toast.error(err.message || err.statusMessage);
    } finally {
      this.loading = false;
    }
  }

  get dataList() {
    return this.isFilteredByProject && !this.isFilteredByGateway
      ? this.gateways
      : this.projectList;
  }

  get analyticsData() {
    return {
      series: this.projectsTotal[this.randomIdForProjectsTotalCalculation],
      labels: this.dataList.map((data) => data.name)
    };
  }

  generateRandomId() {
    this.randomIdForProjectsTotalCalculation = Math.floor(
      Math.random() * 1000000
    ).toString();
    this.$set(this.projectsTotal, this.randomIdForProjectsTotalCalculation, []);
  }

  get total() {
    return this.projectsTotal[this.randomIdForProjectsTotalCalculation].reduce(
      (acc, curr) => Number(acc) + Number(curr),
      0
    );
  }

  getGatewayName(id: string) {
    const gateway = this.gatewaysObject[id];
    return gateway ? gateway.name : '-';
  }

  getProjectName(id: string) {
    const project = this.projectsObject[id];
    return project ? project.name : '-';
  }

  // By looping over the shorter array and converting to an object, computation time is reduced for getting gatewayName
  get gatewaysObject(): Record<string, IGateway> {
    return this.gateways.reduce((acc, curr) => {
      return { ...acc, [curr.gatewayId]: curr };
    }, {} as Record<string, IGateway>);
  }

  // By looping over the shorter array and converting to an object, computation time is reduced for getting gatewayName
  get projectsObject(): Record<string, IProject> {
    return this.projects.reduce((acc, curr) => {
      return { ...acc, [curr.projectId]: curr };
    }, {} as Record<string, IProject>);
  }

  @Watch('filters', { deep: true, immediate: true })
  resetProjectsTotal() {
    this.generateRandomId();
  }

  @filters.Getter
  filters!: IFilters;

  @filters.Getter
  isFilteredByProject!: boolean;

  @filters.Getter
  isFilteredByGateway!: boolean;

  @projects.Getter('projectList')
  projects!: IProject[];

  @gateways.Getter('gatewayList')
  gateways!: IGateway[];
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

  .total {
    background: picker(light-blue, base);
    color: picker(black, base);
    @apply px-[34px] py-[18px] font-bold py-[17px] mt-3 rounded-[10px];
  }
}
</style>
