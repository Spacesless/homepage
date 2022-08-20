import { defineStore } from "pinia";

interface State {
  background: string;
  desktopIcon: [];
}

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useConfigStore = defineStore("config", {
  persist: true,
  state: (): State => {
    return {
      background: "",
      desktopIcon: [],
    };
  },
  actions: {
    getConfig() {},
    updateConfig() {},
  },
});
