<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()

// 侧边栏菜单项，和 src/router/index.ts 里的路由一一对应
const menuItems = [
  { path: '/', title: '首页' },
  { path: '/about', title: '关于' },
]
</script>

<template>
  <el-container class="layout">
    <!-- 侧边栏：放导航 -->
    <el-aside width="200px" class="sidebar">
      <div class="sidebar__logo">kourouWord</div>

      <!-- 开 router 模式后，点击 menu-item 会自动 router.push(index)，等价于 RouterLink，
           而且自带选中高亮（由 default-active 决定） -->
      <el-menu :default-active="route.path" router class="sidebar__menu">
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
          {{ item.title }}
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧内容区 -->
    <el-main class="content">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>

      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped>
.layout {
  height: 100vh;
}

.sidebar {
  background-color: var(--color-background-soft);
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
}

.sidebar__logo {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);
}

/* el-menu 默认自带右边框和白色背景，这里让它跟随侧边栏 */
.sidebar__menu {
  border-right: none;
  background-color: transparent;
}

.content {
  overflow-y: auto;
}
</style>
