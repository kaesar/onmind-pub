<script setup>
import { onMounted } from 'vue'
import { useData, useRoute } from 'vitepress'
//import { useToast } from "primevue/usetoast"

const { frontmatter } = useData()
const route = useRoute()
//const toast = useToast()

function Notify() {
    /*toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `Oops! You don\'t have access to this page [${route.path}]`,
        life: 3500
    })*/
}

onMounted(() => {
    //console.log(frontmatter.value?.outline, theme.value?.outline)
    if (frontmatter.value?.hide === 1 || frontmatter.value?.hide === 2) {
        const containerElement = document.querySelector('.VPDoc')
        if (!!containerElement && !!containerElement.style) {
            containerElement.style.filter = 'blur(5px)'
            containerElement.style.userSelect = 'none'
        }

        try {
            const user = JSON.parse(sessionStorage.getItem('userbaseCurrentSession'))
            if (frontmatter.value?.hide === 2) {
                Notify()
                setTimeout(() => { history.back() }, 4000)
            } else if (user.signedIn) {
                containerElement.style.filter = 'none'
                containerElement.style.userSelect = 'auto'
            }
        } catch (error) {
            Notify()            
            if (frontmatter.value?.hide === 2)
                setTimeout(() => { history.back() }, 4000)
            else
                setTimeout(() => { location.replace('/access') }, 4000)
        }
    }
})
</script>

<template>
</template>
