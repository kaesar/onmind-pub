<script setup>
// import { ref } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: '560'
  },
  height: {
    type: String,
    default: '315'
  },
  url: {
    type: String,
    default: ''
  }
})

const videoWidth = ref(props.width)
const videoHeight = ref(props.height)
const videoUrl = ref(props.url)
</script>

<template>
  <div class="video">
    <iframe
      :width="videoWidth"
      :height="videoHeight"
      :src="videoUrl"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.video {
  display: grid;
  grid-template-areas: stack;
  place-items: center;
  width: max(320px, 100%);
}
</style>
