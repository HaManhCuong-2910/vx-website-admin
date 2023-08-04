<template>
  <div class="grid grid-cols-5 gap-10">
    <div>
      <inputCommonComponent
        :placeholder="'Nhập tiêu đề'"
        v-model:value="data.title"
      />
    </div>
    <div>
      <inputCommonComponent
        :placeholder="'Nhập hash tag'"
        v-model:value="data.hashTag"
      />
    </div>
    <div>
      <InputDatePickerComponent />
    </div>
    <div>dsadas</div>
  </div>
</template>

<script setup lang="ts">
const data = reactive({
  title: "",
  hashTag: "",
});

watch(
  () => data,
  () => {
    console.log("data", data);
  },
  {
    deep: true,
  }
);
</script>

<style scoped lang="scss"></style>
