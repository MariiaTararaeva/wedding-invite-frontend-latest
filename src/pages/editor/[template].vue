<template>
  <div>
    <h2>Edit: {{ templateData.name }}</h2>
    <div class="editor">
      <div class="canvas">
        <p><strong>{{ form.coupleName }}</strong></p>
        <p>{{ form.date }}</p>
        <p>{{ form.location }}</p>
      </div>
      <form @submit.prevent="saveInvite">
        <label>Couple Name:
          <input v-model="form.coupleName" type="text" />
        </label>
        <label>Date:
          <input v-model="form.date" type="text" />
        </label>
        <label>Location:
          <input v-model="form.location" type="text" />
        </label>
        <button type="submit">Save Invitation</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { templates } from '~/domain/models/inviteTemplates'

const route = useRoute()
const templateId = route.params.template
const templateData = templates.find(t => t.id === templateId)

const form = reactive({
  coupleName: templateData.fields.coupleName,
  date: templateData.fields.date,
  location: templateData.fields.location
})

function saveInvite() {
  // Simulate saving to backend or store
  console.log('Saved!', form)
}
</script>

<style scoped>
.editor {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}
.canvas {
  border: 1px dashed #ccc;
  padding: 2rem;
  width: 300px;
  font-family: 'Georgia', serif;
  background: #fdfaf5;
}
form label {
  display: block;
  margin-bottom: 1rem;
}
form input {
  display: block;
  margin-top: 0.25rem;
  padding: 0.5rem;
  width: 100%;
}
</style>