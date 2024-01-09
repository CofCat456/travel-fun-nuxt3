<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>

<template>
  <UiTitle title="活動內容" page />
  <div class="content" v-html="content" />
</template>

<style scoped>
.content :deep(p) {
  font-size: theme('fontSize.base');
  line-height: theme('lineHeight.normal');
}

.content :deep(.image) {
  margin-top: theme('margin.3');
  margin-bottom: theme('margin.3');
}

.content :deep(img) {
  height: theme('height.auto');
  max-width: theme('width.full');
  border-radius: theme('borderRadius.m');
  object-fit: cover;
}

.content :deep(figcaption) {
  margin-top: theme('margin.2');
  font-size: theme('fontSize.sm');
  line-height: theme('lineHeight.normal');
  color: theme('colors.cc.other-3');
}
</style>
