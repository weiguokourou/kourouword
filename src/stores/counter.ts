import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// 仓库

// defineStore(与文件保持一致， ()=>{return})
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
