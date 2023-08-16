<template>
  <Head>
    <Title>Sửa thông tin dự án</Title>
  </Head>
  <div><formProjectComponent :dataDetail="dataDetail" /></div>
</template>

<script setup lang="ts">
const route = useRoute();
const dataDetail = ref<any>(null);
onMounted(async () => {
  const res: any = await useBaseFetch(`/project/${route.params.id}/detail`, {
    method: "GET",
  });
  dataDetail.value = res.data;
});
</script>

<style scoped lang="scss"></style>
