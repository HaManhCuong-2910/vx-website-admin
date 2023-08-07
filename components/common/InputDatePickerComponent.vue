<template>
  <el-date-picker
    style="width: 100%; height: 44px"
    v-model="dataValue"
    class="custom-input-datepicker"
    type="daterange"
    range-separator="=>"
    start-placeholder="Từ ngày"
    end-placeholder="Đến ngày"
    format="DD/MM/YYYY"
    :size="'large'"
    :editable="false"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  class: String,
  value: Array as PropType<any>,
  placeholder: String,
});

const dataValue = ref<any>("");

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
