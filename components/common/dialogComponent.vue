<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="body?.title"
    :show-close="!body?.isHideClose"
    width="30%"
    @close="closeDialog"
    align-center
  >
    <span>{{ body?.content }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog" v-if="body?.textSecondary">{{
          body?.textSecondary
        }}</el-button>
        <el-button type="primary" @click="onSubmitDialog(body)">
          {{ body?.textPrimary }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDialogStore } from "@/store/dialog";
const centerDialogVisible = ref<boolean>(false);
const dialogStore = useDialogStore();
const route = useRoute();
const { body, isShow } = storeToRefs(dialogStore);
const { closeDialog, openDialog, onSubmitDialog } = dialogStore;

watch(
  () => isShow.value,
  (value) => {
    console.log("value", value);
    centerDialogVisible.value = value;
  }
);

watch(
  () => route.path,
  () => {
    closeDialog();
  }
);

onMounted(() => {
  centerDialogVisible.value = isShow.value;
});
</script>

<style scoped lang="scss"></style>
