<script setup>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";

const title = ref("Widgets");
const items = ref([
    {
        text: "Velzon",
        href: "/",
    },
    {
        text: "Widgets",
        active: true,
    },
]);
const focusButton = ref("today");
const route = useRoute();

const showProjectDetail = ref(false);
const projects = ref([
    { title: "CP", startDate: new Date(), endDate: new Date(), status: 'new', progress: 25 },
    { title: "Agent", startDate: new Date(), endDate: new Date(), status: 'new', progress: 48 },
    { title: "Agent", startDate: new Date(), endDate: new Date(), status: 'new', progress: 35 },
    { title: "Agent", startDate: new Date(), endDate: new Date(), status: 'new', progress: 100 },
    { title: "Agent", startDate: new Date(), endDate: new Date(), status: 'new', progress: 11 },
    { title: "Agent", startDate: new Date(), endDate: new Date(), status: 'new', progress: 48 },
    { title: "Agent", startDate: new Date(), endDate: new Date(), status: 'new', progress: 85 },
    { title: "Agent", startDate: new Date(), endDate: new Date(), status: 'new', progress: 76 },
    { title: "Agent", startDate: new Date(), endDate: new Date(), status: 'new', progress: 48 },
    { title: "Agent", startDate: new Date(), endDate: new Date(), status: 'new', progress: 90 },
    { title: "Agent", startDate: new Date(), endDate: new Date(), status: 'new', progress: 48 },
    { title: "Agent", startDate: new Date(), endDate: new Date(), status: 'new', progress: 92 },
    { title: "Agent", startDate: new Date(), endDate: new Date(), status: 'new', progress: 50 },
    { title: "Agent", startDate: new Date(), endDate: new Date(), status: 'new', progress: 48 },
]);
const projectDetail = ref({
    id: 'Agent',
    title: 'Agent',
    startDate: new Date(),
    endDate: new Date(),
    status: 'new',
    description: 'Agent',
    progress: 'Agent',
    type: 'Agent',
    leader: 'Agent',
    leader_id: 'Agent',
    tim: 'Agent',
    tim_id: 'Agent',
    createAt: new Date(),
    updateAt: new Date(),
    tasks: 'Agent',
    testObjects: 'Agent',
    testcases: 'Agent',
})

const changeFocusButton = (text) => {
    focusButton.value = text;
};

const openDetail = (e) => {
    e.preventDefault();
    showProjectDetail.value = true;
}

onMounted(() => {
    console.log("route", route.query);
});
</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items" type="tim" :focusButton="focusButton"
            @changeFocusButton="changeFocusButton" />
        <div class="row">
            <div id="tim-project">
                <div class="toolbar mb-4">
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createSprintModal">Tạo sprint</button>
                </div>
                <div class="projects">
                    <h2 v-if="projects.length === 0">Hãy tạo sprint đầu tiên của bạn.</h2>
                    <router-link v-for="(project, index) in projects" class="project bg-white border-primary p-3" :key="index" to="/tim/project/sprint">
                        <div class="header mb-2 d-flex justify-content-between align-items-center">
                            <h4 class="title mb-0">{{ project.title }}</h4>
                            <button style="background: transparent; border: 0;" @click="openDetail($event)">
                                <i class="las la-info-circle" style="font-size: 24px;"></i>
                            </button>
                        </div>
                        <div class="project-info">
                            <div class="content">
                                <p class="mb-1">Ngày bắt đầu: <b>{{ moment(new
                                    Date(project.startDate)).format("DD/MMM/YYYY") }}</b> </p>
                                <p class="mb-1">Ngày kết thúc: <b>{{ moment(new Date(project.endDate)).format("DD/MMM/YYYY")
                                }}</b> </p>
                                <p class="mb-1">Trạng thái: <span class="tag">{{ project.status }}</span> </p>
                            </div>
                            <div class="quicklink d-flex flex-column gap-1">
                                <button class="btn btn-outline-primary btn-sm" @click="router.push('/tim/project/sprint')">Công việc</button>
                                <button class="btn btn-outline-primary btn-sm" @click="router.push('/tim/project/sprint')">Kế hoạch</button>
                            </div>
                        </div>

                        <div class="progressbar" :style="`width: ${project.progress}%`"></div>
                    </router-link>
                </div>
            </div>
        </div>

        <el-drawer v-model="showProjectDetail" direction="rtl" size="40%">
            <template #header="{ titleId, titleClass }">
                <div :id="titleId" :class="titleClass">
                    {{ projectDetail.title }}
                </div>
            </template>
            <div class="d-flex mb-2">
                <span class="label" style="width:120px;">Người phụ trách:</span>
                <b class="value">Nguyễn Hòa</b>
            </div>
            <div class="d-flex">
                <div class="d-flex mb-2 w-50">
                    <span class="label" style="width:120px;">Tổng số:</span>
                    <b class="value">7</b>
                </div>
                <div class="d-flex mb-2 w-50">
                    <span class="label" style="width:120px;">Hoàn thành:</span>
                    <b class="value">0</b>
                </div>
            </div>
            <div class="d-flex">
                <div class="d-flex mb-2 w-50">
                    <span class="label" style="width:120px;">Ngày bắt đầu:</span>
                    <b class="value">09/Nov/2023</b>
                </div>
                <div class="d-flex mb-2 w-50">
                    <span class="label" style="width:120px;">Ngày kết thúc:</span>
                    <b class="value">09/Nov/2023</b>
                </div>
            </div>
            <div class="d-flex mb-2">
                <span class="label" style="width:120px;">Status:</span>
                <span class="tag m-0">new</span>
            </div>
            <div class="d-flex">
                <span class="w-25">@Post: Nguyễn Hòa</span>
                <span class="w-25">@Date: 13/05/2022</span>
            </div>
        </el-drawer>

        <div class="modal fade" id="createSprintModal" tabindex="-1" aria-labelledby="createSprintModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0">
                    <div class="modal-header p-3 bg-soft-info">
                        <h5 class="modal-title" id="createSprintModalLabel">Add Sprint</h5>
                        <button type="button" class="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form action="#">
                            <div class="row">
                                <div class="col-lg-12">
                                    <label for="sprintName" class="form-label">Sprint Name</label>
                                    <input type="text" class="form-control" id="sprintName" placeholder="Enter sprint name">
                                </div>
                                <div class="mt-4">
                                    <div class="hstack gap-2 justify-content-end">
                                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-success" id="addNewSprint">Add Sprint</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
