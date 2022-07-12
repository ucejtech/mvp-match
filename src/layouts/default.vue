<template>
  <div>
    <app-navbar />
    <div class="flex">
      <app-side-bar />
      <router-view class="flex-1 pr-[35px]" />
    </div>
    <app-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppSideBar from '@/components/AppSideBar.vue';
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';

@Component({
  components: {
    AppNavbar,
    AppSideBar,
    AppFooter
  }
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" scoped></style>
