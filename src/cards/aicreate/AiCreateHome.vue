<script setup lang="ts">
// 三个介绍区块占位：只搭结构，图片和文案后续自行补充
const sections = [1, 2, 3]
</script>

<template>
  <div class="aicreate">
    <!-- 三个图文两栏区块：左侧图片位，右侧文字卡片，纵向均分撑满容器 -->
    <el-row
      v-for="item in sections"
      :key="item"
      class="section"
      :gutter="16"
    >
      <el-col :span="10">
        <div class="section__media" />
      </el-col>

      <el-col :span="14">
        <el-card class="section__panel" shadow="never">
          <!-- 标题占位 -->
          <div class="section__title" />
          <!-- 正文占位 -->
          <div class="section__line" />
          <div class="section__line" />
          <div class="section__line" />
          <div class="section__line section__line--short" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
/* 纵向 flex 撑满父容器，三块平分剩余高度；宽度默认 100% */
.aicreate {
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 16px;
  background-color: var(--el-fill-color-light, #f2f3f5);
}

/* 每块平分高度，窄屏时给个最小高度避免压扁 */
.section {
  flex: 1 1 0;
  min-height: 180px;
}

/* 图片占位：跟随所在列高度拉伸 */
.section__media {
  width: 100%;
  height: 100%;
  min-height: 160px;
  background-image: linear-gradient(135deg, #dfe4ea 0%, #c3ccd6 100%);
}

.section__panel {
  height: 100%;
}

.section__panel :deep(.el-card__body) {
  padding: 20px 24px;
}

/* 标题占位条 */
.section__title {
  width: 40%;
  height: 16px;
  margin-bottom: 18px;
  background-color: var(--el-border-color, #dcdfe6);
}

/* 正文占位条 */
.section__line {
  width: 100%;
  height: 12px;
  margin-bottom: 12px;
  background-color: var(--el-fill-color, #f0f2f5);
}

.section__line--short {
  width: 60%;
  margin-bottom: 0;
}
</style>
