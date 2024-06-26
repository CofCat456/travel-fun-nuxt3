<script setup lang="ts">
import CartShop from '~/components/Cart/Shop.vue'
import MobileHamburger from '~/components/Mobile/Hamburger.vue'
import { websiteConfig } from '~/config/website'
import { fixedHeaderList } from '~/constants'
import IconFavoriteOutlineRounded from '~icons/material-symbols/favorite-outline-rounded'
import IconPerson from '~icons/material-symbols/person'

import navs from './Navigation'

const route = useRoute()

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const userStore = useUserStore()

const { cartList, totalNum } = storeToRefs(cartStore)
const { favoriteList } = storeToRefs(favoriteStore)
const { loginStatus } = storeToRefs(userStore)

const cartRef = ref<InstanceType<typeof CartShop>>()
const hamBurRef = ref<InstanceType<typeof MobileHamburger>>()

const isFixed = computed(() => {
  const regex = new RegExp(fixedHeaderList.join('|'))

  return regex.test(route.name as string || '')
})

const navListComponent = computed(() => navs.filter(({ component }) => component))

function handleClick(target: string) {
  if (target === 'cart')
    hamBurRef.value?.closeActive()

  cartRef.value?.closeActive()
};
</script>

<template>
  <header
    :class="isFixed ? 'fixed left-0 right-0' : 'sticky'"
    class="top-0 z-20 flex h-16 justify-center bg-black/30 px-6 py-3 text-white backdrop-blur-[25px]"
    id="header"
  >
    <NuxtLayout>
      <div class="flex w-full justify-between">
        <ClientOnly>
          <MobileHamburger @active="handleClick" ref="hamBurRef" />
        </ClientOnly>
        <div class="flex items-center gap-8 lg:w-[526px]">
          <NuxtLink to="/">
            <NuxtImg :src="websiteConfig.logoImage" alt="logo" class="h-10 object-cover" />
          </NuxtLink>
          <ul class="hidden h-full flex-1 items-center gap-1 md:flex">
            <ClientOnly>
              <template :key="nav.id" v-for="nav in navListComponent">
                <li class="flex-1 text-center text-sm">
                  <component :is="nav.component" />
                </li>
              </template>
            </ClientOnly>
          </ul>
        </div>
        <div class="flex items-center justify-between lg:w-[256px]">
          <div class="hidden place-content-center md:grid">
            <NuxtLink :to="{ name: 'wishList' }" class="leading-none">
              <NBadge :max="10" :value="favoriteList.length" color="#EE5220">
                <NIcon class="icon-hover" color="white" size="24">
                  <IconFavoriteOutlineRounded />
                </NIcon>
              </NBadge>
            </nuxtlink>
          </div>
          <NuxtLink :to="{ name: 'admin-home' }" v-if="loginStatus" v-slot="{ navigate }" custom>
            <button
              @click="navigate"
              class="hidden w-[144px] items-center justify-center gap-[6px] rounded-[50px] bg-cc-accent px-4 py-2 text-base lg:flex"
              type="button"
            >
              <NIcon size="24">
                <IconPerson />
              </NIcon>
              會員專區
            </button>
          </NuxtLink>
          <NuxtLink :to="{ name: 'login' }" v-slot="{ navigate }" custom v-else>
            <button
              @click="navigate"
              class="hidden items-center justify-center gap-[6px] rounded-[50px] bg-cc-other-8 px-4 py-2 text-base transition-colors duration-300 hover:bg-cc-accent lg:flex"
              type="button"
            >
              <NIcon size="24">
                <IconPerson />
              </NIcon>
              登入 / 註冊
            </button>
          </NuxtLink>
          <ClientOnly>
            <CartShop
              :cart-list="cartList"
              :total-num="totalNum"
              @active="handleClick"
              ref="cartRef"
            />
          </ClientOnly>
        </div>
      </div>
    </Nuxtlayout>
  </header>
</template>
