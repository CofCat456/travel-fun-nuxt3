<script setup lang="ts">
import type { UserInfo } from '~/types'

import { websiteConfig } from '~/config/website'
import { NForm } from 'naive-ui'

const userStore = useUserStore()

const formRef = ref<InstanceType<typeof NForm>>()
const userValue = ref<UserInfo>({
  password: '',
  username: '',
})

const options = computed(() =>
  ['@gmail.com'].map((suffix) => {
    const prefix = userValue.value.username.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    }
  }),
)

const rules = computed(() => ({
  password: {
    message: '請輸入密碼',
    required: true,
    trigger: ['blur', 'change'],
  },
  username: {
    message: '請輸入用戶名稱',
    required: true,
    trigger: ['blur', 'input'],
  },
}))

function onSubmit() {
  formRef.value?.validate(async (errors) => {
    if (!errors)
      await userStore.sign({ ...userValue.value })
  })
}

useSeoMeta({
  description: '登入',
  title: '登入',
})
</script>

<template>
  <div
    class="absolute top-1/2 left-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2"
  >
    <img :src="websiteConfig.logo" class="mx-auto w-10">
    <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
      <h3 class="text-center font-bold">
        登入後台
      </h3>
      <NForm :model="userValue" :rules="rules" ref="formRef">
        <NGrid :cols="1">
          <NFormItemGi label="管理員帳號" path="username">
            <NAutoComplete
              :options="options"
              placeholder="請輸入帳號"
              v-model:value="userValue.username"
            />
          </NFormItemGi>

          <NFormItemGi label="管理員密碼" path="password">
            <NInput
              placeholder="請輸入密碼"
              show-password-on="mousedown"
              type="password"
              v-model:value="userValue.password"
            />
          </NFormItemGi>
        </NGrid>
      </NForm>
      <UiButton :is-loading="userStore.isLoading" @click="onSubmit" is-full>
        登入 {{ userStore.isLoading ? "中" : "" }}
      </UiButton>
    </div>
  </div>
</template>
