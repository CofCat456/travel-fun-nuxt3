<script setup lang="ts">
import MapProduct from '~/components/Map/Product.vue'
import { categoryMap, cityMap, countryMap, sortMap } from '~/constants'
import { Class, type Product, Sort } from '~/types'
import IconChevronRight from '~icons/material-symbols/chevron-right'
import IconFlight from '~icons/material-symbols/flight'

interface RouterOption {
  params: {
    category: string
    class: string
    name: string
  }
  query?: { sort: Sort }
}

const route = useRoute()
const router = useRouter()

const productStore = useProductStore()

const { isMobile } = useDevice()

const { getFilterData, getSortData } = productStore

const productMap = ref<InstanceType<typeof MapProduct>>()
const productShowList = ref<Product[]>([])

// TODO: need to refactor
const category
  = computed(() => route.params.category as string) || Sort.Popular
const isCity = computed(() => route.params.class === Class.City)
const className = computed(() => route.params.class as string)
const name = computed(() => route.params.name as string)
const chName = computed(() =>
  isCity.value ? cityMap.get(name.value) : countryMap.get(name.value),
)
const sort = computed(() => (route.query.sort as Sort) || Sort.NewArrivals)
const getCategory = computed<string>(
  () => categoryMap.get(category.value) ?? '所有活動',
)
const getCategorys = computed<string[]>(() => ['', ...categoryMap.keys()])

const getFilterList = computed<Record<string, Sort>[]>(
  () =>
    Array.from(sortMap, ([key, value]) => ({
      label: value,
      value: key,
    })) as any,
)

const getEnCitys = computed<Record<string, string>[]>(() =>
  Array.from(cityMap, ([key, value]) => ({ key, label: `${value}市` })),
)

const getEnCountrys = computed<Record<string, string>[]>(() =>
  Array.from(countryMap, ([key, value]) => ({ key, label: value })),
)

const getBreadcrumbs = computed(() => {
  return isCity.value
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
          params: { class: 'city', name: name.value },
          pathName: 'class-name',
          title: chName.value,
        },
        {
          title: getCategory.value,
        },
      ]
    : [
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
          title: getCategory.value,
        },
      ]
})

const getProductList = computed(() =>
  getFilterData(
    getSortData(sort.value),
    isCity.value ? name.value : null,
    category.value,
    0,
  ),
)

function createRouterOption(category: string, sort: Sort) {
  const routerOption: RouterOption = {
    params: { category, class: className.value, name: name.value },
  }

  routerOption.query = { sort }

  return routerOption
}

function updateName(name: string) {
  const routerOption = createRouterOption(category.value, sort.value)

  return router.push({
    ...routerOption,
    params: {
      name,
    },
  })
}

function updateCategory(category: string) {
  const routerOption = createRouterOption(category, sort.value)

  router.push(routerOption)
}

function updateSort(item: Sort) {
  const routerOption = createRouterOption(category.value, item)

  return router.push({
    ...routerOption,
  })
}

function updateShowList() {
  const gap = getProductList.value.length - productShowList.value.length

  if (gap === 0)
    return

  const startLength = productShowList.value.length

  if (Math.floor(gap / 10) > 0) {
    productShowList.value.push(
      ...getProductList.value.slice(startLength, startLength + 10),
    )
  }
  else {
    productShowList.value.push(
      ...getProductList.value.slice(startLength, startLength + gap),
    )
  }
}

const { arrivedState } = useScroll(document, {
  behavior: 'smooth',
  throttle: 100,
})

watch(arrivedState, state => (state.bottom ? updateShowList() : null), {
  immediate: true,
})

onBeforeMount(() => {
  // Image preload
  const img = new Image()
  for (const i of getProductList.value) img.src = i.imageUrl
})

