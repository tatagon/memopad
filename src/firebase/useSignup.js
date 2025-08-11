// サインアップ
import { ref } from 'vue'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from './main'

const error = ref('')
const signup = async (name, email, password) => {
  error.value = ''
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    if (userCredential && userCredential.user) {
      await updateProfile(userCredential.user, { displayName: name })
    }
    return userCredential
  } catch (e) {
    error.value = e.message
    throw e
  }
}
export function useSignup() {
  return { error, signup }
}
