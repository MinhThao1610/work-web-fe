<script setup>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from 'vue';
import Post from "../culture/post.vue";

const title = ref("Widgets");
const items = ref([{
    text: "Velzon",
    href: "/",
    },
    {
    text: "Widgets",
    active: true,
}]);
const focusButton = ref('me');
const page = ref('page');
const textarea = ref('');

const changeFocusButton = (text) => {
  console.log(text);
  focusButton.value = text;
};

const openImg = () => {
    document.querySelector("#profile-img-file-input").click();

    // document.querySelector("#profile-img-file-input").addEventListener("change", function () {
    //     var preview = document.querySelector(".user-profile-image");
    //     var file = document.querySelector(".profile-img-file-input").files[0];
    //     var reader = new FileReader();

    //     reader.addEventListener(
    //         "load",
    //         function () {
    //             preview.src = reader.result;
    //         },
    //         false
    //     );

    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // });
};

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
        <div class="personal-page">
            <div class="member-info-component">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8dAnxssXwRztTJRaP7KAyiyB0COfDnnglzq96-zhVmZO079vcU-y-OqooATU-vwTcKXU&usqp=CAU" alt="avatar">
                <div class="member-info">
                    <span class="name">Nguyễn Văn A</span>
                    <span class="text-italic">intern | Production</span>
                    <div class="info-me">
                        <span class="title">B: </span>
                        <span>16/10/2000</span>
                    </div>
                    <div class="info-me">
                        <span class="title">E: </span>
                        <span>nnguyendinhlamm@gmail.com</span>
                    </div>
                    <div class="info-me">
                        <span class="title">P: </span>
                        <span>0942034838</span>
                    </div>
                    <div class="info-me">
                        <span class="title">A: </span>
                        <span>Trung Hòa, Cầu Giấy, Hà Nội</span>
                    </div>
                    <div class="info-me">
                        <span class="title">S: </span>
                        <span>Đang làm</span>
                    </div>
                </div>
            </div>

            <div class="page-me">
                <div class="nav-bar">
                    <div 
                        class="content" 
                        :class="{active: page === 'page'}"
                        @click="page = 'page'" 
                    >
                        <i class="ri-history-fill"></i>
                        <span>Dòng thời gian</span>
                    </div>
                    <div 
                        class="content" 
                        :class="{active: page === 'create'}"
                        @click="page = 'create'"
                    >
                        <i class="ri-file-edit-line"></i>
                        <span>Tạo bài viết</span>
                    </div>
                </div>

                <div class="create-post" v-if="page === 'create'">
                    <div class="create-header">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8dAnxssXwRztTJRaP7KAyiyB0COfDnnglzq96-zhVmZO079vcU-y-OqooATU-vwTcKXU&usqp=CAU" alt="avatar">
                        <span class="name">Nguyễn Văn A</span>
                    </div>
                    <div class="create-body">
                        <el-input
                            v-model="textarea"
                            autosize
                            type="textarea"
                            placeholder="Bạn có gì chia sẻ?"
                        />
                    </div>
                    <div class="post-hr"></div>
                    <div class="create-footer">
                        <input id="profile-img-file-input" type="file" class="profile-img-file-input" accept="image/png, image/jpeg">
                        <div for="profile-img-file-input" class="up-image profile-photo-edit avatar-xs" @click="openImg()">
                            <i class="bx bxs-camera"></i>
                        </div>
                        <div class="button-submit">
                            <el-button type="primary" plain disabled>Chia sẻ</el-button>
                        </div>
                    </div>
                </div>

                <div class="list-post" v-else>
                    <Post />
                    <Post />
                </div>
            </div>
        </div>
      </div>
    </div>
    <!-- end row-->
  </Layout>
</template>