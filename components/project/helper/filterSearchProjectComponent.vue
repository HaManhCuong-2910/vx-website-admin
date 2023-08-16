<template>
  <div class="grid grid-cols-5 gap-10">
    <div>
      <inputCommonComponent
        :placeholder="'Nhập tiêu đề lớn'"
        v-model:value="data.title_large"
      />
    </div>
    <div>
      <inputCommonComponent
        :placeholder="'Nhập tiêu đề nhỏ'"
        v-model:value="data.title_short"
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
import { removeEmptyValueInObject } from "@/constant";
import moment from "moment";

const router = useRouter();
const route = useRoute();
const data = reactive({
  title_large: "",
  title_short: "",
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

const redirectToCreate = () => {
  router.push("project/create");
};
</script>

<style scoped lang="scss"></style>
