<script lang="ts" setup>
const cartStore = useCartStore()
const productStore = useProductStore()

const loadingBar = useLoadingBar()

const isLoad = ref(false)

async function getInitialData() {
  try {
    const { pending } = await useAsyncData('initial-product', async () => {
      const [productsRes, cartsRes] = await Promise.all([
        productStore.getProducts(),
        cartStore.getCarts(),
      ])

      return { cartsRes, productsRes }
    })

    if (pending.value === false)
      isLoad.value = true
  }
  catch {
    loadingBar.error()
  }
  finally {
    loadingBar.finish()
  }
}

onMounted(async () => {
  loadingBar.start()
  await nextTick()
  getInitialData()
})
</script>

<template>
  <div class="flex min-h-screen flex-col font-sans">
    <Header />
    <main class="relative flex flex-1 flex-col items-stretch">
      <slot v-if="isLoad" />
    </main>
    <AppFooter />
  </div>
</template>
