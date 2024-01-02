<script lang="ts" setup>
import type { SwiperOptions } from 'swiper/types'

const props = withDefaults(defineProps<SwiperOptions & {
  currCategory?: string
  categorys: string[]
}>(), {
  slidesPerGroup: 6,
  slidesPerView: 6,
  spaceBetween: 24,
  speed: 1200,
})

defineEmits<{
  updateCategory: [categiry: string]
}>()

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
    FreeMode: true,
    breakpoints: {
      '@0.00': {
        slidesPerView: 'auto' as 'auto' | number,
        spaceBetween: 10,
        speed: 300,
      },
      '@0.75': {
        slidesPerGroup: Number(props.slidesPerView) - 2,
        slidesPerView: Number(props.slidesPerView) - 2,
        speed: 800,
      },
      '@1.00': {
        slidesPerGroup: props.slidesPerGroup - 1,
        slidesPerView: Number(props.slidesPerView) - 1,
        speed: 1000,
      },
      '@1.50': {
        slidesPerGroup: props.slidesPerGroup,
        slidesPerView: props.slidesPerView,
      },
    },
    modules: [SwiperFreeMode, SwiperNavigation],
    slidesPerGroup: props.slidesPerGroup,
    slidesPerView: props.slidesPerView,
    spaceBetween: props.spaceBetween,
    speed: props.speed,
  }
})
</script>

<template>
  <NuxtLayout class="py-0 md:py-6" name="swiper" is-normal no-padding>
    <template #swiper>
      <Swiper
        v-bind="getBindValues"
        @slide-change="onSlideChange"
        @swiper="onSwiper"
      >
        <SwiperSlide
          :key="category"
          class="max-w-fit md:max-w-full"
          v-for="category in categorys || []"
        >
          <CardCategory
            :category="category"
            :is-active="(currCategory ?? '') === category"
            @click="$emit('updateCategory', category)"
          />
        </SwiperSlide>
      </Swiper>
      <SwiperCustomNavigation
        :is-beginning="isBeginning"
        :is-end="isEnd"
        @go-next="goNext"
        @go-prev="goPrev"
      />
    </template>
  </NuxtLayout>
</template>
