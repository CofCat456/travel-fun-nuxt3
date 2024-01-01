<script lang="ts" setup>
import type { Cart } from '~/types'

defineEmits<{
  addCart: [cart: { data: Cart }]
}>()
</script>

<template>
  <div id="plan">
    <NuxtLayout>
      <UiTitle title="選擇方案" page />
      <NList :show-divider="false" hoverable>
        <slot />
      </NList>
    </NuxtLayout>
  </div>
</template>

<style scoped>
#plan :deep(.n-list) {
  @apply space-y-10 bg-transparent;
}

#plan :deep(.n-list-item) {
  @apply bg-cc-other-1;
}
</style>
