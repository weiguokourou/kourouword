import './assets/main.css'
// 引入createApp用于创建应用
import { createApp } from 'vue'
// 引入pinia
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn' // 中文语言包

// 引入App根组件
import App from './App.vue'
// 引入路由器
import router from './router'

const app = createApp(App)

// 安装pinia
app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: zhCn }) // 不加 locale 日期组件会是英文

// 挂载整个应用到app容器中
app.mount('#app')
