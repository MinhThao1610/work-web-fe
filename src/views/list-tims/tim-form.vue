<script setup>
import { onMounted, reactive } from "vue";
import Layout from "../../layouts/main.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { FormInstance } from "element-plus";
import MethodService from "../../service/MethodService";
import Validate from "../../service/ValidService";
import Data from "./dataListTims";
import { ElNotification } from 'element-plus';
import UploadImage from "../../components/uploadImage.vue";

const ruleFormRef = ref(FormInstance);
const dataForm = reactive({
    value: MethodService.copyObject(Data.dataForm),
});
const loadingBtn = ref(false);
const route = useRoute();
const router = useRouter();
const listEmployees = ref([]);

const rulesForm = reactive({
    name: [Validate.required],
    status: [Validate.required],
    type: [Validate.required],
    isPublic: [Validate.required],
    isCancelTask: [Validate.required],
});
const propsIdAvatar = ref("");
const getIdImageUpload = (idImageUpload) => {
  dataForm.value.avatar = idImageUpload;
};
const removeImageUpload = (data) => {
  propsIdAvatar.value = data;
  dataForm.value.avatar = data;
};

const getTimById = async () => {
  
};

const getListEmployees = async () => {
    // gọi api lấy về danh sách nhân viên
    listEmployees.value = [
        {
            id: '11111',
            name: "Nguyễn Văn A"
        },
        {
            id: '22222',
            name: "Nguyễn Văn B"
        },
    ]
}

const createTim = async (formEl) => {
    console.log('dataForm', dataForm)
    if (!formEl) return;
    formEl.validate(async (valid) => {
        loadingBtn.value = true;
        if (valid) {
            const data = {
                name: dataForm.value.name,
                avatar: dataForm.value.avatar,
                description: dataForm.value.description,
                status: dataForm.value.status,
                type: dataForm.value.type,
                startDate: dataForm.value.startDate,
                endDate: dataForm.value.endDate,
                isPublic: dataForm.value.isPublic,
                slogan: dataForm.value.slogan,
                leader_id: dataForm.value.leader_id,
                isCancelTask: dataForm.value.isCancelTask,
                company_id: '',
            };
            console.log('data', data)
            const token = localStorage.getItem('token');
            console.log('token', token)
            try {
                // gọi api tạo tim
                openNotiSuccess();
            } catch (error) {
                openNotiErr();
            } finally {
                loadingBtn.value = false;
            }
        } else {
            loadingBtn.value = false;
            return false;
        }
    });
};

const updateTim = async () => {

};

const openNotiSuccess = () => {
    ElNotification({
        title: 'Thông báo',
        message: 'Tạo team thành công',
        type: 'success',
    })
};

const openNotiErr = () => {
    ElNotification({
        title: 'Lỗi',
        message: 'Tạo team thất bại!',
        type: 'error',
    })
};

onMounted(async () => {
    console.log('route.name', route);
    if (route.name === "timView" || route.name === "timEdit") {
        await getTimById();
    }

    await getListEmployees();
});
</script>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header align-items-center d-flex">
                        <h4 
                            v-if="route.name === 'timCreate'" 
                            class="card-title mb-0 flex-grow-1"
                        >
                            Tạo team
                        </h4>
                        <h4 
                            v-if="route.name === 'timEdit'" 
                            class="card-title mb-0 flex-grow-1"
                        >
                            Chỉnh sửa team
                        </h4>
                        <h4 
                            v-if="route.name === 'timView'"
                            class="card-title mb-0 flex-grow-1"
                        >
                            Thông tin chi tiết team
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
                                <b-row>
                                    <b-col md="2">
                                        <upload-image
                                            :propsIdAvatar="propsIdAvatar"
                                            @uploadImage="getIdImageUpload"
                                            @removeImage="removeImageUpload"
                                        ></upload-image>
                                    </b-col>
                                    <b-col md="10">
                                        <el-form-item label="Tên team" prop="name">
                                            <el-input
                                                type="text"
                                                autocomplete="off"
                                                v-model="dataForm.value.name"
                                                placeholder="Nhập tên team"
                                            />
                                        </el-form-item>
                                        <el-form-item
                                            label="Loại team"
                                            prop="type"
                                        >
                                            <el-select
                                                v-model="dataForm.value.type"
                                                filterable
                                                clearable
                                                placeholder="Chọn loại team"
                                            >
                                                <el-option
                                                    v-for="item in Data.listType"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                                />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="Trạng thái" prop="status">
                                            <el-select
                                                v-model="dataForm.value.status"
                                                filterable
                                                clearable
                                                placeholder="Chọn trạng thái"
                                            >
                                                <el-option
                                                    v-for="item in Data.listStatus"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                                />
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="Mô tả" prop="description">
                                            <el-input
                                                type="text"
                                                autocomplete="off"
                                                v-model="dataForm.value.description"
                                                placeholder="Nhập mô tả"
                                            />
                                        </el-form-item>
                                        <el-form-item
                                            label="Khẩu hiệu"
                                            prop="slogan"
                                        >
                                            <el-input
                                                type="text"
                                                autocomplete="off"
                                                v-model="dataForm.value.slogan"
                                                placeholder="Nhập khẩu hiệu"
                                            />
                                        </el-form-item>
                                        <el-form-item label="Leader" prop="leader_id">
                                            <el-select
                                                v-model="dataForm.value.leader_id"
                                                filterable
                                                clearable
                                                placeholder="Chọn leader"
                                            >
                                                <el-option
                                                    v-for="item in listEmployees"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id"
                                                />
                                            </el-select>
                                        </el-form-item>
                                        <b-row>
                                            <b-col md="6"> 
                                                <el-form-item label="Ngày bắt đầu" prop="startDate">
                                                    <el-date-picker
                                                        v-model="dataForm.value.startDate"
                                                        type="date"
                                                        placeholder="Chọn ngày bắt đầu"
                                                    />
                                                </el-form-item>
                                            </b-col>
                                            <b-col md="6">
                                                <el-form-item label="Ngày kết thúc" prop="endDate">
                                                    <el-date-picker
                                                        v-model="dataForm.value.endDate"
                                                        type="date"
                                                        placeholder="Chọn ngày kết thúc"
                                                    />
                                                </el-form-item>
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col md="6"> 
                                                <el-form-item label="Công khai" prop="isPublic">
                                                    <el-checkbox v-model="dataForm.value.isPublic" size="large" />
                                                </el-form-item>
                                            </b-col>
                                            <b-col md="6">
                                                <el-form-item label="Cho hủy công việc" prop="isCancelTask">
                                                    <el-checkbox v-model="dataForm.value.isCancelTask" size="large" />
                                                </el-form-item>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
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
                                        @click="createTim(ruleFormRef)"
                                        v-if="route.name === 'timCreate'"
                                        :loading="loadingBtn"
                                    >
                                        Tạo team
                                    </el-button>
                                    <el-button
                                        type="button"
                                        style="height: 38px"
                                        class="btn btn-secondary btn-border"
                                        @click="updateTim(ruleFormRef)"
                                        v-if="route.name === 'timEdit'"
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

</style>
