// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/main.css'


export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  head.link.push({
    rel: 'stylesheet',
    href: "http://fonts.cdnfonts.com/css/ninifont-2"
  })

  head.meta.push({
    name: 'viewport',
    content: 'width=device-width, initial-scale=1'
  })

  head.script.push({
    src: 'https://kit.fontawesome.com/83060a528d.js',
    crossorigin: 'anonymous'
  })

}
