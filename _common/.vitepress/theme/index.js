//import { defineCustomElement } from 'vue'
import './site.css'
import DefaultTheme from 'vitepress/theme-without-fonts'
import Layout from './Layout.vue'
//import './my-element.js'

import AsAccess from '../snippets/AsAccess.vue'
import AsModal from '../snippets/AsModal.vue'
import AsCover from '../snippets/AsCover.vue'
import AsIndex from '../snippets/AsIndex.vue'
//import AsButton from '../snippets/AsButton.vue'
//import AuthBox from '../snippets/auth-box.ce.vue'
//import AuthForgot from '../snippets/auth-forgot.ce.vue'
//import AuthLogin from '../snippets/auth-login.ce.vue'
//import AuthSignup from '../snippets/auth-signup.ce.vue'

//customElements.define('auth-box', defineCustomElement(AuthBox))
//customElements.define('auth-forgot', defineCustomElement(AuthForgot))
//customElements.define('auth-login', defineCustomElement(AuthLogin))
//customElements.define('auth-signup', defineCustomElement(AuthSignup))

/** @type {import('vitepress').Theme} */
export default {
    Layout,
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('AsAccess', AsAccess)
        app.component('AsModal', AsModal)
        app.component('AsCover', AsCover)
        app.component('AsIndex', AsIndex)
        //app.component('AsButton', AsButton)
        //app.component('AuthBox', AuthBox)
        //app.component('AuthForgot', AuthForgot)
        //app.component('AuthLogin', AuthLogin)
        //app.component('AuthSignup', AuthSignup)

        //import('../../public/my-element.js')
    }
}
