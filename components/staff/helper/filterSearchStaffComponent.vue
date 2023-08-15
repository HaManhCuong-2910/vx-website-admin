<template>
  <div class="grid grid-cols-5 gap-10">
    <div>
      <inputCommonComponent
        :placeholder="'Nhập họ và tên'"
        v-model:value="data.fullName"
      />
    </div>
    <div>
      <inputAutoCompleteComponent
        :placeholder="'Nhập vị trí'"
        :listSearch="listSearch"
        v-model:value="data.position"
      />
    </div>
    <div>
      <InputDatePickerComponent v-model:value="data.createDate" />
    </div>
    <div>
      <el-button
        size="large"
        type="primary"
        :icon="Search"
        @click="submitSearch"
        >Tìm kiếm</el-button
      >
      <el-button size="large" type="danger" @click="redirectToCreate"
        >Tạo mới</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { dataDropdownOption, removeEmptyValueInObject } from "@/constant";
import moment from "moment";

const router = useRouter();
const route = useRoute();
const listSearch = ref<any[]>([]);
const data = reactive({
  fullName: "",
  position: "",
  createDate: "",
});

const submitSearch = () => {
  let dataSearch: any = removeEmptyValueInObject(data);
  if (dataSearch?.createDate) {
    dataSearch["fromDate"] = moment(dataSearch?.createDate[0]).format(
      "YYYY/MM/DD"
    );
    dataSearch["toDate"] = moment(dataSearch?.createDate[1]).format(
      "YYYY/MM/DD"
    );
    delete dataSearch.createDate;
  }
  router.replace({
    path: route.path,
    query: dataSearch,
  });
};

onMounted(() => {
  listSearch.value = dataDropdownOption.map((value: string) => {
    return {
      value,
      title: value,
    };
  });
});

const redirectToCreate = () => {
  router.push("staff/create");
};
</script>

<style scoped lang="scss"></style>
