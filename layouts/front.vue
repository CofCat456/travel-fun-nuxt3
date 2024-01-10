<script lang="ts" setup>
const route = useRoute()

const cartStore = useCartStore()
const productStore = useProductStore()

await useLazyAsyncData('initial-product', async () => {
  const [productsRes, cartsRes] = await Promise.all([
    productStore.getProducts(),
    cartStore.getCarts(),
  ])

  return { cartsRes, productsRes }
})

useHead({
  meta: [
    {
      content: `${route.meta.title} - Travel Fun`,
      property: 'og:title',
    },
  ],
  titleTemplate: (title) => {
    return title
      ? `${title} - Travel Fun`
      : '旅遊趣 Travel Fun'
  },
})
</script>

<template>
  <div class="flex min-h-screen flex-col font-sans">
    <Header />
    <main class="relative flex flex-1 flex-col items-stretch">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
