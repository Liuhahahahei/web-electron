<script setup>
  import SearchBar from '@/components/SearchBar.vue'
  import Dialog from '@/components/DialogView.vue'
  import { onMounted,ref } from 'vue';

  const searchbarRef = ref(null)
  const cb = () => {
    searchbarRef.value.dialogStore.setDialogVisible(true)
  }

  onMounted(() => {
    myApi.opendialog()
    myApi.onRendererEvent(cb)
  })
</script>

<template>
  <main>
    <SearchBar ref="searchbarRef"></SearchBar>
    <teleport to="body">
      <Dialog></Dialog>
    </teleport>
  </main>
</template>