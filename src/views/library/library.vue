<script setup>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue';

const title = ref("Widgets");
const items = ref([{
    text: "Velzon",
    href: "/",
    },
    {
    text: "Widgets",
    active: true,
}]);
const focusButton = ref('library');
const input = ref('');
const showLibraryDetail = ref(false);

const changeFocusButton = (text) => {
  console.log(text);
  focusButton.value = text;
}

onMounted(() => {

})
</script>

<template>
  <Layout>
    <PageHeader 
      :title="title" 
      :items="items" 
      type="company" 
      :focusButton="focusButton" 
      @changeFocusButton="changeFocusButton"
    />
    <div class="row">
      <div class="col-9">
        <div class="library">
            <div class="library-box">
                <div class="library-header">
                    <div class="header-title">
                        <i class="ri-sun-fill"></i>
                        <span>Nổi bật</span>
                    </div>
                    <div class="search-library">
                        <el-input
                            v-model="input"
                            placeholder="Gõ tựa đề"
                            :suffix-icon="Search"
                        />
                    </div>
                </div>
                <div class="library-content">
                    <div class="library-item" @click="showLibraryDetail = true">
                        <span class="library-label">Phân nhóm vai trò</span>
                        <span class="library-group">Nhân viên mới</span>
                    </div>
                    <div class="library-item" @click="showLibraryDetail = true">
                        <span class="library-label">Hướng dẫn checkin giờ làm việc</span>
                        <span class="library-group">Nhân viên mới</span>
                    </div>
                    <div class="library-item" @click="showLibraryDetail = true">
                        <span class="library-label">Quy định về việc nghỉ phép / WFH</span>
                        <span class="library-group">Quy định</span>
                    </div>
                    <div class="library-item" @click="showLibraryDetail = true">
                        <span class="library-label">Con đường sự nghiệp tại Siten</span>
                        <span class="library-group">Quy định</span>
                    </div>
                    <div class="library-item" @click="showLibraryDetail = true">
                        <span class="library-label">Tinh thần lãnh đạo</span>
                        <span class="library-group">Tri thức</span>
                    </div>
                </div>
            </div>

            <div class="library-box">
                <div class="library-header">
                    <div class="header-title">
                        <i class="ri-spam-2-fill"></i>
                        <span>5 bài mới</span>
                    </div>
                </div>
                <div class="library-content">
                    <div class="library-item" @click="showLibraryDetail = true">
                        <span class="library-label">Phân nhóm vai trò</span>
                        <span class="library-group">Nhân viên mới</span>
                    </div>
                    <div class="library-item" @click="showLibraryDetail = true">
                        <span class="library-label">Hướng dẫn checkin giờ làm việc</span>
                        <span class="library-group">Nhân viên mới</span>
                    </div>
                    <div class="library-item" @click="showLibraryDetail = true">
                        <span class="library-label">Quy định về việc nghỉ phép / WFH</span>
                        <span class="library-group">Quy định</span>
                    </div>
                    <div class="library-item" @click="showLibraryDetail = true">
                        <span class="library-label">Con đường sự nghiệp tại Siten</span>
                        <span class="library-group">Quy định</span>
                    </div>
                    <div class="library-item" @click="showLibraryDetail = true">
                        <span class="library-label">Tinh thần lãnh đạo</span>
                        <span class="library-group">Tri thức</span>
                    </div>
                </div>
            </div>

            <div class="library-box">
                <div class="library-header">
                    <div class="header-title">
                        <i class="ri-information-fill"></i>
                        <span>Cần thiết</span>
                    </div>
                </div>
                <div class="library-content">
                    <div class="library-item" @click="showLibraryDetail = true">
                        <span class="library-label">Phân nhóm vai trò</span>
                        <span class="library-group">Nhân viên mới</span>
                    </div>
                    <div class="library-item" @click="showLibraryDetail = true">
                        <span class="library-label">Hướng dẫn checkin giờ làm việc</span>
                        <span class="library-group">Nhân viên mới</span>
                    </div>
                    <div class="library-item" @click="showLibraryDetail = true">
                        <span class="library-label">Quy định về việc nghỉ phép / WFH</span>
                        <span class="library-group">Quy định</span>
                    </div>
                    <div class="library-item" @click="showLibraryDetail = true">
                        <span class="library-label">Con đường sự nghiệp tại Siten</span>
                        <span class="library-group">Quy định</span>
                    </div>
                    <div class="library-item" @click="showLibraryDetail = true">
                        <span class="library-label">Tinh thần lãnh đạo</span>
                        <span class="library-group">Tri thức</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    <el-drawer
        v-model="showLibraryDetail"
        direction="rtl"
        size="40%"
        class="task-info-drawer"
    >
    <template #header="{ titleId, titleClass }">
        <div :id="titleId" :class="titleClass">
            <el-tooltip
                class="box-item"
                effect="dark"
                content="Chỉnh sửa"
                placement="bottom"
                hide-after="100"
            >
                <el-button type="primary" :icon="Edit" circle />
            </el-tooltip>
            <el-tooltip
                class="box-item"
                effect="dark"
                content="Xóa"
                placement="bottom"
                hide-after="100"
            >
                <el-button type="danger" :icon="Delete" circle />
            </el-tooltip>
        </div>
    </template>
        <div>
            aaaaaaaaaaaa
        </div>
    </el-drawer>
    <!-- end row-->
  </Layout>
</template>