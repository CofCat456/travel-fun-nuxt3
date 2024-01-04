<script lang="ts" setup>
defineProps<{
  text: string
  total: number
  finalTotal: number
  isLoading?: boolean
}>()

defineEmits<{
  submit: []
}>()
</script>

<template>
  <article class="w-full md:w-80">
    <NCard :bordered="false">
      <NGrid :cols="2" :x-gap="50" :y-gap="12">
        <NGridItem>
          價格
        </NGridItem>
        <NGridItem class="text-right font-bold">
          {{ currency(total) }}
        </NGridItem>

        <NGridItem>
          付款金額
        </NGridItem>
        <NGridItem class="text-right text-xl font-bold text-cc-primary">
          {{ currency(finalTotal) }}
        </NGridItem>

        <NGridItem :span="2" v-if="total !== finalTotal">
          <NGradientText type="success">
            已套用優惠卷!
          </NGradientText>
        </NGridItem>

        <NGridItem :span="2">
          <UiButton :is-loading="isLoading" @click="$emit('submit')" class="mt-4" type="submit" is-full>
            {{ text }}
          </UiButton>
        </NGridItem>
      </NGrid>
    </NCard>
  </article>
</template>
