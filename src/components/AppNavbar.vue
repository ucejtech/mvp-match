<template>
  <nav class="c-top-nav">
    <div class="c-top-nav__brand">
      <img src="@/assets/logo.svg" alt="app logo" width="24" />
      <img src="@/assets/ham-burger.svg" alt="open sidebar" width="27" />
    </div>
    <div class="c-top-nav__user">
      <div class="c-app-top-nav__user-avatar">
        <base-avatar>
          {{ userName | extractInitials }}
        </base-avatar>
      </div>
      <div class="c-top-nav__user-name">
        {{ userName }}
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppNavbar extends Vue {
  userName = 'John Doe';
}
</script>

<style lang="scss" scoped>
.c-top-nav {
  @apply flex items-center justify-between py-[19px] px-[35px];
  border-bottom: 2px solid color(grey, base);

  &__brand {
    @apply flex gap-[25px];
  }

  &__user {
    @apply flex items-center justify-center gap-4;

    &-name {
      @apply font-bold;
      color: color(secondary, base);
    }
  }
}
</style>
