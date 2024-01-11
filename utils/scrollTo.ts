const { y } = useWindowScroll({
  behavior: 'smooth',
})

// JS 錨點
export function scrollTo(id: string) {
  const element = document.getElementById(id)

  if (element) {
    const elementHeight = element.offsetHeight
    const windowHeight = window.innerHeight

    // 計算捲動位置，使元素中間位於視窗中央
    const top = element.offsetTop - (windowHeight - elementHeight) / 2

    y.value = top
  }
}
