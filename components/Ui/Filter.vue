<script lang="ts" setup>
import type { Sort } from '~/types'
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'

defineProps<{
  currSort: string
  sortArray: SelectMixedOption[]
  productTotal: number
}>()

defineEmits<{
  'update:sort': [item: Sort]
}>()
</script>

<template>
  <NCard size="small">
    <div class="flex w-full items-center justify-between">
      <p class="font-bold">
        找到
        <span class="text-cc-primary">
          {{ productTotal }}
        </span>
        個旅途
      </p>
      <div class="inline-flex items-center gap-4 whitespace-nowrap">
        <span>排序方式：</span>
        <NSelect
          :consistent-menu-width="false"
          :options="sortArray || []"
          :value="currSort || ''"
          @update-value="(value) => $emit('update:sort', value)"
        />
      </div>
    </div>
  </NCard>
</template>
