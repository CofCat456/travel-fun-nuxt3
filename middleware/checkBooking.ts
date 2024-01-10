export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.name === 'booking')
    return abortNavigation()
})
