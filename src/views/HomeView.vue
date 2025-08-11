<template>
  <main>
    <div class="header">
      <h2>メモ一覧 ({{ memoCount || 0 }}件)</h2>
      <button @click="goToNew" class="new-btn">新規作成</button>
    </div>

    <div v-if="memoCount > 0" class="memo-list">
      <div v-for="memo in memos" :key="memo.id" class="memo-item">
        <div class="memo-header">
          <h3>{{ memo.title || '無題' }}</h3>
          <div class="memo-actions">
            <router-link class="new-btn" :to="{ name: 'edit', params: { id: memo.numericId } }"
              >編集</router-link
            >
            <button class="delete-btn" @click="deleteById(memo.id)">削除</button>
          </div>
        </div>
        <p class="memo-content">{{ memo.content }}</p>
        <div class="memo-date">ID: {{ memo.numericId }}</div>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>メモがありません</p>
      <p>新規作成ボタンからメモを作成してください</p>
    </div>
  </main>
</template>

<script setup>
import { useMemoStore } from '@/store/memo'
import { useRouter } from 'vue-router'
import { computed, onMounted, onUnmounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/main'

const memoStore = useMemoStore()
const router = useRouter()

let unsubscribeAuth = null

onMounted(() => {
  memoStore.resetMemos()
  
  // 認証状態を監視してリスナーを管理
  unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (user) {
      // ユーザーがログインしている場合、リスナーを開始
      memoStore.startRealtimeListener()
    } else {
      // ユーザーがログアウトしている場合、リスナーを停止
      memoStore.stopRealtimeListener()
      memoStore.resetMemos()
    }
  })
})

onUnmounted(() => {
  // 認証リスナーを停止
  if (unsubscribeAuth) {
    unsubscribeAuth()
  }
  // Firestoreリスナーを停止
  memoStore.stopRealtimeListener()
})

const memos = computed(() => memoStore.getMemos)
const memoCount = computed(() => memoStore.getCount)

function goToNew() {
  router.push('/new')
}

async function deleteById(id) {
  if (confirm('このメモを削除しますか？')) {
    await memoStore.deleteMemo(id)
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
  }
}

.new-btn {
  font-size: 0.95em;
  text-decoration: none;
  background-color: #4caf50;
  color: white;
  padding: 0.5em 1em;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.empty-state {
  text-align: center;
  color: #666;
  margin-top: 50px;
}

.memo-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.memo-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #f9f9f9;
}

.memo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.memo-header h3 {
  margin: 0;
  color: #333;
}

.memo-actions {
  display: flex;
  gap: 5px;
}

.edit-btn {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.edit-btn:hover {
  background-color: #1976d2;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.delete-btn:hover {
  background-color: #da190b;
}

.memo-content {
  color: #666;
  margin: 10px 0;
  white-space: pre-wrap;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}

.memo-date {
  font-size: 12px;
  color: #999;
  text-align: right;
}
</style>
