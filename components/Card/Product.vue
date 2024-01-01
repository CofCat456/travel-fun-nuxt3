<script lang="ts" setup>
import type { Product } from '~/types'

import {
  FavoriteIcon,
  FavoriteOutlineIcon,
  LocationOnIcon,
} from '~/assets'
import { cityMap } from '~/constants'

defineProps<Product & { notRanking?: boolean, ranking?: number }>()

const favoriteStore = useFavoriteStore()

const { addFavorite, checkFavorite, removeFavorite } = favoriteStore

const goProduct = (id: string) => useRouter().push(`/product/${id}`)
</script>

<template>
  <div
    @click="goProduct(id)"
    class="group relative flex cursor-pointer flex-col items-start transition-all duration-300 hover:brightness-[.8]"
  >
    <div
      class="text-sm-content absolute left-0 top-0 h-[25px] w-[25px] rounded-br-m bg-cc-accent text-center text-white"
      v-if="!notRanking"
    >
      {{ ranking }}
    </div>
    <div class="absolute right-[10px] top-[10px] text-white">
      <NIcon class="icon-hover" color="#EE5220" size="24" v-if="checkFavorite(id)">
        <FavoriteIcon @click.stop="removeFavorite(id, title)" />
      </NIcon>
      <NIcon class="icon-hover" size="24" v-else>
        <FavoriteOutlineIcon @click.stop="addFavorite(id, title)" />
      </NIcon>
    </div>
    <div
      class="mb-2 aspect-square w-full"
    >
      <NuxtImg :alt="`${title} photo`" :src="imageUrl" class="w-full h-full object-cover" loading="lazy" placeholder />
    </div>
    <div class="flex h-[120px] w-full flex-col gap-1 px-1">
      <div class="inline-flex gap-1 text-sm text-cc-other-4">
        <NIcon size="20">
          <LocationOnIcon />
        </NIcon>
        {{ cityMap.get(city) }}
      </div>
      <p class="text-sm-content line-clamp-2 flex-1">
        {{ title }}
      </p>
      <NSpace size="small">
        <NRate :default-value="evaluate" size="small" allow-half readonly />
        <p class="text-sm-content text-cc-accent">
          {{ evaluate.toFixed(1) }}
        </p>
        <p class="text-sm-content text-cc-other-3">
          ({{ evaluateNum }})
        </p>
      </NSpace>
      <div class="inline-flex items-center gap-1">
        <h6>
          {{ currency(price) }}
        </h6>
        <p class="text-sm-content text-cc-other-4 line-through">
          {{ currency(origin_price, '$') }}
        </p>
      </div>
    </div>
  </div>
</template>
