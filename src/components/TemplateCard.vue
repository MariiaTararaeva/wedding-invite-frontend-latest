
<template>
  <div class="template-card" @click="goToEditor">
    <!-- <img :src="template.image" :alt="template.name" class="preview" /> -->
    <h3>{{ template.name }}</h3>
  </div>
</template>

<script setup>
const props = defineProps({
  template: Object
})

const router = useRouter()

function goToEditor() {
  router.push(`/editor/${props.template.id}`) // template is coming from defineProps() — and in <script setup>, it’s not automatically available as a variable like in Options API or HTML. So add props before .template for router.push.
}
</script>

<style scoped>
.template-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: 0.2s ease;
}
.template-card:hover {
  transform: scale(1.02);
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.preview {
  width: 100%;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}
</style>





