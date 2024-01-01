<script lang="ts" setup>
defineProps<{
  features: string
}>()
</script>

<template>
  <UiTitle title="活動特色" page />
  <div class="list" v-html="features" />
</template>
