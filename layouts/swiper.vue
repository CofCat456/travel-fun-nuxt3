<script lang="ts" setup>
defineProps<{
  isNormal?: boolean
  isBanner?: boolean
  noPadding?: boolean
}>()
</script>

<template>
  <section
    :class="[
      isNormal ? ' lg:max-w-cc-width' : ' lg:max-w-cc-big-width',
      noPadding ? 'p-0' : 'px-3 py-6 md:px-4 xl:px-0',
      isBanner ? 'md:py-6' : '',
    ]"
    class="mx-auto w-full"
  >
    <slot />
    <div class="xl:mx-4">
      <slot name="title" />
    </div>
    <div :class="[noPadding ? 'px-0' : isNormal ? 'md:px-4 xl:px-0' : 'xl:px-4']" class="relative">
      <slot name="swiper" />
    </div>
    <slot name="btn" />
  </section>
</template>
