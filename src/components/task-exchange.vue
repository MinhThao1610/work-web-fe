<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import moment from "moment";

const store = useStore();
const task = computed(() => store.state.task.detail);

const formRef = ref();
const input = ref({});
const rules = ref({
    description: [
        { required: true, message: 'Bắt buộc nhập nội dung', trigger: 'change' }
    ]
})

const onSubmit = () => {
    formRef.value.validate((formValidated, fields) => {
        console.log('form validated', input.value);
        console.log('form validated', formValidated);
        console.log('form validated', fields);
    })
};

</script>

<template>
    <div class="task-exchange">
        <template v-for="(exchange, index) in task.exchanges" :key="index">
            <div class="exchange">
                <div class="exchange-header">
                    <img class="avatar rounded-circle header-profile-user" src="/img/avatar-1.7cd0b5a6.jpg" alt="Header Avatar">
                    <div class="info">
                        <b class="title">{{ exchange?.creatorId?.name }}</b>
                        <p class="datetime text-muted">Gửi từ {{ moment(new Date(exchange?.createAt)).format("DD/MM/YYYY") }}</p>
                    </div>
                    <div class="dropdown">
                        <a href="javascript:void(0);" class="text-muted" id="dropdownMenuLink1" data-bs-toggle="dropdown" data-bs-auto-close="true">
                            <i class="ri-more-fill"></i>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                            <li>
                                <a class="dropdown-item">
                                    <i class="ri-edit-2-line align-bottom me-2 text-muted"></i>
                                    Edit
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item">
                                    <i class="ri-delete-bin-5-line align-bottom me-2 text-muted"></i>
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="exchange-content">
                    {{ exchange?.content }}
                </div>
            </div>
        </template>
        <el-form class="exchange-form mt-4" label-position="top" require-asterisk-position="right" :model="input" :rules="rules" ref="formRef">
            <el-form-item class="mb-4" prop="description">
                <el-input rows="10" type="textarea" v-model="input.description" placeholder="Nội dung trao đổi" />
            </el-form-item>
            <div class="d-flex justify-content-end">
                <button class="btn btn-success w-25" type="button" @click="onSubmit">Lưu</button>
            </div>
        </el-form>
    </div>
</template>