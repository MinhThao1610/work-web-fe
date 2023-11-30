<script setup>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref, reactive } from "vue";
import "prismjs";
import "prismjs/themes/prism.css";
import MethodService from "../../service/MethodService";
import DataForm from "./dataListTims";
import { useRouter } from "vue-router";

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

const getListTims = async () => {
    tableData.value = [
        {
            id: '1111',
            name: "Kế toán",
            type: "function",
            isPublic: true,
            status: "hoat-dong"
        },
        {
            id: '2222',
            name: "Dự án 1",
            type: "project",
            isPublic: true,
            status: "dung-hoat-dong"
        },
        {
            id: '33333',
            name: "HR",
            type: "function",
            isPublic: false,
            status: "hoat-dong"
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

const fn_CreateTim = () => {
    router.push({
      name: "timCreate",
    });
};

// tìm kiếm
const fn_TimKiem = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
        loading.value = true;
        tableRules.dataSearch.value["name"] = tableRules.dataSearch.value["name"]
            ? tableRules.dataSearch.value["name"].trim()
            : "";
        tableRules.dataSearch.value["type"] = tableRules.dataSearch.value["type"]
            ? tableRules.dataSearch.value["type"].trim()
            : "";
        tableRules.dataSearch.value["status"] = tableRules.dataSearch.value["status"]
            ? tableRules.dataSearch.value["status"].trim()
            : "";

        // handleDepartment();

        tableRules.filters = MethodService.filterTable(
            JSON.stringify(tableRules.dataSearch)
        );
        tableRules.offset = 0;
        tableRules.page = 1;
        //   gọi lại api
        await getListTims();
    } else return false;
  });
};

const handleClick = (id, type) => {
    if(type === 'view') 
        router.push({
            name: "timView",
            params: { id: id },
        });
    if(type === 'edit')
        router.push({
            name: "timEdit",
            params: { id: id },
        });
};

const getType = (text) => {
    if(text === 'function') return 'Phòng ban chức năng';
    return 'Dự án';
};

const getPublic = (value) => {
    if(value) return 'Công khai';
    return 'Ẩn';
};

const getStatus = (text) => {
    if(text === 'hoat-dong') return 'Hoạt động';
    return 'Dừng hoạt động';
};

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

    await getListTims();
})

</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header align-items-center d-flex">
                        <h4 class="card-title mb-0 flex-grow-1">Danh sách team</h4>
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
                                    @click="fn_CreateTim()"
                                >
                                    <i class="ri-add-circle-line"></i>
                                    Tạo team
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
                                            <b-col md="4">
                                                <el-form-item
                                                    label="Tên team"
                                                    prop="name"
                                                >
                                                    <el-input
                                                        clearable
                                                        v-model="tableRules.dataSearch.value['name']"
                                                        placeholder="Nhập tên team"
                                                        type="text"
                                                    ></el-input>
                                                </el-form-item>
                                            </b-col>
                                            <b-col md="4">
                                                <el-form-item
                                                    label="Loại team"
                                                    prop="type"
                                                >
                                                    <el-select
                                                        v-model="
                                                            tableRules.dataSearch.value['type']
                                                        "
                                                        filterable
                                                        clearable
                                                        placeholder="Chọn loại team"
                                                    >
                                                        <el-option
                                                            v-for="item in DataForm.listType"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value"
                                                        />
                                                    </el-select>
                                                </el-form-item>
                                            </b-col>
                                            <b-col md="4">
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
                                                        v-for="item in DataForm.listStatus"
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
                                            <el-table-column prop="name" label="Tên team" min-width="180" />
                                            <el-table-column prop="type" label="Loại team" min-width="160">
                                                <template #default="scope">
                                                    <div>
                                                        {{ getType(scope.row.type) }}
                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="isPublic" label="Công khai" min-width="120" header-align="center" align="center">
                                                <template #default="scope">
                                                    <div>
                                                        {{ getPublic(scope.row.isPublic) }}
                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="status" label="Trạng thái" min-width="120">
                                                <template #default="scope">
                                                    <div>
                                                        {{ getStatus(scope.row.status) }}
                                                    </div>
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
                                                                @click="handleClick(scope.row.id, 'view')"
                                                            >
                                                                <i class="ri-eye-line"></i>
                                                            </button>
                                                        </el-tooltip>

                                                        <el-tooltip
                                                            content="Sửa"
                                                            effect="light"
                                                        >
                                                            <button
                                                                type="button"
                                                                class="btn btn-soft-success waves-effect waves-light btn-sm"
                                                                v-b-popover.hover.left="'Sửa'"
                                                                @click="handleClick(scope.row.id, 'edit')"
                                                            >
                                                                <i class="ri-edit-box-line"></i>
                                                            </button>
                                                        </el-tooltip>
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

<style scoped>
.el-select {
    width: 100%;
}
</style>
