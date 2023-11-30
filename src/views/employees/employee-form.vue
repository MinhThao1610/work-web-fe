<script setup>
import { onMounted, reactive } from "vue";
import Layout from "../../layouts/main.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { FormInstance } from "element-plus";
import MethodService from "../../service/MethodService";
import Validate from "../../service/ValidService";
import Data from "./dataForm";
import UploadImage from "../../components/uploadImage.vue";

const ruleFormRef = ref(FormInstance);
const dataForm = reactive({
    value: MethodService.copyObject(Data.dataForm),
});
const loadingBtn = ref(false);
const route = useRoute();
const router = useRouter();

const propsIdAvatar = ref("");
const getIdImageUpload = (idImageUpload) => {
  dataForm.value.avatar = idImageUpload;
};
const removeImageUpload = (data) => {
  propsIdAvatar.value = data;
  dataForm.value.avatar = data;
};

const rulesForm = reactive({
    name: [Validate.required],
    role: [Validate.required],
    password: [Validate.required, Validate.checkSpaceString, Validate.checkMinLength(6)],
    phone: [Validate.required, Validate.checkPhone],
    email: [Validate.required, Validate.checkEmail],
    position: [Validate.required],
    fromDate: [Validate.required],
    isWorking: [Validate.required],
});

const getEmployeeById = async () => {
  
};

const createEmployee = async (formEl) => {
    console.log('dataForm', dataForm)
    if (!formEl) return;
    formEl.validate(async (valid) => {
        loadingBtn.value = true;
        if (valid) {
            const dataUser = {
                name: dataForm.value.name,
                phone: dataForm.value.phone,
                email: dataForm.value.email,
                password: dataForm.value.password,
                address: dataForm.value.address,
                school: dataForm.value.school,
                description: dataForm.value.description,
                avatar: dataForm.value.avatar,
                role: dataForm.value.role,
            };
            console.log('data', dataUser);

            const dataEmployee = {
                name: dataForm.value.name,
                phone: dataForm.value.phone,
                email: dataForm.value.email,
                position: dataForm.value.position,
                address: dataForm.value.address,
                school: dataForm.value.school,
                description: dataForm.value.description,
                network: dataForm.value.network,
                birthday: dataForm.value.birthday,
                fromDate: dataForm.value.fromDate,
                toDate: dataForm.value.toDate,
                avatar: dataForm.value.avatar,
                isWorking: dataForm.value.isWorking,
                company_id: '',
                disable: false,
                user_id: '',
                role: dataForm.value.role,
            };
            console.log('data', dataEmployee);
            const token = localStorage.getItem('token');
            console.log('token', token)
            
        } else {
            loadingBtn.value = false;
            return false;
        }
    });
};

