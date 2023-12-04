<script setup>
import { onMounted, defineProps } from 'vue';
import account from "@/assets/images/account.jpg";

const props = defineProps({
    name: String,
    address: String,
    url: String,
    postion: String,
    email: String,
    phone: String,
});

onMounted(() => {
    console.log(props)
})
</script>

<template>
    <div class="member-info-component grid-item">
        <img :src="props.url ?? account" alt="avatar">
        <div class="member-info">
            <span class="name">{{ props.name }}</span>
            <span class="text-italic">{{ props.postion }}</span>
            <span class="text">{{ props.email }}</span>
            <span class="text">{{ props.phone }}</span>
            <span class="text">{{ props.address }}</span>
        </div>
    </div>
</template>