/**
 * @description 前台獲取購物車
 */

import type { HttpOption } from '~/composables/useHttp'
import type { Cart } from '~/types'

enum CartApi {
  Cart = 'cart',
  Carts = 'carts',
  Coupon = 'coupon',
}

interface ResponseData {
  data: {
    carts: Cart[]
    final_total: number
    total: number
  }
}

interface CouponRes {
  data: {
    final_total: number
  }
}

/**
 * @description 獲取所有購物車資料
 */
export async function getCarts(option?: HttpOption<ResponseData>) {
  return await useHttp.get(CartApi.Cart, option)
}

/**
 * @param data - Cart
 * @description 新增購物車
 * TEST: Not Test
 */
export async function addCart(data: any) {
  // TODO: data type
  return await useHttp.post(CartApi.Cart, data)
}

/**
 * @param id
 * @description 前台獲取購物車
 */
export async function deleteCart(id: string) {
  return await useHttp.delete(`${CartApi.Cart}/${id}`)
}

/**
 * @description 清空購物車
 */
export async function deleteAllCart() {
  return await useHttp.delete(`${CartApi.Carts}`)
}

/**
 * @description 套用優惠卷
 */
export async function useCoupon(data: { data: {
  code: string
} }, option?: HttpOption<CouponRes>) {
  return await useHttp.post(CartApi.Coupon, data, option)
}
