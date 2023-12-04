<script setup>
import { onMounted, defineProps, reactive, ref } from 'vue';
import Data from "./dataForm";
import MethodService from "@/service/MethodService";
import { ElNotification } from 'element-plus';
import Validate from "@/service/ValidService";
import UploadImage from "@/components/uploadImage.vue";
// import account from "@/assets/images/account.jpg";

const props = defineProps({
    header: String,
});

const dataForm = reactive({
    value: MethodService.copyObject(Data.dataFormInfo),
});
const rulesForm = reactive({
    name: [Validate.required],
    status: [Validate.required],
    isPublic: [Validate.required],
    isCancelTask: [Validate.required],
});

const listEmployees = ref([]);
const loadingBtn = ref(false);
const propsIdAvatar = ref("");
const getIdImageUpload = (idImageUpload) => {
  dataForm.value.avatar = idImageUpload;
};
const removeImageUpload = (data) => {
  propsIdAvatar.value = data;
  dataForm.value.avatar = data;
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

const updateTim = async (formEl) => {
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
                // gọi api update tim
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

onMounted(async () => {
    console.log(props)
    await getListEmployees();
})
</script>

<template>
    <div class="card">
        <div class="card-header align-items-center d-flex">
            <h4 
                class="card-title mb-0 flex-grow-1"
            >
                {{ props.header }}
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
                        <b-col md="3">
                            <upload-image
                                :propsIdAvatar="propsIdAvatar"
                                @uploadImage="getIdImageUpload"
                                @removeImage="removeImageUpload"
                            ></upload-image>
                        </b-col>
                        <b-col md="9">
                            <el-form-item label="Tên team" prop="name">
                                <el-input
                                    type="text"
                                    autocomplete="off"
                                    v-model="dataForm.value.name"
                                    placeholder="Nhập tên team"
                                />
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
                                    type="textarea"
                                    autocomplete="off"
                                    :autosize="true"
                                    v-model="dataForm.value.description"
                                    placeholder="Nhập mô tả"
                                />
                            </el-form-item>
                        </b-col>
                    </b-row>
                    <el-form-item
                        label="Khẩu hiệu"
                        prop="slogan"
                    >
                        <el-input
                            type="textarea"
                            :autosize="true"
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
                    <div class="text-center">
                        <el-button
                            type="button"
                            style="height: 38px"
                            class="btn btn-secondary btn-border"
                            @click="updateTim(ruleFormRef)"
                            :loading="loadingBtn"
                        >
                            Lưu
                        </el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
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
