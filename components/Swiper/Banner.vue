<script setup lang="ts">
import type { SwiperOptions } from 'swiper/types'

const props = withDefaults(defineProps<SwiperOptions & {
  imagesUrl: string[]
}>(), {
  centeredSlides: true,
  loop: true,
  slidesPerGroup: 1,
  slidesPerView: 1.75,
  spaceBetween: 10,
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

const getBindValues = computed(() => ({
  breakpoints: {
    '@0.00': {
      centeredSlides: props.centeredSlides,
      loop: props.loop,
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: props.spaceBetween,
      speed: props.speed,
    },
    '@0.75': {
      centeredSlides: props.centeredSlides,
      loop: props.loop,
      slidesPerGroup: Number(props.slidesPerGroup),
      slidesPerView: Number(props.slidesPerView),
      spaceBetween: props.spaceBetween,
      speed: props.speed,
    },
  },
  modules: [SwiperNavigation, SwiperPagination],
}))

function pagination() {
  return {
    clickable: true,
    renderBullet: (_: number, className: string) => {
      return `<span class="${className}"></span>`
    },
  }
}
</script>

<template>
  <NuxtLayout name="swiper" is-banner no-padding>
    <template #swiper>
      <Swiper
        :pagination="pagination()"
        v-bind="getBindValues"
        @slide-change="onSlideChange"
        @swiper="onSwiper"
      >
        <SwiperSlide :key="imageUrl" class="bg-sky-300" v-for="imageUrl in imagesUrl || []">
          <img :src="imageUrl" class="aspect-video object-cover object-center">
        </SwiperSlide>
      </Swiper>
      <SwiperCustomNavigation
        :is-beginning="isBeginning"
        :is-end="isEnd"
        @go-next="goNext"
        @go-prev="goPrev"
        is-normal
      />
    </template>
  </NuxtLayout>
</template>

<style scoped>
:deep(.swiper-pagination-bullet) {
  width: theme('width.2');
  height: theme('height.2');
  border-width: theme('borderWidth.DEFAULT');
  border-color: theme('borderColor.cc.other-1');
  background-color: theme('colors.cc.other-1/30');
  opacity: theme('opacity.70');

  &:hover {
    opacity: theme('opacity.90');
  }
}

:deep(.swiper-pagination-bullet-active) {
  scale: theme('scale.150');
  border-color: theme('colors.cc.other-1');
  background-color: theme('colors.cc.other-1');
}
</style>
