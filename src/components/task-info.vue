<script setup>
import { onMounted, defineProps } from 'vue';


const props = defineProps({
    status: String,
});

onMounted(() => {
    
})
</script>

<template>
    <div class="task-info-item">
        <div class="header-info">
            Vẫn active vào sort sau khi ấn F5
        </div>
        <div class="content-info">
            <div class="item">
                <span class="item-title">
                    Kế hoạch
                </span>
                <span class="item-content">
                    Service-health
                </span>
            </div>
            <div class="item">
                <span class="item-title">
                    Đối tượng
                </span>
                <span class="item-content">
                </span>
            </div>
            <div class="item">
                <span class="item-title">
                    Test case
                </span>
                <span class="item-content">
                    Service-health
                </span>
            </div>
            <div class="item">
                <span class="item-title">
                    Người làm
                </span>
                <span class="item-content">
                    Nguyễn Văn A
                </span>
            </div>
            <div class="item">
                <span class="item-title">
                    Tình trạng
                </span>
                <span class="item-content">
                    Đang làm
                </span>
            </div>
            <div class="item-double">
                <div class="item">
                    <span class="item-title">
                        Người giao
                    </span>
                    <span class="item-content">
                        Nguyễn Văn B
                    </span>
                </div>
                <div class="item">
                    <span class="item-title">
                        Người duyệt
                    </span>
                    <span class="item-content">
                        Nguyễn Văn C
                    </span>
                </div>
            </div>
            <div class="item-double">
                <div class="item">
                    <span class="item-title">
                        Ngày bắt đầu
                    </span>
                    <span class="item-content">
                        10/10/2023
                    </span>
                </div>
                <div class="item">
                    <span class="item-title">
                        Deadline
                    </span>
                    <span class="item-content">
                        15/10/2023
                    </span>
                </div>
            </div>
            <div class="item-double">
                <div class="item">
                    <span class="item-title">
                        Ngày tạo
                    </span>
                    <span class="item-content">
                        10/10/2023
                    </span>
                </div>
                <div class="item">
                    <span class="item-title">
                        Ngày sửa
                    </span>
                    <span class="item-content">
                        12/10/2023
                    </span>
                </div>
            </div>
            <div class="item">
                <span class="item-title">
                    Trạng thái
                </span>
                <span class="item-content item-status">
                    <el-popover 
                        popper-class="popper-status" 
                        placement="bottom" 
                        trigger="click"
                    >
                        <template #reference>
                            <span
                                class="button-status"
                                :class="{
                                    statusNew: true
                                }"
                                @click="onClickOutside"
                            >
                                {{ props.status }}
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
                </span>
            </div>
        </div>
    </div>
</template>