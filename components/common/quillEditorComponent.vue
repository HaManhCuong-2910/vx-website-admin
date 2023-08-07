<template>
  <div>
    <client-only>
      <QuillEditor
        contentType="html"
        theme="snow"
        :modules="modules"
        v-model:content="dataValue"
        toolbar="full"
      />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { compressFile } from "@/constant";
import ImageUploader from "quill-image-uploader";
const props = defineProps({
  class: String,
  value: String,
  placeholder: String,
});
const config = useRuntimeConfig();
const dataValue = ref<any>("");
const modules = ref<any>({});
const emit = defineEmits(["update:value", "blurField"]);
if (process.client) {
  modules.value = {
    name: "imageUploader",
    module: ImageUploader,
    options: {
      upload: (file: any) => {
        return new Promise(async (resolve, reject) => {
          await compressFile(file, async (newResizeFile: any) => {
            const formData = new FormData();
            formData.append("files", newResizeFile);
            const res: any = await useBaseFetch("/news/upload", {
              method: "POST",
              body: formData,
            });
            if (res["data"][0]) {
              resolve(`${config.public.apiBase}${res["data"][0]}`);
            } else {
              reject();
            }
          });
        });
      },
    },
  };

  const handleUpdateField = () => {
    emit("update:value", dataValue.value);
  };
  const handleBlurField = () => {
    emit("blurField", dataValue.value);
  };

  watch(
    () => dataValue.value,
    () => {
      handleUpdateField();
    }
  );

  watch(
    () => props.value,
    () => {
      dataValue.value = props.value;
    }
  );

  onMounted(() => {
    dataValue.value = props.value;
  });
}
</script>

<style scoped lang="scss"></style>
