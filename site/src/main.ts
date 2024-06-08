import 'highlight.js/styles/atom-one-dark.css'
import { createApp, nextTick } from 'vue'
import App from './App.vue'
import Preview from './components/Preview.vue'
import DemoGenerator from './components/DemoGenerator.vue'
import Link from './components/Link.vue'
import './index.css'
import { isInit } from './faker'
import { install } from 'yup-schema-faker'
import { faker } from '@faker-js/faker'
// import { faker } from '@faker-js/faker/locale/ja'

install(faker)

const app = createApp(App)
app.component('Preview', Preview)
app.component('DemoGenerator', DemoGenerator)
app.component('Link', Link)
app.mixin({
  mounted() {
    nextTick(() => {
      isInit.value = false
    })
  },
})
app.mount('#app')
