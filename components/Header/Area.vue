<template>
  <NPopselect :options="[]" placement="bottom-start" size="small">
    <button class="mx-auto h-10 w-28 rounded-[100px] border border-white" type="button">
      選地區
    </button>
    <template #empty>
      <HeaderMenu />
    </template>
  </NPopselect>
</template>
