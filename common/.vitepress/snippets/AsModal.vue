<script setup>
const props = defineProps(['message', 'onclose'])
</script>

<template>
    <Teleport to="#modal">
        <div class="modal-bg">
            <div class="modal">
                <a class="close-btn" @click="onclose"><strong>x</strong></a>
                {{ message || 'Welcome!' }}<br>
                <button class="ok-btn" @click="onclose">Ok</button>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    position: relative;
    background: white;
    color: dimgray;
    padding: 50px 100px;
    border-radius: 5px;
    box-shadow: 0px 10px 5px 2px rgba(0,0,0,0.1);
}

.modal .close-btn {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
}

.modal .ok-btn {
    width: 80px;
    padding: .2rem 1rem;
    margin-top: 10px;
    margin-right: 10px;
    background: hsl(214, 100%, 48%);
    color: white;
    border-radius: .25rem;
    border-style: none;
    cursor: pointer;
}
</style>
