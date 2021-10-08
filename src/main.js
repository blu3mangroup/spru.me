import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/main.css'

export default function (Vue, { router, head, isClient }) {

  Vue.component('Layout', DefaultLayout)

  head.meta.push({
    name: 'viewport',
    content: 'width=device-width, initial-scale=1'
  })

  head.script.push({
    src: 'https://kit.fontawesome.com/83060a528d.js',
    crossorigin: 'anonymous'
  })

}
