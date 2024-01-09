<script setup lang="ts">
import type { SwiperOptions } from 'swiper/types'

import { cityMap } from '~/constants'

const props = withDefaults(defineProps<SwiperOptions & {
  title: string
  secTitle?: string
  currCity?: string
  btn?: {
    text: string
    pathName: string
  }
}>(), {
  btn: () => ({ pathName: '', text: '' }),
  slidesPerGroup: 6,
  slidesPerView: 6,
  spaceBetween: 16,
  speed: 1200,
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
        slidesPerView: 3,
        spaceBetween: 12,
        speed: 300,
      },
      '@0.75': {
        slidesPerView: 4,
        spaceBetween: 12,
        speed: 800,
      },
      '@1.00': {
        slidesPerView: 5,
        speed: 1000,
      },
      '@1.50': {
        noSwiping: true,
        slidesPerView: props.slidesPerView,
      },
    },
    modules: [SwiperNavigation],
    slidesPerGroup: props.slidesPerGroup,
    slidesPerView: props.slidesPerView,
    spaceBetween: props.spaceBetween,
    speed: props.speed,
  }
})

const getCitys = computed(() => {
  if (!props.currCity)
    return [...cityMap.keys()]

  return [...cityMap.keys()].filter(city => cityMap.get(city) !== props.currCity)
})
</script>

<template>
  <NuxtLayout name="swiper">
    <template #title>
      <Title :sec-title="secTitle" :title="title" />
    </template>
    <template #swiper>
      <Swiper
        :no-swiping="true"
        v-bind="getBindValues"
        @slide-change="onSlideChange"
        @swiper="onSwiper"
      >
        <SwiperSlide :key="city" class="lg:swiper-no-swiping" v-for="city in getCitys">
          <CardCity :city="city" />
        </SwiperSlide>
      </Swiper>
      <SwiperCustomNavigation
        :is-beginning="isBeginning"
        :is-end="isEnd"
        @go-next="goNext"
        @go-prev="goPrev"
      />
    </template>
    <template #btn>
      <div class="mt-6 text-center md:mb-6 md:mt-12" v-if="btn.text">
        <button class="btn" type="button">
          {{ btn.text }}
        </button>
      </div>
    </template>
  </Nuxtlayout>
</template>
