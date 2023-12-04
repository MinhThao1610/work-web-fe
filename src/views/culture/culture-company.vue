<script setup>
import { onMounted, defineProps } from 'vue';

const props = defineProps({
    header: String,
    intro: String,
    timLead: String,
    email: String,
    phone: String,
});

onMounted(() => {
    console.log(props)
})
</script>

<template>
    <div class="culture-company">
        <div class="logo-culture">
            <div class="logo-slogan">
                <img src="https://timwook.com/api/v2/file/thumb?id=5b6419e171c39b0a9456d818" alt="">
            </div>
            <div class="logo-company">
                <img src="	https://timwook.com/api/v2/file/thumb?id=5f519e4a6e3850145899f3e0&w=100" alt="logo">
                <span>Công ty A</span>
            </div>
        </div>
        <div class="slogan">
            <div class="slogan-item">
                <div class="slogan-title">Tầm nhìn</div>
                <div class="slogan-content">
                    Chúng tôi tạo môi trường sống hạnh phúc cho người lao động. Chúng tôi cung cấp phần mềm chất lượng tốt cho khách hàng
                </div>
            </div>
            <div class="slogan-item">
                <div class="slogan-title">Sứ mệnh</div>
                <div class="slogan-content">
                    Chúng tôi xây dựng văn hóa doanh nghiệp tích cực giúp người lao động phát triển toàn diện với nhiều giá trị phúc lợi. Chúng tôi mang đến sản phẩm và dịch vụ phần mềm chất lượng tốt giúp doanh nghiệp thêm giá trị, giúp cuộc sống mỗi cá nhân thêm tiện lợi Sự phát triển của Siten gắn kết cùng với sự phát triển của đất nước và con người Việt Nam.
                </div>
            </div>
            <div class="slogan-item">
                <div class="slogan-title">Giá trị cốt lõi</div>
                <div class="slogan-content">
                    Học hỏi liên tục, Kiên trì, Gắn kết, Trách nhiệm, Sống tích cực
                </div>
            </div>
            <div class="slogan-item">
                <div class="slogan-title">Slogan</div>
                <div class="slogan-content">
                    Serve the life
                </div>
            </div>
        </div>
        <div class="info-contact">
            <div class="info-contact-item">
                <span class="info-title">Điện thoại</span>
                <span class="info-value">+84 246 2602 457</span>
            </div>
            <div class="info-contact-item">
                <span class="info-title">Email</span>
                <span class="info-value">contact@siten.vn</span>
            </div>
            <div class="info-contact-item">
                <span class="info-title">Mã số thuế</span>
                <span class="info-value">0107311329</span>
            </div>
            <div class="info-contact-item">
                <span class="info-title">Website</span>
                <span class="info-value">http://siten.vn</span>
            </div>
            <div class="info-contact-item-full">
                <span class="info-title-full">Địa chỉ</span>
                Tầng 5, tòa Xuân Phong, số 1 Nguyễn Thị Duệ, Yên Hòa, Cầu Giấy, Hà Nội
            </div>
        </div>
        <div class="intro-comapny">
            <p>
                Được thành lập vào tháng 1/2016, Siten JSC. được định hướng để trở thành một công ty sản xuất phần mềm chất lượng tốt với sự sáng tạo về mô hình tổ chức và văn hóa doanh nghiệp tích cực. Siten lấy gia công phần mềm làm nền tảng, phát triển con người làm cốt lõi và xây dựng sản phẩm làm cơ hội đột phá.
            </p>
            <p>
                Mô hình Tim và văn hóa doanh nghiệp tích cực là những nỗ lực mà chúng tôi đang xây dưng nhằm tạo một môi trường làm việc mở, bình đẳng, công bằng và tôn trọng lẫn nhau.
            </p>
            <p>
                Chúng tôi có nhiều năm kinh nghiệm trong phát triển phần mềm cũng như không ngừng học hỏi và nắm chắc những công nghệ nền tảng. Do vậy những sản phẩm và dịch vụ của Siten được đánh giá cao bởi nhiều khách hàng.
            </p>
            <p>
                Đoàn kết một lòng, làm việc chăm chỉ, cải tiến liên tục. Đó là những điều chúng tôi nghĩ trong từng việc nhỏ của Siten
            </p>
        </div>
    </div>
</template>