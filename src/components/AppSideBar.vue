<template>
  <div class="c-app-sidebar">
    <ul class="c-app-sidebar__routes">
      <li v-for="route in routes" :key="route.name">
        <img :src="route.icon" :alt="route.name" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Dashboard from '@/assets/dashboard.svg';
import Desktop from '@/assets/desktop.svg';
import Pie from '@/assets/pie.svg';
import Power from '@/assets/power.svg';
import Analytics from '@/assets/analytics.svg';

@Component
export default class AppSideBar extends Vue {
  routes = [
    {
      icon: Analytics,
      name: 'analytics'
    },
    {
      icon: Dashboard,
      name: 'dashboard'
    },
    {
      icon: Desktop,
      name: 'desktop'
    },
    {
      icon: Pie,
      name: 'pie'
    },
    {
      icon: Power,
      name: 'logout'
    }
  ];
}
</script>

<style lang="scss" scoped>
.c-app-sidebar {
  @apply h-full flex flex-col items-center pt-10;
  width: 90px;

  &__routes {
    @apply flex flex-col gap-[24px];
  }
}
</style>
