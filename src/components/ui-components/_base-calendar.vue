<template>
  <div class="c-calendar">
    <base-button :show-icon="true" @click="openDatePicker()">
      <slot v-if="!value">Date</slot>
      <span v-else>
        {{ value }}
        <button v-if="value" @click.stop="$emit('change', '')">x</button>
      </span>
    </base-button>
    <input
      class="c-calendar__input"
      :id="componentCustomId"
      type="date"
      :value="value"
      @input="updateValue"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  model: {
    prop: 'value',
    event: 'change'
  }
})
export default class CCalendar extends Vue {
  @Prop({
    default: ''
  })
  value!: string;

  componentCustomId = Math.floor(Math.random() * 1000000).toString();

  openDatePicker() {
    const datePicker = document.getElementById(
      this.componentCustomId
    ) as HTMLInputElement & {
      showPicker: () => void;
    };

    datePicker?.showPicker();
  }

  updateValue(e: Event) {
    const el = e.currentTarget as HTMLInputElement;
    this.$emit('change', el.value);
  }
}
</script>

<style scoped>
.c-calendar {
  @apply relative;

  &__input {
    @apply absolute w-full h-full top-0;
    visibility: hidden;
  }
}
</style>
