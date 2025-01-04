<script setup>
// import { ref } from 'vue'
// import { Chip } from 'primevue/chip'

const props = defineProps({
  availableTags: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['filter'])
const searchQuery = ref('')
const selectedTags = ref([])

const toggleTag = (tag) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
  emit('filter', { query: searchQuery.value, tags: selectedTags.value })
}
</script>

<template>
  <div class="card-filter">
    <input 
      v-model="searchQuery" 
      type="text" 
      placeholder="Search title..." 
      class="search-input"
      @input="$emit('filter', { query: searchQuery, tags: selectedTags })"
    />
    <div class="tags-container">
      <Chip 
        v-for="tag in availableTags" 
        :key="tag"
        :label="tag"
        :class="['tag-chip', { 'tag-selected': selectedTags.includes(tag) }]"
        @click="toggleTag(tag)"
      />
    </div>
  </div>
</template>

<style scoped>
.card-filter {
  margin-bottom: 1.5rem;
  @apply space-y-4;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  color: snow;
  background-color: #3f3f46;
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.375rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    ring: 2px;
    border-color: #3b82f6; /* border-blue-500 */
    ring-color: #93c5fd; /* ring-blue-300 */
  }
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-chip {
  cursor: pointer;
}

.tag-selected {
  background-color: #3b82f6; /* bg-blue-500 */
  color: white;
}
</style>
