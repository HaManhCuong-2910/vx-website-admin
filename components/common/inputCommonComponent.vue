<template>
  <el-input
    class="custom-input-filter"
    :class="props.class"
    v-model="dataValue"
    :placeholder="props.placeholder"
    autocomplete="off"
    clearable
  />
</template>

<script setup lang="ts">
const props = defineProps({
  class: String,
  value: String,
  placeholder: String,
});

const dataValue = ref<string | undefined>("");

const emit = defineEmits(["update:value", "blurField"]);

onMounted(() => {
  dataValue.value = props.value;
});

const handleUpdateField = () => {
  emit("update:value", dataValue.value);
};
const handleBlurField = () => {
  emit("blurField", dataValue.value);
};

watch(
  () => dataValue.value,
  () => {
    handleUpdateField();
  }
);
</script>

<style scoped lang="scss"></style>
