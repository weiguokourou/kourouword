import './assets/main.css'
// 引入createApp用于创建应用
import { createApp } from 'vue'
// 引入pinia
import { createPinia } from 'pinia'

// 引入App根组件
import App from './App.vue'
// 引入路由器
import router from './router'

const app = createApp(App)

// 安装pinia
app.use(createPinia())
app.use(router)

// 挂载整个应用到app容器中
app.mount('#app')
