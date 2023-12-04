<script setup>
import { onMounted, defineProps } from 'vue';

const props = defineProps({
    header: String,
});

onMounted(() => {
    console.log(props)
})
</script>

<template>
    <div class="post-item">
        <div class="post-header">
            <i class="ri-bookmark-3-fill"></i>
            <span class="post-title">On this day - Ngày này năm xưa</span>
            <span class="post-date">17/10/2023</span>
        </div>
        <div class="post-container">
            <div class="post-content">
                <div>Họ và tên: Nguyễn Thị Minh Thảo</div>
                <div>Ngày gia nhập Siten: 27/11/2019 </div>
                <div>Chúc mừng Thảo tròn 4 tuổi Siten ️🎉️🎉️🎉 Mới ngày nào còn là cô bé “người nhỏ nhỏ, nhìn hiền hiền” thế mà giờ đây cũng đã là chị gái “thét ra lửa” của tim QA rồi 🤗 Chúc Thảo tuổi Siten năm nay sẽ thật vui cùng hành trình mới, có nhiều trải nghiệm ý nghĩa, cả trong công việc và cuộc sống nhé </div>
            </div>
            <div class="post-image">
                <img src="https://timwook.com/api/v2/file/thumb?id=646738c971c39b2b4cacd65d" alt="img">
            </div>
        </div>
        <div class="post-interact">
            <div class="count-interact">
                <el-tooltip placement="top">
                    <template #content> Nguyễn Văn A<br />Nguyễn Thị B <br/> Nguyễn Thị C <br/> Nguyễn Văn D </template>
                    <span class="count-like">4 lượt thích</span>
                </el-tooltip>
                <span class="count-cmt">3 bình luận</span>
            </div>
            <div class="interact">
                <div class="like-interact">
                    <i class="bx bxs-like"></i>
                    <span>Thích</span>
                </div>
                <div class="cmt-interact">
                    <i class="ri-chat-4-fill"></i>
                    <span>Bình luận</span>
                </div>
            </div>
        </div>
    </div>
</template>