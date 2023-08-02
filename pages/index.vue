<template>
  <div>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <el-button type="primary">Primary</el-button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNewsStore } from "../store/news";
import { ElButton } from "element-plus";
const newsStore = useNewsStore();
//action store
const { addValueToNewsList } = newsStore;
//get store
const { newsList } = storeToRefs(newsStore);

onMounted(() => {
  console.log("newsList", newsList.value);
});
</script>

<style scoped lang="scss"></style>
