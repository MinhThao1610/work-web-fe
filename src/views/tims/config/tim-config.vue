<script setup>
import { onMounted, ref } from "vue";
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header";
import { useRoute } from "vue-router";
import InfoConfig from "./info-config.vue";
import MemberConfig from "./member-config.vue";
import SettingConfig from "./setting-config.vue";

const route = useRoute();
const listEmployees = ref([]);
const focusButton = ref("config");
const activeButton = ref('info')

const changeFocusButton = (text) => {
    focusButton.value = text;
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
        <PageHeader type="tim" :focusButton="focusButton" @changeFocusButton="changeFocusButton" />
        <div class="row tim-config">
            <div class="col-lg-3">
                <div class="menu-config">
                    <div class="title-config">
                        Menu
                    </div>
                    <div class="content-config">
                        <div 
                            class="content" 
                            :class="{active: activeButton === 'info'}"
                            @click="activeButton = 'info'"
                        >
                            <i class="ri-information-fill"></i>
                            <span>Thông tin chung</span>
                        </div>
                        <div 
                            class="content" 
                            :class="{active: activeButton === 'member'}"
                            @click="activeButton = 'member'"
                        >
                            <i class="ri-team-fill"></i>
                            <span>Quản lý thành viên</span>
                        </div>
                        <div 
                            class="content" 
                            :class="{active: activeButton === 'setting'}"
                            @click="activeButton = 'setting'"
                        >
                            <i class="ri-settings-4-fill"></i>
                            <span>Cấu hình thông tin công việc</span>
                        </div>
                        <!-- <div 
                            class="content" 
                            :class="{active: activeButton === 'report'}"
                            @click="activeButton = 'report'"
                        >
                            <i class="ri-file-list-3-fill"></i>
                            <span>Tạo báo cáo</span>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="col-lg-9">
                <InfoConfig v-show="activeButton === 'info'" header="Thông tin chung" />
                <MemberConfig v-show="activeButton === 'member'" header="Danh sách thành viên" />
                <SettingConfig v-show="activeButton === 'setting'" header="Cấu hình thông tin công việc" />
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
