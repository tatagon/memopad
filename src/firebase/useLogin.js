// ログイン
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './main'

const error = ref('')
const login = async (email, password) => {
  error.value = ''
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (e) {
    error.value = 'ログインに失敗しました: ' + e.message
  }
}

export function useLogin() {
  return { error, login }
}
