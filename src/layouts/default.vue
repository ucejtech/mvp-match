<template>
  <div>
    <app-navbar />
    <div class="flex">
      <app-side-bar />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppSideBar from '@/components/AppSideBar.vue';
import AppNavbar from '../components/AppNavbar.vue';

@Component({
  components: {
    AppNavbar,
    AppSideBar
  }
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" scoped></style>
