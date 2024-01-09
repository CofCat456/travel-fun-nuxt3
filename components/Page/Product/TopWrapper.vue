<script setup lang="ts">
import { FavoriteIcon, FavoriteOutlineIcon, LocationOnIcon, StarIcon } from '~/assets'

defineProps<{
  isMobile: boolean
  id: string
  title: string
  evaluate: number
  evaluateNum: number
  address: string
}>()

const favoriteStore = useFavoriteStore()

const { addFavorite, checkFavorite, removeFavorite } = favoriteStore

function toggleFavoriteHandler(id: string, title: string) {
  if (checkFavorite(id))
    removeFavorite(id, title)
  else
    addFavorite(id, title)
};
</script>

<template>
  <div class="mt-3 flex items-center gap-6">
    <div class="flex items-center">
      <div class="flex items-center">
        <NIcon color="#EE5220" size="20">
          <StarIcon />
        </NIcon>
        <span class="px-1 font-medium leading-5 text-cc-accent"> {{ evaluate }} </span>
      </div>
      <div class="ml-2 cursor-pointer">
        <span class="hover:underline">({{ evaluateNum }} 則評價)</span>
      </div>
    </div>
    <div class="flex flex-1 cursor-pointer items-center whitespace-nowrap hover:underline" v-if="!isMobile">
      <NIcon size="24">
        <LocationOnIcon />
      </NIcon>
      <span @click="scrollTo('map')" class="ml-1">{{ address }}</span>
    </div>
    <div :class="checkFavorite(id) ? 'text-cc-accent' : 'hover:text-cc-accent'" @click="toggleFavoriteHandler(id, title)" class="flex cursor-pointer items-center transition-colors" v-if="!isMobile">
      <NIcon class="icon-hover" size="24" v-if="checkFavorite(id)">
        <FavoriteIcon />
      </NIcon>
      <NIcon class="icon-hover" size="24" v-else>
        <FavoriteOutlineIcon />
      </NIcon>
      <span class="ml-2 text-sm">加入我的最愛</span>
    </div>
  </div>
</template>
