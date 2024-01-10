<script setup lang="ts">
import { mockHotCitys, mockNews } from '~/constants'

const productStore = useProductStore()

const router = useRouter()

const { getByNewest, getByPopular } = storeToRefs(productStore)

const { getFilterData } = productStore

const goCountry = () => router.push({ name: 'class-name', params: { class: 'country', name: 'taiwan' } })

const description = '旅遊趣是一個帶你享受旅行、體驗生活的好夥伴，在這裡你可已看到台灣各地的旅遊行程和景點門票，準備好一起跟著旅遊趣啟航了嗎！'

useSeoMeta({
  description,
  ogDescription: description,
})
</script>

<template>
  <section id="index">
    <Banner :center="false" bg-url="/images/banner.jpg">
      <template #title>
        <span>旅遊趣</span>
        陪你去台灣各地
      </template>
      <template #sec-title>
        讓我們帶著你一同欣賞台灣的美
      </template>
      <ClientOnly>
        <Search />
      </ClientOnly>
    </Banner>
    <div class="mb-4 md:mb-0 md:mt-[60px]">
      <SwiperNew :news="mockNews" />
    </div>
    <NuxtImg alt="travel world fun" class="hidden -translate-y-8 md:block" loading="lazy" src="/images/travel-the-world.png" width="1000" />
    <LazySwiperProduct :products="getFilterData(getByPopular)" sec-title="尋找最受歡迎的商品嗎？別再猶豫，立刻挑選！" title="Top 10 商品" />
    <NuxtImg alt="home bg" class="my-6" loading="lazy" src="/images/home-bg.png" width="1920" />
    <LazySwiperProduct
      :btn="{ text: '查看更多' }" :products="getFilterData(getByNewest)" @btn-click="goCountry"
      sec-title="一直關注最新產品的我們，給您帶來最好的選擇和品質！" title="最新產品"
    />
    <LazyHotCity :hot-citys="mockHotCitys" />
    <LazyMember />
  </section>
</template>
