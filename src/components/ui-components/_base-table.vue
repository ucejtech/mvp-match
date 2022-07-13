<template>
  <table class="c-table">
    <tr class="header px-[5px]">
      <th v-for="(header, index) in headers" :key="index">
        {{ header.title }}
      </th>
    </tr>
    <tr v-if="data.length < 1" class="empty-message mt-4">
      {{
        emptyMessage
      }}
    </tr>
    <tr
      v-else
      class="mt-3 py-4 body px-[5px]"
      v-for="(item, index) in data"
      :key="index"
    >
      <td v-for="(column, index) in headers" :key="index">
        <slot :name="column.value" :item="item">
          {{ item[column.value] }}
        </slot>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface TableHeader {
  title: string;
  value: string;
}
@Component({
  components: {}
})
export default class DataTable extends Vue {
  @Prop()
  linkPrefix!: string;

  @Prop({ default: 'No data available' })
  emptyMessage!: string;

  @Prop({
    default: () => []
  })
  data!: Record<string, string | number>[];

  @Prop()
  headers!: TableHeader[];
}
</script>

<style lang="scss">
.c-table {
  @apply w-full font-normal;
  tr {
    @apply flex justify-between;
    &.empty-message {
      width: 100%;
    }

    &:first-child {
      @apply bg-white py-[5px];
    }

    &.body {
      &:nth-child(odd) {
        @apply bg-white;
      }
    }

    td,
    th {
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: right;
      }
    }

    &.empty-message {
      @apply flex justify-center;
    }
  }
}
</style>
