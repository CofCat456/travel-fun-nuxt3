<script setup lang="ts">
withDefaults(defineProps<{
  opacity?: number
  isBeginning: boolean
  isEnd: boolean
  isNormal?: boolean
  isProduct?: boolean
}>(), {
  isBeginning: true,
  opacity: 100,
})

defineEmits<{
  goNext: []
  goPrev: []
}>()
</script>

<template>
  <button
    :class="[
      isBeginning && 'md:hidden',
      isNormal ? 'left-3 opacity-60' : 'left-0 translate-x-4 lg:-translate-x-full',
      isProduct && 'swiper-product-btn ',
    ]"
    @click="$emit('goPrev')"
    class="swiper-btn-shadow group absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 rounded-full bg-white text-cc-other-9 md:block"
  >
    <svg
      class="mx-auto h-6 w-6 text-cc-other-5 transition-colors group-hover:text-[#32303C]"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 19.5L8.25 12l7.5-7.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
      />
    </svg>
  </button>
  <button
    :class="[
      isEnd && 'md:hidden',
      isNormal ? 'right-3 opacity-60' : 'right-0 -translate-x-4 lg:translate-x-full',
      isProduct && 'swiper-product-btn ',
    ]"
    @click="$emit('goNext')"
    class="swiper-btn swiper-btn-shadow group absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 rounded-full bg-white text-cc-other-9 md:block"
  >
    <svg
      class="mx-auto h-6 w-6 text-cc-other-5 transition-colors group-hover:text-[#32303C]"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
      />
    </svg>
  </button>
</template>

<style scoped>
.swiper-btn-shadow {
  box-shadow: 0px 0px 4px 0px #0000001f;
}

.swiper-product-btn {
  top: calc(50% - (120px + 8px) / 2);
}
</style>
