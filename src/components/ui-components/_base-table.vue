<template>
  <div>
    <div class="table-container">
      <table>
        <tr class="pb-3 header">
          <!-- <th>S/N</th> -->
          <th v-for="(header, index) in headers" :key="index">
            {{ header.title }}
          </th>
        </tr>
        <tr
          v-if="data.length < 1"
          class="empty-message d-flex justify-center mt-4"
        >
          {{
            emptyMessage
          }}
        </tr>
        <tr
          v-else
          class="mt-3 py-4 px-2 body"
          v-for="(item, index) in data"
          :key="index"
        >
          <!-- <td>{{ index + 1 }}.</td> -->
          <td v-for="(column, index) in headers" :key="index">
            <slot :name="column.value" :item="item">
              {{ item[column.value] }}
            </slot>
          </td>
        </tr>
      </table>
    </div>
  </div>
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
div {
  overflow-x: auto;
  table {
    width: 100%;
    tr {
      @apply flex justify-between;
      f &.empty-message {
        color: picker(grey, grey1);
        width: 100%;
      }
      td,
      th {
        &:not(:first-child) {
          min-width: 260px;
          text-align: left;
          text-align: center;
        }
        &:first-child {
          min-width: 50px;
        }
      }
      &.header {
        color: picker(grey, grey1);
        border-bottom: 1px solid picker(grey, grey11);
      }
      &.body {
        background: #fff;
      }
    }
  }
}
</style>
