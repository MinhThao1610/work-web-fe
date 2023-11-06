<script setup>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from 'vue';
import OrganizationItem from "./organization-item.vue";

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
        <div class="list-organization">
            <OrganizationItem 
                header="Biz" 
                intro="Xây dựng văn hóa doanh nghiệp tích cực. Tổ chức các sự kiên trong công ty"
                timLead="Vũ Thanh Tú"
                email="vuthanhtu2611gmail.com"
                phone="09735838178"
            />
            <OrganizationItem 
                header="Biz" 
                intro="Xây dựng văn hóa doanh nghiệp tích cực. Tổ chức các sự kiên trong công ty. Xây dựng văn hóa doanh nghiệp tích cực. Tổ chức các sự kiên trong công ty"
                timLead="Vũ Thanh Tú"
                email="vuthanhtu2611gmail.com"
                phone="09735838178"
            />
            <OrganizationItem 
                header="Biz" 
                intro="Xây dựng văn hóa doanh nghiệp tích cực. Tổ chức các sự kiên trong công ty"
                timLead="Vũ Thanh Tú"
                email="vuthanhtu2611gmail.com"
                phone="09735838178"
            />
            <OrganizationItem 
                header="Biz" 
                intro="Xây dựng văn hóa doanh nghiệp tích cực. Tổ chức các sự kiên trong công ty"
                timLead="Vũ Thanh Tú"
                email="vuthanhtu2611gmail.com"
                phone="09735838178"
            />
            <OrganizationItem 
                header="Biz" 
                intro="Xây dựng văn hóa doanh nghiệp tích cực. Tổ chức các sự kiên trong công ty"
                timLead="Vũ Thanh Tú"
                email="vuthanhtu2611gmail.com"
                phone="09735838178"
            />
        </div>
      </div>
    </div>
    <!-- end row-->
  </Layout>
</template>