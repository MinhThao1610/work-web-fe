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

const fakeData = [
  {
    code: "#5",
    title: "[Node gia phả]/[Cập nhật thông tin]/[Giấy tờ] MM Mặc định bật camera sau khi chọn chức năng chụp ảnh",
    date: new Date(),
    status: 'planned',
    color: '#ff8000',
  },
  {
    code: "#8",
    title: "[APP][Cây gia phả] Vẽ cây gia phả với cấu hình con vẽ từ người ngoài họ",
    status: 'planned',
    color: '#ff8000',
  },
  {
    code: "#11",
    title: "[Chung]/[Android] Lỗi bị che btn khi bật nút điều hướng ảo",
    status: 'doing',
    color: '#006cd9',
  },
  {
    code: "#20",
    title: "[App][VHV] Code các màn danh sách, xem chi tiết, sửa của Vĩnh hằng viên",
    status: 'verifying',
    color: '#ff4081',
  },
]

const activeName = ref('second');
const focusButton = ref('mywork');

const handleClick = (tab, event) => {
  console.log(tab, event);
};


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
      type="mywork"
      :focusButton="focusButton" 
      @changeFocusButton="changeFocusButton"
    />
    <div class="row">
      <div class="col-6">
        <div class="box-container">
            <div class="box">
                <div class="mywork-status success">
                    <div class="status-text">
                        <span>Công việc hôm nay của bạn</span>
                    </div>
                </div>
                <!-- <div class="mywork-status warning">
                    <div class="status-text">
                        <span>Bạn có quá nhiều việc hôm nay</span>
                    </div>
                </div> -->
                <!-- <div class="mywork-warning">
                    <div class="warning-text">
                        Bạn đang có 57 công việc tồn. Số 
                        việc tồn đọng quá nhiều. Bạn cần cố 
                        gắng làm việc hiệu quả hơn, hoặc là 
                        lập lại kế hoạch và định nghĩa công 
                        việc hợp lý hơn.
                    </div>
                    <div class="warning-icon-close"></div>
                </div> -->
            </div>
            <div class="box">
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane label="Hoàn thành (1)" name="first">
                      <taskComponent 
                        code="#2"
                        title="[Cây gia phả - PC] Báo lỗi validate ngày tháng năm mất"
                        status="done"
                        color="#0bb251"
                      />
                    </el-tab-pane>
                    <el-tab-pane label="Hôm nay (9)" name="second">
                      <taskComponent 
                        v-for="item in fakeData"
                        :key="item.code"
                        :code="item.code"
                        :title="item.title"
                        :date="item.date"
                        :status="item.status"
                        :color="item.color"
                      />
                    </el-tab-pane>
                    <el-tab-pane label="Sắp tới" name="third">
                      <span class="not-work">
                        <i class="ri-information-line"></i>
                        Bạn không có việc sắp tới.</span>
                    </el-tab-pane>
                    <el-tab-pane label="Đang giao" name="fourth">
                      <span class="not-work">
                        <i class="ri-information-line"></i>
                        Bạn không có việc đang giao.</span>
                    </el-tab-pane>
                    <el-tab-pane label="Đang duyệt" name="browsing">
                      <span class="not-work">
                        <i class="ri-information-line"></i>
                        Bạn không có việc đang duyệt.</span>
                    </el-tab-pane>
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