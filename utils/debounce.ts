// 防抖
export function debounce(callback: (e: any) => void, time = 1000) {
  let timer: ReturnType<typeof setTimeout>

  return (text: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(text)
    }, time)
  }
}
