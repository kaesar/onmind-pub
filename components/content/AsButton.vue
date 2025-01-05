<script setup>
// import { useRouter } from 'vue-router'

const props = defineProps(['label', 'link', 'message', 'theme', 'millis'])
const toast = useToast()
const router = useRouter()

const navigateToItem = () => {
    if (props.link?.startsWith('http'))
        window.open(props.link, '_blank');
    else
        router.push(props.link);  // location.assign(props.link)
}

function handleButton () {
    console.log(props.link || props.url)
    if (!!props.link)
        navigateToItem();
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
