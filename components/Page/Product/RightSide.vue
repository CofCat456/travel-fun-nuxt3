<script setup lang="ts">
import type { AffixProps } from 'naive-ui'

import { FavoriteIcon, FavoriteOutlineIcon } from '~/assets'

const props = defineProps<{
  isMobile: boolean
  id: string
  title: string
  price: number
  originPrice: number
}>()

const favoriteStore = useFavoriteStore()

const { addFavorite, checkFavorite, removeFavorite } = favoriteStore

const getBindValues = computed<AffixProps>(() => {
  return {
    bottom: props.isMobile ? 0 : undefined,
    top: props.isMobile ? undefined : 100,
    triggerBottom: props.isMobile ? 9999 : undefined,
  }
})
</script>

<template>
  <NAffix class="inset-x-0 z-40 w-full md:inset-x-auto md:w-[300px]" v-bind="getBindValues">
    <div class="flex items-center gap-x-10 border border-cc-other-5/50 bg-cc-other-1 px-5 py-2 md:flex-col md:items-start md:gap-x-0 md:rounded-2xl md:p-5">
      <template v-if="isMobile">
        <NIcon class="icon-hover" color="#EE5220" size="24" v-if="checkFavorite(id)">
          <FavoriteIcon @click.stop="removeFavorite(id, title)" />
        </NIcon>
        <NIcon class="icon-hover" size="24" v-else>
          <FavoriteOutlineIcon @click.stop="addFavorite(id, title)" />
        </NIcon>
      </template>
      <div class="mb-4" v-else>
        <span class="mr-1 text-2xl font-bold">{{ currency(price) }}</span>
        <span class="text-sm text-cc-other-4 line-through">
          {{ currency(originPrice) }}
        </span>
      </div>
      <UiButton @click="scrollTo('plan')" is-full>
        選擇方案
      </UiButton>
    </div>
  </NAffix>
</template>
