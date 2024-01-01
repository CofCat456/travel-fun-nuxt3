<script lang="ts" setup>
import type { City } from '~/types'

const props = withDefaults(defineProps<{
  hotCitys: City[]
}>(), {
  hotCitys: () => [],
})

// TODO: 資料來源

const mainCity = computed<City | null>(() => {
  return props.hotCitys.length > 0 ? props.hotCitys[0] : null
})

const otherCity = computed(() => {
  return props.hotCitys.slice(1)
})
</script>

<template>
  <div class="bg-cc-other-7/80 pb-6 pt-12 md:pb-20">
    <NuxtLayout>
      <UiTitle sec-title="探索最熱門的城市，發現更多令人驚嘆的旅程！" title="熱門城市" />
      <div class="grid grid-rows-2 gap-3 md:grid-flow-col md:gap-6" v-if="hotCitys">
        <NuxtLink
          :to="{ name: 'city-name', params: { name: `${mainCity.enName.toLowerCase()}` } }" v-if="mainCity?.name" v-slot="{ navigate }"
          custom
        >
          <div @click="navigate" class="relative col-span-2 row-span-2 overflow-hidden rounded-m">
            <NuxtImg
              :alt="mainCity.name"
              :src="mainCity.image"
              class="clear-scale h-full w-full cursor-pointer object-cover transition-transform duration-500"
              quality="100"
              width="636"
            />
            <div class="absolute bottom-3 left-3 font-bold text-white">
              <h3 class="mb-1">
                {{ mainCity.name }}
              </h3>
              <p>{{ mainCity.enName }}</p>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink
          :key="city.name" :to="{ name: 'city-name', params: { name: `${city.enName.toLowerCase()}` } }" v-for="city in otherCity" v-slot="{ navigate }"
          custom
        >
          <div @click="navigate" class="relative aspect-[4/3] overflow-hidden rounded-m">
            <NuxtImg
              :alt="city.name"
              :src="city.image"
              class="clear-scale h-full w-full cursor-pointer object-cover transition-transform duration-500"
              loading="lazy"
              quality="100"
            />
            <div class="absolute bottom-3 left-3 font-bold text-white">
              <p class="text-area-title mb-1">
                {{ city.name }}
              </p>
              <p class="text-sm">
                {{ city.enName }}
              </p>
            </div>
          </div>
        </Nuxtlink>
      </div>
    </NuxtLayout>
  </div>
</template>
