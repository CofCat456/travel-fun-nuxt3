import { cityMap } from '~/constants'

export default defineNuxtRouteMiddleware((to, _from) => {
  const regex = /^(country|city)$/

  if (!to.params.class || !to.params.name)
    return abortNavigation()

  if (regex.test(to.params.class as string) === false)
    return abortNavigation()

  if (to.params.class === 'city') {
    if ([...cityMap.keys()].includes(to.params.name) === false)
      return abortNavigation()
  }
})
