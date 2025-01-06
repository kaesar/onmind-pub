<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AsModal from './AsModal.vue'
import '@vaadin/vertical-layout'
import '@vaadin/horizontal-layout'
import '@vaadin/text-field'
import '@vaadin/button'
import { store } from '../theme/store'

const props = defineProps(['callback'])
const username = defineModel('username')
const message = ref('')
const isModalOpen = ref(false)
let keyupEvent

async function forgot() {
    try {
        const user = await store.Userbase.forgotPassword({
          username: username.value
        })
        //console.log('Usuario remitido:', user)
        isModalOpen.value = true
        message.value = 'Check your email for instructions'
    } catch (error) {
        //console.error('Forgot-Error:', error.name, error.message, error.username)
        isModalOpen.value = true
        message.value = error.message
    }
}

function onCloseModal(e) {
    e.preventDefault()
    isModalOpen.value = false
    props.callback()
}

onMounted(() => {
    keyupEvent = document.addEventListener('keyup', (e) => {
        if (e.keyCode === 27) {
            onCloseModal(e)
        }
    })
})

onUnmounted(() => document.removeEventListener('keyup', keyupEvent))
</script>

<template>
  <vaadin-vertical-layout>
    <vaadin-text-field :value="username" @input="username = $event.target.value" placeholder="User to reset"></vaadin-text-field>
    <!-- <vaadin-text-field v-model="username" placeholder="User to reset"></vaadin-text-field> -->
    <vaadin-horizontal-layout>
      <vaadin-button theme="primary" @click="forgot">Reset</vaadin-button> &nbsp;
      <vaadin-button theme="secondary" @click="onCloseModal">Cancel</vaadin-button>
    </vaadin-horizontal-layout>
  </vaadin-vertical-layout>

  <AsModal v-if="isModalOpen" :message :onclose="onCloseModal" />
</template>

<style scoped>
vaadin-vertical-layout {
  background-color: snow;
  border-radius: 5px;
  align-items: center;
}
</style>