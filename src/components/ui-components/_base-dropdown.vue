<template>
  <div class="c-dropdown" v-on-clickaway="hideDropDown">
    <base-button
      :show-icon="true"
      :icon="arrorwIcon"
      @click="isOpened = !isOpened"
      :variant="color"
    >
      <span v-if="getItemText"> {{ getItemText[itemText] }}</span>
      <slot v-else />
    </base-button>
    <ul
      :class="['c-dropdown__options', `c-dropdown__options--${color}`]"
      v-if="isOpened"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        class="option"
        @click="selectOption(item[itemValue])"
      >
        {{ item[itemText] }}
      </li>
      <li v-if="items.length < 1">No data available</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mixin as clickaway } from 'vue-clickaway';

import ArrowdownIcon from '@/assets/arrow-down.svg';
import ArrowupIcon from '@/assets/arrow-up.svg';

@Component({
  mixins: [clickaway],
  model: {
    prop: 'value',
    event: 'change'
  }
})
export default class CDropdown extends Vue {
  @Prop({
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary'].includes(value)
  })
  color!: string;

  @Prop({
    default: 'title'
  })
  itemText!: string;

  @Prop({
    default: 'value'
  })
  itemValue!: string;

  @Prop({
    required: true,
    default: () => []
  })
  items!: Record<string, string | number>[];

  @Prop({
    default: ''
  })
  value!: string;

  arrowDownIcon = ArrowdownIcon;

  isOpened = false;

  get arrorwIcon() {
    return this.isOpened ? ArrowupIcon : ArrowdownIcon;
  }

  selectOption(val: string | number) {
    this.$emit('change', val !== 'all' ? val : '');
    this.isOpened = false;
  }

  get getItemText() {
    return this.items.find((item) => item[this.itemValue] === this.value);
  }

  private hideDropDown(): void {
    this.isOpened = false;
  }
}
</script>

<style lang="scss" scoped>
.c-dropdown {
  @apply relative;

  &__options {
    @apply absolute w-full rounded-[5px] mt-1 py-[8px] text-white text-sm;

    .option {
      cursor: pointer;
      @apply px-[13px];
    }

    &--primary {
      background-color: color(primary, base);

      .option {
        &:hover {
          background-color: color(primary, darker);
        }
      }
    }

    &--secondary {
      background-color: color(secondary, base);
      .option {
        &:hover {
          background-color: color(secondary, darker);
        }
      }
    }
  }
}
</style>
