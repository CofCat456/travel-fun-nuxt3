<script setup lang="ts">
import type { Order } from '~/types'
import type {
  FormRules,
} from 'naive-ui'

import {
  NForm,
} from 'naive-ui'

const { $errorMsg } = useNuxtApp()

const cartStore = useCartStore()
const router = useRouter()

const { booking, cart } = useApi()

const { finalTotal, total, totalNum } = storeToRefs(cartStore)

const { getCarts } = cartStore

const isLoading = ref(false)
const isCouponLoading = ref(false)
const couponCode = ref('')
const couponStatus = ref<'error' | 'success' | 'warning'>()
const formRef = ref<InstanceType<typeof NForm>>()

const orderValue: Order = reactive({
  message: '',
  user: {
    address: '',
    email: '',
    name: '',
    tel: '',
  },
})

const rules = computed<FormRules>(() => ({
  user: {
    address: {
      message: '請輸入訂購人地址',
      required: true,
      trigger: ['blur', 'input'],
    },
    email: {
      message: '請輸入訂購人 Email',
      required: true,
      trigger: ['blur', 'input'],
    },
    name: {
      message: '請輸入訂購姓名',
      required: true,
      trigger: ['blur', 'input'],
    },
    tel: {
      message: '請輸入訂購人電話',
      required: true,
      trigger: ['blur', 'input'],
    },
  },
}))

const options = computed(() =>
  ['@gmail.com'].map((suffix) => {
    const prefix = orderValue.user.email.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    }
  }),
)

async function addOrder(order: Order) {
  isLoading.value = true

  const data = {
    data: { ...order },
  }

  try {
    const { data: orderRes } = await booking.addOrder(data)

    if (orderRes.value) {
      const { orderId, success } = orderRes.value

      if (success) {
        await getCarts()
        router.push({ name: 'booking-pay-id', params: { id: orderId } })
      }
    }
  }
  finally {
    isLoading.value = false
  }
}

async function useCoupon(code: string) {
  isCouponLoading.value = true

  const data = {
    data: { code },
  }

  try {
    const { data: couponData, error } = await cart.useCoupon(data)

    if (error.value) {
      couponCode.value = ''
      couponStatus.value = 'error'
    }

    if (couponData.value) {
      const { success } = couponData.value

      if (success)
        couponStatus.value = 'success'
    }
  }
  finally {
    isCouponLoading.value = false
  }
}

function onSubmit() {
  formRef.value?.validate((errors) => {
    if (!errors)
      addOrder(orderValue)
  })
}

onMounted(() => {
  if (totalNum.value === 0) {
    $errorMsg('購物車內無資料')
    router.go(-1)
  }
})
</script>

<template>
  <article class="flex flex-1 flex-col gap-8">
    <NCard :bordered="false">
      <NCollapse default-expanded-names="1" accordion>
        <NCollapseItem name="1" title="訂購人資料">
          <NForm :model="orderValue" :rules="rules" ref="formRef">
            <NGrid :cols="2" :x-gap="24" responsive="screen" item-responsive>
              <NFormItemGi :span="2" label="姓名" path="user.name">
                <NInput
                  placeholder="輸入訂購人姓名"
                  type="text"
                  v-model:value="orderValue.user.name"
                />
              </NFormItemGi>

              <NFormItemGi label="Email" path="user.email" span="2 m:1">
                <NAutoComplete
                  :options="options"
                  placeholder="請輸入訂購人 Email"
                  v-model:value="orderValue.user.email"
                />
              </NFormItemGi>

              <NFormItemGi label="電話" path="user.tel" span="2 m:1">
                <NInput
                  placeholder="輸入訂購人電話"
                  type="text"
                  v-model:value="orderValue.user.tel"
                />
              </NFormItemGi>

              <NFormItemGi :span="2" label="地址" path="user.address">
                <NInput
                  placeholder="輸入訂購人地址"
                  type="text"
                  v-model:value="orderValue.user.address"
                />
              </NFormItemGi>

              <NFormItemGi :span="2" label="備註" path="message">
                <NInput
                  :autosize="{
                    minRows: 3,
                    maxRows: 5,
                  }"
                  placeholder="請輸入備註"
                  type="textarea"
                  v-model:value="orderValue.message"
                />
              </NFormItemGi>
            </NGrid>
          </NForm>
        </NCollapseItem>
      </NCollapse>
    </NCard>

    <NCard :bordered="false">
      <NCollapse default-expanded-names="1" accordion>
        <NCollapseItem name="1" title="使用或輸入折扣碼">
          <NInputGroup>
            <NInput
              :status="couponStatus"
              :style="{ width: '50%' }"
              placeholder="請輸入優惠碼"
              v-model:value="couponCode"
            />
            <NButton :loading="isCouponLoading" @click="useCoupon(couponCode)" type="primary" ghost>
              套用優惠卷
            </NButton>
          </NInputGroup>
        </NCollapseItem>
      </NCollapse>
    </NCard>
  </article>
  <PageBookMenu
    :final-total="finalTotal"
    :is-loading="isLoading"
    :total="total"
    @submit="onSubmit"
    text="送出訂單"
  />
</template>
