<template>
  <el-autocomplete
    v-model="dataValue"
    :fetch-suggestions="querySearch"
    clearable
    class="custom-input-auto-autocomplete w-full"
    :class="props.class"
    :placeholder="props.placeholder"
    autocomplete="off"
    @select="handleSelect"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  listSearch: Array as PropType<any[]>,
  class: String,
  value: String,
  placeholder: String,
});

const dataValue = ref<string | undefined>("");

const listSearch = ref<any[]>([]);

const emit = defineEmits(["update:value", "blurField"]);

onMounted(() => {
  dataValue.value = props.value;
  listSearch.value = props.listSearch as any[];
});

watch(
  () => props.listSearch,
  () => {
    listSearch.value = props.listSearch as any[];
  },
  {
    deep: true,
  }
);

const handleUpdateField = () => {
  emit("update:value", dataValue.value);
};

const handleSelect = (item: any) => {
  dataValue.value = item.value;
};

const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? listSearch.value.filter(createFilter(queryString))
    : listSearch.value;
  // call callback function to return suggestions
  cb(results);
};

const createFilter = (queryString: string) => {
  return (restaurant: any) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};

watch(
  () => dataValue.value,
  () => {
    handleUpdateField();
  }
);
</script>

<style scoped lang="scss"></style>
