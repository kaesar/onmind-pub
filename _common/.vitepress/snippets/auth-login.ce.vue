<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AuthForgot from './auth-forgot.ce.vue';
import AsModal from './AsModal.vue'
import '@vaadin/vertical-layout'
import '@vaadin/text-field'
import '@vaadin/password-field'
import '@vaadin/button'
import { store } from '../theme/store'

const username = defineModel('username')
const password = defineModel('password')
const message = ref('')
const isModalOpen = ref(false)
const isForgotMode = ref(false)
const forgot = 'Forgot your password?';
let keyupEvent

async function signIn() {
    try {
        const user = await store.Userbase.signIn({
          username: username.value,
          password: password.value
        })
        console.log('Authenticated:',  user.username, user)
        location.replace('/index')
    } catch (error) {
        if (error.name === 'UserAlreadySignedIn') {
          const user = JSON.parse(sessionStorage.getItem('userbaseCurrentSession'))
          console.log('Authenticated:',  user.username, user)
          location.replace('/index')
        } else {
          //console.error('Login-Error:', error.name, error.message, error.username)
          isModalOpen.value = true
          message.value = error.message
        }
    }
}

function forgotCallback() {
    isForgotMode.value = !isForgotMode.value
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
  <vaadin-vertical-layout v-if="!isForgotMode">
    <vaadin-text-field :value="username" @input="username = $event.target.value" placeholder="User"></vaadin-text-field>
    <vaadin-password-field :value="password" @input="password = $event.target.value" type="password" placeholder="Password"></vaadin-password-field>
<!--     <vaadin-text-field v-model="username" placeholder="User"></vaadin-text-field>
    <vaadin-password-field v-model="password" placeholder="Password"></vaadin-password-field>
-->
    <vaadin-button theme="primary" @click="signIn">Login</vaadin-button>    
  </vaadin-vertical-layout>

  <span v-if="!isForgotMode"><small><a @click="isForgotMode = !isForgotMode">{{forgot}}</a></small></span>

  <auth-forgot v-if="isForgotMode" :callback="forgotCallback"></auth-forgot>
  <AsModal v-if="isModalOpen" :message :onclose="onCloseModal" />
</template>

<style scoped>
vaadin-vertical-layout {
  background-color: snow;
  border-radius: 5px;
  padding: 5px 5px 5px 5px;
  align-items: center;
}

a {
  cursor: pointer;
  color: #22a2c9;
}
</style>
