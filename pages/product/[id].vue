<script setup lang="ts">
import type { Cart, Product } from '~/types'

import { Embed } from '@voomap/map'
import { cityMap } from '~/constants/map'

const { public: { googleMapApiKey } } = useRuntimeConfig()

const { product: productApi } = useApi()
const { isMobile } = useDevice()

const route = useRoute()

const cartStore = useCartStore()
const productStore = useProductStore()

const { getByRecommended } = storeToRefs(productStore)

const { addCart } = cartStore
const { getFilterData } = productStore

const product: Product = reactive({
  id: '',
  address: '',
  category: '',
  city: '',
  content: '',
  coordinates: {
    lat: 0,
    lng: 0,
  },
  date: Date.now(),
  description: '',
  evaluate: 0,
  evaluateNum: 0,
  features: '',
  imageUrl: '',
  imagesUrl: [],
  is_enabled: false,
  origin_price: 0,
  plans: [],
  price: 0,
  title: '',
  unit: '',
})

const id = ref(route.params.id as string)
const bannerRef = ref<HTMLElement>()
const isLoading = ref(false)

const getBreadcrumbs = computed(() => [
  {
    pathName: 'index',
    title: 'Travel Fun',
  },
  {
    params: { class: 'country', name: 'taiwan' },
    pathName: 'class-name',
    title: '台灣',
  },
  {
    params: { class: 'city', name: product?.city },
    pathName: 'class-name',
    title: cityMap.get(product?.city),
  },
  {
    title: product?.title,
  },
])

async function onAddCart(data: { data: Cart }) {
  isLoading.value = true

  try {
    await addCart(data)
  }
  finally {
    isLoading.value = false
  }
}

const { data } = await productApi.getProduct(id.value, { watch: [id] })

Object.assign(product, data.value?.product)

useSeoMeta({
  description: product.description,
  title: product.title,
})
</script>

<template>
  <section id="product">
    <div id="banner" ref="bannerRef" />
    <NuxtLayout class="pb-5 md:py-5">
      <NBreadcrumb class="my-2" separator=">">
        <template :key="title" v-for="{ title, params, pathName } in getBreadcrumbs">
          <NBreadcrumbItem v-if="pathName">
            <NuxtLink :to="{ name: pathName, params }">
              {{ title }}
            </NuxtLink>
          </NBreadcrumbItem>
          <NBreadcrumbItem v-else>
            {{ title }}
          </NBreadcrumbItem>
        </template>
      </NBreadcrumb>
      <h1 class="text-2xl font-bold md:text-3xl">
        {{ product.title }}
      </h1>
      <ProductTopWrapper
        :address="product.address"
        :evaluate="product.evaluate"
        :evaluate-num="product.evaluateNum"
        :id="product.id"
        :is-mobile="isMobile"
        :title="product.title"
      />

      <teleport
        :disabled="!isMobile"
        to="#banner"
        v-if="bannerRef"
      >
        <SwiperBanner
          :images-url="product.imagesUrl || []"
          :is-mobile="isMobile"
          :slides-per-group="1"
          :slides-per-view="1.75"
          :space-between="10"
          :speed="600"
          centered-slides
          loop
        />
      </teleport>
      <div class="flex flex-col gap-8 md:flex-row">
        <div class="order-1 w-full md:w-8/12" v-if="product.features">
          <ProductLeftSide :features="product.features" />
        </div>
        <aside :class="isMobile ? 'order-first' : 'order-2'">
          <ProductRightSide
            :id="product.id"
            :is-mobile="isMobile"
            :origin-price="product.origin_price"
            :price="product.price"
            :title="product.title"
          />
        </aside>
      </div>
    </NuxtLayout>
    <div class="py-5 bg-cc-other-7/80 md:py-10" v-if="product.plans && product.plans?.length !== 0">
      <LazyProductPlans>
        <template
          :key="plan.content"
          v-for="plan in product.plans || []"
        >
          <ProductPlan
            :content="plan.content"
            :date="product.date"
            :id="product.id"
            :is-loading="isLoading"
            :is-mobile="isMobile"
            :origin-price="plan.origin_price"
            :price="plan.price"
            :product-title="product.title"
            :title="plan.title"
            :unit="product.unit"
            @add-cart="onAddCart"
          />
        </template>
      </LazyProductPlans>
    </div>
    <NuxtLayout class="py-5 md:py-10">
      <NSpace :size="60" class="w-full md:w-8/12 md:pr-8" vertical>
        <ProductContent :content="product.content" v-if="product.content" />
        <div :class="isMobile ? 'w-full' : 'w-4/5'">
          <UiTitle title="景點地圖" page />
          <Embed
            :address="product.address"
            :api-key="googleMapApiKey"
            height="400px"
            id="map"
            map-mode="place"
            v-if="product.address"
            width="100%"
          />
        </div>
      </NSpace>
    </NuxtLayout>
    <div class="bg-cc-other-7/80">
      <LazySwiperProduct
        :products="getFilterData(getByRecommended, '', product.category)"
        title="更多推薦"
      />
    </div>
  </section>
</template>

<style scoped>
:deep(.list) > ul,
:deep(.list) > ol {
  list-style-type: theme('listStyleType.disc');
  padding-left: theme('padding.6');
  font-size: theme('fontSize.base');
  letter-spacing: theme('letterSpacing.wide');
}

:deep(.list) li {
  padding: theme('padding.1') 0;
}
</style>
