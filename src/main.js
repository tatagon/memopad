import '@/assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import VueGtag from 'vue-gtag-next'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)

app.use(VueGtag, {
  property: {
    id: 'G-0F3BTMEC0V',
    router, // Vue Routerを使っている場合はrouterを渡すと自動でページビューを追跡
  },
})

app.mount('#app')
