<template>
  <div>
    <div class="my-10">
      <filterSearchNewsComponent ref="filterSearch" />
    </div>
    <el-table :data="tableData" v-loading="isLoading" style="width: 100%">
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
            <nuxt-link :to="'/news/edit/' + scope.row._id">
              <el-tooltip placement="top" content="Sửa tin tức">
                <span class="action-col mr-2">
                  <font-awesome-icon
                    :class="`color-custom-primary`"
                    icon="fa-regular fa-pen-to-square"
                  />
                </span>
              </el-tooltip>
            </nuxt-link>
            <el-tooltip placement="top" content="Xóa tin tức">
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
const isLoading = ref<boolean>(false);
const dialogStore = useDialogStore();
const { isShow, eventDialog } = storeToRefs(dialogStore);
const focusID = ref<string>("");
const route = useRoute();
const router = useRouter();
const filterSearch = ref<any>(null);
const { openDialog } = dialogStore;
const dataReactive = reactive({
  count: 1,
  page: 1,
});

watch(
  () => eventDialog.value,
  async (value: any) => {
    if (value) {
      const res: any = await useBaseFetch(`/news/${focusID.value}/update`, {
        method: "DELETE",
      });
    }
  }
);

watch(
  () => route.query,
  () => {
    handleGetData();
  }
);

const handleChangePage = (page: number) => {
  const query = route.query;
  router.replace({
    path: route.path,
    query: {
      ...query,
      page,
    },
  });
};

const handleGetData = async () => {
  const query = route.query;
  isLoading.value = true;
  const res: any = (await useBaseFetch("/news/list", {
    method: "GET",
    query,
  })) as any;
  tableData.value = res.data;
  dataReactive.page = res.page;
  dataReactive.count = res.count;
  isLoading.value = false;
};

onMounted(async () => {
  await handleGetData();
});

const handleOpenDialog = (id: string) => {
  focusID.value = id;
  openDialog({
    content: "Xác nhận xóa tin tức",
    title: "Xóa tin tức",
    textPrimary: "Xác nhận",
  });
};
</script>

<style scoped lang="scss"></style>
