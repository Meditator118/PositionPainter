import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'
import 'element-plus/dist/index.css'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')