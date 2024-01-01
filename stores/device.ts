const useDeviceStore = defineStore('device', () => {
  const isMobile = ref(false)

  // window width
  const windowWidth = ref(0)

  watchEffect(() => {
    if (process.server)
      return isMobile.value = false

    if (windowWidth.value < 768)
      isMobile.value = true
    else
      isMobile.value = false
  })

  onMounted(() => {
    window.addEventListener('resize', () => {
      windowWidth.value = window.innerWidth
    })
  })

  return { isMobile, windowWidth }
})

export default useDeviceStore
