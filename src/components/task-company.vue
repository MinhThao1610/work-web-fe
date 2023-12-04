<script setup>
import { onMounted, defineProps } from 'vue';
// import userDummy from "@/assets/images/users/user-dummy-img.jpg";

const props = defineProps({
    text: String,
    status: String,
    avatar: String,
});

onMounted(() => {
    console.log(props)
})
</script>

<template>
    <div class="task-company-item">
        <div class="task-company-item-avatar">
            <img :src="props.avatar" alt="user">
        </div>
        <div class="task-company-item-text">
            <span>{{ props.text }}</span>
        </div>
        <div class="task-company-item-status">
            {{ props.status }}
        </div>
    </div>
</template>