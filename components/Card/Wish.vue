<script setup lang="ts">
import type { Product } from '@/types'

import { cityMap } from '~/constants'
import IconDateRangeOutlineRounded from '~icons/material-symbols/date-range-outline-rounded'
import IconFavoriteRounded from '~icons/material-symbols/favorite-rounded'
import IconLocationOnOutlineRounded from '~icons/material-symbols/location-on-outline-rounded'

defineProps<Product>()

const router = useRouter()

const favoriteStore = useFavoriteStore()

const { removeFavorite } = favoriteStore

const goProduct = (id: string) => router.push(`/product/${id}`)
</script>

<template>
  <NThing :title="title" @click="goProduct(id)">
    <template #header-extra>
      <NButton @click.stop="removeFavorite(id, title)" text>
        <NIcon class="icon-hover" color="#EE5220" size="24">
          <IconFavoriteRounded />
        </NIcon>
      </NButton>
    </template>
    <template #description>
      <NEllipsis :line-clamp="3" :tooltip="false">
        {{ description }}
      </NEllipsis>
    </template>
    <template #footer>
      <div class="flex justify-between items-center">
        <NSpace size="small">
          <NRate :default-value="evaluate" size="small" allow-half readonly />
          <p class="text-sm-content text-cc-other-3">
            ({{ evaluateNum }})
          </p>
        </NSpace>
        <h5 class="font-bold">
          {{ currency(price) }}
        </h5>
      </div>
    </template>
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <div class="inline-flex text-cc-other-4 items-center gap-1">
          <NIcon :size="20">
            <IconLocationOnOutlineRounded />
          </NIcon>
          {{ cityMap.get(city) }}
        </div>
        <div class="inline-flex text-cc-other-4 items-center gap-1">
          <NIcon :size="20">
            <IconDateRangeOutlineRounded />
          </NIcon>
          可預訂時間：<NTime :time="date" format="yyyy 年 MM 月 dd 日" />
        </div>
      </div>
    </div>
  </NThing>
</template>
