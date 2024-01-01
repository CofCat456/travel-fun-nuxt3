<script setup lang="ts">
import type { Cart, DrawerActive } from '~/types'
import type { TooltipProps } from 'naive-ui'

import { ShoppingCartIcon, ShoppingCartOutlineIcon } from '~/assets'

type TooltipThemeOverrides = NonNullable<TooltipProps['themeOverrides']>

defineProps<{
  totalNum: number
  cartList: Cart[]
}>()

const emit = defineEmits<{
  active: [target: string]
}>()

const deviceStore = useDeviceStore()

const { isMobile } = storeToRefs(deviceStore)

const tooltipThemeOverrides: TooltipThemeOverrides = {
  color: '#fff',
  padding: '0px',
}

const activate: DrawerActive = reactive({
  active: false,
  placement: 'bottom',
})

function toggleActive() {
  if (!activate.active)
    emit('active', 'cart')

  activate.active = !activate.active
};

const closeActive = () => activate.active = false

// FIX: router
// onBeforeRouteUpdate(() => {
//   closeActive()
// })

defineExpose({
  closeActive,
})
</script>

<template>
  <NTooltip
    :style="{ width: '400px' }"
    :theme-overrides="tooltipThemeOverrides"
    placement="bottom"
    trigger="hover"
    v-if="!isMobile"
  >
    <template #trigger>
      <NBadge :max="10" :value="totalNum" color="#EE5220">
        <NIcon class="cursor-pointer" color="white" size="24">
          <ShoppingCartOutlineIcon />
        </NIcon>
      </NBadge>
    </template>
    <NCard
      :segmented="{
        content: true,
        footer: 'soft',
      }"
      :bordered="false"
      size="small"
      embedded
    >
      <template v-if="totalNum">
        <NScrollbar style="max-height: 340px">
          <NList clickable hoverable>
            <template
              :key="product?.id"
              v-for="{ product } in cartList"
            >
              <NListItem>
                <template #prefix>
                  <div class="aspect-square w-14">
                    <NuxtImg :src="product?.imageUrl" class="img" />
                  </div>
                </template>
                <NThing :title="product?.title">
                  <template #description>
                    <NEllipsis style="max-width: 240px">
                      {{ product?.description }}
                    </NEllipsis>
                  </template>
                  <p class="font-bold text-cc-primary">
                    {{ currency(product?.price!) }}
                  </p>
                </NThing>
                <div />
              </NListItem>
            </template>
          </NList>
        </NScrollbar>
      </template>
      <NEmpty description="您的購物車是空的" v-else />
      <template #footer>
        <div class="flex items-center justify-between">
          共 {{ totalNum }} 件商品
          <NuxtLink :to="{ name: 'cart' }" class="btn">
            前往購物車
          </NuxtLink>
        </div>
      </template>
    </NCard>
  </NTooltip>
  <template v-else>
    <NButton @click="toggleActive" text>
      <NBadge :max="10" :value="totalNum" color="#EE5220">
        <NIcon class="cursor-pointer" color="white" size="24">
          <ShoppingCartIcon />
        </NIcon>
      </NBadge>
    </NButton>
    <NDrawer
      :mask-closable="false"
      :placement="activate.placement"
      :show-mask="false"
      height="undefined"
      style="top: 64px"
      v-model:show="activate.active"
    >
      <NDrawerContent footer-style="justify-content: space-between; align-items: center;" title="購物車">
        <template v-if="totalNum">
          <NList clickable hoverable>
            <template
              :key="product?.id"
              v-for="{ product }, index in cartList"
            >
              <NuxtLink :to="{ name: 'Product', params: { productId: product?.id } }" v-slot="{ navigate }" custom>
                <NListItem
                  :class="index !== cartList.length - 1 ? 'border-b' : ''"
                  @click="navigate"
                  class="flex cursor-pointer gap-5 py-5"
                >
                  <template #prefix>
                    <div class="aspect-square w-28 overflow-hidden rounded-m">
                      <NuxtImg :src="product?.imageUrl" class="img" placeholder preload />
                    </div>
                  </template>
                  <NThing :title="product?.title">
                    <template #description>
                      <NEllipsis :line-clamp="2" :tooltip="false" class="text-sm">
                        {{ product?.description }}
                      </NEllipsis>
                    </template>
                    <p class="font-bold text-cc-primary">
                      {{ currency(product?.price!) }}
                    </p>
                  </NThing>
                  <div />
                </NListItem>
              </NuxtLink>
            </template>
          </NList>
        </template>
        <NEmpty description="您的購物車是空的" v-else />
        <template #footer>
          共 {{ totalNum }} 件商品
          <NuxtLink :to="{ name: 'cart' }" class="btn">
            前往購物車
          </NuxtLink>
        </template>
      </NDrawerContent>
    </NDrawer>
  </template>
</template>
