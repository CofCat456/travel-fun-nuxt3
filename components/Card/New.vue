<script setup lang="ts">
import type { New } from '~/types'

defineProps<New>()
</script>

<template>
  <div
    :style="`background-image: url(${image})`"
    class="group flex min-h-[240px] cursor-pointer flex-col items-start justify-between rounded-[10px] bg-cover bg-center p-3 text-white transition-all duration-300 hover:brightness-[.8]"
  >
    <div class="text-sm-content rounded-[30px] bg-cc-accent px-3 py-1 text-white">
      最新消息
    </div>
    <div>
      <p class="text-area-title font-bold">
        {{ title }}
      </p>
      <p class="text-sm-content">
        {{ description }}
      </p>
      <button
        class="mt-2 rounded-m bg-white px-4 py-2 text-cc-other-2 transition-colors duration-300 group-hover:bg-cc-primary group-hover:text-white"
        type="button"
      >
        查看更多
      </button>
    </div>
  </div>
</template>
