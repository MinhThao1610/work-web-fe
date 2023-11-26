<script setup>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { VueDraggableNext } from 'vue-draggable-next';
import {
    newTasksData,
    processTasksData,
    doingTasksData,
    doneTasksData,
    blockingTasksData,
    verifyingTasksData,
    cancelTasksData
} from "./mockdata";

const focusButton = ref("tasks");
const route = useRoute();

const showForm = ref(false);
const formRef = ref();
const input = ref({});
const rules = ref({
    title: [
        { required: true, message: 'Bắt buộc nhập tên việc', trigger: 'change' },
    ],
    priority: [
        { required: true, message: 'Bắt buộc chọn mức độ ưu tiên', trigger: 'change' },
    ],
    startDate: [
        { type: 'date', required: true, message: 'Bắt buộc chọn ngày bắt đầu', trigger: 'change' }
    ],
    deadline: [
        { type: 'date', message: 'Bắt buộc chọn deadline', trigger: 'change' }
    ],
    owner_id: [
        { required: true, message: 'Bắt buộc chọn người làm', trigger: 'change' },
    ],
    verifier_id: [
        { required: true, message: 'Bắt buộc chọn người duyệt', trigger: 'change' },
    ],
});
const options = ref([
    { id: 1, name: 'Nghiêm trọng' },
    { id: 2, name: 'Cao' },
    { id: 3, name: 'Trung bình' },
    { id: 4, name: 'Thấp' },
]);
const employees = ref([
    { id: 1, name: 'thuntm' },
    { id: 2, name: 'minhlq' },
]);

const newTasks = ref(newTasksData);
const processTasks = ref(processTasksData);
const doingTasks = ref(doingTasksData);
const doneTasks = ref(doneTasksData);
const blockingTasks = ref(blockingTasksData);
const verifyingTasks = ref(verifyingTasksData);
const cancelTasks = ref(cancelTasksData);

const kanbanColumn = ref([
    {
        title: 'Planned',
        data: newTasks,
        color: '#ff8000',
        type: 'new'
    },
    {
        title: 'In Process',
        data: processTasks,
        color: '#33cccc',
        type: 'process'
    },
    {
        title: 'Doing',
        data: doingTasks,
        color: '#006cd9',
        type: 'doing'
    },
    {
        title: 'Done',
        data: doneTasks,
        color: '#0bb251',
        type: 'done'
    },
    {
        title: 'Blocking',
        data: blockingTasks,
        color: '#ed2438',
        type: 'block'
    },
    {
        title: 'Verifying',
        data: verifyingTasks,
        color: '#ff4081',
        type: 'verifying'
    },
    {
        title: 'Cancelled',
        data: cancelTasks,
        color: '#dedede',
        type: 'cancel'
    }
])

const changeFocusButton = (text) => {
    focusButton.value = text;
};
const log = (event) => {
    console.log(event)
}
const addTask = () => {
    showForm.value = true;
}

const onSubmit = () => {
    formRef.value.validate((formValidated, fields) => {
        console.log('form validated', input.value);
        console.log('form validated', formValidated);
        console.log('form validated', fields);
    })
};

onMounted(() => {
    console.log("route", route.query);
});
</script>

<template>
    <Layout>
        <PageHeader type="tim" :focusButton="focusButton" @changeFocusButton="changeFocusButton" />
        <div id="tim-task">
            <div class="card">
                <div class="card-body">
                    <div class="row g-2">
                        <div class="col-lg-auto">
                            <div class="hstack gap-2">
                                <button class="btn btn-primary" @click="addTask">
                                    <i class="ri-add-line align-bottom me-1"></i> Giao việc
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-3 col-auto">
                            <div class="search-box">
                                <input type="text" class="form-control search"
                                    placeholder="Gõ mã số hoặc tiêu đề công việc">
                                <i class="ri-search-line search-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tasks-board mb-3" id="kanbanboard">
                <div class="tasks-list" v-for="(column, index) of kanbanColumn" :key="index"
                    :style="`--color: ${column.color};`">
                    <div class="d-flex mb-3">
                        <div class="flex-grow-1">
                            <h6 class="fs-14 text-uppercase fw-semibold mb-0">
                                {{ column.title }}
                                <small class="badge align-bottom ms-1">{{ column.data.length }}</small>
                            </h6>
                        </div>
                    </div>
                    <div data-simplebar class="tasks-wrapper px-3 mx-n3">
                        <div :id="`${column.type}-task`" class="tasks">
                            <VueDraggableNext :list="newTasks" class="dragArea" :group="{ name: 'tasks' }" @change="log">
                                <div class="card tasks-box" v-for="(data, i) of column.data" :key="i">
                                    <div class="card-body">
                                        <div class="d-flex mb-2">
                                            <h6 class="fs-15 mb-0 flex-grow-1">
                                                <b :style="`color: ${data.priorityId.color}`">#{{ data.code }}</b> {{ data.title }}
                                            </h6>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <div class="flex-grow-1"></div>
                                            <div class="flex-shrink-0">
                                                <p class="text-muted">{{ data.ownerId.name }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </VueDraggableNext>
                        </div>
                    </div>
                </div>
            </div>

            <el-drawer v-model="showForm" direction="rtl" size="40%">
                <template #header="{ titleId, titleClass }">
                    <div :id="titleId" :class="titleClass">
                        Tạo công việc mới
                    </div>
                </template>
                <el-form label-position="top" require-asterisk-position="right" :model="input" :rules="rules" ref="formRef">
                    <el-form-item class="mb-4" label="Tên việc" prop="title">
                        <el-input v-model="input.title" placeholder="Tên việc" />
                    </el-form-item>
                    <el-form-item class="mb-4" label="Mức độ ưu tiên" prop="priority">
                        <el-select v-model="input.priority" placeholder="Mức độ ưu tiên" class="w-100">
                            <el-option 
                                v-for="item in options" 
                                :key="item.id" 
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="mb-4" label="Ngày bắt đầu" prop="startDate">
                        <el-date-picker class="w-100" v-model="input.startDate" type="date" placeholder="Ngày bắt đầu"
                            size="large" format="DD/MM/YYYY" />
                    </el-form-item>
                    <el-form-item class="mb-4" label="Deadline" prop="deadline">
                        <el-date-picker class="w-100" v-model="input.deadline" type="date" placeholder="Deadline"
                            size="large" format="DD/MM/YYYY" />
                    </el-form-item>
                    <el-form-item class="mb-4" label="Người làm" prop="owner_id">
                        <el-select v-model="input.owner_id" placeholder="Người làm" class="w-100">
                            <el-option 
                                v-for="item in employees" 
                                :key="item.id" 
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="mb-4" label="Người duyệt" prop="verifier_id">
                        <el-select v-model="input.verifier_id" placeholder="Người duyệt" class="w-100">
                            <el-option 
                                v-for="item in employees" 
                                :key="item.id" 
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-success w-25" type="button" @click="onSubmit">Lưu</button>
                    </div>
                </el-form>
            </el-drawer>
        </div>
    </Layout>
</template>
