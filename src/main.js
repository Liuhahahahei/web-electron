import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persist'

import App from './App.vue'
import 'normalize.css'
import '@/assets/common.css'
import router from '@/router/index.js'


const pinia = createPinia()
pinia.use(persist)

createApp(App).use(pinia).use(router).mount('#app')
