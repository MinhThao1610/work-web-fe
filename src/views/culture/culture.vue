<script setup>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from 'vue';
import Post from "./post.vue";
import CultureCompany from "./culture-company.vue";

const title = ref("Widgets");
const items = ref([{
    text: "Velzon",
    href: "/",
    },
    {
    text: "Widgets",
    active: true,
}]);
const focusButton = ref('culture');

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
        <div class="list-post">
          <Post />
          <Post />
        </div>
      </div>
      <div class="col-6">
        <CultureCompany />
      </div>
    </div>
    <!-- end row-->
  </Layout>
</template>