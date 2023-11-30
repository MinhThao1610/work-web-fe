<script setup>
import { onMounted, reactive } from "vue";
import Layout from "../../layouts/main.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { FormInstance } from "element-plus";
import MethodService from "../../service/MethodService";
import Validate from "../../service/ValidService";
import Data from "./dataForm";
import '@toast-ui/editor/dist/toastui-editor.css'
import Editor from '@toast-ui/editor';

const ruleFormRef = ref(FormInstance);
const dataForm = reactive({
    value: MethodService.copyObject(Data.dataForm),
});
const loadingBtn = ref(false);
const route = useRoute();
const router = useRouter();

let editor;

const rulesForm = reactive({
    title: [Validate.required],
    isShow: [Validate.required],
    content: [Validate.required],
});

const getMidById = async () => {
  
};

const createMid = async (formEl) => {
    console.log('dataForm', dataForm)
    if (!formEl) return;
    formEl.validate(async (valid) => {
        loadingBtn.value = true;
        if (valid) {
            const data = {
                title: dataForm.value.title,
                content: editor.getMarkdown(),
                linkVideo: dataForm.value.linkVideo,
                isShow: dataForm.value.isShow,
                datetime: dataForm.value.datetime,
                company_id: '',
                employee_id: '',
            };
            console.log('data', data);
            
        } else {
            loadingBtn.value = false;
            return false;
        }
    });
};

onMounted(async () => {
    console.log('route.name', route);
    if (route.name === "milestoneView" || route.name === "milestoneEdit") {
        await getMidById();
    }
    editor = new Editor({
        el: document.querySelector('#editor'),
        height: '500px',
        initialEditType: 'markdown',
        previewStyle: 'vertical'
    });
    editor.getMarkdown();
});
</script>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header align-items-center d-flex">
                        <h4 
                            v-if="route.name === 'milestoneCreate'" 
                            class="card-title mb-0 flex-grow-1"
                        >
                            Thêm bài viết
                        </h4>
                        <h4 
                            v-if="route.name === 'milestoneEdit'" 
                            class="card-title mb-0 flex-grow-1"
                        >
                            Chỉnh sửa bài viết
                        </h4>
                        <h4 
                            v-if="route.name === 'milestoneView'" 
                            class="card-title mb-0 flex-grow-1"
                        >
                            Thông tin bài viết
                        </h4>
                    </div>

                    <div class="card-body">
                        <div class="main-body">
                            <el-form
                                ref="ruleFormRef"
                                :model="dataForm.value"
                                status-icon
                                :rules="rulesForm"
                                label-width="200px"
                                class="form-user"
                            >
                                <el-form-item label="Tên bài viết" prop="title">
                                    <el-input
                                        type="text"
                                        autocomplete="off"
                                        v-model="dataForm.value.title"
                                        placeholder="Nhập tên bài viết"
                                    />
                                </el-form-item>
                                <el-form-item label="Thời gian của bài viết" prop="title">
                                    <el-date-picker
                                        v-model="dataForm.value.datetime"
                                        type="date"
                                        placeholder="Chọn ngày"
                                    />
                                </el-form-item>
                                <el-form-item
                                    label="Link video"
                                    prop="linkVideo"
                                >
                                    <el-input
                                        type="number"
                                        autocomplete="off"
                                        v-model="dataForm.value.linkVideo"
                                        placeholder="Nhập tên loại bài"
                                    />
                                </el-form-item>
                                <el-form-item label="Hiển thị" prop="isShow">
                                    <el-checkbox v-model="dataForm.value.isShow" size="large" />
                                </el-form-item>
                                <el-form-item label="Nội dung" prop="content">
                                    <div id="editor"></div>
                                </el-form-item>
                                <div class="text-center">
                                    <button
                                        type="button"
                                        class="btn btn-soft-secondary btn-border mx-3"
                                        @click="router.go(-1)"
                                    >
                                        Quay lại
                                    </button>
                                    <el-button
                                        type="button"
                                        style="height: 38px"
                                        class="btn btn-secondary btn-border"
                                        @click="createMid(ruleFormRef)"
                                        v-if="route.name === 'milestoneCreate'"
                                        :loading="loadingBtn"
                                    >
                                        Tạo bài viết
                                    </el-button>
                                    <el-button
                                        type="button"
                                        style="height: 38px"
                                        class="btn btn-secondary btn-border"
                                        @click="updateLib(ruleFormRef)"
                                        v-if="route.name === 'milestoneEdit'"
                                        :loading="loadingBtn"
                                    >
                                        Lưu
                                    </el-button>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<style scoped>
.el-radio {
  margin-bottom: 0;
}
.el-select {
    width: 100%;
}
:deep .el-date-editor.el-input {
    width: 100%;
}
#editor {
    margin-top: 15px;
    width: 100%;
}
</style>
