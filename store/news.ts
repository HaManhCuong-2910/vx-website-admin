import { defineStore } from "pinia";

export const useNewsStore = defineStore({
  id: "news-store",
  state: () => {
    return {
      newsList: ["dsada", "dsadas"],
    };
  },
  actions: {
    addValueToNewsList(value: string) {
      this.newsList.push(value);
    },
  },
  getters: {
    getNewsList: (state) => state.newsList,
  },
});
