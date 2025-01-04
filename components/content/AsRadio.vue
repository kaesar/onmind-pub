<script setup>
// import { ref, computed } from 'vue'
// import RadioButton from 'primevue/radiobutton'
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
    <div class="flex flex-wrap gap-4">
      <div v-for="item in items" :key="item.value" class="flex items-center">
        <RadioButton v-model="selectedValue" :inputId="item.value" :name="label" :value="item.value" />
        <label :for="item.value" class="ml-2">{{ item.label }}</label>
      </div>
    </div>
  </div>
</template>
