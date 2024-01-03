<script lang="ts" setup>
import { cityData, cityMap, cityPos } from '~/constants/map'
</script>

<template>
  <div class="flex flex-col gap-3 px-4 py-3">
    <template :key="key" v-for="(citys, key) in cityData">
      <div class="text-sm-content">
        <p class="w-full border-b border-cc-accent py-1 text-cc-accent">
          {{ cityPos.get(key) }}
        </p>
        <div class="my-2 flex flex-wrap items-center gap-4">
          <template :key="cityName" v-for="cityName in citys">
            <NuxtLink :to="{ name: 'class-name', params: { class: 'city', name: cityName } }" v-slot="{ navigate }" custom>
              <NButton @click="navigate" text>
                {{ cityMap.get(cityName) }}市
              </NButton>
            </NuxtLink>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
