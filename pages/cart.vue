<script setup lang="ts">
import IconChevronRight from '~icons/material-symbols/chevron-right'

const cartStore = useCartStore()
const productStore = useProductStore()

const { cartList, finalTotal } = storeToRefs(cartStore)
const { isMobile } = useDevice()
const { getByRecommended } = storeToRefs(productStore)

const { getFilterData } = productStore
const { deleteAllCart, getCarts } = cartStore

const title = '購物車'

const isLoading = ref(false)

const getBreadcrumbs = computed(() => [
  {
    pathName: 'index',
    title: '首頁',
  },
  {
    title,
  },
])

const getCardSize = computed(() => isMobile.value ? 'small' : 'medium')

async function onDelAllCart() {
  isLoading.value = true
  try {
    await deleteAllCart()
  }
  finally {
    isLoading.value = false
  }
}

useSeoMeta({
  description: title,
  title,
})
</script>

<template>
  <section class="bg-cc-other-7/80 py-5">
    <NuxtLayout>
      <NBreadcrumb separator=">">
        <template :key="title" v-for="{ title, pathName } in getBreadcrumbs">
          <NBreadcrumbItem v-if="pathName">
            <NuxtLink :to="{ name: pathName }">
              {{ title }}
            </NuxtLink>
          </NBreadcrumbItem>
          <NBreadcrumbItem v-else>
            {{ title }}
          </NBreadcrumbItem>
        </template>
      </NBreadcrumb>
      <NCard
        :segmented="{
          content: true,
          footer: true,
        }"
        :bordered="false"
        :size="getCardSize"
        class="my-5"
        title="購物車"
      >
        <CartCarts :cart-list="cartList" @delete="getCarts" v-if="cartList?.length !== 0" />
        <NEmpty class="py-5" description="您的購物車是空的" v-else />
        <template v-if="cartList?.length !== 0" #footer>
          <div class="flex flex-col items-baseline gap-2">
            <NButton :loading="isLoading" @click="onDelAllCart" type="primary" ghost>
              清空購物車
            </NButton>
            <div class="inline-flex w-full items-center justify-between">
              <div class="inline-flex items-center gap-2">
                <b class="text-xl text-cc-accent">{{ cartList.length }}</b>
                <span class="text-sm-content">件商品合計</span>
                <p class="text-area-title text-cc-primry font-bold">
                  {{ currency(finalTotal) }}
                </p>
              </div>
              <NuxtLink :to="{ name: 'booking-order' }" v-slot="{ navigate }" custom>
                <UiButton @click="navigate">
                  前往結賬
                </UiButton>
              </NuxtLink>
            </div>
          </div>
        </template>
      </NCard>
      <NuxtLink :to="{ name: 'class-name-products-category', params: { class: 'country', name: 'taiwan' } }" class="flex items-center justify-end text-right font-bold text-cc-primary hover:opacity-80">
        <NButton icon-placement="right" type="primary" text>
          繼續購物
          <template #icon>
            <NIcon size="24">
              <IconChevronRight />
            </NIcon>
          </template>
        </NButton>
      </NuxtLink>
    </NuxtLayout>
    <SwiperProduct
      :products="getFilterData(getByRecommended, '')"
      class="mt-10"
      title="更多推薦"
    />
  </section>
</template>
