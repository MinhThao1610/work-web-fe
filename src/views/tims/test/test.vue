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

const showTestDetail = ref(false);
const showTestCreate = ref(false);
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
const testplanDetail = ref({
  id: 1,
  title: 'Test plan CP',
  description: 'Test plan CP',
  creatorId: { name: 'Anna Adame' },
  creator_id: 1,
  sprintId: {},
  sprint_id: 1,
  files: [],
  createAt: new Date(),
  tasks: [],
  testcases: []
})
const input = ref({})

const changeFocusButton = (text) => {
    focusButton.value = text;
};

const openDetail = (e) => {
    e.preventDefault();
    showTestDetail.value = true;
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
            <div id="tim-testplan">
                <div class="toolbar mb-4">
                    <button class="btn btn-primary" @click="showTestCreate = true">Tạo kế hoạch test</button>
                </div>
                <div class="testplans">
                    <h2 v-if="testplans.length === 0">Hãy tạo kế hoạch test đầu tiên của bạn.</h2>
                    <router-link v-for="(testplan, index) in testplans" class="testplan bg-white border-primary p-3" :key="index" to="/tim/test/testplan">
                        <div class="header mb-2 d-flex justify-content-between align-items-center">
                            <h4 class="title mb-0">{{ testplan.title }}</h4>
                            <button style="background: transparent; border: 0;" @click="openDetail($event)">
                                <i class="las la-info-circle" style="font-size: 24px;"></i>
                            </button>
                        </div>
                        <div class="testplan-info">
                            <div class="quicklink d-flex justify-content-end gap-1">
                                <button class="btn btn-outline-primary btn-sm" @click="router.push('/tim/test/testplan')">Bugs</button>
                                <button class="btn btn-outline-primary btn-sm" @click="router.push('/tim/test/testplan')">Testcases</button>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <el-drawer v-model="showTestDetail" direction="rtl" size="40%">
            <template #header="{ titleId, titleClass }">
                <div :id="titleId" :class="titleClass">
                    {{ testplanDetail.title }}
                </div>
            </template>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary" @click="showTestCreate = true; showTestDetail = false;">Cập nhật</button>
            </div>
            <div class="d-flex mb-2">
                <span class="label" style="width:120px;">Người phụ trách:</span>
                <b class="value">{{ testplanDetail.creatorId.name }}</b>
            </div>
            <div class="d-flex">
                <div class="d-flex mb-2 w-50">
                    <span class="label" style="width:120px;">Test cases:</span>
                    <b class="value">7</b>
                </div>
                <div class="d-flex mb-2 w-50">
                    <span class="label" style="width:120px;">Passed:</span>
                    <b class="value">0</b>
                </div>
            </div>
            <div class="d-flex">
                <div class="d-flex mb-2 w-50">
                    <span class="label" style="width:120px;">Ngày bắt đầu:</span>
                    <b class="value">{{ moment(new Date(testplanDetail.createAt)).format("DD/MMM/YYYY") }}</b>
                </div>
                <div class="d-flex mb-2 w-50">
                    <span class="label" style="width:120px;">Ngày kết thúc:</span>
                    <b class="value">{{ moment(new Date(testplanDetail.createAt)).format("DD/MMM/YYYY") }}</b>
                </div>
            </div>
            <div class="d-flex mt-4">
                <span class="w-25">@Post: {{ testplanDetail.creatorId.name }}</span>
                <span class="w-25">@Date: {{ moment(new Date(testplanDetail.createAt)).format("DD/MMM/YYYY") }}</span>
            </div>
        </el-drawer>

        <el-drawer v-model="showTestCreate" direction="rtl" size="40%">
            <template #header="{ titleId, titleClass }">
                <div :id="titleId" :class="titleClass">
                    Tạo kế hoạch test
                </div>
            </template>
            <div class="mb-4">
                <span class="label d-block mb-1">Người phụ trách:</span>
                <el-input
                    v-model="input.creator"
                    placeholder="Người phụ trách"
                />
            </div>
            <div class="mb-4">
                <span class="label d-block mb-1">Ngày bắt đầu:</span>
                <el-date-picker
                    class="w-100"
                    v-model="input.startDate"
                    type="date"
                    placeholder="Ngày bắt đầu">
                </el-date-picker>
            </div>
            <div class="mb-4">
                <span class="label d-block mb-1">Ngày kết thúc:</span>
                <el-date-picker
                    class="w-100"
                    v-model="input.endDate"
                    type="date"
                    placeholder="Ngày kết thúc">
                </el-date-picker>
            </div>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary">Lưu</button>
            </div>
        </el-drawer>
    </Layout>
</template>
