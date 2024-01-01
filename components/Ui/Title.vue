<script lang="ts" setup>
export interface TitleProps {
  page?: boolean
  secTitle?: string
  title: string
}

defineProps<TitleProps>()
</script>

<template>
  <div :class="page ? 'mb-5' : 'mb-6'" class="flex items-start gap-2">
    <div class="mt-2 h-2 w-2 bg-cc-primary" />
    <div>
      <h3 class="mb-2 text-xl font-bold md:text-[28px]">
        {{ title }}
      </h3>
      <h6 class="break-all text-sm text-cc-other-4 md:text-base" v-if="secTitle">
        {{ secTitle }}
      </h6>
    </div>
  </div>
</template>
