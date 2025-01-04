<script setup>
// import { Card } from 'primevue/card'
// import { Chip } from 'primevue/chip'
// import { useRouter } from 'vue-router'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const navigateToItem = () => {
  router.push(props.item._path)
}
</script>

<template>
  <Card class="card-item" :style="{ cursor: 'pointer' }" @click="navigateToItem">
    <template #title>{{ item.title }}</template>
    <template #content>
      <p>{{ item.description }}</p>
      <br />
      <div class="tags">
        <Chip 
          v-for="tag in item.tags" 
          :key="tag" 
          :label="tag" 
          class="tag"
        />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.card-item {
  transition: box-shadow 0.3s ease;
  background-color: var(--card-bg-color);
  color: var(--card-text-color);
}

.card-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

[data-theme="dark"] .card-item:hover {
  box-shadow: 0 4px 8px rgba(121, 165, 232, 0.5); /* Light blue shadow */
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  margin: 0.25rem;
  color: #3f3f46;
  background-color: whitesmoke;
}

/* Dark mode styles */
:root {
  --card-bg-color: #ffffff;
  --card-text-color: #000000;
}

[data-theme="dark"] .card-item {
  --card-bg-color: #1e1e1e;
  --card-text-color: #ffffff;
}

[data-theme="dark"] .tag {
  color: whitesmoke;
  background-color: #3f3f46;
}
</style>
