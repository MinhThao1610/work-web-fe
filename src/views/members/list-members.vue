<script setup>
import { onMounted, defineProps } from 'vue';
// import account from "@/assets/images/account.jpg";
import MemberInfoComponent from '../../components/member-info-component.vue';

const props = defineProps({
    header: String,
    intro: String,
    timLead: String,
    email: String,
    phone: String,
});

onMounted(() => {
    console.log(props)
})
</script>

<template>
    <div class="list-members">
        <div class="grid" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 160 }'>
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