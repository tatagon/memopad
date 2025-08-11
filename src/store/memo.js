import { defineStore } from 'pinia'
import { db, auth } from '../firebase/main'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'

export const useMemoStore = defineStore('memo', {
  state: () => {
    return {
      memos: [],
      unsubscribe: null,
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
    // 作成
    async createMemo(memo) {
      const user = auth.currentUser
      if (!user) return
      const memosRef = collection(db, 'users', user.uid, 'memos')
      const snapshot = await getDocs(memosRef)
      let maxNumericId = 0
      snapshot.docs.forEach((doc) => {
        const n = doc.data().numericId
        if (typeof n === 'number' && n > maxNumericId) {
          maxNumericId = n
        }
      })
      const data = {
        numericId: maxNumericId + 1,
        title: memo.title || '無題',
        content: memo.content,
        createDate: new Date(),
        updateDate: new Date(),
      }
      await addDoc(memosRef, data)
    },
    // 更新
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
    },
    // 削除
    async deleteMemo(id) {
      const user = auth.currentUser
      if (!user) return
      const memoRef = doc(db, 'users', user.uid, 'memos', id)
      await deleteDoc(memoRef)
    },
    // リアルタイム監視を開始
    startRealtimeListener() {
      const user = auth.currentUser
      if (!user) return

      // 既にリスナーが動作している場合は停止
      if (this.unsubscribe) {
        this.unsubscribe()
        this.unsubscribe = null
      }

      const memosRef = collection(db, 'users', user.uid, 'memos')
      const q = query(memosRef, orderBy('createDate', 'desc'))

      this.unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          this.memos = snapshot.docs.map((doc) => ({
            id: doc.id,
            numericId: doc.data().numericId || Date.now(),
            ...doc.data(),
          }))
        },
        (error) => {
          console.error('Firestore listener error:', error)
        },
      )
    },
    // リスナーを停止
    stopRealtimeListener() {
      if (this.unsubscribe) {
        this.unsubscribe()
        this.unsubscribe = null
      }
    },
    resetMemos() {
      this.memos = []
    },
  },
  persist: true,
})
