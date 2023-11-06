<script setup>
import { onMounted, defineProps } from 'vue';

const props = defineProps({
    header: String,
    address: String,
});

onMounted(() => {
    console.log(props)
})
</script>

<template>
    <div class="member-info-component">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8dAnxssXwRztTJRaP7KAyiyB0COfDnnglzq96-zhVmZO079vcU-y-OqooATU-vwTcKXU&usqp=CAU" alt="avatar">
        <div class="member-info">
            <span class="name">Nguyễn Văn A</span>
            <span class="text-italic">intern | Production</span>
            <span class="text">nnguyendinhlamm@gmail.com</span>
            <span class="text">0942034838</span>
            <span class="text">{{ props.address }}</span>
        </div>
    </div>
</template>