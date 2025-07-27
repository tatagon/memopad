<template>
  <main>
    <div class="header">
      <h2>{{ isEdit ? 'メモ編集' : '新規メモ作成' }}</h2>
    </div>

    <div class="form-group">
      <label for="title">タイトル</label>
      <input type="text" id="title" v-model="title" placeholder="メモのタイトルを入力" />
    </div>

    <div class="form-group">
      <label for="content">内容</label>
      <textarea id="content" v-model="content" placeholder="メモの内容を入力"></textarea>
    </div>

    <div class="button-group">
      <button @click="cancel" class="cancel-btn">キャンセル</button>
      <button @click="save" class="save-btn">保存</button>
      <button @click="remove" v-if="memo.id">削除</button>
    </div>
  </main>
</template>

<script setup>
import { useMemoStore } from '@/store/memo'
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, watch } from 'vue'

const props = defineProps({
  memo: {
    type: Object,
    default: () => ({}),
  },
})

const router = useRouter()
const route = useRoute()
const memoStore = useMemoStore()

const isEdit = computed(() => route.name === 'edit')
const title = ref(props.memo.title || '')
const content = ref(props.memo.content || '')
watch(
  () => props.memo,
  (newMemo) => {
    title.value = newMemo.title || ''
    content.value = newMemo.content || ''
  },
  { deep: true },
)

function save() {
  if (!title.value.trim() && !content.value.trim()) {
    alert('タイトルまたは内容を入力してください')
    return
  }

  const modMemo = {
    title: title.value,
    content: content.value,
  }

  if (isEdit.value) {
    memoStore.updateMemo(props.memo.id, modMemo)
  } else {
    memoStore.createMemo(modMemo)
  }

  // memoStore.save(memo)

  router.push('/')
}

function cancel() {
  router.push('/')
}

function remove() {
  if (confirm('このメモを削除しますか？')) {
    memoStore.deleteMemo(props.memo.id)
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input[type='text'] {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

textarea {
  width: 100%;
  height: 30em;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  min-width: 100px;
}

.save-btn {
  background-color: #4caf50;
  color: white;

  &:hover {
  }
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.cancel-btn:hover {
  background-color: #da190b;
}
</style>
