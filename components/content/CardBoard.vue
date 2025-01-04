<script setup>
// import { ref, computed } from 'vue'
// import { useAsyncData } from '@nuxt/content'
import CardFilter from './CardFilter.vue'
import CardItem from './CardItem.vue'

const props = defineProps({
  defaultTags: {
    type: Array,
    default: () => []
  }
})

// Fetch content from Nuxt Content
const { data: items } = await useAsyncData('content', () => 
  queryContent(useRuntimeConfig().public.docsDir)
    .where({ _type: 'markdown' })
    .find()
)

// Compute all available tags
const allTags = computed(() => {
  const tags = new Set()
  items.value?.forEach(item => {
    item.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
})

// Filter logic
const filteredItems = ref(items.value || [])

const handleFilter = ({ query, tags }) => {
  filteredItems.value = items.value?.filter(item => {
    const matchesQuery = !query || 
      item.title.toLowerCase().includes(query.toLowerCase())
    const matchesTags = tags.length === 0 || 
      tags.every(tag => item.tags?.includes(tag))
    return matchesQuery && matchesTags
  })
}
</script>

<template>
  <div class="card-grid">
    <CardFilter 
      :available-tags="allTags" 
      @filter="handleFilter"
    />
    <div class="grid">
      <CardItem 
        v-for="item in filteredItems" 
        :key="item._path"
        :item="item"
      />
    </div>
  </div>
</template>

<style scoped>
/* Grid Container */
.card-grid {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Grid Layout */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .card-grid {
    padding: 1rem;
  }
}
</style>
