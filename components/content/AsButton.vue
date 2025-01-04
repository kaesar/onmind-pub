<script setup>
// import { useRouter } from 'vue-router'

const props = defineProps(['label', 'link', 'message', 'theme', 'millis'])
const toast = useToast()
const router = useRouter()

const navigateToItem = () => {
  router.push(props.link)
}

function handleButton () {
    //console.log(props.link || props.message)
    if (!!props.link)
        navigateToItem();  // location.assign(props.link)
    else if (!!props.message)
        toast.add({
            severity: 'info',
            summary: 'Info',
            detail: props.message || 'Oops!',
            life: 3500
        });
}
</script>

<template>
    <Toast />
    <Button severity="info" :label="label" @click="handleButton" />
</template>
