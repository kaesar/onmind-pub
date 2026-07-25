import './site.css'
import DefaultTheme from 'vitepress/theme-without-fonts'
import Layout from './Layout.vue'

import AsAccess from '../snippets/AsAccess.vue'
import AsCover from '../snippets/AsCover.vue'

/** @type {import('vitepress').Theme} */
export default {
    Layout,
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('AsAccess', AsAccess)
        app.component('AsCover', AsCover)
    }
}
