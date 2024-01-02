<script lang="ts" setup>
import { cityMap } from '~/constants'

const route = useRoute()
const router = useRouter()

const productStore = useProductStore()

const { isMobile } = useDevice()
const {
  getByNewest,
  getByPopular,
  getByPreferred,
  getByRecommended,
  productList,
} = storeToRefs(productStore)

const { getFilterData } = productStore

const getBackgroundUrl = computed(() => `/images/background/city/bg_${route.params.name}.jpg`)
const getCityName = computed(() => cityMap.get(route.params.name))

const getBreadcrumbs = computed(() => [
  {
    pathName: 'index',
    title: '首頁',
  },
  {
    params: { name: 'taiwan' },
    pathName: 'country-name',
    title: '台灣',
  },
  {
    title: getCityName.value,
  },
])

const goProducts = () => router.push({ name: 'city-name-products-category' })
</script>

<template>
  <section id="city">
    <Banner :bg-url="getBackgroundUrl" multiply>
      <template #title>
        {{ getCityName }}
      </template>
      <template #sec-title>
        {{ `${getCityName} 熱門旅遊景點` }}
      </template>
    </Banner>
    <NuxtLayout>
      <div class="mb-6">
        <NBreadcrumb separator=">">
          <template :key="title" v-for="{ title, pathName, params } in getBreadcrumbs">
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
      </div>
    </NuxtLayout>
    <SwiperProduct
      :products="getFilterData(getByPopular, route.params.name as string)"
      title="Top 10 商品"
    />
    <SwiperProduct
      :products="getFilterData(getByPreferred, route.params.name as string)"
      :title="`精選${getCityName}活動`"
    />
    <SwiperProduct
      :products="getFilterData(getByRecommended, route.params.name as string)"
      title="為您推薦"
    />
    <SwiperProduct
      :btn="{ text: `查看所有${getCityName}所有活動` }"
      :products="getFilterData(getByNewest, route.params.name as string)"
      @btn-click="goProducts"
      title="最新上架"
    />
    <LazyKnow :is-mobile="isMobile" :name="getCityName" :products="getFilterData(productList, route.params.name as string)" />
    <SwiperCity :curr-city="getCityName" title="探索其他城市" />
  </section>
</template>
