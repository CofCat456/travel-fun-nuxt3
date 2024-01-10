<script setup lang="ts">
const favoriteStore = useFavoriteStore()
const productStore = useProductStore()

const { isMobile } = useDevice()
const { favoriteList } = storeToRefs(favoriteStore)
const { productList } = storeToRefs(productStore)

const title = '我的收藏'

const getBreadcrumbs = computed(() => [
  {
    pathName: 'index',
    title: '首頁',
  },
  {
    title,
  },
])

const getFavoriteProductList = computed(() => productList.value.filter(({ id }) => favoriteList.value.includes(id)))


useSeoMeta({
  description: '收藏您個人的旅遊行程',
  title,
})
</script>

<template>
  <section class="flex-1 bg-cc-other-7/80 py-5">
    <NuxtLayout name="default" size="sm">
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
        class="my-5"
        size="large"
        title="我的最愛"
      >
        <template v-if="favoriteList.length !== 0">
          <NList clickable hoverable>
            <template :key="product.id" v-for="product in getFavoriteProductList">
              <NListItem>
                <template v-if="!isMobile" #prefix>
                  <div class="aspect-[4/3] w-[200px] overflow-hidden rounded-m">
                    <img :src="product?.imageUrl" class="img">
                  </div>
                </template>
                <div class="mb-4 aspect-video w-full overflow-hidden rounded-m" v-if="isMobile">
                  <img :src="product?.imageUrl" class="img">
                </div>
                <CardWish v-bind="product" />
              </NListItem>
            </template>
          </NList>
        </template>
        <NEmpty description="您目前沒有最愛清單" size="huge" v-else />
      </NCard>
    </Nuxtlayout>
  </section>
</template>
