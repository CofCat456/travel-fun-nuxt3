<script lang="ts" setup>
import type { FormRules } from 'naive-ui'

import {
  NForm,
} from 'naive-ui'

const { $errorMsg } = useNuxtApp()

const route = useRoute()
const router = useRouter()

const { booking } = useApi()

const loadingBar = useLoadingBar()

const id = route.params.id as string

const total = ref(0)
const finalTotal = ref(0)
const isLoading = ref(false)
const formRef = ref<InstanceType<typeof NForm>>()

const payValue = reactive({
  way: '',
})

const payWays = [
  {
    value: '信用卡/簽帳金融卡',
  },
  {
    value: 'LINE Pay',
  },
  {
    value: '街口支付',
  },
  {
    value: '超商付款／銀行轉帳',
  },
]

const rules = computed<FormRules>(() => ({
  way: {
    message: '請選擇付款方式',
    required: true,
    trigger: 'change',
  },
}))

async function getOrder() {
  loadingBar.start()

  try {
    const { data } = await booking.getOrder(id)

    if (data.value) {
      const { order, success } = data.value

      if (success) {
        const { is_paid } = order

        if (is_paid) {
          $errorMsg('此訂單已經付款')
          router.go(-1)
        }

        if (order.total) {
          total.value = order.total
          finalTotal.value = order.total
        }
      }
    }
  }
  finally {
    loadingBar.finish()
  }
}

async function payHandler() {
  isLoading.value = true

  try {
    const { data } = await booking.getPay(id)

    if (data.value) {
      const { success } = data.value

      if (success)
        router.push({ name: 'booking-done-id', params: { id } })
    }
  }
  finally {
    isLoading.value = false
  }
}

function onSubmit() {
  formRef.value?.validate((errors) => {
    if (!errors)
      payHandler()
  })
}

onMounted(() => {
  getOrder()
})
</script>

<template>
  <article class="flex flex-1 flex-col gap-8">
    <NCard :bordered="false">
      <NCollapse default-expanded-names="1" accordion>
        <NCollapseItem name="1" title="付款方式">
          <NForm :model="payValue" :rules="rules" ref="formRef">
            <NFormItem :span="2" label="請至少選擇一種付款方式" path="way">
              <NRadioGroup name="radiogroup" v-model:value="payValue.way">
                <NSpace size="large" vertical>
                  <template :key="way.value" v-for="way in payWays">
                    <NRadio :value="way.value" size="large">
                      {{ way.value }}
                    </NRadio>
                  </template>
                </NSpace>
              </NRadioGroup>
            </NFormItem>
          </NForm>
        </NCollapseItem>
      </NCollapse>
    </NCard>
  </article>
  <PageBookMenu
    :final-total="finalTotal"
    :is-loading="isLoading"
    :total="total"
    @submit="onSubmit"
    text="確認付款"
  />
</template>
