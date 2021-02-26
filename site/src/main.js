import { createApp } from 'vue'
import App from './App.vue'
import Preview from './components/Preview.vue'
import DemoGenerator from './components/DemoGenerator.vue'
import Link from './components/Link.vue'
import './index.css'

const app = createApp(App)
app.component('Preview', Preview)
app.component('DemoGenerator', DemoGenerator)
app.component('Link', Link)
app.mount('#app')
