import { successMsg } from '~/plugins/sweetMsg'

const useFavoriteStore = defineStore('favorite', () => {
  const favoriteList = useLocalStorage<string[]>('favorites', [])

  const addFavorite = (id: string, title: string) => {
    favoriteList.value.push(id)

    successMsg(`成功將 ${title} 加入收藏`)
  }

  const removeFavorite = (id: string, title: string) => {
    favoriteList.value = favoriteList.value.filter((curr: string) => curr !== id)

    successMsg(`成功將 ${title} 移出收藏`)
  }

  const checkFavorite = (id: string) => favoriteList.value.includes(id)

  const removeLocalFavorites = () => favoriteList.value = []

  return {
    addFavorite,
    checkFavorite,
    favoriteList,
    removeFavorite,
    removeLocalFavorites,
  }
})

export default useFavoriteStore
