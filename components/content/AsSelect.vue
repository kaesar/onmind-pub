<script setup>
// import { ref, computed } from 'vue'
// import Select from 'primevue/select'
import { Abstract } from './Abstract.ts'

const props = defineProps({
  label: String,
  value: String,
  options: {
    type: String,
    default: 'label=A,value=A;label=B,value=B;label=C,value=C;label=D,value=D'
  }
})

const inputId = Math.random().toString(36).substring(7)
const selectedValue = ref(props.value)

const items = computed(() => {
  return (new Abstract()).planeDeserialize(props.options)
})
</script>

<template>
  <FloatLabel class="w-full md:w-56" variant="on">
    <Select v-model="selectedValue" :inputId="inputId"  :options="items" optionLabel="label" optionValue="value" placeholder="Select an option" />
    <label :for="inputId">{{ label }}</label>
  </FloatLabel>
</template>
