import { defineStore } from 'pinia';

export const useCounterStore = defineStore({
  id: 'common',
  state: () => ({ _data: 1 }),
  getters: {
    data(state): number {
      return state._data * 2;
    }
  },
  actions: {
    setData(data: number) {
      this._data = data;
    }
  },

  debounce: {
    setData: 3000
  }
});
