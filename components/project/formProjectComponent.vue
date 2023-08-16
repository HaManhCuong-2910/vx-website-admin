<template>
  <div>
    <el-form
      label-position="top"
      ref="formCreateProjectRef"
      :model="formCreateProject"
      :rules="rules"
      size="large"
    >
      <h2>Setting tiêu đề lớn</h2>
      <div class="row mt-5">
        <div class="col-2">
          <el-form-item label="Tiêu đề lớn" prop="title_large">
            <el-input
              class="custom-input-filter"
              v-model="formCreateProject.title_large"
              placeholder="Nhập tiêu đề lớn"
              autocomplete="off"
            />
          </el-form-item>
        </div>
        <div class="col-2">
          <el-form-item label="Font chữ tiêu đề lớn" prop="font_title_large">
            <el-select
              class="custom-input-filter w-full"
              v-model="formCreateProject.font_title_large"
              placeholder="Chọn font chữ"
            >
              <el-option
                :label="item"
                :value="item"
                v-for="item in listFontText"
                :key="item"
              />
            </el-select>
          </el-form-item>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-2">
          <el-form-item label="Cỡ chữ trên Desktop" prop="size_desktop">
            <el-input
              class="custom-input-filter"
              v-model="formCreateProject.size_desktop"
              placeholder="Nhập cỡ chữ"
              autocomplete="off"
              type="number"
            />
          </el-form-item>
        </div>
        <div class="col-2">
          <el-form-item label="Cỡ chữ trên Mobile" prop="size_mobile">
            <el-input
              class="custom-input-filter"
              v-model="formCreateProject.size_mobile"
              placeholder="Nhập cỡ chữ"
              autocomplete="off"
              type="number"
            />
          </el-form-item>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-2">
          <el-form-item label="Vị trí trên Desktop" prop="position_desktop">
            <el-select
              class="custom-input-filter w-full"
              v-model="formCreateProject.position_desktop"
              placeholder="Chọn vị trí"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in listPosition"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="col-2">
          <el-form-item label="Vị trí trên Mobile" prop="position_mobile">
            <el-select
              class="custom-input-filter w-full"
              v-model="formCreateProject.position_mobile"
              placeholder="Chọn vị trí"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="item in listPosition"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
      </div>

      <hr />
      <h2 class="mt-5">Setting tiêu đề nhỏ</h2>
      <div class="row mt-5">
        <div class="col-3">
          <el-form-item label="Tiêu đề nhỏ" prop="title_short">
            <el-input
              class="custom-input-filter"
              v-model="formCreateProject.title_short"
              placeholder="Nhập tiêu đề nhỏ"
              autocomplete="off"
            />
          </el-form-item>
        </div>
        <div class="col-3">
          <el-form-item label="Danh mục" prop="des_short">
            <el-input
              class="custom-input-filter"
              v-model="formCreateProject.des_short"
              placeholder="Nhập danh mục"
              autocomplete="off"
            />
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
        <el-button
          :loading="isLoading"
          class="mx-auto"
          type="danger"
          @click="onSubmit"
          >{{ props.dataDetail ? "Cập nhật" : "Tạo mới" }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { FormRules, UploadProps, ElMessage } from "element-plus";

import { Plus } from "@element-plus/icons-vue";
import { compressFile, listFontText, listPosition } from "@/constant";

const props = defineProps({
  dataDetail: Object as PropType<any>,
});

const isLoading = ref<boolean>(false);
const router = useRouter();
const config = useRuntimeConfig();
const previewImage = ref<string>("");
const formCreateProject = ref<any>({
  title_large: "",
  font_title_large: "",
  title_short: "",
  des_short: "",
  size_desktop: "",
  size_mobile: "",
  position_desktop: "",
  position_mobile: "",
  image: "",
});
const formCreateProjectRef = ref<any>(null);
const rules = reactive<FormRules>({
  title_large: [
    {
      required: true,
      message: "Vui lòng nhập tiêu đề lớn",
      trigger: "change",
    },
  ],
  title_short: [
    {
      required: true,
      message: "Vui lòng nhập tiêu đề nhỏ",
      trigger: "change",
    },
  ],
  des_short: [
    {
      required: true,
      message: "Vui lòng nhập danh mục",
      trigger: "change",
    },
  ],
  position_desktop: [
    {
      required: true,
      message: "Vui lòng nhập cỡ chữ trên Desktop",
      trigger: "change",
    },
  ],
  position_mobile: [
    {
      required: true,
      message: "Vui lòng nhập cỡ chữ trên Desktop",
      trigger: "change",
    },
  ],
  size_desktop: [
    {
      required: true,
      message: "Vui lòng nhập cỡ chữ trên Desktop",
      trigger: "change",
    },
  ],
  size_mobile: [
    {
      required: true,
      message: "Vui lòng nhập cỡ chữ trên Mobile",
      trigger: "change",
    },
  ],
  font_title_large: [
    {
      required: true,
      message: "Vui lòng chọn font chữ",
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
});

const handleChangeImg: UploadProps["onChange"] = async (uploadFile) => {
  await compressFile(uploadFile.raw as File, async (newResizeFile: any) => {
    formCreateProject.value.image = newResizeFile;
    previewImage.value = URL.createObjectURL(newResizeFile);
  });
};

const onSubmit = async () => {
  await formCreateProjectRef.value.validate(async (valid: any, fields: any) => {
    if (valid) {
      try {
        isLoading.value = true;
        const formData = new FormData();
        const listKey = Object.keys(formCreateProject.value);
        for (let i = 0; i < listKey.length; i++) {
          formData.append(listKey[i], formCreateProject.value[listKey[i]]);
        }
        let res: any = null;
        if (props.dataDetail) {
          formData.append("_id", props.dataDetail._id);
          res = await useBaseFetch("/project/update", {
            method: "PUT",
            body: formData,
          });
        } else {
          res = await useBaseFetch("/project/create", {
            method: "POST",
            body: formData,
          });
        }

        if (res?.status === 200) {
          if (props.dataDetail) {
            ElMessage({
              message: "Cập nhật dự án thành công",
              type: "success",
              duration: 800,
            });
          } else {
            ElMessage({
              message: "Tạo dự án thành công",
              type: "success",
              duration: 800,
            });
          }
          router.push("/project");
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
      formCreateProject.value.title_large = props.dataDetail.title_large;
      formCreateProject.value.font_title_large =
        props.dataDetail.font_title_large;
      formCreateProject.value.title_short = props.dataDetail.title_short;
      formCreateProject.value.des_short = props.dataDetail.des_short;
      formCreateProject.value.size_desktop = props.dataDetail.size_desktop;
      formCreateProject.value.size_mobile = props.dataDetail.size_mobile;
      formCreateProject.value.position_desktop =
        props.dataDetail.position_desktop;
      formCreateProject.value.position_mobile =
        props.dataDetail.position_mobile;
      formCreateProject.value.image = props.dataDetail.image;

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
