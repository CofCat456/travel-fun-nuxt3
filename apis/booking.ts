/**
 * @description 使用者送出訂單
 */

import type { HttpOption } from '~/composables/useHttp'
import type { Order } from '~/types'

enum BookingApi {
  Order = 'order',
  Pay = 'pay',
}

interface userAddOrderRes {
  create_at: number
  orderId: string
  total: number
}

interface getOrderRes {
  order: Order
}

/**
 * @param id - 訂單 ID
 * @description 獲取特定訂單資料
 */
export async function getOrder(id: string, option?: HttpOption<getOrderRes>) {
  return await useHttp.get(`${BookingApi.Order}/${id}`, option)
}

/**
 * @description 新增訂單資料
 */
export async function addOrder(data: {
  data: Order
}, option?: HttpOption<userAddOrderRes>) {
  return await useHttp.post(BookingApi.Order, data, option)
}

/**
 * @param id id - 訂單 ID
 * @description 訂單付款
 */
export async function getPay(id: string) {
  return await useHttp.post(`${BookingApi.Pay}/${id}`)
}
