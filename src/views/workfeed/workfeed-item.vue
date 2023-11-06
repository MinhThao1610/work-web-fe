<script setup>
import { onMounted, defineProps } from 'vue';
import TaskCompany from '../../components/task-company.vue';
import account from "@/assets/images/account.jpg";

const props = defineProps({
    header: String,
});

onMounted(() => {
    console.log(props)
})
</script>

<template>
    <div class="workfeed-item">
        <div class="workfeed-item-header">
            <span>{{ props.header }}</span>
        </div>
        <div class="workfeed-item-content">
            <TaskCompany 
                text="[Điểm đến an toàn]/[Duyệt/Cập nhật] Chưa check trùng trường hợp trùng tên và địa chỉ" 
                status="doing"
            />
            <TaskCompany 
                text="[Điểm đến an toàn]/[Duyệt/Cập nhật] Chưa check trùng trường hợp trùng tên và địa chỉ" 
                status="doing"
            />
            <TaskCompany 
                text="[Điểm đến an toàn]/[Duyệt/Cập nhật] Chưa check trùng trường hợp trùng tên và địa chỉ" 
                status="doing"
            />
            <TaskCompany 
                text="[Điểm đến an toàn]/[Duyệt/Cập nhật] Chưa check trùng trường hợp trùng tên và địa chỉ" 
                status="doing"
            />
        </div>
        <div class="workfeed-item-footer">
            <img :src="account" alt="user">
            <img :src="account" alt="user">
            <img :src="account" alt="user">
            <img :src="account" alt="user">
            <img :src="account" alt="user">
        </div>
    </div>
</template>