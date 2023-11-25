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
                                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#creatertaskModal">
                                    <i class="ri-add-line align-bottom me-1"></i> Giao việc
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-3 col-auto">
                            <div class="search-box">
                                <input type="text" class="form-control search" placeholder="Gõ mã số hoặc tiêu đề công việc">
                                <i class="ri-search-line search-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tasks-board mb-3" id="kanbanboard">
                <div class="tasks-list" v-for="(column, index) of kanbanColumn" :key="index" :style="`--color: ${column.color}`">
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
                            <VueDraggableNext :list="newTasks" class="dragArea" :group="{ name: 'timwook' }" @change="log">
                                <div class="card tasks-box" v-for="(data, i) of column.data" :key="i">
                                    <div class="card-body">
                                        <div class="d-flex mb-2">
                                            <h6 class="fs-15 mb-0 flex-grow-1">
                                                #{{ data.code }} {{ data.title }}
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

            <div class="modal fade" id="creatertaskModal" tabindex="-1" aria-labelledby="creatertaskModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content border-0">
                        <div class="modal-header p-3 bg-soft-info">
                            <h5 class="modal-title" id="creatertaskModalLabel">Create New Task</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form action="#">
                                <div class="row g-3">
                                    <div class="col-lg-12">
                                        <label for="projectName" class="form-label">Project Name</label>
                                        <input type="text" class="form-control" id="projectName" placeholder="Enter project name">
                                    </div>
                                    <div class="col-lg-12">
                                        <label for="sub-tasks" class="form-label">Task Title</label>
                                        <input type="text" class="form-control" id="sub-tasks" placeholder="Task title">
                                    </div>
                                    <div class="col-lg-12">
                                        <label for="task-description" class="form-label">Task Description</label>
                                        <textarea class="form-control" id="task-description" rows="3"></textarea>
                                    </div>
                                    <div class="col-lg-12">
                                        <label for="formFile" class="form-label">Tasks Images</label>
                                        <input class="form-control" type="file" id="formFile">
                                    </div>
                                    <div class="col-lg-12">
                                        <label for="tasks-progress" class="form-label">Add Team Member</label>
                                        <div data-simplebar style="height: 95px;">
                                            <ul class="list-unstyled vstack gap-2 mb-0">
                                                <li>
                                                    <div class="form-check d-flex align-items-center">
                                                        <input class="form-check-input me-3" type="checkbox" value="" id="anna-adame">
                                                        <label class="form-check-label d-flex align-items-center" for="anna-adame">
                                                            <span class="flex-shrink-0">
                                                                <img src="@/assets/images/users/avatar-1.jpg" alt="" class="avatar-xxs rounded-circle" />
                                                            </span>
                                                            <span class="flex-grow-1 ms-2">
                                                                Anna Adame
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li> 
                                                <li>
                                                    <div class="form-check d-flex align-items-center">
                                                        <input class="form-check-input me-3" type="checkbox" value="" id="frank-hook">
                                                        <label class="form-check-label d-flex align-items-center" for="frank-hook">
                                                            <span class="flex-shrink-0">
                                                                <img src="@/assets/images/users/avatar-3.jpg" alt="" class="avatar-xxs rounded-circle" />
                                                            </span>
                                                            <span class="flex-grow-1 ms-2">
                                                                Frank Hook
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li> 
                                                <li>
                                                    <div class="form-check d-flex align-items-center">
                                                        <input class="form-check-input me-3" type="checkbox" value="" id="alexis-clarke">
                                                        <label class="form-check-label d-flex align-items-center" for="alexis-clarke">
                                                            <span class="flex-shrink-0">
                                                                <img src="@/assets/images/users/avatar-6.jpg" alt="" class="avatar-xxs rounded-circle" />
                                                            </span>
                                                            <span class="flex-grow-1 ms-2">
                                                                Alexis Clarke
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li> 
                                                <li>
                                                    <div class="form-check d-flex align-items-center">
                                                        <input class="form-check-input me-3" type="checkbox" value="" id="herbert-stokes">
                                                        <label class="form-check-label d-flex align-items-center" for="herbert-stokes">
                                                            <span class="flex-shrink-0">
                                                                <img src="@/assets/images/users/avatar-2.jpg" alt="" class="avatar-xxs rounded-circle" />
                                                            </span>
                                                            <span class="flex-grow-1 ms-2">
                                                                Herbert Stokes
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li> 
                                                <li>
                                                    <div class="form-check d-flex align-items-center">
                                                        <input class="form-check-input me-3" type="checkbox" value="" id="michael-morris">
                                                        <label class="form-check-label d-flex align-items-center" for="michael-morris">
                                                            <span class="flex-shrink-0">
                                                                <img src="@/assets/images/users/avatar-7.jpg" alt="" class="avatar-xxs rounded-circle" />
                                                            </span>
                                                            <span class="flex-grow-1 ms-2">
                                                                Michael Morris
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li> 
                                                <li>
                                                    <div class="form-check d-flex align-items-center">
                                                        <input class="form-check-input me-3" type="checkbox" value="" id="nancy-martino">
                                                        <label class="form-check-label d-flex align-items-center" for="nancy-martino">
                                                            <span class="flex-shrink-0">
                                                                <img src="@/assets/images/users/avatar-5.jpg" alt="" class="avatar-xxs rounded-circle" />
                                                            </span>
                                                            <span class="flex-grow-1 ms-2">
                                                                Nancy Martino
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li> 
                                                <li>
                                                    <div class="form-check d-flex align-items-center">
                                                        <input class="form-check-input me-3" type="checkbox" value="" id="thomas-taylor">
                                                        <label class="form-check-label d-flex align-items-center" for="thomas-taylor">
                                                            <span class="flex-shrink-0">
                                                                <img src="@/assets/images/users/avatar-8.jpg" alt="" class="avatar-xxs rounded-circle" />
                                                            </span>
                                                            <span class="flex-grow-1 ms-2">
                                                                Thomas Taylor
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li> 
                                                <li>
                                                    <div class="form-check d-flex align-items-center">
                                                        <input class="form-check-input me-3" type="checkbox" value="" id="tonya-noble">
                                                        <label class="form-check-label d-flex align-items-center" for="tonya-noble">
                                                            <span class="flex-shrink-0">
                                                                <img src="@/assets/images/users/avatar-10.jpg" alt="" class="avatar-xxs rounded-circle" />
                                                            </span>
                                                            <span class="flex-grow-1 ms-2">
                                                                Tonya Noble
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li> 
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <label for="due-date" class="form-label">Due Date</label>
                                    
                                        <flat-pickr
                            v-model="date1"
                            placeholder="Select date"
                            class="form-control"
                            ></flat-pickr>
                                    </div>
                                    <div class="col-lg-4">
                                        <label for="categories" class="form-label">Tags</label>
                                        <input type="text" class="form-control" id="categories" placeholder="Enter tag">
                                    </div>
                                    <div class="col-lg-4">
                                        <label for="tasks-progress" class="form-label">Tasks Progress</label>
                                        <input type="text" class="form-control" maxlength="3" id="tasks-progress" placeholder="Enter progress">
                                    </div>
                                    <div class="mt-4">
                                        <div class="hstack gap-2 justify-content-end">
                                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-success">Add Task</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
