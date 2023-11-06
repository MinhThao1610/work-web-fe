<script setup>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from 'vue';
import taskComponent from "../../components/taskComponent.vue";

const title = ref("Widgets");
const items = ref([{
    text: "Velzon",
    href: "/",
    },
    {
    text: "Widgets",
    active: true,
}]);

const activeName = ref('second')

const handleClick = (tab, event) => {
  console.log(tab, event);
}

onMounted(() => {

})
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" type="mywork" />
    <div class="row">
      <div class="col-6">
        <div class="box-container">
            <div class="box">
                <div class="mywork-status">
                    <div class="status-text">
                        <span>Bạn có quá nhiều việc hôm nay</span>
                    </div>
                </div>
                <div class="mywork-warning">
                    <div class="warning-text">
                        Bạn đang có 57 công việc tồn. Số 
                        việc tồn đọng quá nhiều. Bạn cần cố 
                        gắng làm việc hiệu quả hơn, hoặc là 
                        lập lại kế hoạch và định nghĩa công 
                        việc hợp lý hơn.
                    </div>
                    <div class="warning-icon-close"></div>
                </div>
            </div>
            <div class="box">
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane label="Hoàn thành" name="first">Hoàn thành</el-tab-pane>
                    <el-tab-pane label="Hôm nay (57)" name="second">
                      <taskComponent 
                        :code="`${'#' + '1847'}`"
                        title="[InGiaPha] Cho phép tài khoản quyền InGiaPhaDesigner đăng nhập"
                        :date="new Date()"
                        status="planned"
                      />
                      <taskComponent 
                        :code="`${'#' + '1847'}`"
                        title="[InGiaPha] Cho phép tài khoản quyền InGiaPhaDesigner đăng nhập"
                        :date="new Date()"
                        status="planned"
                      />
                    </el-tab-pane>
                    <el-tab-pane label="Sắp tới" name="third">Sắp tới</el-tab-pane>
                    <el-tab-pane label="Đang giao" name="fourth">Đang giao</el-tab-pane>
                    <el-tab-pane label="Đang duyệt" name="browsing">Đang duyệt</el-tab-pane>
                </el-tabs>
            </div>
        </div>
      </div>
      <div class="col-5">
        <div class="box-container box-container-right">
          <div class="box-rigth-item">
            <div class="item-left">Ảnh yêu thích của bạn</div>
            <div class="item-right">THÊM ẢNH</div>
          </div>
          <div class="box-rigth-item">
            <div class="item-left">Ghi nhớ nhanh</div>
            <div class="item-right">TẠO MỚI</div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row-->
  </Layout>
</template>