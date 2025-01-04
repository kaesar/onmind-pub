<script setup>
// import Textarea from 'primevue/textarea'
const inputId = Math.random().toString(36).substring(7)
</script>

<template>
    <FloatLabel class="w-full" variant="on">
        <Textarea v-model="value" :inputId="inputId" rows="5" cols="30" />
        <label :for="inputId">{{ label }}</label>
    </FloatLabel>
</template>
