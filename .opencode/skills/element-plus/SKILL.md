---
name: Element Plus
description: "本项目 UI 组件库约定 —— 所有界面统一用 Element Plus 实现。Use when writing, reviewing, or debugging any UI in this project: 新建页面、写表单/表格/弹窗/分页/日期选择、加消息提示、问某个组件怎么用、遇到 Element Plus 样式或类型报错。Trigger keywords element-plus, ElementPlus, el-button, el-input, el-form, el-table, el-dialog, el-pagination, el-select, ElMessage, ElMessageBox, 组件库, UI 组件, 表单校验, 表格, 弹窗, 分页, 图标."
---

# Element Plus（本项目 UI 组件库）

## 项目现状（先读这段）

- 版本 `element-plus@^2.14.8`，**全量引入**：`src/main.ts` 里 `app.use(ElementPlus, { locale: zhCn })`
- 样式已全局引入：`import 'element-plus/dist/index.css'`
- 语言包已设为简体中文 `zhCn`，日期选择、分页等组件默认中文
- `tsconfig.app.json` 里配了 `"types": ["element-plus/global"]`，模板中 `<el-xxx>` 有类型提示

**结论**：模板里直接用 `<el-button>` 这类标签，**不需要**逐个 import 组件。但**函数式 API 必须显式 import**：

```ts
import { ElMessage, ElMessageBox, ElNotification, ElLoading } from 'element-plus'
```

图标是**独立的包**，本项目还没装。需要图标时先安装：

```powershell
npm i @element-plus/icons-vue
```

```vue
<script setup lang="ts">
import { Search, Plus } from '@element-plus/icons-vue'
</script>

<template>
  <el-button type="primary" :icon="Plus">新增</el-button>
  <el-icon><Search /></el-icon>
</template>
```

## 写 UI 的规则

1. 能用 Element Plus 组件的，不要手写原生控件
2. 中后台常见场景直接对号入座：表格 → `el-table`，表单 → `el-form`，弹窗 → `el-dialog`，确认 → `ElMessageBox.confirm`，轻提示 → `ElMessage`
3. 反馈一律用 `ElMessage` / `ElNotification`，不要用 `alert()`
4. 表单校验用 `el-form` 的 `rules`，不要自己写 if 判断
5. 弹窗 / 抽屉的显隐用 `v-model`，不要用 `v-if`（会丢动画和内部状态）

## 常用组件速查

### 表单 + 校验

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const formRef = ref<FormInstance>()
const form = reactive({ name: '', role: '' })

const rules: FormRules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
}

const submit = async () => {
  await formRef.value?.validate()
  // 校验通过后再提交
}
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
```

`el-form-item` 的 `prop` 必须和 `rules` 的 key、`v-model` 的字段名一致，否则校验不生效。

### 表格

```vue
<script setup lang="ts">
import { ref } from 'vue'

interface Row {
  id: number
  name: string
}

const rows = ref<Row[]>([])
</script>

<template>
  <el-table :data="rows" stripe border>
    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="name" label="名称" />
    <el-table-column label="操作" width="140">
      <template #default="{ row }">
        <el-button link type="primary" @click="edit(row)">编辑</el-button>
        <el-button link type="danger" @click="remove(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
```

### 分页

```vue
<el-pagination
  v-model:current-page="page"
  v-model:page-size="size"
  :total="total"
  :page-sizes="[10, 20, 50]"
  layout="total, sizes, prev, pager, next, jumper"
/>
```

### 弹窗 / 抽屉

```vue
<el-dialog v-model="visible" title="标题" width="600px" destroy-on-close>
  内容
  <template #footer>
    <el-button @click="visible = false">取消</el-button>
    <el-button type="primary" @click="save">确定</el-button>
  </template>
</el-dialog>
```

### 消息与确认

```ts
import { ElMessage, ElMessageBox } from 'element-plus'

ElMessage.success('保存成功')

try {
  await ElMessageBox.confirm('确定删除该条记录吗？', '提示', { type: 'warning' })
  // 用户点了确定
} catch {
  // 用户取消，什么都不做
}
```

`ElMessageBox.confirm` 在用户取消时是 **reject**，必须用 `try/catch` 或 `.catch()` 兜住，否则控制台报 unhandled rejection。

### 下拉选择 / 日期

```vue
<el-select v-model="role" placeholder="请选择" clearable>
  <el-option label="前端" value="fe" />
  <el-option label="后端" value="be" />
</el-select>

<el-date-picker
  v-model="date"
  type="date"
  placeholder="选择日期"
  value-format="YYYY-MM-DD"
/>
```

## 查文档

组件总览：<https://element-plus.org/zh-CN/component/overview>

单个组件的 URL 规律：

```text
https://element-plus.org/zh-CN/component/<组件名>.html
```

例：button → <https://element-plus.org/zh-CN/component/button.html>

不确定某个组件的 props / 事件 / 插槽名时，**先去这个地址查**，不要凭记忆猜。

## 常见坑

- 函数式组件（`ElMessage`、`ElMessageBox`、`ElNotification`）必须 import，全量注册不覆盖它们
- `el-table` 自定义列必须用 `#default="{ row }"` 插槽，`row` 是当前行数据
- 表单校验不生效，九成是 `el-form-item` 的 `prop` 没写或写错
- 弹窗内容需要重置时加 `destroy-on-close`
- 图标不显示：先确认装没装 `@element-plus/icons-vue`
