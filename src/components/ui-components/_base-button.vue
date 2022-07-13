<template>
  <button
    v-on="$listeners"
    :class="['c-button', `c-button--${variant}`]"
    :disabled="loading"
  >
    <slot v-if="!loading" />
    <span v-else>Loading...</span>
    <img v-if="showIcon && !loading" :src="icon" alt="icon" />
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import CalendarIcon from '@/assets/calendar.svg';

@Component
export default class CButton extends Vue {
  @Prop({
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary'].includes(value)
  })
  variant!: string;

  @Prop({
    default: CalendarIcon
  })
  icon!: string;

  @Prop({
    default: false
  })
  showIcon!: boolean;

  @Prop({
    default: false
  })
  loading!: boolean;
}
</script>

<style lang="scss" scoped>
.c-button {
  @apply px-[10px] py-[8px] rounded-md text-sm flex items-center gap-[17px];
  color: #fff;
  background-color: picker(primary, base);

  &--primary {
    background-color: picker(primary, base);
    &:hover {
      background-color: picker(primary, darker);
    }
  }

  &--secondary {
    background-color: picker(secondary, base);
    &:hover {
      background-color: picker(secondary, darker);
    }
  }
}
</style>
