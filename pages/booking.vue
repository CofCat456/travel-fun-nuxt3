<script lang="ts" setup>
const route = useRoute()

const orderBreadcrumbs = [
  {
    pathName: '',
    title: '填寫訂單資料',
  },
]

const payBreadcrumbs = [
  {
    pathName: '',
    title: '付款',
  },
]

const doneBreadcrumbs = [
  {
    pathName: '',
    title: '訂購完成',
  },
]

const getStep = computed(() => route.name)

const getBreadcrumbs = computed(() => {
  const breadcrumbs = [
    {
      pathName: 'cart',
      title: '購物車',
    },
  ]

  if (getStep.value === 'booking-order')
    return [...breadcrumbs, ...orderBreadcrumbs]

  if (getStep.value === 'booking-pay')
    return [...breadcrumbs, ...orderBreadcrumbs, ...payBreadcrumbs]

  if (getStep.value === 'booking-done')
    return [...breadcrumbs, ...orderBreadcrumbs, ...payBreadcrumbs, ...doneBreadcrumbs]

  return breadcrumbs
})
</script>

<template>
  <section class="bg-cc-other-7/80 py-4 flex-1">
    123
    <NuxtLayout :size="getStep === 'Done' ? 'sm' : 'md'">
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
      <div :class="getStep === 'Done' ? 'flex-col' : 'flex-col md:flex-row'" class="flex md:items-baseline gap-6 pt-4">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </section>
</template>
