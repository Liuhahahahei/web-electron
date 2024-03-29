<script setup>
import { ref,onUpdated } from "vue"
import { useDialogStore } from '@/store/dialog.js'
import { useWebsiteStore } from '@/store/website.js'
// import { ElMessage } from 'element-plus'

const dialogStore = useDialogStore()
const websiteStore = useWebsiteStore()
const url = ref("")
// const myApi = window
const addUrl =async () => {
  // 获取渲染进程访问的页面返回的数据，采用异步的方式
  const result = await myApi.sendUrl(`https://${url.value}`)
  if(result.msg) {
    myApi.alert(result.msg)
  } else {
    // 将数据添加到pinia中
    websiteStore.addWebsite(result)
    // 获取数据后关闭弹窗
    dialogStore.setDialogVisible(false)
  }
  
  // 重置url输入框
  url.value = ""
}
// 监听页面更新时重置url输入框
onUpdated(() => {
  url.value = ""
})
</script>

<template>
  <el-dialog
    v-model="dialogStore.dialogVisible"
    title="请输入你要添加的网址"
    width="500"
    align-center
  >
    <el-input
      v-model="url"
      style="max-width: 600px"
      placeholder="请输入网址"
    >
      <template #prepend>Http://</template>
    </el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogStore.setDialogVisible(false)">取消</el-button>
        <el-button type="primary" @click="addUrl">
          添加
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="sass"></style>
