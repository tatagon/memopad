<template>
  <h2>ログイン</h2>
  <div v-if="error">{{ error }}</div>
  <form @submit.prevent="onLogin" class="form">
    <div>
      <div class="label">メールアドレス<span class="required"> *</span></div>
      <input v-model="email" type="email" placeholder="" required />
    </div>
    <div>
      <div class="label">パスワード<span class="required"> *</span></div>
      <input v-model="password" type="password" placeholder="" required />
    </div>
    <div class="submit-button">
      <button type="submit">ログイン</button>
    </div>
  </form>
  <ul class="providers">
    <li class="provider google" @click="signInWithGoogle">
      <img src="/icon-google.png" alt="Google" width="25" height="25" />
      <span class="text">Googleでログイン</span>
    </li>
  </ul>
  <div class="or">または</div>
  <div class="signup-button">
    <router-link to="/signup" class="signup-button__link">サインアップ</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useLogin } from '@/firebase/useLogin'

const email = ref('')
const password = ref('')
const { error, login } = useLogin()
const router = useRouter()
const auth = getAuth()

const onLogin = async () => {
  await login(email.value, password.value)
  router.push('/')
}

function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then(() => {
      router.push('/')
    })
    .catch((e) => {
      error.value = e.message
    })
}
</script>

<style lang="scss" scoped>
@use '@/assets/_base.scss' as *;

.signup-button {
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    color: #fff;
    text-decoration: none;
    font-size: 1.1em;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em 1em;
    box-sizing: border-box;
    background-color: $base_text_color;
    border-radius: 2em;
    position: relative;
  }
}
</style>
