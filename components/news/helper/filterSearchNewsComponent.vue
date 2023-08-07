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
        v-model:value="data.tag"
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
  title: "",
  tag: "",
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
  router.push("news/create");
};
</script>

<style scoped lang="scss"></style>
