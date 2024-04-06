import type { Order } from '~/types'

import { useCompiler } from '#vue-email'
import { createTransporter } from '@/utils/email'

const runtimeConfig = useRuntimeConfig()
const { gmailAppPassword, gmailAppUserMail } = runtimeConfig

export default defineEventHandler(async (event) => {
  const { products, user: { email, name } } = await readBody(event) as Order
  const template = await useCompiler('BuySuccessTemplate.vue', {
    props: {
      name,
      products: Object.values(products!).map(data => data.product),
    },
  })


  const transporter = createTransporter(gmailAppUserMail, gmailAppPassword)

  await transporter.sendMail({
    from: `Travel Fun <${gmailAppUserMail}>`,
    html: template.html,
    subject: '請立即查收 Travel Fun 訂購確認',
    text: template.text,
    to: [email],
  })

  return { message: 'Email sent' }
})
