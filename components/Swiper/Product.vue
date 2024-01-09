<script setup lang="ts">
import type { TitleProps } from '~/components/Ui/Title.vue'
import type { Product } from '~/types'
import type { SwiperOptions } from 'swiper/types'

const props = withDefaults(defineProps<TitleProps & SwiperOptions & {
  products: Product[]
  isNormal?: boolean
  noPadding?: boolean
  btn?: {
    text: string
    pathName?: string
  }
}>(), {
  btn: () => ({ pathName: '', text: '' }),
  loop: true,
  products: () => [],
  slidesPerGroup: 6,
  slidesPerView: 6,
  spaceBetween: 24,
  speed: 1200,
})

defineEmits<{
  btnClick: []
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
    breakpoints: {
      '@0.00': {
        loop: props.loop,
        slidesPerGroup: 1,
        slidesPerView: 1.5,
        spaceBetween: props.spaceBetween,
        speed: 300,
      },
      '@0.75': {
        loop: props.loop,
        slidesPerGroup: Number(props.slidesPerGroup) - 2,
        slidesPerView: Number(props.slidesPerView) - 2,
        spaceBetween: props.spaceBetween,
        speed: 800,
      },
      '@1.00': {
        loop: props.loop,
        slidesPerGroup: props.slidesPerGroup - 1,
        slidesPerView: Number(props.slidesPerView) - 1,
        spaceBetween: props.spaceBetween,
        speed: 1000,
      },
      '@1.50': {
        loop: props.loop,
        slidesPerGroup: props.slidesPerGroup,
        slidesPerView: props.slidesPerView,
        spaceBetween: props.spaceBetween,
        speed: props.speed,
      },
    },
    lazy: {
      loadPrevNext: true,
    },
  }
})
</script>

<template>
  <NuxtLayout :is-normal="isNormal" :no-padding="noPadding" name="swiper">
    <template #title>
      <UiTitle :sec-title="secTitle" :title="title" />
    </template>
    <template #swiper>
      <Swiper
        v-bind="getBindValues"
        @slide-change="onSlideChange"
        @swiper="onSwiper"
      >
        <SwiperSlide :key="product.title" v-for="(product, index) in products">
          <CardProduct v-bind="product" :ranking="index + 1" />
        </SwiperSlide>
      </Swiper>
      <SwiperCustomNavigation
        :is-beginning="isBeginning"
        :is-end="isEnd"
        @go-next="goNext"
        @go-prev="goPrev"
        is-product
      />
    </template>
    <template #btn>
      <div class="mt-6 text-center md:mb-6 md:mt-12" v-if="btn.text">
        <UiButton @click="$emit('btnClick')">
          {{ btn.text }}
        </UiButton>
      </div>
    </template>
  </Nuxtlayout>
</template>
