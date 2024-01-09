<script setup lang="ts">
import type { DrawerActive } from '@/types'

import { ChevronRightIcon, TableRowsRoundedIcon } from '~/assets'
import navs, { handleItemHeaderClick } from '~/components/Header/Navigation'

const emit = defineEmits<{
  active: [target: string]
}>()

const { isMobile } = useDevice()

const activate: DrawerActive = reactive({
  active: false,
  placement: 'bottom',
})

function toggleActive() {
  if (!activate.active)
    emit('active', 'humburger')

  activate.active = !activate.active
};

const closeActive = () => activate.active = false

defineExpose({
  closeActive,
})
</script>

<template>
  <template v-if="isMobile">
    <NButton @click="toggleActive" text>
      <NIcon color="#fff" size="24">
        <TableRowsRoundedIcon />
      </NIcon>
    </NButton>
    <NDrawer
      :mask-closable="false"
      :placement="activate.placement"
      :show-mask="false"
      height="undefined"
      style="top: 64px"
      v-model:show="activate.active"
    >
      <NCollapse
        :theme-overrides="{
          itemMargin: '0',
          titlePadding: '0',
        }"
        @item-header-click="handleItemHeaderClick
        "
        arrow-placement="right"
        accordion
      >
        <template #arrow>
          <NIcon size="24">
            <ChevronRightIcon />
          </NIcon>
        </template>

        <template :key="nav.id" v-for="nav in navs">
          <component :is="nav.mobileComponent" />
        </template>

        <NCollapseItem name="user">
          <template #header>
            <div class="flex-1">
              會員專區
            </div>
          </template>
          <NuxtLink :to="{ name: 'Login' }" v-slot="{ navigate }" custom>
            <div @click="navigate">
              登入/註冊
            </div>
          </NuxtLink>
          <NuxtLink :to="{ name: 'WishList' }" v-slot="{ navigate }" custom>
            <div @click="navigate">
              我的最愛
            </div>
          </NuxtLink>
        </NCollapseItem>
      </NCollapse>
    </NDrawer>
  </template>
</template>

<style scoped>
:deep(
    .n-collapse-item
      .n-collapse-item__content-wrapper
      .n-collapse-item__content-inner
  ) {
  padding-top: 0;
}

:deep(.n-collapse-item__header-main) {
  padding: 16px;
  background-color: #e9e9e9;
  font-weight: 700;
}

:deep(
    .n-collapse-item__header.n-collapse-item__header--active
      > .n-collapse-item__header-main
  ),
:deep(
    .n-collapse-item__header.n-collapse-item__header--active
      .n-collapse-item-arrow
  ) {
  color: theme('colors.cc.accent');
}

:deep(.n-collapse-item__content-inner > div) {
  cursor: pointer;
  border-top: 1px;
  border-color: theme('colors.cc.other-1');
  background-color: theme('colors.cc.other-7');
  padding: 0.75rem 1rem;
}
</style>
