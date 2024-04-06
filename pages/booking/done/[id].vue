<script setup lang="ts">
import type { Order } from '~/types'

import IconDateRangeOutlineRounded from '~icons/material-symbols/date-range-outline-rounded'
import IconPerson from '~icons/material-symbols/person'

const { $errorMsg } = useNuxtApp()

const route = useRoute()

const { booking } = useApi()

const productStore = useProductStore()

const { isMobile } = useDevice()
const { getByRecommended } = storeToRefs(productStore)

const { getFilterData } = productStore

const isLoading = ref(false)

const orderValue: Order = reactive({
  id: '',
  create_at: 0,
  is_paid: false,
  message: '',
  num: 0,
  products: {},
  total: 0,
  user: {
    address: '',
    email: '',
    name: '',
    tel: '',
  },
})

const getResultDesc = computed(() => `訂單明細將寄至： ${orderValue.user.email}`)

async function sendEmail(order: Order) {
  if (process.server) {
    await $fetch('/api/email/buy-success', {
      body: JSON.stringify(order),
      method: 'POST',
    })
  }
}

(async () => {
  const { data } = await booking.getOrder(route.params.id as string)

  if (data.value) {
    const { order, success } = data.value

    if (success) {
      Object.assign(orderValue, order)
      await sendEmail(orderValue)
    }
  }
  else {
    $errorMsg('此訂單不存在')
    setTimeout(() => {
      navigateTo('/')
    }, 1600)
  }
})()
</script>

<template>
  <ClientOnly>
    <NCard
      :segmented="{
        content: true,
        footer: true,
      }"
      :bordered="false"
      size="small"
    >
      <NResult :description="getResultDesc" class="mb-8" size="small" status="success" title="訂購成功" />
      <NList bordered hoverable>
        <template #header>
          <NSkeleton :width="isMobile ? '100%' : '30%'" v-if="isLoading" text />
          <p class="text-sm-content text-cc-other-4" v-else>
            訂單編號：#{{ orderValue.id }}
          </p>
        </template>
        <template v-if="isLoading">
          <div class="flex items-center gap-3 p-3">
            <NSkeleton :sharp="false" height="120px" v-if="!isMobile" width="160px" />
            <div class="flex-1">
              <NSkeleton :repeat="5" text />
            </div>
          </div>
        </template>
        <template v-else>
          <template :key="id" v-for="({ final_total, product }, id) in orderValue.products">
            <NListItem>
              <template v-if="!isMobile" #prefix>
                <div class="aspect-[4/3] w-40 overflow-hidden rounded-m">
                  <img :src="product?.imageUrl" class="img">
                </div>
              </template>
              <NThing :title="product?.title">
                <template #description>
                  <p class="text-sm-content text-cc-other-4">
                    產品編號：#{{ id }}
                  </p>
                </template>
                <NEllipsis style="max-width: 240px">
                  {{ product.description }}
                </NEllipsis>
                <template #footer>
                  <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div class="inline-flex items-center gap-2">
                      <NIcon size="20">
                        <IconDateRangeOutlineRounded />
                      </NIcon>
                      可預訂時間：<NTime :time="product.date" format="yyyy 年 MM 月 dd 日" />
                    </div>
                    <div class="inline-flex items-center gap-2">
                      <NIcon size="20">
                        <IconPerson />
                      </NIcon>
                      <!-- TODO: product 人數 -->
                      人數 1 人
                    </div>
                  </div>
                </template>
                <template #action>
                  <p class="flex-1 text-right font-bold text-cc-primary">
                    {{ currency(final_total) }}
                  </p>
                </template>
              </NThing>
            </NListItem>
          </template>
        </template>
      </NList>

      <template #footer>
        <div class="item-center flex justify-between">
          <h6 class="font-bold">
            付款金額
          </h6>
          <h5 class="font-bold text-cc-primary">
            {{ currency(orderValue.total!) }}
          </h5>
        </div>
      </template>
    </NCard>
  </ClientOnly>

  <SwiperProduct
    :products="getFilterData(getByRecommended)"
    :slides-per-group="4"
    :slides-per-view="4"
    title="其他旅客觀看了"
  />
</template>
