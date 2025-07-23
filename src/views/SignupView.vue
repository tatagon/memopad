<template>
  <h2>新規ご登録</h2>
  <div v-if="error">{{ error }}</div>
  <form @submit.prevent="onSignup" class="form">
    <div>
      <div class="label">ユーザー名<span class="required"> *</span></div>
      <input v-model="name" type="text" placeholder="" required />
    </div>
    <div>
      <div class="label">メールアドレス<span class="required"> *</span></div>
      <input v-model="email" type="email" placeholder="" required />
    </div>
    <div>
      <div class="label">パスワード<span class="required"> *</span></div>
      <input v-model="password" type="password" placeholder="" required />
    </div>
    <div class="submit-button">
      <button type="submit">サインアップ</button>
    </div>
  </form>
  <ul class="providers">
    <li class="provider google" @click="signInWithGoogle">
      <img src="/icon-google.png" alt="Google" width="25" height="25" />
      <span class="text">Googleで登録</span>
    </li>
  </ul>
  <div class="or">既にご登録の方は</div>
  <div class="login-link">
    <router-link to="/login">ログイン</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useSignup } from '@/firebase/useSignup'

const name = ref('')
const email = ref('')
const password = ref('')
const { error, signup } = useSignup()
const auth = getAuth()
const router = useRouter()

const onSignup = async () => {
  await signup(name.value, email.value, password.value)
  router.push('/')
}

function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then(() => {
      router.push('/')
    })
    .catch((error) => {
      error.value = error.message
    })
}
</script>

<style lang="scss" scoped>
@use '@/assets/_base.scss' as *;

.login-link {
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    color: $base_text_color;
    text-decoration: none;
    padding: 0.4em 1em 0.5em;
    box-sizing: border-box;
    border-radius: 10em;
    background-color: #fff;
    position: relative;
  }
}
</style>
