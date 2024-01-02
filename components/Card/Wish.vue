<script setup lang="ts">
import type { Product } from '@/types'

import {
  DateRangeOutlineIcon,
  FavoriteIcon,
  LocationOnIcon,
} from '~/assets'
import { cityMap } from '~/constants'

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
          <FavoriteIcon />
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
            <LocationOnIcon />
          </NIcon>
          {{ cityMap.get(city) }}
        </div>
        <div class="inline-flex text-cc-other-4 items-center gap-1">
          <NIcon :size="20">
            <DateRangeOutlineIcon />
          </NIcon>
          可預訂時間：<NTime :time="date" format="yyyy 年 MM 月 dd 日" />
        </div>
      </div>
    </div>
  </NThing>
</template>
