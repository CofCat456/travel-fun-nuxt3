<script lang="ts" setup>
import type { Product } from '~/types'
import type { StyleValue } from 'vue'

import {
  EBody,
  EColumn,
  EContainer,
  EFont,
  EHead,
  EHeading,
  EHtml,
  EImg,
  ERow,
  ESection,
  ETailwind,
  EText,
} from 'vue-email'

defineProps<{
  products: Product[]
  name: string
}>()

const container: StyleValue = {
  display: 'inline-block',
  textAlign: 'left',
  verticalAlign: 'top',
}

const text: StyleValue = {
  color: '#181818',
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'left',
}
</script>

<template>
  <ETailwind>
    <EHtml lang="zh-CN">
      <EHead>
        <EFont
          :web-font="{
            url: 'https://fonts.gstatic.com/s/notosanstc/v35/-nF7OG829Oofr2wohFbTp9iFOisNA_cTyNromxqQuEMQ2wHYwbnmy1R1jDujLebozBXCo2qYhRo.0.woff2',
            format: 'woff2',
          }"
          font-family="Noto Sans TC"
          font-style="normal"
          font-weight="normal"
        />
      </EHead>
      <EBody class="bg-white">
        <EContainer class="mx-auto pt-[1.25rem] pb-12">
          <EImg alt="購買成功" class="mx-auto" height="50" src="logo.png" width="55" />
          <EHeading class="text-lg">
            親愛的 {{ name }} 您好：
          </EHeading>
          <EText>
            感謝您的訂購，您的訂單已確認。
          </EText>
          <ESection class="py-4 px-2 bg-[#f6f7f9] rounded-[5px]">
            <EColumn :key="product.id" v-for="product in products">
              <ERow>
                <div :style="container" class="w-1/6">
                  <EText :style="text" class="font-bold">
                    商品名稱
                  </EText>
                </div>
                <div :style="container" class="w-5/6">
                  <EText :style="text">
                    {{ product.title }}
                  </EText>
                </div>
              </ERow>
              <ERow>
                <div :style="container" class="w-1/6">
                  <EText :style="text" class="font-bold">
                    訂單編號
                  </EText>
                </div>
                <div :style="container" class="w-5/6">
                  <EText :style="text">
                    {{ product.id }}
                  </EText>
                </div>
              </ERow>
            </EColumn>
          </ESection>
        </EContainer>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
