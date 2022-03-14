import { defineStore } from 'pinia';

export const useCounterStore = defineStore({
  id: 'common',
  state: () => ({ data: 1 }),
  getters: {
    data(state): number {
      return state.data * 2;
    }
  },
  actions: {
    setData(data: number) {
      this.data = data;
    }
  },

  debounce: {
    setData: 3000
  }
});
