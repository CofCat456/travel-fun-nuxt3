<script lang="ts" setup>
import type { Sort } from '~/types'

defineProps<{
  isCity: boolean
  currEnTarget: string
  array: Record<string, string>[]
  currSort: string
  sortArray: Record<string, Sort>[]
}>()

defineEmits<{
  'update:params': [city: string]
  'update:sort': [item: Sort]
  openMap: []

}>()
</script>

<template>
  <div class="sticky top-28 z-20 block bg-cc-other-1 md:hidden">
    <div class="flex h-12 items-center">
      <div class="mx-5 inline-flex flex-1 items-center gap-2 overflow-x-auto">
        <MenuFilter :title="isCity ? '城市' : '國家'">
          <NListItem
            :key="key"
            @click="$emit('update:params', key)"
            class="flex cursor-pointer items-center justify-between border-b border-cc-other-5/50 px-4 py-2"
            v-for="{ label, key } in array || []"
          >
            <NThing content-indented>
              <template #avatar>
                <svg
                  :class="key === currEnTarget ? 'opacity-100' : 'opacity-0'"
                  class="h-5 w-5 text-cc-accent"
                  fill="none" stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.5 12.75l6 6 9-13.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </template>
              <template #description>
                {{ label }}
              </template>
            </NThing>
          </NListItem>
        </MenuFilter>
        <MenuFilter title="排列">
          <NListItem
            :key="value"
            @click="$emit('update:sort', value)"
            class="flex cursor-pointer items-center justify-between border-b border-cc-other-5/50 px-4 py-2"
            v-for="{ label, value } in sortArray || []"
          >
            <NThing content-indented>
              <template #avatar>
                <svg
                  :class="value === currSort ? 'opacity-100' : 'opacity-0'"
                  class="h-5 w-5 text-cc-accent"
                  fill="none" stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.5 12.75l6 6 9-13.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </template>
              <template #description>
                {{ label }}
              </template>
            </NThing>
          </NListItem>
        </MenuFilter>
      </div>
      <div class="p-3 shadow-[-5px_0_5px_-5px_rgba(50,48,44,.3)]">
        <button @click="$emit('openMap')" class="block" type="button">
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
