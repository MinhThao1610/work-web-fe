<script setup>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from 'vue';
import WorkfeedItem from "./workfeed-item.vue";

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
      <div class="col-6">
        <WorkfeedItem header="1907001 - App du lịch" />
        <WorkfeedItem header="2205001 - CEM" />
        <WorkfeedItem header="Siten2101 - Việt Tộc" />
      </div>
    </div>
    <!-- end row-->
  </Layout>
</template>