import { defineStore } from "pinia"
import { ref,computed } from "vue"

export const useDialogStore = defineStore('dialog', () => {
  // 定义状态
  const dialogVisible = ref(false)

  // 修改状态的方法
  // 点击按钮传入参数控制dialog显示隐藏
  const setDialogVisible = (isshow) => {
    dialogVisible.value = isshow
  }

  // 导出状态
  return {
    dialogVisible,
    setDialogVisible,
    // kepDialogVisible
  }
})