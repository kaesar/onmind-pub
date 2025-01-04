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

const selectedValue = ref(props.value)

const items = computed(() => {
  return (new Abstract()).planeDeserialize(props.options)
})
</script>

<template>
  <div>
    <!-- <label>{{ label }}</label> -->
    <Select v-model="selectedValue" :options="items" optionLabel="label" optionValue="value" placeholder="Select an option" class="w-full md:w-56" />
  </div>
</template>
