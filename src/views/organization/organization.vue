<script setup>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from 'vue';
import OrganizationItem from "./organization-item.vue";
import Masonry from 'masonry-layout';

const title = ref("Widgets");
const items = ref([{
    text: "Velzon",
    href: "/",
    },
    {
    text: "Widgets",
    active: true,
}]);
const focusButton = ref('organization');

const fakeData = [
  {
    header: 'Biz',
    intro: 'Tìm kiếm và phát triển thị trường trong nước và nước ngoài. Duy trì kết nối và chăm sóc khách hàng',
    timLead: 'Mai Chí Thọ',
    email: 'tho.mc@gmail.com',
    phone: '0986451183',
    avatar: 'http://localhost:8080/img/avatar-3.c5c13ab6.jpg',
    listAvatar: [
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
      {
        value: null,
      }
    ]
  },
  {
    header: 'HR',
    intro: 'Tuyển dụng và phát triển nhân sự. Xây dựng văn hóa doanh nghiệp tích cực. Phát triển đối tác nhân sự',
    timLead: 'Vũ Thùy Linh',
    email: 'linh.vt@gmail.com',
    phone: '',
    avatar: 'http://localhost:8080/img/avatar-1.7cd0b5a6.jpg',
    listAvatar: [
    {
        value: null,
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
      {
        value: null,
      }
    ]
  },
  {
    header: 'Production',
    intro: 'Sản xuất phần mềm chất lượng. Phát triển và đào tạo đội ngũ nhân sự sản xuất',
    timLead: 'Nguyễn Hòa',
    email: 'hoa.nguyen@gmail.com',
    phone: '0906022469',
    avatar: 'http://localhost:8080/img/avatar-8.1c618ff8.jpg',
    listAvatar: [
      {
        value: 'http://localhost:8080/img/avatar-9.18344f9e.jpg',
      },
      {
        value: 'http://localhost:8080/img/avatar-3.c5c13ab6.jpg',
      },
      {
        value: null,
      },
      {
        value: 'http://localhost:8080/img/avatar-8.1c618ff8.jpg',
      },
      {
        value: 'http://localhost:8080/img/avatar-1.7cd0b5a6.jpg',
      },
    ]
  },
  {
    header: 'QA',
    intro: 'Đảm bảo chất lượng phần mềm đạt tiêu chuẩn trước khi bàn giao cho khách hàng',
    timLead: 'Nguyễn Thị Huyền Trang',
    email: 'trang.nth@gmail.com',
    phone: '097 871 2448',
    avatar: 'http://localhost:8080/img/avatar-4.da58328b.jpg',
    listAvatar: [
      {
        value: 'http://localhost:8080/img/avatar-4.da58328b.jpg'
      },
      {
        value: 'http://localhost:8080/img/avatar-7.b940ea8a.jpg'
      },
      {
        value: 'http://localhost:8080/img/avatar-10.84f3fa03.jpg'
      },
      {
        value: 'http://localhost:8080/img/avatar-8.1c618ff8.jpg'
      },
    ]
  },
  {
    header: 'Founder',
    intro: 'Xây dựng chiến lược cho công ty. Định hướng phát triển văn hóa cho công ty',
    timLead: 'Nguyễn Văn Thuận',
    email: 'thuan.nc@gmail.com',
    phone: '0968072506',
    avatar: 'http://localhost:8080/img/avatar-9.18344f9e.jpg',
    listAvatar: [
    {
        value: null,
      },
      {
        value: null,
      },
      {
        value: 'http://localhost:8080/img/avatar-9.18344f9e.jpg',
      },
      {
        value: null,
      },
      {
        value: null,
      }
    ]
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
        <div class="list-organization">
          <div class="grid">
            <OrganizationItem 
              v-for="item in fakeData"
              :key="item.header"
              :header="item.header" 
              :intro="item.intro"
              :timLead="item.timLead"
              :email="item.email"
              :phone="item.phone"
              :avatar="item.avatar"
              :listAvatar="item.listAvatar"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- end row-->
  </Layout>
</template>