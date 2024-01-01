import type { Swiper } from 'swiper/types'

export function useSwiperInit() {
  const isBeginning = ref(true)
  const isEnd = ref(false)
  const swiperRef = ref<Swiper>()

  const onSwiper = (swiper: Swiper) => {
    swiperRef.value = swiper
    isBeginning.value = swiper?.isBeginning
    isEnd.value = swiper?.isEnd
  }
  const onSlideChange = (swiper: Swiper) => {
    isBeginning.value = swiper?.isBeginning
    isEnd.value = swiper?.isEnd
  }

  const goNext = () => swiperRef.value?.slideNext()

  const goPrev = () => swiperRef.value?.slidePrev()

  return { goNext, goPrev, isBeginning, isEnd, onSlideChange, onSwiper }
}
