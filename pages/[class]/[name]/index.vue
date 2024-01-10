<script setup lang="ts">
import { cityMap, countryMap } from '~/constants'
import { Class } from '~/types'

const route = useRoute()
const router = useRouter()

const { isMobile } = useDevice()

const productStore = useProductStore()

const {
  getByNewest,
  getByPopular,
  getByPreferred,
  getByRecommended,
  productList,
} = storeToRefs(productStore)

const { getFilterData } = productStore

const isCity = computed(() => route.params.class === Class.City)
const getCurrClass = computed(() => route.params.class)
const getBackgroundUrl = computed(() => `/images/background/${getCurrClass.value}/bg_${route.params.name}.jpg`)
const getClassName = computed(() => {
  if (isCity.value)
    return cityMap.get(route.params.name)

  return countryMap.get(route.params.name)
})
const getArgs = computed(() => isCity.value ? route.params.name as string : null)

const getBreadcrumbs = computed(() => isCity.value
  ? [
      {
        pathName: 'index',
        title: '首頁',
      },
      {
        params: { class: 'country', name: 'taiwan' },
        pathName: 'class-name',
        title: '台灣',
      },
      {
        title: getClassName.value,
      },
    ]
  : [

      {
        pathName: 'index',
        title: '首頁',
      },
      {
        title: getClassName.value,
      },
    ])

function goProducts() {
  return router.push({
    name: 'class-name-products-category',
    params: { class: getCurrClass.value, name: route.params.name },
  })
}

definePageMeta({
  middleware: ['check-class'],
})

useSeoMeta({
  description: `探索${getClassName.value}之美，我們提供獨家行程、精選景點門票。旅遊趣助您輕鬆暢遊，發現${getClassName.value}獨特風情。開啟美好旅程，感受城市之魅！`,
  title: `${new Date().getFullYear()} ${getClassName.value}旅遊行程`,
})
</script>

<template>
  <section id="city">
    <Banner :bg-url="getBackgroundUrl" multiply>
      <template #title>
        {{ getClassName }}
      </template>
      <template #sec-title>
        {{ `${getClassName} 熱門旅遊景點` }}
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
      :products="getFilterData(getByPopular, getArgs)"
      title="Top 10 商品"
    />
    <SwiperProduct
      :products="getFilterData(getByPreferred, getArgs)"
      :title="`精選${getClassName}活動`"
    />
    <SwiperProduct
      :products="getFilterData(getByRecommended, getArgs)"
      title="為您推薦"
    />
    <SwiperProduct
      :btn="{ text: `查看所有${getClassName}所有活動` }"
      :products="getFilterData(getByNewest, getArgs)"
      @btn-click="goProducts"
      title="最新上架"
    />
    <LazyKnow :is-mobile="isMobile" :name="getClassName" :products="getFilterData(productList, getArgs)" />
    <SwiperCity :curr-city="getClassName" title="探索其他城市" v-if="isCity" />
  </section>
</template>
