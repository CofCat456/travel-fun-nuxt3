import type { UserInfo } from '~/types'

const useUserStore = defineStore('user', () => {
  const { user } = useApi()

  const loginStatus = ref(false)
  const isLoading = ref(false)

  const getToken = computed(() => loginStatus.value
    ? document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    )
    : null)


  const sign = async (userData: UserInfo) => {
    isLoading.value = true

    try {
      const res = await user.sign(userData)
      const { data } = res

      if (data.value) {
        const { expired, success, token } = data.value

        if (success) {
          document.cookie = `token=${token};expires=${new Date(expired)};`
          loginStatus.value = true
          // navigateTo({ name: 'admin-home' })
        }
      }
    }
    finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true

    try {
      const res = await user.logout()
      const { data } = res

      if (data.value) {
        const { success } = data.value

        if (success) {
          document.cookie = 'token=;expires=;'
          loginStatus.value = false
          navigateTo({ name: 'Home' })
        }
      }
    }
    finally {
      isLoading.value = false
    }
  }

  return { getToken, isLoading, loginStatus, logout, sign }
})

export default useUserStore
