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
            <MemberInfoComponent address="Trung Hòa, Cầu Giấy, Hà Nội" />
            <MemberInfoComponent address="Trung Hòa, Cầu Giấy, Hà Nội Trung Hòa, Cầu Giấy, Hà Nội" />
            <MemberInfoComponent address="Trung Hòa, Cầu Giấy, Hà Nội Trung Hòa, Cầu Giấy, Hà Nội" />
            <MemberInfoComponent address="Trung Hòa, Cầu Giấy, Hà Nội" />
            <MemberInfoComponent address="Trung Hòa, Cầu Giấy, Hà Nội" />
            <MemberInfoComponent address="Trung Hòa, Cầu Giấy, Hà Nội" />
            <MemberInfoComponent address="Trung Hòa, Cầu Giấy, Hà Nội Trung Hòa, Cầu Giấy, Hà Nội" />
            <MemberInfoComponent address="Trung Hòa, Cầu Giấy, Hà Nội" />
            <MemberInfoComponent address="Trung Hòa, Cầu Giấy, Hà Nội" />
            <MemberInfoComponent address="Trung Hòa, Cầu Giấy, Hà Nội aaaaaaaaaaa" />
            <MemberInfoComponent address="Trung Hòa, Cầu Giấy, Hà Nội" />
        </div>
    </div>
</template>