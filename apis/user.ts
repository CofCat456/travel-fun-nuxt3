/**
 * @description 前台獲取購物車
 */

import type { HttpOption } from '~/composables/useHttp'

export enum UserApi {
  Logout = 'logout',
  Sign = 'admin/signin',
}

interface SigninRes {
  expired: number
  token: string
  uid: string
}

/**
 * @param body
 * @param body.username
 * @param body.password
 * @description 用戶登入
 */
export async function sign(body: any, option?: HttpOption<SigninRes>) {
  return await useHttp.post(UserApi.Sign, body, option)
}

/**
 * @description 用戶登出
 */
export async function logout(option?: HttpOption<any>) {
  return await useHttp.post(UserApi.Logout, option)
}