useSeoMeta({
  description: `探索${chName.value}之美，我們提供獨家行程、精選景點門票。旅遊趣助您輕鬆暢遊，發現${chName.value}獨特風情。開啟美好旅程，感受城市之魅！`,
  title: `${new Date().getFullYear()} ${chName.value}旅遊行程`,
})
</script>

<template>
  <section id="products">
    <div class="bg-cc-other-7/80 bg-cover py-2 md:pt-24">
      <NuxtLayout>
        <NBreadcrumb separator=">">
          <template
            :key="title"
            v-for="{ title, pathName, params } in getBreadcrumbs"
          >
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
      </NuxtLayout>
    </div>
    <div
      class="sticky top-16 z-20 min-h-[48px] bg-cc-other-1 shadow-[inset_0_-1px_0_0_#eaeaea] md:static md:bg-cc-other-7/80 md:shadow-none"
    >
      <NuxtLayout full no-padding>
        <div class="md:bg-cc-other-7/80">
          <h1 class="hidden text-3xl font-bold md:block">
            {{ `${chName} ${getCategory}` }}
          </h1>
          <SwiperCategory
            :categorys="getCategorys"
            :curr-category="category"
            @update-category="updateCategory"
          />
        </div>
      </NuxtLayout>
    </div>
    <MobileFilter
      :array="isCity ? getEnCitys : getEnCountrys"
      :curr-name="name"
      :curr-sort="sort"
      :is-city="isCity"
      :sort-array="getFilterList"
      @open-map="productMap?.openMap"
      @update:params="updateName"
      @update:sort="updateSort"
      v-if="isMobile"
    />
    <NuxtLayout>
      <div class="flex py-6">
        <div class="mr-6 block w-64" v-if="!isMobile">
          <div
            style="
              background-image: linear-gradient(
                  90deg,
                  #fff7eb,
                  rgba(255, 247, 234, 0.2)
                ),
                url(/images/map.jpg);
            "
            @click="productMap?.openMap"
            class="group relative mb-5 h-32 w-full cursor-pointer rounded-m border border-cc-other-5 bg-no-repeat object-cover object-center transition-all duration-300 hover:brightness-[.8]"
          >
            <div class="absolute bottom-4 left-4 rounded-m font-bold">
              <h6 class="mb-2 font-medium">
                看地圖搜尋{{ chName }}活動
              </h6>
              <p class="text-sm-content flex items-center justify-start">
                點擊前往
                <NIcon :size="20">
                  <IconChevronRight
                    class="transition-transform duration-300 group-hover:translate-x-4"
                  />
                </NIcon>
              </p>
            </div>
          </div>
          <NCard size="small">
            <template #header>
              <div class="flex items-center gap-3">
                <NIcon size="24">
                  <IconFlight />
                </NIcon>
                目的地
              </div>
            </template>
            <NMenu
              :default-value="name"
              :options="isCity ? getEnCitys : getEnCountrys"
              :root-indent="25"
              @update-value="updateName"
            />
          </NCard>
        </div>
        <main class="flex flex-1 flex-col">
          <h6 class="mb-4 font-medium" v-if="isMobile">
            {{ chName }} {{ getCategory }}
            {{ `(${getProductList.length})` }}
          </h6>
          <UiFilter
            :curr-sort="sort"
            :product-total="getProductList.length"
            :sort-array="getFilterList"
            @update:sort="updateSort"
            v-else
          />
          <div
            class="relative grid gap-x-5 gap-y-8 md:grid-cols-2 md:py-8 lg:grid-cols-4"
          >
            <CardProduct
              :key="product.id"
              v-for="product in productShowList"
              v-bind="product"
              not-ranking
            />
          </div>
        </main>
      </div>
    </NuxtLayout>
    <MapProduct
      :is-mobile="isMobile"
      :products="getProductList"
      ref="productMap"
    />
  </section>
</template>

<style scoped>
:deep(.swiper-category-custom-prev) {
  left: -theme('space.5');
}

:deep(.swiper-category-custom-next) {
  right: -theme('space.5');
}
</style>
