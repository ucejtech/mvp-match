<template>
  <div class="c-avatar" :style="`background-color:${color};color:${textColor}`">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class CAvatar extends Vue {
  @Prop({
    default: '#F6CA65'
  })
  color!: string;

  @Prop({
    default: '#FFFFFF'
  })
  textColor!: string;
}
</script>

<style lang="scss" scoped>
.c-avatar {
  @apply flex items-center justify-center rounded-[5px] py-[8px] px-[9px] font-bold;
}
</style>
