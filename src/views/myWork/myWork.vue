<script setup>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { computed, onMounted, ref } from 'vue';
import taskComponent from "../../components/taskComponent.vue";
import { useStore } from "vuex";

const store = useStore();
const title = ref("Widgets");
const items = ref([{
    text: "Velzon",
    href: "/",
    },
    {
    text: "Widgets",
    active: true,
}]);

const activeName = ref('second');
const focusButton = ref('mywork');
const tasks = computed(() => store.state.task.tasks);

const handleClick = (tab, event) => {
  console.log(tab, event);
};


const changeFocusButton = (text) => {
  console.log(text);
  focusButton.value = text;
}

onMounted(() => {
  store.dispatch('task/fetchTasks');
})
</script>

<template>
  <Layout>
    <PageHeader 
      :title="title" 
      :items="items" 
      type="mywork"
      :focusButton="focusButton" 
      @changeFocusButton="changeFocusButton"
    />
    <div class="row">
      <div class="col-6">
        <div class="box-container">
            <div class="box">
                <div class="mywork-status success">
                    <div class="status-text">
                        <span>Công việc hôm nay của bạn</span>
                    </div>
                </div>
                <!-- <div class="mywork-status warning">
                    <div class="status-text">
                        <span>Bạn có quá nhiều việc hôm nay</span>
                    </div>
                </div> -->
                <!-- <div class="mywork-warning">
                    <div class="warning-text">
                        Bạn đang có 57 công việc tồn. Số 
                        việc tồn đọng quá nhiều. Bạn cần cố 
                        gắng làm việc hiệu quả hơn, hoặc là 
                        lập lại kế hoạch và định nghĩa công 
                        việc hợp lý hơn.
                    </div>
                    <div class="warning-icon-close"></div>
                </div> -->
            </div>
            <div class="box">
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane :label="`Hoàn thành (${tasks.filter(x => x.status === 'done').length})`" name="first">
                      <taskComponent 
                        v-for="item in tasks.filter(x => x.status === 'done')"
                        :key="item.code"
                        :code="item.code"
                        :title="item.title"
                        :date="item.date"
                        status="done"
                        :color="item.color"
                        :task="item"
                      />
                    </el-tab-pane>
                    <el-tab-pane :label="`Hôm nay (${tasks.filter(x => x.status !== 'done').length})`" name="second">
                      <taskComponent 
                        v-for="item in tasks.filter(x => x.status !== 'done')"
                        :key="item.code"
                        :code="item.code"
                        :title="item.title"
                        :date="item.date"
                        :status="item.status"
                        :color="item.color"
                        :task="item"
                      />
                    </el-tab-pane>
                    <el-tab-pane label="Sắp tới" name="third">
                      <span class="not-work">
                        <i class="ri-information-line"></i>
                        Bạn không có việc sắp tới.</span>
                    </el-tab-pane>
                    <el-tab-pane label="Đang giao" name="fourth">
                      <span class="not-work">
                        <i class="ri-information-line"></i>
                        Bạn không có việc đang giao.</span>
                    </el-tab-pane>
                    <el-tab-pane label="Đang duyệt" name="browsing">
                      <span class="not-work">
                        <i class="ri-information-line"></i>
                        Bạn không có việc đang duyệt.</span>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
      </div>
      <div class="col-5">
        <div class="box-container box-container-right">
          <div class="box-rigth-item">
            <div class="item-left">Ảnh yêu thích của bạn</div>
            <div class="item-right">THÊM ẢNH</div>
          </div>
          <div class="box-rigth-item">
            <div class="item-left">Ghi nhớ nhanh</div>
            <div class="item-right">TẠO MỚI</div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row-->
  </Layout>
</template>