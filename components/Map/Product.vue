<script setup lang="ts">
import type { Coordinates, Product } from '~/types'

import { GoogleMap, InfoWindow, Marker, MarkerClusterer } from '@voomap/map'
import IconCloseRounded from '~icons/material-symbols/close-rounded'

const props = defineProps<{
  isMobile: boolean
  products: Product[]
}>()

const { public: { googleMapApiKey } } = useRuntimeConfig()

const center = reactive({
  lat: 25.0425,
  lng: 121.5468,
})

const showMap = ref(false)

function penTo(coordinates: Coordinates) {
  Object.assign(center, coordinates)
}

function openMap() {
  showMap.value = true
}

function closeMap() {
  showMap.value = false
}

onMounted(() => {
  if (props.products && props.products.length > 0)
    Object.assign(center, props.products[0].coordinates)
})

defineExpose({
  closeMap,
  openMap,
})
</script>

<template>
  <NModal v-model:show="showMap" block-scroll mask-closable>
    <div class="flex h-screen w-full p-0 md:p-8">
      <div
        class="z-10 w-[400px] overflow-y-auto bg-cc-other-1 shadow-[6px_0_5px_-3px_rgba(0,0,0,.2)]"
        v-if="!isMobile"
      >
        <ul class="flex flex-col p-[10px]">
          <template :key="title" v-for="{ title, evaluate, evaluateNum, price, coordinates, imageUrl } in products">
            <div
              @click="penTo(coordinates)"
              class="product-map-card mb-[10px] flex cursor-pointer border border-cc-other-6"
            >
              <div class="aspect-square w-[120px] overflow-hidden">
                <NuxtImg :alt="title" :src="imageUrl" class="img" loading="lazy" />
              </div>
              <div class="flex min-w-0 flex-1 flex-col p-[10px]">
                <p class="text-sm-content mb-1 line-clamp-3">
                  {{ title }}
                </p>
                <div class="flex flex-1 items-end justify-between">
                  <div class="flex flex-col gap-2">
                    <NSpace size="small">
                      <NRate :default-value="evaluate" size="small" allow-half readonly />
                      <p class="text-sm-content text-cc-other-3">
                        ({{ evaluateNum }})
                      </p>
                    </NSpace>
                    <h6 class="font-bold">
                      {{ currency(price) }}
                    </h6>
                  </div>
                  <NButton type="primary" ghost>
                    立即訂購
                  </NButton>
                </div>
              </div>
            </div>
          </template>
        </ul>
      </div>
      <GoogleMap
        :api-key="googleMapApiKey"
        :center="center"
        :zoom="11"
        class="flex-1 rounded-m"
        disable-default-u-i
      >
        <MarkerClusterer>
          <Marker :key="id" :position="coordinates" v-for="({ id, coordinates, title }, length) in products">
            <InfoWindow :initial-state="length === 0">
              <div class="p-3">
                {{ title }}
              </div>
            </infowindow>
          </Marker>
        </Markerclusterer>
      </GoogleMap>
      <button
        @click="showMap = false"
        class="fixed right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cc-other-1 shadow-2xl"
        type="button"
      >
        <NIcon size="24">
          <IconCloseRounded />
        </NIcon>
      </button>
    </div>
  </NModal>
</template>
