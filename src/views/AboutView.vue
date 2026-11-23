<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup lang="ts" name="AboutView.vue">
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
console.log(counterStore.count)
 // 第一种修改的方法————可以直接修改
counterStore.count++
console.log(counterStore.count)
 // 第二种修改的方法————批量变更
 counterStore.$patch({
  count: 888
 })
 // 第三种修改的方法————fun修改
console.log(counterStore.increment())

</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
