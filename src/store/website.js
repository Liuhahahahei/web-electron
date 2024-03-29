import { defineStore } from "pinia"
import { ref } from "vue"
import _ from 'lodash'
// import { ElMessage } from 'element-plus'
export const useWebsiteStore = defineStore('website', () => {
    // state
    const website = ref([])
    const keywords = ref('')
    // getters
    const setKeywords = (keys) => {
      keywords.value = keys
    }
    // actions
    const addWebsite = (data) => {
      // 判断是否已存在
      if (website.value.some(item => item.url === data.url)) {
        myApi.alert('网站已存在');
        return
      } else {
        website.value.unshift(data)
        // 刷新页面
        window.location.reload();
      }
      
      console.log(data,website.value);
    }
    // 删除网站
    const deleteWebsite = (url) => {
      website.value = website.value.filter((value) => {
        return value.url !== url
      })
      // 刷新页面
      window.location.reload();
    }
    //筛选网站,说明在哪里调用的，这里是website.value.filter，所以这里的keyword就是搜索的关键字，
    const filterWebsite = (keyword) => {
      if (keyword === '') {
        return website.value
      } else {
        return website.value.filter((value) => {
          return value.title.includes(keyword) || value.url.includes(keyword)
        })
      }
    }

    return {
      website,
      keywords,
      setKeywords,
      addWebsite,
      deleteWebsite,
      filterWebsite
    }
},
{
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'website',
        storage: localStorage,
        paths: ['website']
      }
    ]
  },
}
)