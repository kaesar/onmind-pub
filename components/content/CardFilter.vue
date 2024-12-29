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
      <button 
        v-for="tag in availableTags" 
        :key="tag"
        :class="['tag-button', { 'tag-selected': selectedTags.includes(tag) }]"
        @click="toggleTag(tag)"
      >
        {{ tag }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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

<style scoped>
.card-filter {
  @apply mb-6 space-y-4;
}

.search-input {
  @apply w-full p-2 border rounded-lg;
  background-color: white;
  border-color: rgb(209 213 219); /* border-gray-300 */
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    @apply outline-none ring-2;
    border-color: rgb(59 130 246); /* border-blue-500 */
    ring-color: rgb(147 197 253); /* ring-blue-300 */
  }
}

.tags-container {
  @apply flex flex-wrap gap-2;
}

.tag-button {
  @apply px-3 py-1 rounded-full text-sm transition-all duration-200;
  
  /* Default state */
  background-color: rgb(229 231 235); /* bg-gray-200 */
  color: rgb(55 65 81); /* text-gray-700 */

  &:hover {
    background-color: rgb(209 213 219); /* hover:bg-gray-300 */
  }

  /* Selected state */
  &.tag-selected {
    background-color: rgb(59 130 246); /* bg-blue-500 */
    color: white;

    &:hover {
      background-color: rgb(37 99 235); /* hover:bg-blue-600 */
    }
  }
}

/* Dark mode styles */
:root.dark {
  .search-input {
    background-color: rgb(31 41 55); /* dark:bg-gray-800 */
    border-color: rgb(55 65 81); /* dark:border-gray-700 */
    color: rgb(209 213 219); /* dark:text-gray-300 */

    &::placeholder {
      color: rgb(156 163 175); /* dark:placeholder-gray-400 */
    }
  }

  .tag-button {
    background-color: rgb(55 65 81); /* dark:bg-gray-700 */
    color: rgb(209 213 219); /* dark:text-gray-300 */

    &:hover {
      background-color: rgb(75 85 99); /* dark:hover:bg-gray-600 */
    }

    &.tag-selected {
      background-color: rgb(59 130 246); /* dark:bg-blue-500 */
      color: white;

      &:hover {
        background-color: rgb(37 99 235); /* dark:hover:bg-blue-600 */
      }
    }
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .search-input {
    @apply text-sm;
  }

  .tag-button {
    @apply text-xs px-2 py-0.5;
  }
}
</style>
