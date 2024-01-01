<script lang="ts" setup>
import { websiteConfig } from '~/config/website'
import { copyRight } from '~/constants'
</script>

<template>
  <footer class="flex flex-col items-center  bg-cc-other-2 p-4">
    <div class="mb-10 mt-6 flex items-center gap-8">
      <NuxtImg :src="websiteConfig.logoImage" alt="logo" fit="cover" height="40" />
      <ul class="flex items-center gap-4">
        <li
          :key="item.icon"
          class="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-cc-other-3 text-white transition-colors duration-300 hover:bg-cc-accent"
          v-for="item in websiteConfig.socia"
        >
          <NuxtLink :href="item.href" target="_blank">
            <NuxtImg :alt="item.icon" :src="`/icons/${item.icon}.svg`" class="h-6 w-6" />
          </NuxtLink>
        </li>
      </ul>
    </div>
    <p class="text-center text-sm text-cc-other-3">
      {{ copyRight }}
    </p>
  </footer>
</template>
