<script setup lang="ts">
import type { Cart } from '~/types'

import { CloseIcon } from '~/assets'

defineProps<{
  cartList?: Cart[]
}>()

defineEmits<{
  delete: []
}>()

const cartStore = useCartStore()
const curDelId = ref('')

const { deleteCart } = cartStore

async function onDeleteCart(id: string) {
  curDelId.value = id

  try {
    await deleteCart(id)
  }
  finally {
    curDelId.value = ''
  }
}
</script>

<template>
  <NGrid :cols="8" responsive="screen" x-gap="16" y-gap="8" item-responsive>
    <template
      :key="id"
      v-for="{ id, product, buy_date, final_total } in cartList"
    >
      <NGi span="0 m:1">
        <NuxtLink :to="{ name: 'product-id', params: { id: product?.id } }">
          <img :src="product?.imageUrl" class="img aspect-[4/3] w-full rounded-m">
        </NuxtLink>
      </NGi>
      <NGi span="4 m:5">
        <NThing>
          <template #header>
            <NuxtLink :to="{ name: 'product-id', params: { id: product?.id } }" class="font-bold hover:underline">
              {{ product?.title }}
            </NuxtLink>
          </template>
          <template #description>
            <NEllipsis :line-clamp="2">
              {{ product?.description }}
            </NEllipsis>
          </template>
          <template #footer>
            <NTime :time="buy_date" format="yyyy 年 MM 月 dd 日" />
          </template>
        </NThing>
      </NGi>
      <NGi class="flex items-center" span="3 m:1">
        <h6 class="font-bold text-cc-primary">
          {{ currency(final_total!) }}
        </h6>
      </NGi>
      <NGi class="place-self-center">
        <NTooltip trigger="hover">
          <template #trigger>
            <NButton :disabled="curDelId !== ''" :loading="curDelId === id" @click="onDeleteCart(id)" text>
              <NIcon size="24">
                <CloseIcon />
              </NIcon>
            </NButton>
          </template>
          從購物車中移除 {{ product?.title }}
        </NTooltip>
      </NGi>
    </template>
  </NGrid>
</template>
