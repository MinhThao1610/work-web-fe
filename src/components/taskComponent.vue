<script setup>
import { onMounted, defineProps, ref } from 'vue';
import moment from "moment";
import { useStore } from "vuex";
import TaskDetail from './taskDetail.vue';

const props = defineProps({
    code: String,
    title: String,
    date: Date,
    status: String,
    color: String,
    task: {}
});

const store = useStore();
const showTaskDetail = ref(false);
const status = ref('');

const getDate = () => {
    const text = moment(props.date).format("YYYY-MM-DD");
    return text;
};

const changeStatus = (text) => {
    status.value = text;
};

const openDetail = () => {
    store.dispatch('task/setTaskDetail', props.task);
    showTaskDetail.value = true;
}

onMounted(() => {
    status.value = props.status;
})
</script>

<template>
    <div class="task-info">
        <div class="task-title" @click="openDetail">
            <span>{{ props.code + ' ' }}</span>
            {{ props.title }}
        </div>
        <div class="task-content">
            <div class="task-date">
                <span class="text-group">group</span>
                <span 
                    v-if="props.date"
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
                            :style="`background-color: ${props.color}`"
                            @click="onClickOutside"
                        >
                            {{ status }}
                        </span>
                    </template>
                    <div class="list-status">
                        <div class="item-status" @click="changeStatus('Doing')">
                            <span class="color-status" style="background-color: #006cd9"></span>
                            <span class="text-status">Doing</span>
                        </div>
                        <div class="item-status" @click="changeStatus('Verifying')">
                            <span class="color-status" style="background-color: #ff4081"></span>
                            <span class="text-status">Verifying</span>
                        </div>
                        <div class="item-status" @click="changeStatus('Blocked')">
                            <span class="color-status" style="background-color: #ed2438"></span>
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