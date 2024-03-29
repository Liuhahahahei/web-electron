<script setup>
import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { useWebsiteStore } from '@/store/website'
const websiteStore = useWebsiteStore()
const selectIndex = ref(0)
const handleClick = (i,url) => {
  selectIndex.value = i
  // console.log(url);
  // 打开网页,在新标签页打开
  // window.open(url, '_blank','width=1300,height=800,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,directories=yes,status=yes')
  myApi.open(url)
}
</script>

<template>
  <!-- 空状态，没有数据时显示 -->
  <el-empty v-if="websiteStore.filterWebsite(websiteStore.keywords).length === 0" description="暂无数据" />
  <!-- 列表，有数据时显示 -->
  <el-card @click.stop="handleClick(index,ws.url)" :class="{select: selectIndex === index}" v-else v-for="ws,index in websiteStore.filterWebsite(websiteStore.keywords)" style="max-width: 100%; max-height: 350px">
    <template #header
      >{{ ws.title }}
      <el-button @click.stop="websiteStore.deleteWebsite(ws.url)" type="danger" :icon="Close" circle size="small"/>
    </template>
    <img
      :src="ws.screenshot"
      style="width: 100%; height: 100%"
    />
  </el-card>
</template>

<style lang="scss">
  .el-card {
     position: relative;
     margin: 10px 0;
     overflow: hidden;
    .el-button {
       position: absolute;
       top: 16px;
       right: 20px;
       display: none;
    }
  }
  .el-card:hover .el-button {
    display: block;
  }

  .el-card:hover {
     background: #d3d3d3;
  }


  .select {
    border-left: 15px solid skyblue;
  }
</style>
