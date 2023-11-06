<script setup>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from 'vue';
import MemberNew from "./member-new.vue";
import ListMembers from "./list-members.vue";
import { Search } from '@element-plus/icons-vue'

const title = ref("Widgets");
const items = ref([{
    text: "Velzon",
    href: "/",
    },
    {
    text: "Widgets",
    active: true,
}]);
const focusButton = ref('member');
const input = ref('');

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
        <div class="members">
          <MemberNew />
          <div class="info-members-company">
            <div class="count-members">
              <i class="ri-spam-2-fill"></i>
              <span>Đang làm việc tại công ty (40)</span>
            </div>
            <div class="search-member">
              <el-input
                v-model="input"
                class="m-2"
                placeholder="Tìm kiếm theo tên"
                :suffix-icon="Search"
              />
            </div>
          </div>
          <ListMembers />
        </div>
      </div>
    </div>
    <!-- end row-->
  </Layout>
</template>