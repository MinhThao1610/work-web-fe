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

const ruleFormRef = ref(FormInstance);
const dataForm = reactive({
  value: MethodService.copyObject(Data.dataForm),
});
const loadingBtn = ref(false);
const route = useRoute();
const router = useRouter();

const rulesForm = reactive({
  name: [Validate.checkSpecial, Validate.required],
  split_type: [Validate.required],
  db_layer_type: [Validate.required],
  type: [Validate.required],
});

const getCompanyById = async () => {
  
};

const addNewTable = async (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    loadingBtn.value = true;
    if (valid) {
    //   gọi api tạo công ty
    toastr.success("Tạo thành công");
    } else {
      loadingBtn.value = false;
      return false;
    }
  });
};

onMounted(async () => {
    console.log('route.name', route.name);
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
                                        @click="addNewTable(ruleFormRef)"
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
</style>
