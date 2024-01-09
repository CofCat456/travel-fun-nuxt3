<script setup lang="ts">
import type { Cart, Product } from '~/types'

import { Embed } from '@voomap/map'
import { cityMap } from '~/constants/map'

const { public: { googleMapApiKey } } = useRuntimeConfig()

const { product: productApi } = useApi()
const { isMobile } = useDevice()

const loadingBar = useLoadingBar()

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
const isLoad = ref(false)
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

async function getProduct() {
  try {
    const { data, pending } = await productApi.getProduct(id.value, { watch: [id] })

    if (pending.value === false && data.value && data.value.success) {
      Object.assign(product, data.value?.product)
      isLoad.value = true
    }
  }
  catch {
    loadingBar.error()
  }
  finally {
    loadingBar.finish()
  }
}

async function onAddCart(data: { data: Cart }) {
  isLoading.value = true

  try {
    await addCart(data)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await nextTick()
  loadingBar.start()
  getProduct()
})
</script>

<template>
  <section id="product">
    <div id="banner" ref="bannerRef" />
    <template v-if="isLoad">
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
        <PageProductTopWrapper
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
            <PageProductLeftSide :features="product.features" />
          </div>
          <aside :class="isMobile ? 'order-first' : 'order-2'">
            <PageProductRightSide
              :id="product.id"
              :is-mobile="isMobile"
              :origin-price="product.origin_price"
              :price="product.price"
              :title="product.title"
            />
          </aside>
        </div>
      </NuxtLayout>
      <div class="bg-cc-other-7/80 py-5 md:py-10" v-if="product.plans && product.plans?.length !== 0">
        <LazyPageProductPlans>
          <template
            :key="plan.content"
            v-for="plan in product.plans || []"
          >
            <PageProductPlan
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
        </LazyPageProductPlans>
      </div>
      <NuxtLayout class="py-5 md:py-10">
        <NSpace :size="60" class="w-full md:w-8/12 md:pr-8" vertical>
          <PageProductContent :content="product.content" v-if="product.content" />
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
    </template>
  </section>
</template>

<style scoped>
:deep(.list) > ul,
:deep(.list) > ol {
  @apply list-disc pl-6 text-base tracking-wide;
}

:deep(.list) li {
  @apply py-1;
}
</style>
