<script setup>
import { onMounted, defineProps, ref } from 'vue';
import moment from "moment";
import TaskDetail from './taskDetail.vue';

const props = defineProps({
    code: String,
    title: String,
    date: Date,
    status: String,
});

const showTaskDetail = ref(false);

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
        <TaskDetail
            :code="props.code"
            :title="props.title"
            :date="props.date"
            :status="props.status"
            :open="showTaskDetail"
            @close="showTaskDetail = false"
        />
    </div>
</template>