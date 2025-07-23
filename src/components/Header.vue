<template>
  <header>
    <h1>
      <RouterLink to="/">Memopad</RouterLink>
    </h1>
    <div v-if="userName" class="user-info">
      <span class="user-name">ユーザー名: {{ userName }}</span>
      <a class="logout" @click="logout">ログアウトする</a>
      <a class="delete-account" @click="handleDeleteAccount">アカウントを削除する</a>
    </div>
  </header>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { auth } from '@/firebase/main'
import {
  onAuthStateChanged,
  signOut,
  deleteUser,
  GoogleAuthProvider,
  reauthenticateWithPopup,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth'

const userName = ref('')
const router = useRouter()

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    userName.value = user ? user.displayName : false
  })
})

const logout = async () => {
  if (confirm('本当にログアウトしますか？')) {
    await signOut(auth)
    router.push('/login')
  }
}

const handleDeleteAccount = async () => {
  if (!confirm('本当にアカウントを削除しますか？')) return
  const user = auth.currentUser
  if (!user) return
  try {
    const providerId = user.providerData[0]?.providerId
    if (providerId === 'google.com') {
      const provider = new GoogleAuthProvider()
      await reauthenticateWithPopup(user, provider)
    } else if (providerId === 'password') {
      const email = user.email
      const password = prompt('パスワードを入力してください')
      const credential = EmailAuthProvider.credential(email, password)
      await reauthenticateWithCredential(user, credential)
    }
    // 再認証後に削除
    await deleteUser(user)
    alert('アカウントを削除しました')
    router.push('/signup')
  } catch (e) {
    alert('再認証または削除に失敗しました: ' + e.message)
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/base.scss' as *;

.header {
  gap: 3rem;
  line-height: 1.5;

  nav {
    width: 100%;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2em;

    a {
      display: inline-block;
      border-left: solid 1px var(--color-border);

      &.router-link-exact-active {
        color: var(--color-text);
      }

      &.router-link-exact-active:hover {
        background-color: transparent;
      }

      &:first-of-type {
        border: none;
      }
    }
  }
}
.user-info {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 0.5em;
  font-size: 0.9em;
  color: #666;
  .user-name {
  }
  a {
    cursor: pointer;
  }
}
</style>
