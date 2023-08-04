<template>
  <el-date-picker
    v-model="value1"
    type="daterange"
    range-separator="To"
    start-placeholder="Ngày bắt đầu"
    end-placeholder="Ngày kết thúc"
    :size="'large'"
    :editable="false"
  />
</template>

<script setup lang="ts">
const value1 = ref("");

watch(
  () => value1.value,
  () => {
    console.log("value1.value", value1.value);
  }
);
</script>

<style scoped></style>
