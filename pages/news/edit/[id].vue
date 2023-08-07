<template>
  <Head>
    <Title>Sửa tin tức</Title>
  </Head>
  <div><createNewsComponent :dataDetail="dataDetail" /></div>
</template>

<script setup lang="ts">
const route = useRoute();
const dataDetail = ref<any>(null);
onMounted(async () => {
  const res: any = await useBaseFetch(`/news/${route.params.id}/detail`, {
    method: "GET",
  });
  dataDetail.value = res.data;
});
</script>

<style scoped lang="scss"></style>
