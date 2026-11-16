# kourouWord — 项目说明

Vue 3 + TypeScript 单页应用（目前是 Element Plus 练习 demo），用 Vite 构建。

## 技术栈

| 层 | 选型 | 位置 |
| --- | --- | --- |
| 框架 | Vue 3.5（`<script setup lang="ts">`） | `src/` |
| 语言 | TypeScript 5.6 | `tsconfig.app.json` |
| 构建 | Vite 5 | `vite.config.ts` |
| 路由 | Vue Router 4 | `src/router/index.ts` |
| 状态 | Pinia 2 | `src/stores/` |
| UI | Element Plus 2（全局注册，中文 locale） | `src/main.ts` |
| 规范 | ESLint 9 flat config | `eslint.config.js` |

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 类型检查 + 打包 |
| `npm run type-check` | 只跑 vue-tsc |
| `npm run lint` | ESLint 自动修复 |

## 目录约定

```text
src/
├── assets/      静态资源
├── components/  可复用组件
├── router/      路由表
├── stores/      Pinia store
└── views/       页面级组件（与路由一一对应）
```

## 编码约定

- 组件一律用 `<script setup lang="ts">` + 组合式 API，不用 Options API
- 页面放 `src/views/`，可复用组件放 `src/components/`
- 路由用懒加载：`component: () => import('../views/Xxx.vue')`
- 模块导入用 `@/` 别名（指向 `src/`，vite 和 tsconfig 都已配好）
- 代码标识符、注释示例用英文；面向用户的界面文案用中文

## UI

**所有界面统一用 Element Plus**，不要手写按钮、输入框、表格、弹窗等控件。写或改 UI 之前，先加载 `element-plus` skill 看项目里的用法约定。

## 注意

- 依赖版本锁定在 `package.json`，不要擅自升降级；要新增依赖先说一声
- `dist/`、`node_modules/` 已在 `.gitignore` 里，不要提交
