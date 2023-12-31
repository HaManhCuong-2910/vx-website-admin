<template>
  <div>
    <div class="my-10">
      <filterSearchStaffComponent />
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
      <el-table-column align="center" prop="fullName" label="Họ và tên" />
      <el-table-column align="center" label="Ảnh đại diện" width="200">
        <template #default="scope">
          <img :src="`${config.public.apiBase}${scope.row.image}`" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="position" label="Vị trí" />
      <el-table-column align="center" label="Ngày tạo">
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
            <nuxt-link :to="'/staff/edit/' + scope.row._id">
              <el-tooltip placement="top" content="Sửa nhân sự">
                <span class="action-col mr-2">
                  <font-awesome-icon
                    :class="`color-custom-primary`"
                    icon="fa-regular fa-pen-to-square"
                  />
                </span>
              </el-tooltip>
            </nuxt-link>
            <el-tooltip placement="top" content="Xóa nhân sự">
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
import { ElLoading } from "element-plus";
const tableData = ref<any[]>([]);
const isLoading = ref<boolean>(false);
const dialogStore = useDialogStore();
const { isShow, eventDialog } = storeToRefs(dialogStore);
const focusID = ref<string>("");
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
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
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        const res: any = await useBaseFetch(`/staff/${focusID.value}/delete`, {
          method: "DELETE",
        });
        if (res.status === 200) {
          ElMessage({
            message: "Xóa nhân sự thành công",
            type: "success",
            duration: 800,
          });
          await handleGetData();
        }
        loading.close();
      } catch (error) {
        ElMessage({
          message: "Xóa nhân sự không thành công",
          type: "error",
          duration: 800,
        });
        loading.close();
      }
    }
  }
);

watch(
  () => route.query,
  async () => {
    await handleGetData();
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
  const res: any = (await useBaseFetch("/staff/list", {
    method: "GET",
    query,
  })) as any;
  tableData.value = res.data;
  dataReactive.page = res.page;
  dataReactive.count = res.count;
  isLoading.value = false;
};

onMounted(async () => {
  if (Object.keys(route.query).length === 0) {
    router.replace({
      path: route.path,
      query: {
        page: 1,
      },
    });
  } else {
    await handleGetData();
  }
});

const handleOpenDialog = (id: string) => {
  focusID.value = id;
  openDialog({
    content: "Xác nhận xóa nhân sự",
    title: "Xóa nhân sự",
    textPrimary: "Xác nhận",
  });
};
</script>

<style scoped lang="scss">
img {
  max-height: 250px;
}
</style>
