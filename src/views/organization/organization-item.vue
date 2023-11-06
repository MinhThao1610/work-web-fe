<script setup>
import { onMounted, defineProps, ref } from 'vue';
import account from "@/assets/images/account.jpg";

const props = defineProps({
    header: String,
    intro: String,
    timLead: String,
    email: String,
    phone: String,
});
const showTimDetail = ref(false);

onMounted(() => {
    console.log(props)
})
</script>

<template>
    <div class="organization-item">
        <div class="organization-item-header">
            <el-button
                text
                @click="showTimDetail = true"
            >
                {{ props.header }}
            </el-button>
        </div>
        <div class="organization-item-content">
            <div class="item-left">
                <img :src="account" alt="avt">
            </div>
            <div class="item-right">
                <p class="item-intro">
                    {{ props.intro }}
                </p>
                <div class="item-contact">
                    <div class="contact-info">
                        <span class="info-title">timLead: </span>
                        <span>{{ props.timLead }}</span>
                    </div>
                    <div class="contact-info">
                        <span class="info-title">Email: </span>
                        <span>{{ props.email }}</span>
                    </div>
                    <div class="contact-info">
                        <span class="info-title">Điện thoại: </span>
                        <span>{{ props.phone }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="organization-item-footer">
            <div class="count-member">5+</div>
            <div class="avatar-merber">
                <img :src="account" alt="avt">
                <img :src="account" alt="avt">
                <img :src="account" alt="avt">
                <img :src="account" alt="avt">
                <img :src="account" alt="avt">
            </div>
        </div>
        <el-drawer
            v-model="showTimDetail"
            direction="rtl"
            size="40%"
            class="task-info-drawer"
            title="Giới thiệu tim"
        >
            <div>
                aaaa
            </div>
        </el-drawer>
    </div>
</template>