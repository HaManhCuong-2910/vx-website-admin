import { defineStore } from "pinia";

export const useDialogStore = defineStore({
  id: "dialog-store",
  state: () => {
    return {
      isShow: false,
      body: null as IDialogType | null,
      eventDialog: null,
    };
  },
  actions: {
    openDialog(body: IDialogType) {
      this.isShow = true;
      this.body = body;
      this.eventDialog = null;
    },
    closeDialog() {
      this.isShow = false;
      setTimeout(() => {
        this.body = null;
      }, 300);
    },
    onSubmitDialog(event: any) {
      this.closeDialog();
      this.eventDialog = event;
    },
  },
  getters: {},
});
