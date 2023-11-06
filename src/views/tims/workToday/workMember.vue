<script setup>
import { onMounted, defineProps, ref } from 'vue';
import account from "@/assets/images/account.jpg";

const props = defineProps({
    check: Boolean,
});

const listSprint = ref(['1', '2']);
const listTasks = ref(['3', '4']);

onMounted(() => {
    console.log(props)
})
</script>

<template>
    <div class="tim-member-work">
        <div v-if="props.check === true">
            <div class="member-work-header">
                <div class="header-left">
                    <img :src="account" alt="avatar">
                    <span>Nguyễn Văn A</span>
                </div>
                <div class="header-right">
                    <!-- thêm biểu đồ phần trăm -->
                </div>
            </div>
            <div class="member-work-container">
                <div 
                    v-for="sprint in listSprint" 
                    :key="sprint" 
                    class="work-sprint"
                >
                    <div class="name-sprint">
                        <span>Sprint 01</span>
                    </div>
                    <div class="list-tasks">
                        <div 
                            v-for="task in listTasks" 
                            :key="task" 
                            class="task-item"
                        >
                            <div class="task-lable">
                                <span class="task-priority"></span>
                                <span class="task-title">
                                    <strong>#102</strong>
                                    [API] Gửi thông báo khi người dùng gửi yêu cầu duyệt node gia phả
                                </span>
                            </div>
                            <div class="task-status">
                                <el-popover 
                                    popper-class="popper-status" 
                                    placement="bottom" 
                                    trigger="click"
                                >
                                    <template #reference>
                                        <span
                                            :class="{
                                                statusNew: true
                                            }"
                                            @click="onClickOutside"
                                        >
                                            doing
                                        </span>
                                    </template>
                                    <div class="list-status">
                                        <div class="item-status">
                                            <span class="color-status"></span>
                                            <span class="text-status">Doing</span>
                                        </div>
                                        <div class="item-status">
                                            <span class="color-status"></span>
                                            <span class="text-status">Verifying</span>
                                        </div>
                                        <div class="item-status">
                                            <span class="color-status"></span>
                                            <span class="text-status">Blocked</span>
                                        </div>
                                    </div>
                                </el-popover>
                            </div>
                            <div class="task-deadline">
                                <span>10/12/2023</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="member-work-footer">
                <div class="footer-left">
                    <span>Báo cáo</span>
                </div>
                <div class="footer-right">
                    <span class="m-r-10">Hỏi</span>
                    <span>Giao việc</span>
                </div>
            </div>
        </div>
        
        <div v-else>
            <div class="member-not-work member-work-header">
                <div class="header-left">
                    <img :src="account" alt="avatar">
                    <span>Nguyễn Văn A</span>
                </div>
                <div class="header-right button">
                    <span class="m-r-10">Hỏi</span>
                    <span>Giao việc</span>
                </div>
            </div>
        </div>
    </div>
</template>