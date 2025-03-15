import App from '@/App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import routerFactory from '@/router/router.ts'
import i18nFactory from '@/config/i18n/index.ts'
import '@/assets/styles/main.scss'
import '@/assets/styles/ant.scss'
import 'ant-design-vue/dist/reset.css'
import '@/assets/fonts/stylesheet.css'

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.devtools = true

app.use(pinia)

const i18n = i18nFactory()

app.use(routerFactory(i18n.global))
app.use(i18n)

app.mount('#app')
