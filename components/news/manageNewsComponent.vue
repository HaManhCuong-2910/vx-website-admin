<template>
  <div>
    <div class="my-10">
      <filterSearchNewsComponent />
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        align="center"
        type="index"
        :index="(indexOrder) => indexMethod(indexOrder, dataReactive.page)"
        width="50"
        fixed="left"
        label="STT"
      />

      <el-table-column align="center" prop="tag" label="hashTag" />
      <el-table-column align="center" prop="title" label="Tiêu đề" />
      <el-table-column align="center" label="Ngày tạo" width="200">
        <template #default="scope">
          <span>{{
            moment(scope.row.createdAt).format("DD/MM/YYYY HH:mm")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="Thao tác"
        width="200"
      >
        <template #default="scope">
          <div class="d-flex justify-content-center">
            <nuxt-link :to="'/'">
              <el-tooltip placement="top" content="Sửa đánh giá">
                <span class="action-col mr-2">
                  <font-awesome-icon
                    :class="`color-custom-primary`"
                    icon="fa-regular fa-pen-to-square"
                  />
                </span>
              </el-tooltip>
            </nuxt-link>
            <el-tooltip placement="top" content="Xóa đánh giá">
              <span
                class="action-col mr-2 cursor-pointer"
                @click="handleOpenDialog(scope.row._id)"
              >
                <font-awesome-icon
                  :class="`color-custom-danger`"
                  icon="fa-regular fa-trash-can"
                />
              </span>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-4 flex justify-end">
      <el-pagination
        layout="prev, pager, next"
        :page-count="dataReactive.count"
        :current-page="dataReactive.page"
        @current-change="handleChangePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { indexMethod } from "@/constant/index";
import moment from "moment";
import { useDialogStore } from "@/store/dialog";
import { storeToRefs } from "pinia";
const tableData = ref<any[]>([]);
const dialogStore = useDialogStore();
const { isShow, eventDialog } = storeToRefs(dialogStore);
const { openDialog } = dialogStore;
const dataReactive = reactive({
  count: 1,
  page: 1,
});

watch(
  () => eventDialog.value,
  (value: any) => {
    if (value) {
      console.log("value", value);
    }
  }
);

const handleChangePage = (page: number) => {};

onMounted(async () => {
  const res: any = (await useBaseFetch("/news/list", {
    method: "GET",
  })) as any;
  tableData.value = res.data;
  dataReactive.page = res.page;
  dataReactive.count = res.count;
  // console.log("data", data);
});

const handleOpenDialog = (id: string) => {
  console.log("handle open");
  openDialog({
    content: "Xác nhận xóa tin tức",
    title: "Xóa tin tức",
    textPrimary: "Xác nhận",
  });
};
</script>

<style scoped lang="scss"></style>
