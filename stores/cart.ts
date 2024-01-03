import type { Cart } from '../types'

const useCartStore = defineStore('cart', () => {
  const cartList = ref<Cart[]>([])
  const total = ref(0)
  const finalTotal = ref(0)

  const { cart } = useApi()

  const totalNum = computed(() => cartList.value.length)

  const getCarts = async () => {
    const res = await cart.getCarts()
    const { data } = res

    if (data.value) {
      const { success } = data.value

      if (success) {
        const { carts, final_total, total: cart_total } = data.value.data
        cartList.value = carts
        total.value = cart_total
        finalTotal.value = final_total
      }
    }
  }

  const addCart = async (data: { data: Cart }) => {
    await cart.addCart(data)
    await getCarts()
  }

  const deleteCart = async (id: string) => {
    const { data } = await cart.deleteCart(id)

    if (data.value) {
      const { success } = data.value

      if (success)
        getCarts()
    }
  }

  const deleteAllCart = async () => {
    await cart.deleteAllCart()
    await getCarts()
  }

  return {
    addCart,
    cartList,
    deleteAllCart,
    deleteCart,
    finalTotal,
    getCarts,
    total,
    totalNum,
  }
})

export default useCartStore
