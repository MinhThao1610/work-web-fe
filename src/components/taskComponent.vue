<script setup>
import { onMounted, defineProps, ref } from 'vue';
import moment from "moment";
import {
  Check,
  Delete,
  Edit,
} from '@element-plus/icons-vue';
import TaskInfo from './task-info.vue';
import TaskExchange from './task-exchange.vue';

const props = defineProps({
    code: String,
    title: String,
    date: Date,
    status: String,
});

const showTaskDetail = ref(false);
const activeName = ref('info')

const handleClick = (tab, event) => {
  console.log(tab, event)
}

const getDate = () => {
    const text = moment(props.date).format("YYYY-MM-DD");
    return text;
};

// const changePopup = () => {
//     showTaskDetail.value = true;
//     console.log('aaaaaaaa')
// }

onMounted(() => {

})
</script>

<template>
    <div class="task-info">
        <div class="task-title" @click="showTaskDetail = true">
            <span>{{ props.code + ' ' }}</span>
            {{ props.title }}
        </div>
        <div class="task-content">
            <div class="task-date">
                <span class="text-group">group</span>
                <span 
                    class="date-deadline"
                    :class="{
                        overtime: true,
                    }"
                >{{ getDate() }}</span>
            </div>
            <div 
                class="task-status"
            >
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
            </div>
        </div>
        <el-drawer
            v-model="showTaskDetail"
            direction="rtl"
            size="40%"
            class="task-info-drawer"
        >
        <template #header="{ titleId, titleClass }">
            <div :id="titleId" :class="titleClass">
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="Chỉnh sửa"
                    placement="bottom"
                    hide-after="100"
                >
                    <el-button type="primary" :icon="Edit" circle />
                </el-tooltip>
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="Hoàn thành"
                    placement="bottom"
                    hide-after="100"
                >
                    <el-button type="success" :icon="Check" circle />
                </el-tooltip>
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="Xóa"
                    placement="bottom"
                    hide-after="100"
                >
                    <el-button type="danger" :icon="Delete" circle />
                </el-tooltip>
            </div>
        </template>
            <div>
                <el-tabs v-model="activeName" class="task-info-tabs" @tab-click="handleClick">
                    <el-tab-pane label="THÔNG TIN" name="info">
                        <TaskInfo :status="props.status" />
                    </el-tab-pane>
                    <el-tab-pane label="MÔ TẢ" name="note">Config</el-tab-pane>
                    <el-tab-pane label="TRAO ĐỔI" name="exchange">
                        <TaskExchange />
                    </el-tab-pane>
                    <el-tab-pane label="CHECKLIST" name="checklist">Task</el-tab-pane>
                    <el-tab-pane label="CHIA SẺ" name="share">Task</el-tab-pane>
                </el-tabs>
            </div>
        </el-drawer>
    </div>
</template>