onMounted(async () => {
    console.log('route.name', route);
  if (route.name === "employeeView" || route.name === "employeeEdit") {
    await getEmployeeById();
  }
});
</script>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header align-items-center d-flex">
                        <h4 
                            v-if="route.name === 'employeeCreate'" 
                            class="card-title mb-0 flex-grow-1"
                        >
                            Thêm nhân viên
                        </h4>
                        <h4 
                            v-if="route.name === 'employeeEdit'" 
                            class="card-title mb-0 flex-grow-1"
                        >
                            Chỉnh sửa nhân viên
                        </h4>
                        <h4 
                            v-if="route.name === 'employeeView'" 
                            class="card-title mb-0 flex-grow-1"
                        >
                            Thông tin nhân viên
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
                                            :disabled="
                                                router.name === 'employeeView' ? 'true' : 'false'
                                            "
                                        ></upload-image>
                                    </b-col>
                                    <b-col md="10">
                                        <el-form-item label="Tên nhân viên" prop="name">
                                            <el-input
                                                type="text"
                                                autocomplete="off"
                                                v-model="dataForm.value.name"
                                                placeholder="Nhập tên nhân viên"
                                            />
                                        </el-form-item>
                                        <el-form-item
                                            label="Số điện thoại"
                                            prop="phone"
                                        >
                                            <el-input
                                                type="number"
                                                autocomplete="off"
                                                v-model="dataForm.value.phone"
                                                placeholder="Nhập tên số điện thoại"
                                            />
                                        </el-form-item>
                                        <el-form-item label="Email" prop="email">
                                            <el-input
                                                type="text"
                                                autocomplete="off"
                                                v-model="dataForm.value.email"
                                                placeholder="Nhập tên email"
                                            />
                                        </el-form-item>
                                        <el-form-item label="Password" prop="password">
                                            <el-input
                                                type="text"
                                                autocomplete="off"
                                                v-model="dataForm.value.password"
                                                placeholder="Nhập tên password"
                                            />
                                        </el-form-item>
                                    
                                
                                        <b-row>
                                            <b-col md="6">
                                                <el-form-item label="Loại nhân viên" prop="position">
                                                    <el-select v-model="dataForm.value.position" placeholder="Chọn loại nhân viên">
                                                        <el-option
                                                        v-for="item in Data.listTypeEmployees"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                        />
                                                    </el-select>
                                                </el-form-item>
                                            </b-col>
                                            <b-col md="6">
                                                <el-form-item label="Quyền" prop="role">
                                                    <el-select v-model="dataForm.value.role" class="m-2" placeholder="Chọn quyền">
                                                        <el-option
                                                            v-for="item in Data.listRole"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value"
                                                        />
                                                    </el-select>
                                                </el-form-item>
                                            </b-col>
                                        </b-row>
                                    
                                        <b-row>
                                            <b-col md="6">
                                                <el-form-item label="Ngày sinh" prop="birthday">
                                                    <el-date-picker
                                                        v-model="dataForm.value.birthday"
                                                        type="date"
                                                        placeholder="Chọn ngày sinh"
                                                    />
                                                </el-form-item></b-col>
                                            <b-col md="6">
                                                <el-form-item label="Hoạt động" prop="isWorking">
                                                    <el-checkbox v-model="dataForm.value.isWorking" size="large" />
                                                </el-form-item>
                                            </b-col>
                                        </b-row>

                                        <el-form-item label="Địa chỉ" prop="address">
                                            <el-input
                                                type="text"
                                                autocomplete="off"
                                                v-model="dataForm.value.address"
                                                placeholder="Nhập địa chỉ"
                                            />
                                        </el-form-item>
                                        <el-form-item
                                            label="Trường học"
                                            prop="school"
                                        >
                                            <el-input
                                                type="text"
                                                autocomplete="off"
                                                v-model="dataForm.value.school"
                                                placeholder="Nhập trường học"
                                            />
                                        </el-form-item>
                                        <el-form-item label="Mô tả" prop="description">
                                            <el-input
                                                type="text"
                                                autocomplete="off"
                                                v-model="dataForm.value.description"
                                                placeholder="Nhập mô tả"
                                            />
                                        </el-form-item>
                                        <el-form-item label="Link facebook" prop="network">
                                            <el-input
                                                type="text"
                                                autocomplete="off"
                                                v-model="dataForm.value.network"
                                                placeholder="Nhập link"
                                            />
                                        </el-form-item>
                                        <b-row>
                                    <b-col md="6">
                                        <el-form-item label="Làm việc từ" prop="fromDate">
                                            <el-date-picker
                                                v-model="dataForm.value.fromDate"
                                                type="date"
                                                placeholder="Nhập ngày bắt đầu làm việc"
                                            />
                                        </el-form-item>
                                    </b-col>
                                    <b-col md="6">
                                        <el-form-item label="Đến" prop="toDate">
                                            <el-date-picker
                                                v-model="dataForm.value.toDate"
                                                type="date"
                                                placeholder="Nhập ngày kết thúc làm việc"
                                            />
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
                                        @click="createEmployee(ruleFormRef)"
                                        v-if="route.name === 'employeeCreate'"
                                        :loading="loadingBtn"
                                    >
                                        Tạo nhân viên
                                    </el-button>
                                    <el-button
                                        type="button"
                                        style="height: 38px"
                                        class="btn btn-secondary btn-border"
                                        @click="updateEmployee(ruleFormRef)"
                                        v-if="route.name === 'employeeEdit'"
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
