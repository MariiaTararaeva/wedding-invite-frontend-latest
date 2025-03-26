<template>
    <div class="error-page">
      <h1>{{ error.statusCode }}</h1>
      <p>{{ error.message || 'Page not found' }}</p>
      <NuxtLink to="/" class="home-link">← Go back home</NuxtLink>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    error: {
      type: Object,
      required: true,
    },
  })
  </script>
  
  <style scoped>
  .error-page {
    text-align: center;
    padding: 4rem 2rem;
    font-family: system-ui, sans-serif;
  }
  h1 {
    font-size: 5rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }
  .home-link {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem 1.25rem;
    background-color: black;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }
  </style>
  