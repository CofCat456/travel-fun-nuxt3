<script setup lang="ts">
const getThemeOverrides = computed(() => {
  const adminCardOverrides = {
    borderRadius: '12px',
  }

  return {
    Breadcrumb: {
      itemColorHover: '#CDE4FB',
      itemTextColor: '#0F4BB4',
      itemTextColorHover: '#0F4BB4',
      itemTextColorPressed: '#EE5220',
    },
    // TODO: color change
    Card: false ? adminCardOverrides : {},
    Rate: {
      itemColorActive: '#EE5220',
    },
    common: {
      borderRadius: '5px',
      primaryColor: '#0F4BB4',
      primaryColorHover: '#68A0E8',
      primaryColorPressed: '#072A81',
      primaryColorSuppl: '#CDE4FB',
      textColor1: '#181818',
      textColor2: '#181818',
      textColor3: '#181818',
      textColorBase: '#181818',
    },
  }
})
</script>

<template>
  <NConfigProvider :theme-overrides="getThemeOverrides">
    <NLoadingBarProvider>
      <NMessageProvider>
        <NDialogProvider>
          <NuxtLayout name="front">
            <NuxtPage />
          </NuxtLayout>
        </NDialogProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
