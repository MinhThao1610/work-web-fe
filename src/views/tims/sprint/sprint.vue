<script setup>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { computed, onMounted, ref } from "vue";
import { VueDraggableNext } from 'vue-draggable-next';
import TaskDetail from "../../../components/taskDetail.vue";
import { useStore } from "vuex";
import TaskForm from "../../../components/taskForm.vue";

const store = useStore();
const focusButton = ref("tasks");

const mode = ref('create');
const showForm = ref(false);
const showDetail = ref(false);
const formRef = ref();
const input = ref({});

const kanbanColumn = computed(() => [
    {
        title: 'Planned',
        data: store.state.task.tasks.filter(x => x.status === 'new') ?? [],
        color: '#ff8000',
        type: 'new'
    },
    {
        title: 'In Process',
        data: store.state.task.tasks.filter(x => x.status === 'process') ?? [],
        color: '#33cccc',
        type: 'process'
    },
    {
        title: 'Doing',
        data: store.state.task.tasks.filter(x => x.status === 'doing') ?? [],
        color: '#006cd9',
        type: 'doing'
    },
    {
        title: 'Done',
        data: store.state.task.tasks.filter(x => x.status === 'done') ?? [],
        color: '#0bb251',
        type: 'done'
    },
    {
        title: 'Blocking',
        data: store.state.task.tasks.filter(x => x.status === 'block') ?? [],
        color: '#ed2438',
        type: 'block'
    },
    {
        title: 'Verifying',
        data: store.state.task.tasks.filter(x => x.status === 'verifying') ?? [],
        color: '#ff4081',
        type: 'verifying'
    },
    {
        title: 'Cancelled',
        data: store.state.task.tasks.filter(x => x.status === 'cancel') ?? [],
        color: '#dedede',
        type: 'cancel'
    }
])

const changeFocusButton = (text) => {
    focusButton.value = text;
};
const addTask = () => {
    input.value = {};
    if (formRef.value) formRef.value.resetFields();
    showForm.value = true;
}
const openDetail = (data) => {
    store.dispatch('task/setTaskDetail', data);
    showDetail.value = true;
}

onMounted(() => {
    store.dispatch('task/fetchTasks');
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
                            <VueDraggableNext :list="newTasks" class="dragArea" :group="{ name: 'tasks' }">
                                <div class="card tasks-box" v-for="(data, i) of column.data" :key="i" @click="openDetail(data)">
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

            <TaskForm
                :mode="mode"
                :open="showForm"
                @close="showForm = false"
            />

            <TaskDetail
                :open="showDetail"
                @close="showDetail = false"
            />
        </div>
    </Layout>
</template>
