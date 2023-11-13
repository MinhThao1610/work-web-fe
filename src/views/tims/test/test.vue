<script setup>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

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
const testplans = ref([
    { title: "CP" },
    { title: "Agent" },
    { title: "Agent" },
    { title: "Agent" },
    { title: "Agent" },
    { title: "Agent" },
    { title: "Agent" },
    { title: "Agent" },
    { title: "Agent" },
    { title: "Agent" },
    { title: "Agent" },
    { title: "Agent" },
    { title: "Agent" },
    { title: "Agent" },
])

const changeFocusButton = (text) => {
    focusButton.value = text;
};

onMounted(() => {
    console.log("route", route.query);
});
</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items" type="tim" :focusButton="focusButton"
            @changeFocusButton="changeFocusButton" />
        <div class="row">
            <div id="tim-testplan">
                <div class="toolbar mb-4">
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createTestplanModal">Tạo kế hoạch test</button>
                </div>
                <div class="testplans">
                    <h2 v-if="testplans.length === 0">Hãy tạo kế hoạch test đầu tiên của bạn.</h2>
                    <router-link v-for="(testplan, index) in testplans" class="testplan bg-white border-primary p-3" :key="index" to="/tim/test/testplan">
                        <div class="header mb-2 d-flex justify-content-between align-items-center">
                            <h4 class="title mb-0">{{ testplan.title }}</h4>
                            <button style="background: transparent; border: 0;" @click="showProjectDetail = true">
                                <i class="las la-info-circle" style="font-size: 24px;"></i>
                            </button>
                        </div>
                        <div class="testplan-info">
                            <div class="quicklink d-flex justify-content-end gap-1">
                                <button class="btn btn-outline-primary btn-sm">Bugs</button>
                                <button class="btn btn-outline-primary btn-sm">Testcases</button>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <el-drawer v-model="showProjectDetail" direction="rtl" size="40%">
            <template #header="{ titleId, titleClass }">
                <div :id="titleId" :class="titleClass">
                    Header
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

        <div class="modal fade" id="createTestplanModal" tabindex="-1" aria-labelledby="createTestplanModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0">
                    <div class="modal-header p-3 bg-soft-info">
                        <h5 class="modal-title" id="createTestplanModal">Add Testplan</h5>
                        <button type="button" class="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form action="#">
                            <div class="row">
                                <div class="col-lg-12">
                                    <label for="testplanName" class="form-label">Testplan Name</label>
                                    <input type="text" class="form-control" id="testplanName" placeholder="Enter testplan name">
                                </div>
                                <div class="mt-4">
                                    <div class="hstack gap-2 justify-content-end">
                                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-success" id="addNewTestplan">Add Testplan</button>
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
