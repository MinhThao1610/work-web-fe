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
import { putAdminDataApi } from "../../api/fetchAPI";
import UploadImage from "../../components/uploadImage.vue";


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
    status: [Validate.required],
});

const propsIdAvatar = ref("");
const getIdImageUpload = (idImageUpload) => {
  dataForm.value.avatar = idImageUpload;
};
const removeImageUpload = (data) => {
  propsIdAvatar.value = data;
  dataForm.value.avatar = data;
};

const getCompanyById = async () => {
  
};

const updateCompany = async (formEl) => {
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
                const res = await putAdminDataApi(`company/update/${route.params.id}`, token, data);
                console.log(res);
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
    await getCompanyById();
});
</script>

<template>
    <Layout>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header align-items-center d-flex">
                        <h4 class="card-title mb-0 flex-grow-1">
                            Chỉnh sửa công ty
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
                                        <el-form-item label="Sứ mệnh" prop="mission">
                                            <el-input
                                                type="text"
                                                autocomplete="off"
                                                v-model="dataForm.value.mission"
                                                placeholder="Nhập sứ mệnh"
                                            />
                                        </el-form-item>
                                        <el-form-item label="Giá trị cốt lõi" prop="coreValue">
                                            <el-input
                                                type="text"
                                                autocomplete="off"
                                                v-model="dataForm.value.coreValue"
                                                placeholder="Nhập giá trị cốt lõi"
                                            />
                                        </el-form-item>
                                        <el-form-item label="Khẩu hiệu" prop="slogan">
                                            <el-input
                                                type="text"
                                                autocomplete="off"
                                                v-model="dataForm.value.slogan"
                                                placeholder="Nhập khẩu hiệu"
                                            />
                                        </el-form-item>
                                        <el-form-item label="Tầm nhìn" prop="banner">
                                            <el-input
                                                type="text"
                                                autocomplete="off"
                                                v-model="dataForm.value.banner"
                                                placeholder="Nhập tầm nhìn"
                                            />
                                        </el-form-item>
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
                                        @click="updateCompany(ruleFormRef)"
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
</style>
