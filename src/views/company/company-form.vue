<script setup>
import { onMounted, reactive } from "vue";
import Layout from "../../layouts/main.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { FormInstance } from "element-plus";
import toastr from "toastr";
import MethodService from "../../service/MethodService";
import Validate from "../../service/ValidService";
import Data from "./dataCompany";
import { postAdminDataApi } from "../../api/fetchAPI";

const ruleFormRef = ref(FormInstance);
const dataForm = reactive({
    value: MethodService.copyObject(Data.dataForm),
});
const loadingBtn = ref(false);
const route = useRoute();
const router = useRouter();

const rulesForm = reactive({
    name: [Validate.required],
    phone: [Validate.required, Validate.checkPhone],
    email: [Validate.required, Validate.checkEmail],
    nameUser: [Validate.required],
    emailUser: [Validate.required, Validate.checkEmail],
    phoneUser: [Validate.required, Validate.checkPhone],
    passwordUser: [Validate.required],
    status: [Validate.required],
});

const getCompanyById = async () => {
  
};

const createCompany = async (formEl) => {
    console.log('dataForm', dataForm)
    if (!formEl) return;
    formEl.validate(async (valid) => {
        loadingBtn.value = true;
        if (valid) {
            const data = {
                name: dataForm.value.name,
                phone: dataForm.value.phone,
                email: dataForm.value.email,
                address: dataForm.value.address ?? '',
                website: dataForm.value.website ?? '',
                description: dataForm.value.description ?? '',
                status: dataForm.value.status ? 'hoat-dong' : 'dung-hoat-dong',
            };
            console.log('data', data)
            const token = localStorage.getItem('token');
            console.log('token', token)
            try {
                const res = await postAdminDataApi('company/create', token, data);
                console.log(res);

                // try {
                //     const dataUser = {
                //         name: dataForm.value.nameUser,
                //         phone: dataForm.value.phoneUser,
                //         email: dataForm.value.emailUser,
                //         password: dataForm.value.passwordUser,
                //         address: dataForm.value.addressUser,
                //         description: dataForm.value.descriptionUser,
                //         status: dataForm.value.status ? 'hoat-dong' : 'dung-hoat-dong',
                //         role: 'ADMIN',
                //         isOwner: true
                //     }
                //     console.log('dataUser', dataUser)
                //     const resUser = await postAdminDataApi('user/create', token, dataUser);
                //     console.log(resUser);

                //     try {
                //         const dataEmployee = {
                //             name: dataForm.value.nameUser,
                //             phone: dataForm.value.phoneUser,
                //             email: dataForm.value.emailUser,
                //             password: dataForm.value.passwordUser,
                //             address: dataForm.value.addressUser,
                //             description: dataForm.value.descriptionUser,
                //             status: dataForm.value.status ? 'hoat-dong' : 'dung-hoat-dong',
                //             role: 'ADMIN',
                //             company_id: 'id company thêm sau',
                //             user_id: 'thêm sau'
                //         }
                //         const resEmployees = await postAdminDataApi('employees/create', token, dataEmployee);
                //         console.log(resEmployees);
                //     } catch (error) {
                //         console.error(error)
                //     }
                // } catch (error) {
                //     console.error(error)
                // }
                toastr.success("Tạo công ty thành công");
            } catch (error) {
                toastr.error("Tạo công ty thất bại");
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
    console.log('route.name', route);
  if (route.name === "companyView") {
    await getCompanyById();
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
                            v-if="route.name === 'companyCreate'" 
                            class="card-title mb-0 flex-grow-1"
                        >
                            Tạo công ty
                        </h4>
                        <h4 
                            v-else
                            class="card-title mb-0 flex-grow-1"
                        >
                            Thông tin công ty
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
                                <el-form-item label="Tên công ty" prop="name">
                                    <el-input
                                        type="text"
                                        autocomplete="off"
                                        v-model="dataForm.value.name"
                                        placeholder="Nhập tên công ty"
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
                                <el-form-item label="Địa chỉ" prop="address">
                                    <el-input
                                        type="text"
                                        autocomplete="off"
                                        v-model="dataForm.value.address"
                                        placeholder="Nhập địa chỉ"
                                    />
                                </el-form-item>
                                <el-form-item
                                    label="Website"
                                    prop="website"
                                >
                                    <el-input
                                        type="text"
                                        autocomplete="off"
                                        v-model="dataForm.value.website"
                                        placeholder="Nhập website"
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
                                
                                <b-row>
                                    <b-col md="6">
                                        <el-form-item label="Thời gian hết hạn" prop="expiredTime">
                                            <el-date-picker
                                                v-model="expiredTime"
                                                type="date"
                                                placeholder="Chọn ngày"
                                            />
                                        </el-form-item>
                                    </b-col>
                                    <b-col md="6">
                                        <el-form-item label="Hoạt động" prop="status">
                                            <el-checkbox v-model="dataForm.value.status" size="large" />
                                        </el-form-item>
                                    </b-col>
                                </b-row>
                                
                                <div class="separation-form">
                                    <span class="mb-0 flex-grow-1">
                                        Thông tin người đăng ký công ty
                                    </span>
                                </div>
                                <el-form-item label="Tên người đăng ký" prop="nameUser">
                                    <el-input
                                        type="text"
                                        autocomplete="off"
                                        v-model="dataForm.value.nameUser"
                                        placeholder="Nhập tên người đăng ký"
                                    />
                                </el-form-item>
                                <el-form-item label="Email" prop="emailUser">
                                    <el-input
                                        type="text"
                                        autocomplete="off"
                                        v-model="dataForm.value.emailUser"
                                        placeholder="Nhập email người đăng ký"
                                    />
                                </el-form-item>
                                <el-form-item label="Số điện thoại" prop="phoneUser">
                                    <el-input
                                        type="number"
                                        autocomplete="off"
                                        v-model="dataForm.value.phoneUser"
                                        placeholder="Nhập số điện thoại người đăng ký"
                                    />
                                </el-form-item>
                                <el-form-item label="Mật khẩu" prop="passwordUser">
                                    <el-input
                                        type="password"
                                        autocomplete="off"
                                        v-model="dataForm.value.passwordUser"
                                        placeholder="Nhập mật khẩu người đăng ký"
                                    />
                                </el-form-item>
                                <el-form-item label="Địa chỉ" prop="addressUser">
                                    <el-input
                                        type="text"
                                        autocomplete="off"
                                        v-model="dataForm.value.addressUser"
                                        placeholder="Nhập địa chỉ của người đăng ký"
                                    />
                                </el-form-item>
                                <el-form-item label="Mô tả" prop="descriptionUser">
                                    <el-input
                                        type="text"
                                        autocomplete="off"
                                        v-model="dataForm.value.descriptionUser"
                                        placeholder="Nhập mô tả của người đăng ký"
                                    />
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
                                        @click="createCompany(ruleFormRef)"
                                        v-if="route.name === 'companyCreate'"
                                        :loading="loadingBtn"
                                    >
                                        Tạo công ty
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
