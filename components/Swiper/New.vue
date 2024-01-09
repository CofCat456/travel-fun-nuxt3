<script setup lang="ts">
import type { New } from '~/types'
import type { SwiperOptions } from 'swiper/types'

const props = withDefaults(defineProps<SwiperOptions & {
  news: New[]
}>(), {
  slidesPerGroup: 3,
  slidesPerView: 3,
  spaceBetween: 24,
  speed: 600,
})

const {
  goNext,
  goPrev,
  isBeginning,
  isEnd,
  onSlideChange,
  onSwiper,
} = useSwiperInit()

const getBindValues = computed(() => {
  return {
    breakpoints: {
      '@0.00': {
        direction: 'vertical' as 'horizontal' | 'vertical',
      },
      '@0.75': {
        slidesPerGroup: 2,
        slidesPerView: 2,
      },
      '@1.00': {
        slidesPerGroup: 2,
        slidesPerView: 2,
        speed: 400,
      },
      '@1.50': {
        slidesPerView: props.slidesPerView,
        spaceBetween: props.spaceBetween,
      },
    },
    slidesPerGroup: props.slidesPerGroup,
    slidesPerView: props.slidesPerView,
    spaceBetween: props.spaceBetween,
    speed: props.speed,
  }
})
</script>

<template>
  <NuxtLayout name="swiper">
    <template #title>
      <UiTitle
        sec-title="旅行變得更簡單！我們提供最新的旅遊優惠，讓您輕鬆規劃完美的旅程！"
        title="最新旅遊優惠"
      />
    </template>
    <template #swiper>
      <Swiper
        v-bind="getBindValues"
        @slide-change="onSlideChange"
        @swiper="onSwiper"
      >
        <SwiperSlide :key="item.title" v-for="item in news || []">
          <CardNew v-bind="item" />
        </SwiperSlide>
      </Swiper>
      <SwiperCustomNavigation
        :is-beginning="isBeginning"
        :is-end="isEnd"
        @go-next="goNext"
        @go-prev="goPrev"
      />
    </template>
  </Nuxtlayout>
</template>

<style scoped>
@media screen and (max-width: 768px) {
  .swiper {
    height: 768px;
  }
}
</style>
