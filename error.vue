<script setup lang="ts">
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout name="front">
    <div
      class="absolute text-center top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
    >
      <h1 class="text-9xl font-bold mb-3">
        404
      </h1>
      <h2 class="mt-5 mb-8 font-bold text-4xl">
        這裡沒有你要的旅遊行程 :&lt
      </h2>
      <UiButton @click="handleError">
        回首頁
      </UiButton>
    </div>
  </NuxtLayout>
</template>
