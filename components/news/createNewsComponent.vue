<template>
  <div>
    <el-form
      label-position="top"
      ref="formCreateNewsRef"
      :model="formCreateNews"
      :rules="rules"
      size="large"
    >
      <div class="row">
        <div class="col-12">
          <el-form-item label="Tin nổi bật">
            <el-switch v-model="formCreateNews.isOutstanding" />
          </el-form-item>
        </div>
        <div class="col-4">
          <el-form-item label="Hash tag" prop="tag">
            <el-input
              class="custom-input-filter"
              v-model="formCreateNews.tag"
              placeholder="Nhập hash tag"
              autocomplete="off"
            />
          </el-form-item>
        </div>
        <div class="col-8">
          <el-form-item label="Tiêu đề" prop="title">
            <el-input
              class="custom-input-filter"
              v-model="formCreateNews.title"
              placeholder="Nhập tiêu đề"
              autocomplete="off"
            />
          </el-form-item>
        </div>
        <div class="col-12">
          <el-form-item label="Mô tả ngắn" prop="short_description">
            <el-input
              class="custom-input-filter"
              type="textarea"
              v-model="formCreateNews.short_description"
              placeholder="Nhập mô tả ngắn"
              autocomplete="off"
              rows="5"
              resize="none"
            />
          </el-form-item>
        </div>
        <div class="col-12">
          <el-form-item label="Ảnh bìa" prop="imgs">
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
        <div class="col-12">
          <el-form-item
            label="Mô tả chi tiết"
            class="d-block"
            prop="description"
          >
            <div class="w-full">
              <client-only>
                <quillEditorComponent
                  v-model:value="formCreateNews.description"
                />
              </client-only>
            </div>
          </el-form-item>
        </div>
      </div>

      <el-form-item class="w-full">
        <el-button
          :loading="isLoading"
          class="m-auto"
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
import { compressFile } from "@/constant";

const props = defineProps({
  dataDetail: Object as PropType<any>,
});

const isLoading = ref<boolean>(false);
const router = useRouter();
const config = useRuntimeConfig();
const previewImage = ref<string>("");
const formCreateNews = ref<any>({
  tag: "",
  imgs: "",
  title: "",
  short_description: "",
  description: "",
  isOutstanding: false,
});
const formCreateNewsRef = ref<any>(null);
const rules = reactive<FormRules>({
  tag: [
    {
      required: true,
      message: "Vui lòng nhập hash tag",
      trigger: "change",
    },
  ],
  imgs: [
    {
      required: true,
      message: "Vui lòng thêm ảnh",
      trigger: "change",
    },
  ],
  title: [
    {
      required: true,
      message: "Vui lòng nhập tiêu đề",
      trigger: "change",
    },
  ],
  short_description: [
    {
      required: true,
      message: "Vui lòng nhập mô tả ngắn",
      trigger: "change",
    },
  ],
  description: [
    {
      required: true,
      message: "Vui lòng nhập mô tả chi tiết",
      trigger: "change",
    },
  ],
});

const handleChangeImg: UploadProps["onChange"] = async (
  uploadFile,
  uploadFiles
) => {
  await compressFile(uploadFile.raw as File, async (newResizeFile: any) => {
    formCreateNews.value.imgs = newResizeFile;
    previewImage.value = URL.createObjectURL(newResizeFile);
  });
};

const onSubmit = async () => {
  await formCreateNewsRef.value.validate(async (valid: any, fields: any) => {
    if (valid) {
      try {
        isLoading.value = true;
        const formData = new FormData();
        const listKey = Object.keys(formCreateNews.value);
        for (let i = 0; i < listKey.length; i++) {
          formData.append(listKey[i], formCreateNews.value[listKey[i]]);
        }
        let res: any = null;
        if (props.dataDetail) {
          formData.append("_id", props.dataDetail._id);
          res = await useBaseFetch("/news/update", {
            method: "PUT",
            body: formData,
          });
        } else {
          res = await useBaseFetch("/news/create", {
            method: "POST",
            body: formData,
          });
        }

        if (res?.status === 200) {
          if (props.dataDetail) {
            ElMessage({
              message: "Cập nhật tin tức thành công",
              type: "success",
              duration: 800,
            });
          } else {
            ElMessage({
              message: "Tạo tin tức thành công",
              type: "success",
              duration: 800,
            });
          }
          router.push("/news");
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
      formCreateNews.value.tag = props.dataDetail.tag;
      formCreateNews.value.imgs = props.dataDetail.imgs;
      formCreateNews.value.title = props.dataDetail.title;
      formCreateNews.value.isOutstanding = props.dataDetail.isOutstanding;
      formCreateNews.value.short_description =
        props.dataDetail.short_description;
      formCreateNews.value.description = props.dataDetail.description;

      if (props.dataDetail.imgs) {
        previewImage.value = `${config.public.apiBase}${props.dataDetail.imgs}`;
      }
    }
    console.log("props.dataDetail", props.dataDetail);
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
