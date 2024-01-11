<script setup lang="ts">
import { cityMap } from '~/constants'
import IconLocationOnOutlineRounded from '~icons/material-symbols/location-on-outline-rounded'

const productStore = useProductStore()

const { productList } = storeToRefs(productStore)

const searchText = ref('')

const getDebounceSearchText = computed({
  get: () => searchText.value,
  set: useDebounceFn((newValue: string) => searchText.value = newValue, 200),
})

const getFilterList = computed(() => productList.value.filter(({ city, title }) => title.match(searchText.value) || (cityMap.get(city)).match(searchText.value)))

function handleSearch() {
  if (getFilterList.value.length === 0)
    return

  const { id: productId } = getFilterList.value[0]

  navigateTo({ name: 'product-id', params: { id: productId } })
};
</script>

<template>
  <NPopselect :options="[]" trigger="click" width="trigger">
    <div
      class="search-shadow relative flex w-full items-center gap-2 rounded-m bg-white px-3 py-3 md:absolute md:bottom-0 md:left-1/2 md:max-w-[640px] md:-translate-x-1/2 md:translate-y-1/2 md:px-5"
    >
      <input
        class="w-0 flex-1 border-0 ring-0 focus:outline-0 focus:ring-0 focus-visible:outline-none"
        placeholder="搜尋你想去的目的地 / 城市"
        type="text"
        v-model="getDebounceSearchText"
      >
      <button @click.stop="handleSearch" class="rounded-m bg-cc-accent px-6 py-[10.5px] text-white" type="button">
        搜尋
      </button>
    </div>
    <template #empty>
      <NScrollbar style="max-height: 300px" v-if="getFilterList.length !== 0">
        <NList clickable hoverable>
          <template :key="id" v-for="{ id, title, city, evaluate, evaluateNum, imageUrl } in getFilterList">
            <NuxtLink :to="{ name: 'product-id', params: { id } }" v-slot="{ navigate }" custom>
              <NListItem @click="navigate">
                <template #prefix>
                  <div class="aspect-square w-10 overflow-hidden rounded-m">
                    <NuxtImg :src="imageUrl" class="img" />
                  </div>
                </template>
                <NThing :title="title">
                  <template #description>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-1 text-cc-other-4">
                        <NIcon size="16">
                          <IconLocationOnOutlineRounded />
                        </NIcon>
                        <p class="text-[12px]">
                          {{ cityMap.get(city) }}
                        </p>
                      </div>

                      <div class="flex items-center gap-1">
                        <NRate :count="1" :default-value="1" color="#EE5220" size="small" readonly />
                        <p class="text-sm-content">
                          {{ evaluate }} / {{ evaluateNum }}
                        </p>
                      </div>
                    </div>
                  </template>
                </NThing>
              </NListItem>
            </Nuxtlink>
          </template>
        </NList>
      </NScrollbar>
      <div class="p-4" v-else>
        <NEmpty description="眼睛業障重">
          <template #extra>
            <NuxtLink :to="{ name: 'class-name-products-category', params: { class: 'country', name: 'taiwan' } }" v-slot="{ navigate }" custom>
              <NButton @click="navigate" size="small">
                前往商品頁面
              </NButton>
            </Nuxtlink>
          </template>
        </NEmpty>
      </div>
    </template>
    <template #action>
      <!-- TODO: 收尋紀錄 -->
    </template>
  </NPopselect>
</template>

<style scoped>
.search-shadow {
  box-shadow: 0px 0px 20px 0px #00000033;
}
</style>
