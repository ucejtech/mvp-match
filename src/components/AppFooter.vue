<template>
  <footer class="c-footer">Terms&Conditions | Privacy policy</footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppFooter extends Vue {}
</script>

<style lang="scss" scoped>
.c-footer {
  background: #fff;
  @apply absolute bottom-0 pl-[100px] py-[5px] font-bold;
  color: color(secondary, base);
}
</style>
