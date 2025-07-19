import { defineStore } from 'pinia'

export const useMemoStore = defineStore('memo', {
  state: () => {
    return {
      count: 0,
      memos: [],
    }
  },
  getters: {
    getMemos(state) {
      return state.memos
    },
    getCount(state) {
      return state.memos.length
    },
    getMemoById(state) {
      return (id) => state.memos.find((memo) => memo.id === parseInt(id))
    },
  },
  actions: {
    save(newMemo) {
      if (newMemo.id) {
        const index = this.memos.findIndex((memo) => memo.id === newMemo.id)
        if (index !== -1) {
          this.memos[index] = newMemo
        }
      } else {
        this.memos.unshift(newMemo)
        newMemo.id = ++this.count
      }
    },
    delete(id) {
      this.memos = this.memos.filter((memo) => memo.id !== id)
    },
  },
  persist: true,
})
