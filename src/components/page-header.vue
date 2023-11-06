<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  title: String,
  items: Array,
  type: String,
  focusButton: String,
});
const emit = defineEmits([""]);

const changeFocusButton = (text) => {
  emit("changeFocusButton", text);
  
};

</script>

<template>
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div
        class="page-title-box d-sm-flex align-items-center justify-content-between"
      >
        <div class="page-my-work" v-if="props.type === 'mywork'">
          <div class="page-left">
            <div class="page-button">
              <el-button color="#4f62a1" class="button-header" type="primary" plain>CÔNG VIỆC</el-button>
            </div>
            <div class="page-button">
              <el-button color="#4f62a1" type="primary" plain>HỒM THƯ</el-button>
            </div>
            <div class="page-button">
              <el-button color="#4f62a1" type="primary" plain>THỐNG KÊ</el-button>
            </div>
          </div>
          <div class="page-right">
            <div class="page-button">
              <span>Tuần qua</span>
            </div>
            <div class="page-button">
              <span>Tổng số: </span>
              <span>10 </span>
            </div>
            <div class="page-button">
              <span>Hoàn thành: </span>
              <span>10 </span>
            </div>
          </div>
        </div>
        <div class="page-my-work" v-if="props.type === 'company'">
          <div class="page-left">
            <div class="page-button">
              <el-button 
                color="#4f62a1" 
                class="button-header" 
                :class="{
                  active: props.focusButton === 'workfeed'
                }"
                type="primary" 
                plain
                @click="changeFocusButton('workfeed')"
              >
                <router-link to="/company/workfeed">
                  HÔM NAY  
                </router-link>
              </el-button>
            </div>
            <div class="page-button">
              <el-button 
                :class="{
                  active: props.focusButton === 'organization'
                }"
                color="#4f62a1" 
                type="primary" 
                plain
                @click="changeFocusButton('organization')"
              >
                <router-link to="/company/organization">
                  TỔ CHỨC  
                </router-link>
              </el-button>
            </div>
            <div class="page-button">
              <el-button 
                :class="{
                  active: props.focusButton === 'culture'
                }"
                color="#4f62a1" 
                type="primary" 
                plain
                @click="changeFocusButton('culture')"
              >
                <router-link to="/company/culture">
                  VĂN HÓA  
                </router-link>
              </el-button>
            </div>
            <div class="page-button">
              <el-button 
                :class="{
                  active: props.focusButton === 'member'
                }"
                color="#4f62a1" 
                class="button-header" 
                type="primary" 
                plain
                @click="changeFocusButton('member')"
              >
                <router-link to="/company/member">
                  THÀNH VIÊN  
                </router-link>
              </el-button>
            </div>
            <div class="page-button">
              <el-button 
                :class="{
                  active: props.focusButton === 'library'
                }"
                color="#4f62a1" 
                type="primary" 
                plain
                @click="changeFocusButton('library')"
              >
                <router-link to="/company/library">
                  TRI THỨC  
                </router-link>
              </el-button>
            </div>
            <!-- <div class="page-button">
              <el-button 
                :class="{
                  active: props.focusButton === 'english-library'
                }"
                color="#4f62a1" 
                type="primary" 
                plain
                @click="changeFocusButton('english-library')"
              >
                TRI THỨC TIẾNG ANH
              </el-button>
            </div> -->
            <div class="page-button">
              <el-button 
                :class="{
                  active: props.focusButton === 'me'
                }"
                color="#4f62a1" 
                class="button-header" 
                type="primary" 
                plain
                @click="changeFocusButton('me')"
              >
                <router-link to="/company/me">
                  TÔI
                </router-link>
              </el-button>
            </div>
          </div>
        </div>

        <div class="page-my-work" v-if="props.type === 'tim'">
          <div class="page-left">
            <div class="page-button">
              <el-button 
                color="#4f62a1" 
                class="button-header" 
                :class="{
                  active: props.focusButton === 'today'
                }"
                type="primary" 
                plain
                @click="changeFocusButton('today')"
              >
                <router-link to="/tim/today?tim=1234567">
                  HÔM NAY  
                </router-link>
              </el-button>
            </div>
            <div class="page-button">
              <el-button 
                :class="{
                  active: props.focusButton === 'tasks'
                }"
                color="#4f62a1" 
                type="primary" 
                plain
                @click="changeFocusButton('tasks')"
              >
                <router-link to="/tim/tasks?tim=1234567">
                  VIỆC HÀNG NGÀY  
                </router-link>
              </el-button>
            </div>
            <div class="page-button">
              <el-button 
                :class="{
                  active: props.focusButton === 'project'
                }"
                color="#4f62a1" 
                type="primary" 
                plain
                @click="changeFocusButton('project')"
              >
                <router-link to="/tim/project?tim=1234567">
                  DỰ ÁN  
                </router-link>
              </el-button>
            </div>
            <div class="page-button">
              <el-button 
                :class="{
                  active: props.focusButton === 'test'
                }"
                color="#4f62a1" 
                class="button-header" 
                type="primary" 
                plain
                @click="changeFocusButton('test')"
              >
                <router-link to="/tim/test?tim=1234567">
                  QUẢN LÝ TEST  
                </router-link>
              </el-button>
            </div>
            <div class="page-button">
              <el-button 
                :class="{
                  active: props.focusButton === 'statistic'
                }"
                color="#4f62a1" 
                type="primary" 
                plain
                @click="changeFocusButton('statistic')"
              >
                <router-link to="/tim/statistic?tim=1234567">
                  BÁO CÁO  
                </router-link>
              </el-button>
            </div>
          </div>
        </div>
        <!-- <div v-else>
          <h4 class="mb-sm-0">{{ props.title }}</h4>

          <div class="page-title-right">
            <ol class="breadcrumb m-0">
              <li
                class="breadcrumb-item"
                v-for="(item, index) in props.items"
                :key="index"
                :class="{ active: item[0] }"
              >
                <a href="javascript: void(0);">{{ item.text }}</a>
              </li>
            </ol>
          </div>
        </div> -->
      </div>
    </div>
  </div>
  <!-- end page title -->
</template>
