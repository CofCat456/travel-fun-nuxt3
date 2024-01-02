<script lang="ts" setup>
import { cityMap } from '~/constants'

const props = defineProps<{
  city: string
}>()

const getName = computed<string>(() => cityMap.get(props.city))

const getImage = computed(() => `/images/city/city_${props.city}.jpg`)
</script>

<template>
  <NuxtLink
    :to="{ name: 'city-name', params: { name: city } }"
    class="relative block w-full overflow-hidden rounded-m"
  >
    <div
      :style="`background-image: url(${getImage})`"
      class="clear-scale h-40 w-full cursor-pointer rounded-m bg-cc-other-3 bg-cover bg-center transition-transform duration-500 md:h-60"
    />
    <h5
      class="absolute bottom-3 left-3 text-sm font-bold text-white md:text-xl"
      style="transform: translate3d(0, 0, 0)"
    >
      {{ getName }}
    </h5>
  </NuxtLink>
</template>
