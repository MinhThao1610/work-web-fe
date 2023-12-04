<script setup>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref, reactive } from "vue";
import "prismjs";
import "prismjs/themes/prism.css";
import MethodService from "../../service/MethodService";
import DataForm from "./dataForm";
import { useRouter } from "vue-router"; 
import { ElNotification } from 'element-plus'; 

const title = ref("Danh sách bài viết văn hóa");
const items = [
    {
        text: "Danh sách bài viết văn hóa",
        href: "/milestone/table",
    },
    {
        text: "Danh sách bài viết văn hóa",
        active: true,
    },
];
const tableData = ref([]);
let loading = ref(true);
const router = useRouter();
const tableRules = reactive(MethodService.copyObject(DataForm.tableRules));
const validForm = reactive({ value: DataForm.tableRules.dataSearch.valid });

const dialogVisible = ref(false);
const libDeleteId = ref('');

const getListMid = async () => {
    tableData.value = [
        {
            id: '1111',
            title: "On this day - Ngày này năm xưa",
            datetime: "03/12/2023",
            isShow: true,
        },
        {
            id: '2222',
            title: "[SITEN MEMBER'S BIRTHDAY] ",
            datetime: "16/10/2023",
            isShow: true,
        },
        {
            id: '33333',
            title: "On this day - Ngày này năm xưa",
            datetime: "10/11/2023",
            isShow: false,
        },
        {
            id: '44444',
            title: "Lazy Day #2",
            datetime: "10/07/2023",
            isShow: true,
        },
        {
            id: '55555',
            title: "Chúc mừng Ngày Phụ nữ Việt Nam 20/10",
            datetime: "20/10/2023",
            isShow: true,
        },
        {
            id: '66666',
            title: "[SITEN MEMBER'S BIRTHDAY] ",
            datetime: "1/11/2023",
            isShow: true,
        },
    ];
    loading.value = false;
    // gọi api
};

// hiển thị form tìm kiếm
const fn_showFormTimKiem = () => {
    tableRules.showFormSearch = !tableRules.showFormSearch;
};

const fn_CreateMil = () => {
    router.push({
      name: "milestoneCreate",
    });
};

// tìm kiếm
const fn_TimKiem = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
        loading.value = true;
        tableRules.dataSearch.value["title"] = tableRules.dataSearch.value["title"]
            ? tableRules.dataSearch.value["title"].trim()
            : "";

        tableRules.filters = MethodService.filterTable(
            JSON.stringify(tableRules.dataSearch)
        );
        tableRules.offset = 0;
        tableRules.page = 1;
        //   gọi lại api
        await getListMid();
    } else return false;
  });
};

const handleClick = (id, type) => {
    libDeleteId.value = '';
    if(type === 'view')
        router.push({
            name: "milestoneView",
            params: { id: id },
        });
    if(type === 'edit')
        router.push({
            name: "milestoneEdit",
            params: { id: id },
        });
    if(type === 'delete') {
        libDeleteId.value = id;
        dialogVisible.value = true;
    }
};

const openNotiSuccess = () => {
    ElNotification({
        title: 'Thông báo',
        message: 'Xóa bài viết thành công',
        type: 'success',
    })
};

const openNotiErr = () => {
  ElNotification({
    title: 'Lỗi',
    message: 'Xóa bài viết thất bại!',
    type: 'error',
  })
}

const deleteMid = () => {
    if(libDeleteId.value) {
        // gọi api
        // sửa thành công
        // gọi lại api lấy danh sách
        openNotiSuccess();
        dialogVisible.value = false;
    } else {
        dialogVisible.value = false;
        openNotiErr();
    }
};

const getShow = (value) => {
    if(value) return 'Hiển thị';
    return "Ẩn";
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

    await getListMid();
});

</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header align-items-center d-flex">
                        <h4 class="card-title mb-0 flex-grow-1">Danh sách bài viết Văn hóa</h4>
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
                                    @click="fn_CreateMil()"
                                >
                                    <i class="ri-add-circle-line"></i>
                                    Tạo bài viết
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
                                            <b-col md="6">
                                                <el-form-item
                                                    label="Tên bài viết"
                                                    prop="title"
                                                >
                                                    <el-input
                                                        clearable
                                                        v-model="tableRules.dataSearch.value['title']"
                                                        placeholder="Nhập tên bài viết"
                                                        type="text"
                                                    ></el-input>
                                                </el-form-item>
                                            </b-col>
                                            <b-col md="6">
                                                <el-form-item
                                                    label="Trạng thái"
                                                    prop="isShow"
                                                >
                                                    <el-select v-model="tableRules.dataSearch.value['isShow']" placeholder="Chọn trạng thái bài viết">
                                                        <el-option
                                                        v-for="item in DataForm.listShow"
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
                                            <el-table-column prop="title" label="Tên" min-width="200" />
                                            <el-table-column prop="datetime" label="Thời gian của bài viết" min-width="140" />
                                            <el-table-column prop="isShow" label="Hiển thị" min-width="140">
                                                <template #default="scope">
                                                    <div>
                                                        {{ getShow(scope.row.isShow) }}
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
                                                        <el-tooltip
                                                            content="Xóa"
                                                            effect="light"
                                                        >
                                                            <button
                                                                type="button"
                                                                class="btn btn-soft-danger waves-effect waves-light btn-sm"
                                                                v-b-popover.hover.left="'Xóa'"
                                                                @click="handleClick(scope.row.id, 'delete')"
                                                            >
                                                                <i class="ri-delete-bin-6-line"></i>
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
            <el-dialog
                v-model="dialogVisible"
                title="Xác nhận"
                width="30%"
                center
            >
                <span>Bạn có chắc muốn xóa nhân viên này?</span>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Quay lại</el-button>
                    <el-button type="primary" @click="deleteMid()">
                        Xóa
                    </el-button>
                </span>
                </template>
            </el-dialog>
        </div>
    </Layout>
</template>
