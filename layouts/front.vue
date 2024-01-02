<script lang="ts" setup>
const cartStore = useCartStore()
const productStore = useProductStore()

const { cartList, finalTotal, total } = storeToRefs(cartStore)
const { productList } = storeToRefs(productStore)

const { cart, product } = useApi()

const loadingBar = useLoadingBar()

const isLoad = ref(false)

async function getInitialData() {
  try {
    const { data, pending } = await useAsyncData('initial-product', async () => {
      const [productsRes, cartsRes] = await Promise.all([
        product.getAllProduct(),
        cart.getCarts(),
      ])

      return { cartsRes, productsRes }
    })

    if (pending.value === false) {
    // @ts-expect-error: Not Err
      productList.value = data.value?.productsRes.data?.products ?? []

      // @ts-expect-error: Not Err
      cartList.value = data.value?.cartsRes.data?.data.carts ?? []

      // @ts-expect-error: Not Err
      total.value = data.value?.cartsRes.data?.data.total ?? 0

      // @ts-expect-error: Not Err
      finalTotal.value = data.value?.cartsRes.value?.data.final_total ?? 0

      isLoad.value = !pending.value
    }
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
