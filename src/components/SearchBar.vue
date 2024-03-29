<script setup>
import { ref } from "vue"
import { Plus } from "@element-plus/icons-vue"
import { useDialogStore } from '@/store/dialog.js'
import List from '@/components/ListView.vue'
import { useWebsiteStore } from '@/store/website.js'
import _ from 'lodash'

const websiteStore = useWebsiteStore()
const dialogStore = useDialogStore()
const input = ref("")
const search = _.debounce((e) => {
  websiteStore.setKeywords(e.target.value)
  console.log(e.target.value);
},500)

defineExpose({
  dialogStore
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-button @click="dialogStore.setDialogVisible(true)" type="primary" :icon="Plus" circle />
        <el-input
          v-model="input"
          @keyup="search"
          style="width: 240px"
          placeholder="请输入搜索内容"
          clearable
        />
      </el-header>
      <el-container>
        <el-main>
          <List></List>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
  .el-header {
    background: #d3d3d3;
    display: flex;
    align-items: center;
    .el-input {
      margin-left: 10px;
    }
  }
</style>
