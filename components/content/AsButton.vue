<script setup>
const props = defineProps(['label', 'link', 'message', 'theme', 'millis'])
const toast = useToast()

function handleButton () {
    //console.log(props.link || props.message)
    if (!!props.link)
        location.assign(props.link)
    else if (!!props.message)
        toast.add({
            severity: 'info',
            summary: 'Info',
            detail: props.message || 'Oops!',
            life: 3500
        })
}
</script>

<template>
    <Toast />
    <Button :label="label" severity="info" @click="handleButton" />
</template>
