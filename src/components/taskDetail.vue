<script setup>
import { onMounted, defineProps, ref, computed, defineEmits } from 'vue';
import {
    Check,
    Delete,
    Edit,
} from '@element-plus/icons-vue';
import TaskInfo from './task-info.vue';
import TaskExchange from './task-exchange.vue';
import { useStore } from "vuex";
import TaskForm from './taskForm.vue';
import { ElMessageBox, ElMessage } from 'element-plus';

const store = useStore();
const task = computed(() => store.state.task.detail)

const props = defineProps({
    open: Boolean
});
const emit = defineEmits(['close'])

const showForm = ref(false);
const activeName = ref('info');
const openDrawer = computed(() => props.open);

const newChecklist = ref('');

const doneTask = () => {
    store.dispatch('task/editTask', {
        id: task.value.id,
        status: 'done',
        color: "#0bb251"
    });
}
const deleteTask = () => {
    ElMessageBox.confirm('Bạn có muốn xóa công việc này?')
        .then(() => {
            store.dispatch('task/deleteTask', task.value.id);
            ElMessage({
                message: 'Xóa công việc thành công',
                type: 'success',
            });
        });
}

onMounted(() => {
})
</script>

<template>
    <el-drawer v-model="openDrawer" direction="rtl" size="40%" class="task-info-drawer" @closed="emit('close')">
        <template #header="{ titleId, titleClass }">
            <div :id="titleId" :class="titleClass">
                <el-tooltip class="box-item" effect="dark" content="Chỉnh sửa" placement="bottom" hide-after="100">
                    <el-button type="primary" :icon="Edit" circle @click="showForm = true" />
                </el-tooltip>
                <el-tooltip class="box-item" effect="dark" content="Hoàn thành" placement="bottom" hide-after="100">
                    <el-button type="success" :icon="Check" circle @click="doneTask" />
                </el-tooltip>
                <el-tooltip class="box-item" effect="dark" content="Xóa" placement="bottom" hide-after="100">
                    <el-button type="danger" :icon="Delete" circle @click="deleteTask" />
                </el-tooltip>
            </div>
        </template>
        <div>
            <el-tabs v-model="activeName" class="task-info-tabs">
                <el-tab-pane label="THÔNG TIN" name="info">
                    <TaskInfo />
                </el-tab-pane>
                <el-tab-pane label="MÔ TẢ" name="note">
                    {{ task.description }}
                </el-tab-pane>
                <el-tab-pane label="TRAO ĐỔI" name="exchange">
                    <TaskExchange />
                </el-tab-pane>
                <el-tab-pane label="CHECKLIST" name="checklist">
                    <el-input placeholder="Thêm checklist" v-model="newChecklist" class="mb-2"></el-input>
                    <ul class="list-group list-group-flush border-dashed px-3 task-checklist">
                        <li class="list-group-item ps-0" v-for="(item, index) in task.checklistes" :key="index">
                            <div class="d-flex align-items-center">
                                <div class="ps-0 flex-sharink-0">
                                    <el-checkbox class="m-0" v-model="checked" :id="`${item.id}`" :disabled="item.edit"></el-checkbox>
                                </div>
                                <div class="flex-grow-1">
                                    <label v-if="!item.edit" class="form-check-label mb-0 ps-2" :for="`${item.id}`">{{ item.content }}</label>
                                    <el-input v-if="item.edit" v-model="item.content" class="mb-0 ps-2"></el-input>
                                </div>
                                <div class="flex-shrink-0 ms-2">
                                    <button class="btn btn-outline-warning me-2" @click="item.edit = !item.edit">
                                        <i class="ri-edit-2-line align-bottom"></i>
                                    </button>
                                    <button class="btn btn-outline-danger">
                                        <i class="ri-delete-bin-5-line align-bottom"></i>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </el-tab-pane>
                <!-- <el-tab-pane label="CHIA SẺ" name="share">
                    Task
                </el-tab-pane> -->
            </el-tabs>
        </div>
    </el-drawer>

    <TaskForm
        mode="edit"
        :open="showForm"
        @close="showForm = false"
    />
</template>