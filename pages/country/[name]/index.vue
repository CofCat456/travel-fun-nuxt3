<script lang="ts" setup>
const props = defineProps<{
  modelValue?: boolean
}>()
</script>

<template>
  country/taiwan
  {{ $route.params.name }}
</template>
