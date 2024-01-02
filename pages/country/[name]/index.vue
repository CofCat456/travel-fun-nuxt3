<script lang="ts" setup>
import { countryMap } from '~/constants'

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

const getBackgroundUrl = computed(
  () => `/images/background/country/bg_${route.params.name}.jpg`,
)
const getCountryName = computed(() => countryMap.get(route.params.name))

const getBreadcrumbs = computed(() => [
  {
    pathName: 'index',
    title: '首頁',
  },
  {
    title: getCountryName.value,
  },
])

const goProducts = () => router.push({ name: 'country-name-products-category' })
</script>

<template>
  <section id="country">
    <Banner :bg-url="getBackgroundUrl" multiply>
      <template #title>
        {{ getCountryName }}
      </template>
      <template #sec-title>
        {{ `${getCountryName} 熱門旅遊景點` }}
      </template>
    </Banner>
    <NuxtLayout>
      <div class="mb-6">
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
      </div>
    </NuxtLayout>
    <SwiperProduct :products="getFilterData(getByPopular)" title="Top 10 商品" />
    <SwiperProduct
      :products="getFilterData(getByPreferred)"
      :title="`精選${getCountryName}活動`"
    />
    <SwiperProduct :products="getFilterData(getByRecommended)" title="為您推薦" />
    <SwiperProduct
      :btn="{ text: `查看所有${getCountryName}所有活動` }"
      :products="getFilterData(getByNewest)"
      @btn-click="goProducts"
      title="最新上架"
    />
    <LazyKnow :is-mobile="isMobile" :name="getCountryName" :products="getFilterData(productList)" />
    <SwiperCity :title="`${getCountryName}熱門城市`" />
  </section>
</template>
