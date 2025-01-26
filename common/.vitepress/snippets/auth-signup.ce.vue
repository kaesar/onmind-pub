<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AsModal from './AsModal.vue'
import '@vaadin/vertical-layout'
import '@vaadin/text-field'
import '@vaadin/email-field'
import '@vaadin/password-field'
import '@vaadin/button'
import { store } from '../theme/store'

const email = defineModel('email')
const username = defineModel('username')
const password = defineModel('password')
const message = ref('')
const isModalOpen = ref(false)
let keyupEvent

async function signIn() {
    try {
        const user = await store.Userbase.signUp({
          username: username.value,
          password: password.value,
          email: email.value
        })
        console.log('Authenticated:', user)
        location.replace('/index')
    } catch (error) {
        //console.error('Signup-Error:', error.name, error.message, error.username)
        isModalOpen.value = true
        message.value = error.message
    }
}

function onCloseModal(e) {
    e.preventDefault()
    isModalOpen.value = false
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
    <vaadin-email-field :value="email" @input="email = $event.target.value" type="email" placeholder="Email"></vaadin-email-field>
    <vaadin-text-field :value="username" @input="username = $event.target.value" placeholder="User"></vaadin-text-field>
    <vaadin-password-field :value="password" @input="password = $event.target.value" type="password" placeholder="Password"></vaadin-password-field>
<!--     <vaadin-email-field v-model="email" placeholder="Email"></vaadin-email-field>
    <vaadin-text-field v-model="username" placeholder="User"></vaadin-text-field>
    <vaadin-password-field v-model="password" placeholder="Password"></vaadin-password-field>
 -->
    <vaadin-button theme="primary" @click="signIn">Sign up</vaadin-button>
  </vaadin-vertical-layout>

  <AsModal v-if="isModalOpen" :message :onclose="onCloseModal" />
</template>

<style scoped>
vaadin-vertical-layout {
  background-color: snow;
  border-radius: 5px;
  padding: 5px 5px 5px 5px;
  align-items: center;
}
</style>
