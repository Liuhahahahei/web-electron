<script setup>
import { ref, onMounted } from "vue"
const fileList = ref([])
onMounted(async () => {
  const files = await myApi.getFileList()
  fileList.value = files
})
</script>

<template>
  <div class="demo-image__lazy">
    <el-image v-for="url in fileList" :key="url" :src="`/uploads/${url}`" lazy />
  </div>
</template>

<style scoped lang="scss">
.demo-image__lazy {
  height: 100%;
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
  padding: 10px;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
</style>
