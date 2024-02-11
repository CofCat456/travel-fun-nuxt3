<script setup lang="ts">
import type { Cart, DrawerActive } from '~/types'

import IconDateRangeOutlineRounded from '~icons/material-symbols/date-range-outline-rounded'

const props = defineProps<{
  id: string
  isMobile: boolean
  productTitle: string
  date: number
  unit: string
  title: string
  price: number
  originPrice: number
  content: string
  isLoading: boolean
}>()

const emit = defineEmits<{
  addCart: [cart: { data: Cart }]
}>()

const date = ref(Date.now())
const qty = ref(1)
const showDetail = ref(false)

const activate: DrawerActive = reactive({
  active: false,
  placement: 'bottom',
})

const getSelectBtnText = computed(() => (showDetail.value ? '取消選擇' : '選擇'))

const toggleActive = () => activate.active = !activate.active

function toggleShowDetail() {
  showDetail.value = !showDetail.value
}

function increment() {
  qty.value += 1
}

function decrement() {
  if (qty.value === 1)
    return

  qty.value -= 1
}

function addCart() {
  const data: Cart = { buy_date: date.value, product_id: props.id, qty: qty.value }
  emit('addCart', { data })
}

function disablePreviousDate(ts: number) {
  const currentDate = new Date()

  const inputDateTime = new Date(ts)

  currentDate.setHours(0, 0, 0, 0)
  inputDateTime.setHours(0, 0, 0, 0)

  return inputDateTime < currentDate
}
</script>

<template>
  <NListItem>
    <NThing>
      <template #header>
        <p class="text-area-title font-bold">
          {{ title }}
        </p>
      </template>
      <template #description>
        <p class="text-cc-primary" v-if="isMobile">
          最早可預定日： <NTime :time="date" format="yyyy 年 MM 月 dd 日" />
        </p>
      </template>
      <div v-if="isMobile">
        <NButton @click="toggleActive" text>
          查看方案詳情
        </NButton>
        <NDrawer
          :placement="activate.placement"
          height="500"
          v-model:show="activate.active"
          closable
        >
          <NDrawerContent closable>
            <template #header>
              <p class="text-area-title font-bold">
                {{ title }}
              </p>
            </template>
            <NThing :title="productTitle">
              <template #description>
                <div class="flex items-center gap-3">
                  <h6 class="font-bold">
                    {{ currency(price) }}
                  </h6>
                  <span class="text-sm text-cc-other-4 line-through">
                    {{ currency(originPrice) }}
                  </span>
                </div>
              </template>
            </NThing>
            <NDivider />
            <div class="inline-flex items-center gap-3">
              <NIcon :size="20">
                <IconDateRangeOutlineRounded />
              </NIcon>
              最早可預定日：<NTime :time="date" format="yyyy 年 MM 月 dd 日" />
            </div>
            <NDivider />
            <NThing title="方案描述">
              <template #description>
                <div class="list" v-html="content" />
              </template>
            </NThing>
          </NDrawerContent>
        </NDrawer>
      </div>
      <div class="list" v-html="content" v-else />
      <template #footer>
        <div class="flex items-center gap-5">
          <span class="text-sm text-cc-other-4 line-through">
            {{ currency(originPrice) }}
          </span>
          <h5 class="font-bold">
            {{ currency(price) }}
          </h5>
        </div>
      </template>
      <template #action>
        <div class="flex items-center justify-between">
          <div class="inline-flex items-center" v-if="isMobile">
            <button :disabled="qty <= 1" @click="decrement" type="button">
              <svg
                class="h-8 w-8 text-cc-primary"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <input
              class="w-11 border-none bg-transparent text-center text-lg outline-none"
              type="text"
              v-model="qty"
              readonly
            >
            <button @click="increment" type="button">
              <svg
                class="h-8 w-8 text-cc-primary"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <UiButton :is-loading="isLoading" @click="addCart" v-if="isMobile">
            加入購物車
          </UiButton>
          <UiButton @click="toggleShowDetail" class="ml-auto" v-else>
            {{ getSelectBtnText }}
          </UiButton>
        </div>
      </template>
    </NThing>
    <template v-if="showDetail && !isMobile">
      <NDivider dashed>
        選擇日期、選項
      </NDivider>
      <div class="flex gap-8">
        <div class="w-auto">
          <span class="mb-2 block text-sm text-cc-other-9">請選擇出發日期</span>
          <NDatePicker
            :is-date-disabled="disablePreviousDate"
            type="date"
            v-model:value="date"
            panel
          />
        </div>
        <div class="flex-1">
          <div class="mb-5">
            <span class="mb-2 block text-sm text-cc-other-9">選擇數量</span>
            <div class="flex items-center">
              <h6 class="flex-1 font-bold">
                票數
              </h6>
              <span class="mr-2 whitespace-nowrap text-sm text-cc-other-9">
                {{ currency(price, 'NT$ ') }}/{{ `每${unit}` }}
              </span>
              <div class="inline-flex items-center">
                <button :disabled="qty <= 1" @click="decrement" type="button">
                  <svg
                    class="h-8 w-8 text-cc-primary"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <input
                  class="w-11 border-none bg-transparent text-center text-lg outline-none"
                  type="text"
                  v-model="qty"
                  readonly
                >
                <button @click="increment" type="button">
                  <svg
                    class="h-8 w-8 text-cc-primary"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <hr>
          <div class="mt-5">
            <div class="flex items-center">
              <span class="flex-1 whitespace-nowrap text-sm text-cc-other-9"> 總金額 </span>
              <h5 class="font-bold">
                {{ currency(qty * price) }}
              </h5>
            </div>
          </div>
          <div class="mt-4 text-right">
            <UiButton :is-loading="isLoading" @click="addCart">
              加入購物車
            </Uibutton>
          </div>
        </div>
      </div>
    </template>
  </NListItem>
</template>

<style scoped>
:deep(.list) > ul {
  list-style-type: theme('listStyleType.disc');
  padding-right: theme('padding.6');
  font-size: theme('fontSize.base');
  letter-spacing: theme('letterSpacing.wide');
}

:deep(.list li) {
  padding: theme('padding.1') 0;
}
</style>
