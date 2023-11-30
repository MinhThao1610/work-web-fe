<script setup>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";
import { sprintData } from "./mockdata";
import { copyObj } from "../../../helpers/utils";

const focusButton = ref("project");
const route = useRoute();

const changeFocusButton = (text) => {
    focusButton.value = text;
};

const showDetail = ref(false);
const showForm = ref(false);

const mode = ref('create');
const formRef = ref();
const projects = ref(sprintData);
const detail = ref({});
const input = ref({});
const rules = ref({
    title: [
        { required: true, message: 'Bắt buộc nhập tên sprint', trigger: 'change' },
    ],
    startDate: [
        { type: 'date', required: true, message: 'Bắt buộc chọn ngày bắt đầu', trigger: 'change' }
    ],
    endDate: [
        { type: 'date', required: true, message: 'Bắt buộc chọn ngày kết thúc', trigger: 'change' }
    ]
})

const openDetail = (e, i) => {
    e.preventDefault();
    showDetail.value = true;
    detail.value = copyObj(projects.value[i]);
}
const addSprint = () => {
    input.value = {};
    if (formRef.value) formRef.value.resetFields();
    showForm.value = true;
    mode.value = 'create';
}
const editSprint = () => {
    if (formRef.value) formRef.value.resetFields();
    showForm.value = true;
    showDetail.value = false;
    input.value = detail.value;
    mode.value = 'edit';
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
        <div class="row">
            <div id="tim-project">
                <div class="toolbar mb-4">
                    <button class="btn btn-primary" @click="addSprint">Tạo sprint</button>
                </div>
                <div class="projects">
                    <h2 v-if="projects.length === 0">Hãy tạo sprint đầu tiên của bạn.</h2>
                    <router-link v-for="(project, index) in projects" class="project bg-white border-primary p-3"
                        :key="index" to="/tim/project/sprint">
                        <div class="header mb-2 d-flex justify-content-between align-items-center">
                            <h4 class="title mb-0">{{ project.title }}</h4>
                            <button style="background: transparent; border: 0;" @click="openDetail($event, index)">
                                <i class="las la-info-circle" style="font-size: 24px;"></i>
                            </button>
                        </div>
                        <div class="project-info">
                            <div class="content">
                                <p class="mb-1">Leader: <b>{{ project.leader.name }}</b> </p>
                                <p class="mb-1">Ngày bắt đầu: <b>{{ moment(new
                                    Date(project.startDate)).format("DD/MM/YYYY") }}</b> </p>
                                <p class="mb-1">Ngày kết thúc: <b>{{ moment(new Date(project.endDate)).format("DD/MM/YYYY")
                                }}</b> </p>
                                <p class="mb-1">Trạng thái: <span class="tag" :class="[project.status]">{{ project.status
                                }}</span> </p>
                            </div>
                        </div>

                        <div class="progressbar" :style="`width: ${project.progress}%`"></div>
                    </router-link>
                </div>
            </div>
        </div>

        <el-drawer v-model="showDetail" direction="rtl" size="40%">
            <template #header="{ titleId, titleClass }">
                <div :id="titleId" :class="titleClass">
                    {{ detail.title }}
                </div>
            </template>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary" @click="editSprint">Cập nhật</button>
            </div>
            <div class="d-flex">
                <div class="d-flex mb-2 w-50">
                    <span class="label" style="width:120px;">Tổng số:</span>
                    <b class="value">{{ detail.tasks.length }}</b>
                </div>
                <div class="d-flex mb-2 w-50">
                    <span class="label" style="width:120px;">Hoàn thành:</span>
                    <b class="value">{{ detail.tasks.filter(x => x?.statusId?.type === 'done').length }}</b>
                </div>
            </div>
            <div class="d-flex">
                <div class="d-flex mb-2 w-50">
                    <span class="label" style="width:120px;">Ngày bắt đầu:</span>
                    <b class="value">{{ moment(new Date(detail.startDate)).format("DD/MM/YYYY") }}</b>
                </div>
                <div class="d-flex mb-2 w-50">
                    <span class="label" style="width:120px;">Ngày kết thúc:</span>
                    <b class="value">{{ moment(new Date(detail.endDate)).format("DD/MM/YYYY") }}</b>
                </div>
            </div>
            <div class="d-flex mb-2">
                <span class="label" style="width:120px;">Status:</span>
                <span class="tag m-0" :class="[detail.status]">{{ detail.status }}</span>
            </div>
            <div class="d-flex">
                <span class="w-25">@Post: {{ detail.leader.name }}</span>
                <span class="w-25">@Date: {{ moment(new Date(detail.createAt)).format("DD/MM/YYYY") }}</span>
            </div>
        </el-drawer>

        <el-drawer v-model="showForm" direction="rtl" size="40%">
            <template #header="{ titleId, titleClass }">
                <div :id="titleId" :class="titleClass">
                    {{ mode === 'create' ? 'Tạo sprint' : `Cập nhật thông tin sprint ${detail.title}` }}
                </div>
            </template>
            <el-form label-position="top" require-asterisk-position="right" :model="input" :rules="rules" ref="formRef">
                <el-form-item class="mb-4" label="Sprint" prop="title">
                    <el-input v-model="input.title" placeholder="Sprint" />
                </el-form-item>
                <el-form-item class="mb-4" label="Ngày bắt đầu" prop="startDate">
                    <el-date-picker class="w-100" v-model="input.startDate" type="date" placeholder="Ngày bắt đầu" size="large" format="DD/MM/YYYY" />
                </el-form-item>
                <el-form-item class="mb-4" label="Ngày kết thúc" prop="endDate">
                    <el-date-picker class="w-100" v-model="input.endDate" type="date" placeholder="Ngày kết thúc" size="large" format="DD/MM/YYYY" />
                </el-form-item>
                <el-form-item class="mb-4" label="Mô tả" prop="description">
                    <el-input type="textarea" v-model="input.description" placeholder="Mô tả" />
                </el-form-item>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-success w-25" type="button" @click="onSubmit">Lưu</button>
                </div>
            </el-form>
        </el-drawer>
    </Layout>
</template>
