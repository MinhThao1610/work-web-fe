<script setup>
import { onMounted, defineProps } from 'vue';
import account from "@/assets/images/account.jpg";

const props = defineProps({
    header: String,
});

onMounted(() => {
    console.log(props)
})
</script>

<template>
    <div class="member-new">
        <div class="member-header">
            <i class="ri-star-fill"></i>
            <span>Chào mừng A tới nhà Siten!</span>
        </div>
        <div class="memner-content">
            <div class="member-avt">
                <img :src="account" alt="avatar">
            </div>
            <div class="member-info">
                <div class="member-name">Nguyễn Văn A</div>
                <div class="info-item">
                    <span class="title">Vị trí</span>
                    <span class="value">Intern</span>
                </div>
                <div class="info-item">
                    <span class="title">Team</span>
                    <span class="value">Production</span>
                </div>
                <div class="info-item">
                    <span class="title">Ngày vào</span>
                    <span class="value">10/01/2020</span>
                </div>
            </div>
        </div>
    </div>
</template>