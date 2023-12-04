<script setup>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref, reactive, computed } from "vue";
import "prismjs";
import "prismjs/themes/prism.css";
import MethodService from "../../service/MethodService";
import DataForm from "./dataCompany";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

const title = ref("Danh sách công ty");
const items = [
    {
        text: "Danh sách công ty",
        href: "/company-manage/table",
    },
    {
        text: "Danh sách công ty",
        active: true,
    },
];
const tableData = ref([]);
let loading = ref(true);
const router = useRouter();
const tableRules = reactive(MethodService.copyObject(DataForm.tableRules));
const validForm = reactive({ value: DataForm.tableRules.dataSearch.valid });
const dataStatus = [
    {
        value: 'hoat-dong',
        label: "Hoạt động",
    },
    {
        value: 'khoa',
        label: "Khóa",
    },
]

const getListCompany = async () => {
    tableData.value = [
        {
            id: '1111',
            name: "Công ty A",
            phone: "0928388472",
            email: "admin@gmail.com",
            address: "số 1, Trung Hòa, Cầu Giấy, Hà Nội",
            status: "hoat-dong",
            isShow: true,
        },
        {
            id: '2222',
            name: "Công ty B",
            phone: "0374688472",
            email: "vanphongb@gmail.com",
            address: "Trần Cung, Cổ Nhuế 1, Bắc Từ Liêm, Hà Nội",
            status: "hoat-dong",
            isShow: true,
        },
        {
            id: '33333',
            name: "Công ty C",
            phone: "0364388472",
            email: "nguyenc@gmail.com",
            address: "số 1, Đường Lê Đức Thọ, Nam Từ Liêm, Hà Nội",
            status: "hoat-dong",
            isShow: true,
        },
        {
            id: '4444',
            name: "Công ty D",
            phone: "0928388211",
            email: "nguyend@gmail.com",
            address: "94 Đường Láng",
            status: "hoat-dong",
            isShow: true,
        },
        {
            id: '5555',
            name: "Công ty E",
            phone: "0928384772",
            email: "congtye@gmail.com",
            address: "Yên Từ, Yên Mô, Ninh Bình",
            status: "dung-hoat-dong",
            isShow: false,
        },
        {
            id: '666666',
            name: "Công ty F",
            phone: "0928388472",
            email: "congtyf@gmail.com",
            address: "Minh Tân, Kinh Môn, Hải Dương",
            status: "hoat-dong",
            isShow: true,
        }
    ];
    loading.value = false;
    // gọi api
};

// hiển thị form tìm kiếm
const fn_showFormTimKiem = () => {
    tableRules.showFormSearch = !tableRules.showFormSearch;
};

const  changeStatus = () => {

};

const fn_CreateCompany = () => {
    router.push({
      name: "companyCreate",
    });
};

// tìm kiếm
const fn_TimKiem = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
        loading.value = true;
        tableRules.dataSearch.value["code"] = tableRules.dataSearch.value["code"]
            ? tableRules.dataSearch.value["code"].trim()
            : "";
        tableRules.dataSearch.value["type"] = tableRules.dataSearch.value["type"]
            ? tableRules.dataSearch.value["type"].trim()
            : "";
        tableRules.dataSearch.value["name"] = tableRules.dataSearch.value["name"]
            ? tableRules.dataSearch.value["name"].trim()
            : "";

        // handleDepartment();

        tableRules.filters = MethodService.filterTable(
            JSON.stringify(tableRules.dataSearch)
        );
        tableRules.offset = 0;
        tableRules.page = 1;
        //   gọi lại api
        await getListCompany();
    } else return false;
  });
};

const handleClick = (id) => {
    router.push({
        name: "companyView",
        params: { id: id },
    });
}

onMounted(async () => {
    const checkbox = document.getElementsByClassName("code-switcher");
    Array.from(checkbox).forEach((check) => {
      check.addEventListener("change", () => {
        const card = check.closest(".card");
        const preview = card.querySelector(".live-preview");
        const code = card.querySelector(".code-view");
        if (check.checked) {
          // do this
          preview.classList.add("d-none");
          code.classList.remove("d-none");
        } else {
          // do that
          preview.classList.remove("d-none");
          code.classList.add("d-none");
        }
      });
    });

    await getListCompany();

    login({
        email: 'abc@gmail.com',
        password: '123456'
    });

    setTimeout(() => {
        console.log('authenState', authenState.value)
    }, 5000)
})

// Implement vuex
const authenState = computed(() => store.state.authentication.auth)
 
const login = (data) => {
    // dispatch: {{ Tên state }} / {{ Tên action }}
    console.log('data', data)
    // store.dispatch('authentication/fetchAuthen', data)
};

