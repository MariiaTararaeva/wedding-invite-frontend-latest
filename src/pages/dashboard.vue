<template>
    <div>
      <h2>Hello, {{ user?.email }}</h2>
      <p>Your wedding invitations go here.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '@/stores/authStore'
  const auth = useAuthStore()
  const user = auth.user
  </script>
  