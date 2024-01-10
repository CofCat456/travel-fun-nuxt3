<script setup lang="ts">
const route = useRoute()

interface Breadcrumb {
  pathName: string
  title: string
}

const orderBreadcrumbs: Breadcrumb = {
  pathName: '',
  title: '填寫訂單資料',
}

const payBreadcrumbs: Breadcrumb = {
  pathName: '',
  title: '付款',
}

const doneBreadcrumbs: Breadcrumb = {
  pathName: '',
  title: '訂購完成',
}

const getStep = computed(() => route.name as string)
const getCurrBreadcrumb = computed<Breadcrumb | null>(() => {
  switch (getStep.value) {
    case 'booking-order':
      return orderBreadcrumbs
    case 'booking-pay-id':
      return payBreadcrumbs
    case 'booking-done-id':
      return doneBreadcrumbs
    default:
      return null
  }
})
const isDone = computed(() => getStep.value.includes('done'))

const getBreadcrumbs = computed<Breadcrumb[]>(() => {
  const defaultBreadcrumb: Breadcrumb = {
    pathName: 'cart',
    title: '購物車',
  }

  if (getCurrBreadcrumb.value)
    return [defaultBreadcrumb, getCurrBreadcrumb.value]

  return [defaultBreadcrumb]
})

definePageMeta({
  middleware: ['check-booking'],
})

useSeoMeta({
  description: getCurrBreadcrumb.value?.title ?? '',
  title: getCurrBreadcrumb.value?.title ?? '',
})
</script>

<template>
  <section class="flex-1 bg-cc-other-7/80 py-4">
    <NuxtLayout :size="isDone ? 'sm' : 'md'">
      <NBreadcrumb separator=">">
        <template :key="title" v-for="{ title, pathName } in getBreadcrumbs">
          <NBreadcrumbItem v-if="pathName">
            <NuxtLink :to="{ name: pathName }">
              {{ title }}
            </NuxtLink>
          </NBreadcrumbItem>
          <NBreadcrumbItem :clickable="false" v-else>
            {{ title }}
          </NBreadcrumbItem>
        </template>
      </NBreadcrumb>
      <div :class="isDone ? 'flex-col' : 'flex-col md:flex-row'" class="flex gap-6 pt-4 md:items-baseline">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </section>
</template>
