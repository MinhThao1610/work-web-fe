<script setup>
import { onMounted, defineProps } from 'vue';
// import account from "@/assets/images/account.jpg";

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
            <span>Chào mừng Thu tới nhà A!</span>
        </div>
        <div class="memner-content">
            <div class="member-avt">
                <!-- <img :src="account" alt="avatar"> -->
                <img src="http://localhost:8080/img/avatar-4.da58328b.jpg" alt="avatar">
                
            </div>
            <div class="member-info">
                <div class="member-name">Nguyễn Minh Thu</div>
                <div class="info-item">
                    <span class="title">Vị trí</span>
                    <span class="value">Intern</span>
                </div>
                <div class="info-item">
                    <span class="title">Team</span>
                    <span class="value">QA</span>
                </div>
                <div class="info-item">
                    <span class="title">Ngày vào</span>
                    <span class="value">10/05/2023</span>
                </div>
            </div>
        </div>
    </div>
</template>