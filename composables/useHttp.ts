// Source: https://juejin.cn/post/7173507227104313352

import type { UseFetchOptions } from '#app'
import type { FetchResponse } from 'ofetch'

import { UserApi } from '~/apis/user'
import { errorMsg, successMsg } from '~/plugins/sweetMsg'

export interface ResOptions {
  message: string | string[]
  success: boolean
}

interface Response<T> {
  data: T
  message: string | string[]
  success: boolean
}

enum METHOD {
  DELETE = 'delete',
  GET = 'get',
  POST = 'post',
  PUT = 'put',
}

type UrlType = (() => Request | string) | Ref<Request | string> | Request | string

export type HttpOption<T> = UseFetchOptions<ResOptions & T>

function handleError<T>(response: FetchResponse<Response<T>> & FetchResponse<ResponseType>) {
  const err = (text: string) => {
    errorMsg(response?._data?.message ?? text)
  }
  if (!response._data) {
    err('请求超时，服务器无响应！')
    return
  }
  const handleMap: { [key: number]: () => void } = {
    401: () => {
      err('登录状态已过期，需要重新登录')
      // TODO: 清除 pinia 登入狀態
      // TODO: 跳转实际登录页
      navigateTo('/')
    },
    403: () => err('没有权限访问该资源'),
    404: () => err('服务器资源不存在'),
    500: () => err('服务器内部错误'),
  }
  handleMap[response.status] ? handleMap[response.status]() : err('未知错误！')
}

function fetch<T>(url: UrlType, option: HttpOption<T>) {
  return useFetch(url, {
    // 请求拦截器
    onRequest({ options }) {
      // 添加baseURL,nuxt3环境变量要从useRuntimeConfig里面取
      const { public: { apiBase, apiSecret } } = useRuntimeConfig()

      if (url === UserApi.Signin || url === UserApi.Logout)
        options.baseURL = apiBase
      else
        options.baseURL = `${apiBase}/api/${apiSecret}`

      const userStore = useUserStore()

      if (userStore.loginStatus && userStore.getToken) {
        options.headers = new Headers(options.headers)
        options.headers.set('Authorization', userStore.getToken)
      }
    },

    // 响应拦截
    onResponse({ response }) {
      // 在这里判断错误
      if (!response._data.success) {
        handleError<T>(response)
        return Promise.reject(response._data)
      }

      const { message } = response._data

      // 成功返回
      if (message)
        successMsg(message)

      return response._data
    },

    // 错误处理
    onResponseError({ response }) {
      handleError<T>(response)
      return Promise.reject(response?._data ?? null)
    },
    // 合并参数
    ...option,
  })
}

// 自动导出
export const useHttp = {
  delete: <T>(url: UrlType, body?: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { body, method: METHOD.DELETE, ...option })
  },

  get: <T>(url: UrlType, option?: HttpOption<T>) => {
    return fetch<T>(url, { method: METHOD.GET, ...option })
  },

  post: <T>(url: UrlType, body?: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { body, method: METHOD.POST, ...option })
  },

  put: <T>(url: UrlType, body?: any, option?: HttpOption<T>) => {
    return fetch<T>(url, { body, method: METHOD.PUT, ...option })
  },
}
