<script setup>
// import { defineProps } from 'vue'

const props = defineProps({
  url: string
});

const url = ref(props.url);
</script>

<template>
  <div class="image-container">
    <br />
    <img :src="url" alt="Image" />
    <br />
  </div>
</template>

<style scoped>
:host {
  display: flex;
  justify-content: center;
}

img {
  margin: 10px;
}

.image-container {
  display: flex;
  justify-content: center;
}
</style>
