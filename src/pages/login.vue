<template>
    <div class="login-page">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <label>Email:</label>
        <input v-model="email" type="email" required />
        <label>Password:</label>
        <input v-model="password" type="password" required />
        <button type="submit" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/authStore'
  import { useGuestId } from '@/composables/useGuestId'
  
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const loading = ref(false)
  const router = useRouter()
  const authStore = useAuthStore()
  
  const handleLogin = async () => {
    errorMessage.value = ''
    loading.value = true
  
    try {
      const { guestId } = useGuestId()
  
      await authStore.login(email.value, password.value, guestId.value)
  
      router.push('/')
    } catch (err: any) {
      errorMessage.value = err?.response?.data?.message || 'Login failed'
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .login-page {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .error {
    color: red;
    margin-top: 0.5rem;
  }
  </style>
  