<template>
  <div>
    <h2>Choose a template</h2>
    <div class="grid">
      <TemplateCard
        v-for="template in templates"
        :key="template.id"
        :template="template"
      />
    </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '~/stores/authStore'
  import { templates } from '~/domain/models/inviteTemplates'
  import TemplateCard from '~/components/TemplateCard.vue'

  const auth = useAuthStore()
  const user = auth.user
  </script>
  