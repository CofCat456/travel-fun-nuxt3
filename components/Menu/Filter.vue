<script setup lang="ts">
import IconKeyboardArrowDownRounded from '~icons/material-symbols/keyboard-arrow-down-rounded'

defineProps<{
  title: string
}>()

const show = ref(false)

function handleToggleShow() {
  show.value = !show.value
};

const handleClose = () => show.value = false
</script>

<template>
  <NButton @click="handleToggleShow" icon-placement="right" size="small" round>
    {{ title }}
    <template #icon>
      <NIcon :class="show ? '-rotate-90' : 'rotate-0'" class="transition-transform duration-300">
        <IconKeyboardArrowDownRounded />
      </NIcon>
    </template>
  </NButton>
  <NDrawer @click="handleClose" placement="bottom" v-model:show="show">
    <NDrawerContent :title="title" closable>
      <NList clickable>
        <slot />
      </NList>
    </NDrawerContent>
  </NDrawer>
</template>
