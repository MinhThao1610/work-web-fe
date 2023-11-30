<script setup>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import WorkMember from "./workMember.vue";
import { users } from "./mockdata";
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
const focusButton = ref('today');
const route = useRoute();

const changeFocusButton = (text) => {
  console.log(text);
  focusButton.value = text;
}

onMounted(() => {
  console.log('route', route.query)

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
    <PageHeader :title="title" :items="items" type="tim" :focusButton="focusButton"
      @changeFocusButton="changeFocusButton" />
    <div class="row">
      <div class="col-9">
        <div id="tim-work">
          <div class="grid">
            <template v-for="(user, index) of users" :key="index">
              <WorkMember :user="user" :check="user.check" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>