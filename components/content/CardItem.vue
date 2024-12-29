<template>
  <NuxtLink :to="item._path" class="card-item">
    <h3>{{ item.title }}</h3>
    <p>{{ item.description }}</p>
    <div class="tags">
      <span v-for="tag in item.tags" :key="tag" class="tag">
        {{ tag }}
      </span>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.card-item {
  @apply relative p-6 rounded-lg transform transition-all duration-300;
  /* Base styles */
  background-color: rgb(243 244 246); /* bg-gray-100 */
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); /* shadow-lg */
  border-top: 8px solid rgb(191 219 254); /* border-t-8 border-blue-200 */

  /* Hover effects */
  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  }

  /* Before element for inner shadow */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
    border-radius: 0.5rem;
  }

  /* Post-it fold effect */
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    right: -2px;
    width: 0;
    height: 0;
    border-top: 20px solid rgba(191, 219, 254, 0.9); /* border-t-blue-200/90 */
    border-left: 20px solid transparent;
    transform: rotate(0deg);
  }
}

/* Dark mode styles */
:root.dark .card-item {
  background-color: rgba(17, 24, 39, 0.4); /* dark:bg-gray-900/40 */
  border-color: rgb(59 130 246); /* dark:border-blue-500 */
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.5); /* dark:shadow-md dark:shadow-gray-950/50 */
  
  &:hover {
    box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.3); /* dark:hover:shadow-xl dark:hover:shadow-blue-500/30 */
  }

  &::after {
    border-top-color: rgba(59, 130, 246, 0.9); /* dark:border-t-blue-500/90 */
  }
}

/* Content styles */
h3 {
  @apply text-xl font-bold mb-3;
  color: rgb(23 37 84); /* text-blue-950 */
}

p {
  @apply mb-3;
  color: rgb(17 24 39); /* text-gray-900 */
}

.tags {
  @apply flex flex-wrap gap-2;
}

.tag {
  @apply px-3 py-1 text-sm rounded-full;
  background-color: rgb(219 234 254); /* bg-blue-100 */
  color: rgb(29 78 216); /* text-blue-700 */
}

/* Dark mode content styles */
:root.dark {
  h3 {
    color: rgb(191 219 254); /* dark:text-blue-200 */
  }

  p {
    color: rgb(209 213 219); /* dark:text-gray-300 */
  }

  .tag {
    background-color: rgba(59, 130, 246, 0.2); /* dark:bg-blue-500/20 */
    color: rgb(147 197 253); /* dark:text-blue-300 */
  }
}

/* Link styles */
a.card-item {
  @apply inline-block font-medium;
  color: rgb(31 41 55); /* text-gray-800 */
  transition: color 0.2s;
  text-decoration: none; /* Remove underline */

  &:hover {
    text-decoration: none; /* Ensure no underline on hover */
    color: rgb(3 7 18); /* text-gray-950 */
  }
}

:root.dark a.card-item {
  color: rgb(147 197 253); /* dark:text-blue-300 */
  
  &:hover {
    text-decoration: none; /* Ensure no underline in dark mode */
    color: rgb(191 219 254); /* dark:text-blue-200 */
  }
}
</style>
