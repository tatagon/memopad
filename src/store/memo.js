import { defineStore } from 'pinia'
import { db, auth } from '../firebase/main'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'

export const useMemoStore = defineStore('memo', {
  state: () => {
    return {
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
      return (id) => state.memos.find((memo) => memo.numericId === parseInt(id))
    },
  },
  actions: {
    async fetchMemos() {
      const user = auth.currentUser
      if (!user) return
      const memosRef = collection(db, 'users', user.uid, 'memos')
      const snapshot = await getDocs(memosRef)
      this.memos = snapshot.docs.map((doc) => ({
        id: doc.id,
        numericId: doc.data().numericId || Date.now(),
        ...doc.data(),
      }))
    },
    async createMemo(memo) {
      const user = auth.currentUser
      if (!user) return
      const memosRef = collection(db, 'users', user.uid, 'memos')
      const snapshot = await getDocs(memosRef)
      const data = {
        numericId: snapshot.docs.length + 1,
        title: memo.title || '無題',
        content: memo.content,
        createDate: new Date(),
        updateDate: new Date(),
      }
      await addDoc(memosRef, data)
      await this.fetchMemos()
    },
    async updateMemo(id, modMemo) {
      const user = auth.currentUser
      if (!user) return
      const memoRef = doc(db, 'users', user.uid, 'memos', id)
      const data = {
        title: modMemo.title || '無題',
        content: modMemo.content,
        updateDate: new Date(),
      }
      await updateDoc(memoRef, data)
      await this.fetchMemos()
    },
    async deleteMemo(id) {
      const user = auth.currentUser
      if (!user) return
      const memoRef = doc(db, 'users', user.uid, 'memos', id)
      await deleteDoc(memoRef)
      await this.fetchMemos()
    },
    resetMemos() {
      this.memos = []
    },
  },
  persist: true,
})
