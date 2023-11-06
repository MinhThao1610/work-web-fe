<script setup>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import WorkMember from "./workMember.vue";

const title = ref("Widgets");
const items = ref([{
    text: "Velzon",
    href: "/",
    },
    {
    text: "Widgets",
    active: true,
}]);
const focusButton = ref('today');
const route = useRoute();

const changeFocusButton = (text) => {
  console.log(text);
  focusButton.value = text;
}

onMounted(() => {
    console.log('route', route.query)
})
</script>

<template>
  <Layout>
    <PageHeader 
      :title="title" 
      :items="items" 
      type="tim" 
      :focusButton="focusButton" 
      @changeFocusButton="changeFocusButton"
    />
    <div class="row">
      <div class="col-9">
        <div id="tim-work">
          <div class="grid" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 160 }'>
            <WorkMember :check="true" />
            <WorkMember :check="false" />
          </div>
        </div>
      </div>
    </div>
    <!-- end row-->
  </Layout>
</template>