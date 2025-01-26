<script setup>
// import { ref } from 'vue'
const props = defineProps(['image'])
</script>

<template>
    <div class="cover">
        <img :src="image" />
        <slot></slot>
    </div>
</template>

<style scoped>
.cover {
    height: 100vh;
    width: 100%;
    text-align:center;
}

.cover img {
    height: calc(100% - 60px);
    width: 100%;
    object-fit: cover;
}

.cover button {
    display: block;
    margin: 0 auto;
    padding: 10px 10px 10px 10px;
    background-color: steelblue;
    border-radius: 10px;
    transform: translateY(calc(300% * -1));
}
</style>