</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header align-items-center d-flex">
                        <h4 class="card-title mb-0 flex-grow-1">Danh sách công ty</h4>
                        <div class="text-end">
                            <div class="btn-header">
                                <button
                                    class="btn btn-soft-secondary btn-border"
                                    @click="fn_showFormTimKiem()"
                                >
                                    <i class="ri-search-line"></i>
                                    Tìm kiếm
                                </button>
                                <button
                                    class="btn btn-secondary btn-border"
                                    @click="fn_CreateCompany()"
                                >
                                    <i class="ri-add-circle-line"></i>
                                    Tạo công ty
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="main-body-search mx-3 mb-3">
                            <b-collapse
                                v-model="tableRules.showFormSearch"
                                id="myFormSearch"
                                class="b-shadow"
                            >
                                <b-card>
                                    <el-form
                                        ref="ruleFormRef"
                                        :model="tableRules.dataSearch.value"
                                        :rules="validForm.value"
                                        label-position="top"
                                        @submit.prevent
                                    >
                                        <b-row>
                                            <b-col>
                                                <el-form-item
                                                    label="Tên công ty"
                                                    prop="name"
                                                >
                                                    <el-input
                                                        clearable
                                                        v-model="tableRules.dataSearch.value['name']"
                                                        placeholder="Nhập tên công ty"
                                                        type="text"
                                                    ></el-input>
                                                </el-form-item>
                                            </b-col>
                                            <b-col>
                                                <el-form-item
                                                    label="Số điện thoại"
                                                    prop="phone"
                                                >
                                                    <el-input
                                                        clearable
                                                        v-model="tableRules.dataSearch.value['phone']"
                                                        placeholder="Nhập số điện thoại"
                                                        type="number"
                                                    ></el-input>
                                                </el-form-item>
                                            </b-col>
                                            <b-col>
                                                <el-form-item
                                                    label="Email"
                                                    prop="email"
                                                >
                                                <el-input
                                                    clearable
                                                    v-model="tableRules.dataSearch.value['email']"
                                                    placeholder="Nhập email"
                                                ></el-input>
                                                </el-form-item>
                                            </b-col>
                                            <b-col>
                                                <el-form-item label="Trạng thái" prop="status">
                                                <el-select
                                                    v-model="
                                                        tableRules.dataSearch.value['status']
                                                    "
                                                    filterable
                                                    clearable
                                                    placeholder="Chọn trạng thái"
                                                    @change="changeStatus()"
                                                >
                                                    <el-option
                                                        v-for="item in dataStatus"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                    />
                                                </el-select>
                                                </el-form-item>
                                            </b-col>
                                        </b-row>
                                        <div class="text-center">
                                            <a
                                                class="btn btn-soft-secondary btn-border mx-3"
                                                style="width: 80px"
                                                @click="fn_showFormTimKiem()"
                                            >
                                                Ẩn
                                            </a>
                                            <button
                                                class="btn btn-secondary bg-gradient btn-border waves-effect waves-light"
                                                style="width: 100px"
                                                native-type="submit"
                                                @click="fn_TimKiem(ruleFormRef)"
                                            >
                                                Tìm kiếm
                                            </button>
                                        </div>
                                    </el-form>
                                </b-card>
                            </b-collapse>
                        </div>

                        <div class="live-preview">
                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="table-responsive mt-4 mt-xl-0">
                                        <el-table 
                                            :data="tableData" 
                                            stripe 
                                            v-loading="loading"
                                            style="width: 100%"
                                            class="table table-hover table-striped align-middle table-nowrap mb-0"
                                        >
                                            <el-table-column label="STT" min-width="80" align="center" fixed class-name="column-numerical">
                                                <template #default="scope">
                                                    <div>
                                                        {{ scope.$index + 1 }}
                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="name" label="Tên công ty" min-width="140" />
                                            <el-table-column prop="phone" label="Số điện thoại" min-width="140" />
                                            <el-table-column prop="email" label="Email" min-width="180" />
                                            <el-table-column prop="address" label="Địa chỉ" min-width="300" />
                                            <el-table-column prop="status" label="Hoạt động" min-width="120" align="center">
                                                <template #default="scope">
                                                    <el-switch v-model="scope.row.isShow" />
                                                </template>
                                            </el-table-column>
                                            <el-table-column  label="Thao tác" min-width="180" >
                                                <template #default="scope">
                                                    <div class="btn-group-thao-tac">
                                                        <el-tooltip
                                                            content="Xem"
                                                            effect="light"
                                                        >
                                                            <button
                                                                type="button"
                                                                class="btn btn-soft-info waves-effect waves-light btn-sm"
                                                                @click="handleClick(scope.row.id)"
                                                            >
                                                                <i class="ri-eye-line"></i>
                                                            </button>
                                                        </el-tooltip>

                                                        <!-- <el-tooltip
                                                            content="Sửa"
                                                            effect="light"
                                                        >
                                                            <button
                                                                type="button"
                                                                class="btn btn-soft-success waves-effect waves-light btn-sm"
                                                                v-b-popover.hover.left="'Sửa'"
                                                                @click="handleClick(scope.row.id)"
                                                            >
                                                                <i class="ri-edit-box-line"></i>
                                                            </button>
                                                        </el-tooltip>
                                                        <el-tooltip
                                                            content="Xóa"
                                                            effect="light"
                                                        >
                                                            <button
                                                                type="button"
                                                                class="btn btn-soft-danger waves-effect waves-light btn-sm"
                                                                v-b-popover.hover.left="'Xóa'"
                                                                @click="deleteCustomer(scope.row.id)"
                                                            >
                                                                <i class="ri-delete-bin-6-line"></i>
                                                            </button>
                                                        </el-tooltip> -->
                                                    </div>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
