<script setup>
// import InputText from 'primevue/inputtext'
const inputId = Math.random().toString(36).substring(7)
</script>

<template>
    <FloatLabel class="w-full md:w-56" variant="on">
        <InputText type="text" v-model="value" :inputId="inputId" />
        <label :for="inputId">{{ label }}</label>
    </FloatLabel>
</template>
