<script setup>
// import { ref } from 'vue';

const props = defineProps({
  width: {
    type: Number,
    default: 1200,
  },
  height: {
    type: Number,
    default: 675,
  },
  url: {
    type: String,
    default: '',
  },
});

const width = ref(props.width);
const height = ref(props.height);
const url = ref(props.url);
</script>

<template>
  <div class="embed-container">
    <iframe
      :width="width"
      :height="height"
      frameborder="0"
      :src="url"
      type="text/html"
      allowScriptAccess="always"
      allowFullScreen
      scrolling="yes"
      allowNetworking="all"
    ></iframe>
  </div>
</template>

<style scoped>
:host {
  width: 100%;
}

.embed-container {
  position: relative;
  padding-bottom: 56.25%; /* Aspect ratio for 16:9 */
  padding-top: 0;
  height: 0;
}

iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
