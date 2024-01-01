import { breakpointsTailwind } from '@vueuse/core'

export function useDevice() {
  const breakpoints = useBreakpoints(breakpointsTailwind)

  const isMobile = breakpoints.smallerOrEqual('sm') // lg and smaller

  return {
    isMobile,
  }
}
