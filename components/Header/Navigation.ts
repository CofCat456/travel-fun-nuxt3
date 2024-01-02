import type { CollapseProps } from 'naive-ui'

import NuxtLink from '#app/components/nuxt-link'
import { ConfirmationNumberOutlineRoundedIcon, FlightTakeoffIcon } from '~/assets'
import { NCollapseItem, NIcon } from 'naive-ui'
import { h } from 'vue'

import Area from './Area.vue'
import Menu from './Menu.vue'

const routerlinkClass = 'flex justify-center items-center gap-2'
const packageRouterTo = { name: 'class-name-products-category', params: { category: 'package', class: 'country', name: 'taiwan' } }
const tourRouterTo = { name: 'class-name', params: { class: 'country', name: 'taiwan' } }
const favoriteRouterTo = { name: 'wishList' }

export const handleItemHeaderClick: CollapseProps['onItemHeaderClick'] = ({
  name,
}) => {
  if (name === 'package')
    navigateTo(packageRouterTo)

  else if (name === 'tours')
    navigateTo(tourRouterTo)

  else if (name === 'favorite')
    navigateTo(favoriteRouterTo)
}

export default [
  {
    id: 'area',
    component: h(Area),
    mobileComponent: h(NCollapseItem, {
      name: 'area',
    }, {
      default: () => h(Menu),
      header: () => h('div', {
        class: 'flex-1',
      }, '選地區'),
    }),
    title: '選地區',
  },
  {
    id: 'package',
    component: h(NuxtLink, {
      class: routerlinkClass,
      to: packageRouterTo,
    }, () => [h(NIcon, {
      size: 24,
    }, () => h(ConfirmationNumberOutlineRoundedIcon)), '景點套票']),
    mobileComponent: h(NCollapseItem, {
      name: 'package',
    }, {
      arrow: () => '',
      header: () => h('div', {
        class: 'flex-1',
      }, '景點套票'),
    }),
    title: '景點套票',
  },
  {
    id: 'tours',
    component: h(NuxtLink, {
      class: routerlinkClass,
      to: tourRouterTo,
    }, () => [h(NIcon, {
      size: 24,
    }, () => h(FlightTakeoffIcon)), '觀光行程']),
    mobileComponent: h(NCollapseItem, {
      name: 'tours',
    }, {
      arrow: () => '',
      header: () => h('div', {
        class: 'flex-1',
      }, '觀光行程'),
    }),
    title: '觀光行程',
  },
  {
    id: 'favorite',
    component: null,
    mobileComponent: h(NCollapseItem, {
      name: 'favorite',
    }, {
      arrow: () => '',
      header: () => h('div', {
        class: 'flex-1',
      }, '我的最愛'),
    }),
    title: '我的最愛',
  },
]
