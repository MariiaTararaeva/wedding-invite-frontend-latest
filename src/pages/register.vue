<template>
    <div class="register-page">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <label>Email:</label>
        <input v-model="email" type="email" required />
  
        <label>Password:</label>
        <input v-model="password" type="password" required />
  
        <label>Confirm Password:</label>
        <input v-model="confirmPassword" type="password" required />
  
        <button type="submit" :disabled="loading">
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
  
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/authStore'
  import { useGuestId } from "@/composables/useGuestId.ts"
  
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const errorMessage = ref('')
  const loading = ref(false)
  const router = useRouter()
  const authStore = useAuthStore()
  
  const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
      errorMessage.value = 'Passwords do not match'
      return
    }
  
    errorMessage.value = ''
    loading.value = true
  
    try {
      const { guestId } = useGuestId()
      await authStore.signup(email.value, password.value, guestId.value)
      router.push('/')
    } catch (err: any) {
      errorMessage.value = err?.response?.data?.message || 'Signup failed'
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .register-page {
    max-width: 400px;
    margin: 0 auto;
  }
  .error {
    color: red;
    margin-top: 0.5rem;
  }
  </style>
  