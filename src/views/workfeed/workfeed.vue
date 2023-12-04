<script setup>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from 'vue';
import WorkfeedItem from "./workfeed-item.vue";
import Masonry from 'masonry-layout';
import account from "@/assets/images/account.jpg";

const title = ref("Widgets");
const items = ref([{
    text: "Velzon",
    href: "/",
    },
    {
    text: "Widgets",
    active: true,
}]);
const focusButton = ref('workfeed');

const listTim = [
  {
    title: '2205001 - CEM',
    data: [
      {
        text: '[Web][Primary] Đổi ngôn ngữ',
        avatar: 'http://localhost:8080/img/avatar-9.18344f9e.jpg',
      },
      {
        text: '[Tài liệu] SRS các phần còn lại của phase 4',
        avatar: 'http://localhost:8080/img/avatar-1.7cd0b5a6.jpg',
      },
    ],
    avatar: [
      {
        value: 'http://localhost:8080/img/avatar-3.c5c13ab6.jpg',
      },
      {
        value: 'http://localhost:8080/img/avatar-8.1c618ff8.jpg',
      },
      {
        value: 'http://localhost:8080/img/avatar-9.18344f9e.jpg',
      },
      {
        value: 'http://localhost:8080/img/avatar-1.7cd0b5a6.jpg',
      },
    ],
  },
  {
    title: '1907001 - App du lịch',
    data: [
      {
        text: '[Điểm đến an toàn]/[Duyệt/Cập nhật] Chưa check trùng trường hợp trùng tên và địa chỉ',
        avatar: 'http://localhost:8080/img/avatar-3.c5c13ab6.jpg',
      },
      {
        text: '[370] [DLVNAT]/[Thông tin cá nhân] Bổ sung thêm "Địa chỉ thường trú" và "Địa chỉ nơi ở hiện tại" cho khách du lịch',
        avatar: 'http://localhost:8080/img/avatar-3.c5c13ab6.jpg',
      },
      {
        text: '[441][HDDLVN] : Bổ sung chức năng Liên kết + Nạp tiền trong phần "Thẻ"',
        avatar: 'http://localhost:8080/img/avatar-8.1c618ff8.jpg',
      },
      {
        text: '[3224] [DLVN - HDDLVN]: Bổ sung chức năng mua vé Văn miếu',
        avatar: 'http://localhost:8080/img/avatar-8.1c618ff8.jpg',
      },
      {
        text: 'Tạo file Google Sheet lưu tất cả các task chưa làm ở sprint hiện tại',
        avatar: account,
      },
    ],
    avatar: [
      {
        value: 'http://localhost:8080/img/avatar-3.c5c13ab6.jpg',
      },
      {
        value: 'http://localhost:8080/img/avatar-8.1c618ff8.jpg',
      },
      {
        value: account,
      },
    ],
  },
  {
    title: '2201001 - Phần mềm Kho',
    data: [
      {
        text: 'API thêm mới thiết bị',
        avatar: 'http://localhost:8080/img/avatar-3.c5c13ab6.jpg',
      },
      {
        text: 'API sửa thông tin thiết bị',
        avatar: account,
      },
      {
        text: 'API xoá thiết bị',
        avatar: 'http://localhost:8080/img/avatar-8.1c618ff8.jpg',
      },
      {
        text: 'API lấy danh sách và tìm kiếm thiết bị',
        avatar: 'http://localhost:8080/img/avatar-8.1c618ff8.jpg',
      },
      {
        text: 'Update lại giao diện cho longterm- màn hình Thay thế thiết bị',
        avatar: account,
      },
    ],
    avatar: [
      {
        value: 'http://localhost:8080/img/avatar-3.c5c13ab6.jpg',
      },
      {
        value: 'http://localhost:8080/img/avatar-8.1c618ff8.jpg',
      },
      {
        value: account,
      },
    ],
  },
]

const changeFocusButton = (text) => {
  console.log(text);
  focusButton.value = text;

}

onMounted(() => {
  setTimeout(() => {
    const msry = new Masonry('.grid', {
      columnWidth: 450,
      itemSelector: '.grid-item',
      horizontalOrder: true,
      gutter: 10
    });
    console.log(msry)
  }, 0)
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
      <div class="col-12">
        <div class="list-tim-fuction">
          <div class="grid">
            <WorkfeedItem 
              v-for="item in listTim" 
              :key="item.title"
              :header="item.title" 
              :data="item.data"
              :avatar="item.avatar"
            />
          </div>
        </div>
        <!-- <WorkfeedItem header="Siten2101 - Việt Tộc" />
        <WorkfeedItem header="1907001 - App du lịch" />
        <WorkfeedItem header="2205001 - CEM" />
        <WorkfeedItem header="Siten2101 - Việt Tộc" /> -->
      </div>
    </div>
    <!-- end row-->
  </Layout>
</template>