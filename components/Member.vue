<script setup lang="ts">
import IconEscalatorWarningRounded from '~icons/material-symbols/escalator-warning-rounded'
</script>

<template>
  <div
    style="
      background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        url(/images/member.jpg);
    "
    class="relative grid w-full place-items-center bg-cover bg-center bg-no-repeat md:h-[600px]"
  >
    <div class="bg-cc-other-8 px-3 py-10 text-center text-white md:max-w-[636px] md:px-10 md:py-6">
      <h4>帶著感激與期待，讓我們踏上旅程！</h4>
      <NIcon class="my-4" size="48">
        <IconEscalatorWarningRounded />
      </NIcon>
      <p class="mb-4 text-center text-sm leading-5">
        當人們去旅行時，他們不僅僅是去看風景，更是去體驗不同的文化和風土人情，開拓視野和擴大人脈，旅行可以帶給人們豐富的體驗和回憶
      </p>
      <NuxtLink :to="{ name: 'login' }" class="btn">
        成為會員
      </NuxtLink>
    </div>
  </div>
</template>
