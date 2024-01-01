<script lang="ts" setup>
const props = defineProps<{
  modelValue?: boolean
}>()
</script>

<template>
  country/[taiwan]/products/[tickets]
  {{ $route.params.name }}
  {{ $route.params.category }}
</template>
