<script setup>
import { onMounted } from 'vue'
import AuthLogin from './auth-login.ce.vue'
import AuthSignup from './auth-signup.ce.vue';
import '@vaadin/button'
import '@vaadin/icon'
import '@vaadin/vertical-layout'
import '@vaadin/tabs/vaadin-tabs'
import '@vaadin/tabs/vaadin-tab'
import { userbaseAppId } from '../theme/userbase.config'
import { store } from '../theme/store'

const props = defineProps(['title'])
const tab = defineModel('tab')

function handleAction(event) {
  tab.value = event.detail.value
}

function onClose(e) {
  history.back()
}

onMounted(() => {
  setTimeout(() => {
    store.Userbase = window.userbase
    store.Userbase.init({ appId: userbaseAppId })
  }, 500)
})
</script>

<template>
  <vaadin-button theme="secondary" style="cursor: pointer;" @click="onClose">
    x
  </vaadin-button>
  <br>
  <div class="auth-box">
    <vaadin-vertical-layout>
      <h1><strong>{{ props.title }}</strong></h1>
      <vaadin-tabs @selected-changed="handleAction">
          <vaadin-tab>Sign in</vaadin-tab>
          <vaadin-tab>Sign up</vaadin-tab>
      </vaadin-tabs>

      <component :is="tab === 0 ? AuthLogin : AuthSignup"></component>
    </vaadin-vertical-layout>
  </div>
</template>

<style scoped>
.auth-box {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

vaadin-vertical-layout {
  background-color: snow;
  border-radius: 5px;
  padding: 5px 5px 5px 5px;
  width: fit-content;
  align-items: center;
}
</style>
