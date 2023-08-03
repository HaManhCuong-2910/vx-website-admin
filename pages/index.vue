<template>
  <div>
    <Head>
      <Title>Dashbroad</Title>
      <Meta name="description" :content="'Dashbroad'" />
    </Head>
    <h1 class="text-3xl font-bold underline">dsa</h1>
    <el-button type="primary">Primary</el-button>
    <div>
      <font-awesome-icon :icon="['fas', 'user']" />
    </div>
    <span>Test</span>
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
