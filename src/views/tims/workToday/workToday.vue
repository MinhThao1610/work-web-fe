<script setup>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { computed, onMounted, ref } from 'vue';
import WorkMember from "./workMember.vue";
import Masonry from 'masonry-layout';
import { useStore } from "vuex";

const store = useStore();
const focusButton = ref('today');
const users = computed(() => store.state.user.users);

const changeFocusButton = (text) => {
  focusButton.value = text;
}

onMounted(() => {
  store.dispatch('user/fetchUsers');
  setTimeout(() => {
    // eslint-disable-next-line no-unused-vars
    const _ = new Masonry('.grid', {
      columnWidth: 450,
      itemSelector: '.grid-item',
      horizontalOrder: true,
      gutter: 10
    });
  }, 10)
})
</script>

<template>
  <Layout>
    <PageHeader type="tim" :focusButton="focusButton" @changeFocusButton="changeFocusButton" />
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