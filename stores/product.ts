import type { Product } from '~/types'

import { Sort } from '~/types'

type SortFunction<T = Product> = (a: T, b: T) => number

const useProductStore = defineStore('product', () => {
  const { product } = useApi()
  const productList = ref<Product[]>([])

  const sortByPreferred = () => Math.random() - 0.5
  const sortByNewest: SortFunction = (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  const sortByPopular: SortFunction = (a, b) => b.evaluate - a.evaluate || b.evaluateNum - a.evaluateNum
  const sortByReviewCount: SortFunction = (a, b) => b.evaluateNum - a.evaluateNum
  const sortByPrice: SortFunction = (a, b) => a.price - b.price
  const sortRecommended: SortFunction = (a, b) => b.evaluate - a.evaluate

  const getByPopular = computed<Product[]>(() => [...productList.value].sort(sortByPopular))
  const getByNewest = computed<Product[]>(() => [...productList.value].sort(sortByNewest))
  const getByPreferred = computed<Product[]>(() => [...productList.value].sort(sortByPreferred))
  const getByRecommended = computed<Product[]>(() => [...productList.value].sort(sortRecommended))
  const getByReviewCount = computed<Product[]>(() => [...productList.value].sort(sortByReviewCount))
  const getByPrice = computed<Product[]>(() => [...productList.value].sort(sortByPrice))

  const getSortData = (sortType: Sort) => {
    switch (sortType) {
      case Sort.Popular:
        return getByPopular.value
      case Sort.UserRating:
        return getByReviewCount.value
      case Sort.PriceLowToHigh:
        return getByPrice.value
      case Sort.NewArrivals:
        return getByNewest.value
      default:
        return productList.value
    }
  }

  const getFilterData = (array: Product[], city = '', category = '', num = 10) => {
    let newArray = array ? [...array] : []

    if (city)
      newArray = newArray.filter(item => item.city === city)

    if (category)
      newArray = newArray.filter(item => item.category === category)

    return num === 0 ? newArray : newArray.slice(0, num)
  }

  const getProducts = async () => {
    const res = await product.getAllProduct()
    const { data } = res

    if (data.value) {
      const { products, success } = data.value

      if (success)
        productList.value = products
    }
  }

  const getProduct = async (productId: string) => {
    const res = await product.getProduct(productId)
    const { data } = res

    if (data.value) {
      const { product, success } = data.value

      if (success)
        return product
    }

    return null
  }

  return {
    getByNewest,
    getByPopular,
    getByPreferred,
    getByPrice,
    getByRecommended,
    getByReviewCount,
    getFilterData,
    getProduct,
    getProducts,
    getSortData,
    productList,
  }
})

export default useProductStore
