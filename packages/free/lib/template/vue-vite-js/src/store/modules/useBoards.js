/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */
import { defineStore } from "pinia";

import { store } from "@/store";

export const useBoards = defineStore({
  id: "app-boards",
  state: () => ({
    models: [], // 存渲染的子元素
  }),
});

// Need to be used outside the setup
export function useBoardsStoreWithOut() {
  return useBoards(store);
}
