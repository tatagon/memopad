// ログイン
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './main'

const error = ref('')
const login = async (email, password) => {
  error.value = ''
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result
  } catch (e) {
    error.value = 'ログインに失敗しました: ' + e.message
    throw e
  }
}

export function useLogin() {
  return { error, login }
}
