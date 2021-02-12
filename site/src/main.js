import { createApp } from 'vue'
import App from './App.vue'
import Preview from './components/Preview.vue'
import './index.css'

const app = createApp(App)
app.component('Preview', Preview)
app.mount('#app')
