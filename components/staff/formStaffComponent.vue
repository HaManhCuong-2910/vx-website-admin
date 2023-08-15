<template>
  <div>
    <el-form
      label-position="top"
      ref="formCreateStaffRef"
      :model="formCreateStaff"
      :rules="rules"
      size="large"
    >
      <div class="row">
        <div class="col-3">
          <el-form-item label="Họ và tên" prop="fullName">
            <el-input
              class="custom-input-filter"
              v-model="formCreateStaff.fullName"
              placeholder="Nhập họ và tên"
              autocomplete="off"
            />
          </el-form-item>
        </div>
        <div class="col-3">
          <el-form-item label="Vị trí nhân sự" prop="position">
            <el-select
              class="custom-input-filter"
              v-model="formCreateStaff.position"
              placeholder="Chọn vị trí"
            >
              <el-option
                :label="item"
                :value="item"
                v-for="item in dataDropdownOption"
                :key="item"
              />
            </el-select>
          </el-form-item>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-12">
          <el-form-item label="Ảnh đại diện" prop="image">
            <el-upload
              class="avatar-uploader"
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleChangeImg"
            >
              <img v-if="previewImage" :src="previewImage" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </div>
      </div>

      <el-form-item class="w-full mt-5">
        <el-button :loading="isLoading" type="danger" @click="onSubmit"
          >{{ props.dataDetail ? "Cập nhật" : "Tạo mới" }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { FormRules, UploadProps, ElMessage } from "element-plus";

import { Plus } from "@element-plus/icons-vue";
import { compressFile, dataDropdownOption } from "@/constant";

const props = defineProps({
  dataDetail: Object as PropType<any>,
});

const isLoading = ref<boolean>(false);
const router = useRouter();
const config = useRuntimeConfig();
const previewImage = ref<string>("");
const formCreateStaff = ref<any>({
  fullName: "",
  image: "",
  position: "",
});
const formCreateStaffRef = ref<any>(null);
const rules = reactive<FormRules>({
  fullName: [
    {
      required: true,
      message: "Vui lòng nhập họ và tên",
      trigger: "change",
    },
  ],
  image: [
    {
      required: true,
      message: "Vui lòng thêm ảnh",
      trigger: "change",
    },
  ],
  position: [
    {
      required: true,
      message: "Vui lòng chọn vị trí",
      trigger: "change",
    },
  ],
});

const handleChangeImg: UploadProps["onChange"] = async (
  uploadFile,
  uploadFiles
) => {
  await compressFile(uploadFile.raw as File, async (newResizeFile: any) => {
    formCreateStaff.value.image = newResizeFile;
    previewImage.value = URL.createObjectURL(newResizeFile);
  });
};

const onSubmit = async () => {
  await formCreateStaffRef.value.validate(async (valid: any, fields: any) => {
    if (valid) {
      try {
        isLoading.value = true;
        const formData = new FormData();
        const listKey = Object.keys(formCreateStaff.value);
        for (let i = 0; i < listKey.length; i++) {
          formData.append(listKey[i], formCreateStaff.value[listKey[i]]);
        }
        let res: any = null;
        if (props.dataDetail) {
          formData.append("_id", props.dataDetail._id);
          res = await useBaseFetch("/staff/update", {
            method: "PUT",
            body: formData,
          });
        } else {
          res = await useBaseFetch("/staff/create", {
            method: "POST",
            body: formData,
          });
        }

        if (res?.status === 200) {
          if (props.dataDetail) {
            ElMessage({
              message: "Cập nhật nhân sự thành công",
              type: "success",
              duration: 800,
            });
          } else {
            ElMessage({
              message: "Tạo nhân sự thành công",
              type: "success",
              duration: 800,
            });
          }
          router.push("/staff");
        } else {
          ElMessage({
            message: "Không thành công",
            type: "error",
            duration: 800,
          });
        }
        isLoading.value = false;
      } catch (error) {
        ElMessage({
          message: "Không thành công",
          type: "error",
          duration: 800,
        });
        isLoading.value = false;
      }
    }
  });
};

watch(
  () => props.dataDetail,
  () => {
    if (props.dataDetail) {
      formCreateStaff.value.fullName = props.dataDetail.fullName;
      formCreateStaff.value.image = props.dataDetail.image;
      formCreateStaff.value.position = props.dataDetail.position;

      if (props.dataDetail.image) {
        previewImage.value = `${config.public.apiBase}${props.dataDetail.image}`;
      }
    }
  }
);
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
