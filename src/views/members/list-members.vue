<script setup>
import { onMounted, defineProps } from 'vue';
// import account from "@/assets/images/account.jpg";
import MemberInfoComponent from '../../components/member-info-component.vue';
import Masonry from 'masonry-layout';

const props = defineProps({
    header: String,
    intro: String,
    timLead: String,
    email: String,
    phone: String,
});

const fakeData = [
    {
        name: 'Nguyễn Đình Lâm',
        address: 'Trung Hòa, Cầu Giấy, Hà Nội',
        url: 'http://localhost:8080/img/avatar-7.b940ea8a.jpg',
        postion: 'intern | Production',
        email: 'nnguyendinhlamm@gmail.com',
        phone: '0942034838',
    },
    {
        name: 'Phạm Trung Sơn',
        address: '',
        url: 'http://localhost:8080/img/avatar-8.1c618ff8.jpg',
        postion: 'timer | Production',
        email: 'phamtrungson2703@gmail.com',
        phone: '0365618343',
    },
    {
        name: 'Nguyễn Thị Linh Dương',
        address: 'Trần Cung, Cổ Nhuế 1, Bắc Từ Liêm, Hà Nội',
        url: 'http://localhost:8080/img/avatar-1.7cd0b5a6.jpg',
        postion: 'timer | QA',
        email: 'duong.ntl@siten.vn',
        phone: '0337067403',
    },
    {
        name: 'Nguyễn Thị Hồng Thắm',
        address: 'Trần Bình, phường Mai Dịch, Cầu Giấy, Hà Nội',
        url: 'https://timwook.com/api/v2/file/thumb?id=6459fea071c39b1850c3823d&r=square&w=200',
        postion: 'partner | Production',
        email: 'tham.nth@siten.vn',
        phone: '0988279043',
    },
    {
        name: 'Nguyễn Minh Hiếu',
        address: '',
        url: '	https://timwook.com/api/v2/file/thumb?id=64f6b49471c39b1fa4df875c&r=square&w=200',
        postion: 'intern | Production',
        email: 'hieunguyenminh1501@gmail.com',
        phone: '0964946027',
    },
    {
        name: 'Nguyễn Thị Minh Thu',
        address: 'Giao Tất A, Kim Sơn, Gia Lâm, Hà Nội',
        url: 'https://timwook.com/api/v2/file/thumb?id=6459fe4371c39b1850c38215&r=square&w=200',
        postion: 'timer | QA',
        email: 'thu.ntm@siten.vn',
        phone: '0338320337',
    },
    {
        name: 'Mai Vũ Huyền Anh',
        address: '',
        url: 'https://timwook.com/api/v2/file/thumb?id=6459fe3471c39b1850c3820d&r=square&w=200',
        postion: 'timer | HR',
        email: 'anh.mvh@siten.vn',
        phone: '0339894018',
    },
    {
        name: '',
        address: '',
        url: null,
        postion: '',
        email: '',
        phone: '',
    },
    {
        name: '',
        address: '',
        url: null,
        postion: '',
        email: '',
        phone: '',
    },
    {
        name: '',
        address: '',
        url: null,
        postion: '',
        email: '',
        phone: '',
    },
    {
        name: '',
        address: '',
        url: null,
        postion: '',
        email: '',
        phone: '',
    },
];

onMounted(() => {
    console.log(props)

    setTimeout(() => {
        const msry = new Masonry( '.grid', {
            columnWidth: 200,
            itemSelector: '.grid-item',
            horizontalOrder: true,
            gutter: 10
        });
        console.log(msry)
    }, 0)
})
</script>

<template>
    <div class="list-members">
        <div class="grid">
            <MemberInfoComponent 
                v-for="item in fakeData"
                :key="item.name"
                :name="item.name"
                :address="item.address"
                :url="item.url"
                :postion="item.postion"
                :email="item.email"
                :phone="item.phone" 
            />
        </div>
    </div>
</template>