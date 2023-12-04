<script setup>
import { onMounted, defineProps } from 'vue';
import TaskCompany from '../../components/task-company.vue';
// import account from "@/assets/images/account.jpg";

const props = defineProps({
    header: String,
    data: Array,
    avatar: Array,
});

onMounted(() => {
    console.log(props)
})
</script>

<template>
    <div class="workfeed-item grid-item">
        <div class="workfeed-item-header">
            <span>{{ props.header }}</span>
        </div>
        <div class="workfeed-item-content">
            <TaskCompany 
                v-for="item in props.data"
                :key="item"
                :text="item.text" 
                :avatar="item.avatar"
                status="doing"
            />
            <!-- <TaskCompany 
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
            /> -->
        </div>
        <div class="workfeed-item-footer">
            <img 
                v-for="item in props.avatar"
                :key="item.value" 
                :src="item.value" 
                alt="user"
            >
            <!-- <img :src="account" alt="user">
            <img :src="account" alt="user">
            <img :src="account" alt="user">
            <img :src="account" alt="user"> -->
        </div>
    </div>
</template>