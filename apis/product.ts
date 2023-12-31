/**
 * @description 前台獲取產品
 */

import type { Pagination, Product } from '~/types'

enum ProductApi {
  AllProduct = 'products/all',
  Product = 'product',
  Products = 'products',
}

interface ProductRes {
  products: Product[]
}

interface AllProductRes extends ProductRes {
  pagination: Pagination
}

/**
 * @description 獲取所有產品資料
 */
export async function getAllProduct(option?: HttpOption<ProductRes>) {
  return await useHttp.get(ProductApi.AllProduct, option)
}

/**
 * @param category - package | tickets
 * @description 獲取 10 項產品 (頁數、分類)
 */
export async function getProducts(category: string = '', option?: HttpOption<AllProductRes>) {
  return await useHttp.get(`${ProductApi.Products}${category ? `?category=${category}` : ''}`, option)
}

/**
 * @param id
 * @description 獲取特定 id 產品
 */
export async function getProduct(id: string, option?: HttpOption<{
  product: Product
}>) {
  return await useHttp.get(`${ProductApi.Product}/${id}`, option)
}
