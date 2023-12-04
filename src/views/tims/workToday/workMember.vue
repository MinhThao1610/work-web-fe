<script setup>
import { onMounted, defineProps, ref, computed } from 'vue';
import moment from 'moment';
import { useStore } from "vuex";

const props = defineProps({
    check: Boolean,
    user: {}
});

const store = useStore();
const listTasks = computed(() => store.state.task.tasks.filter(x => x.owner_id === props.user.id));
const listSprint = computed(() => store.state.project.projects.filter(x => listTasks.value.map(y => y.sprint_id).includes(x.id)));
const openReportDrawer = ref(false);

const input = ref({});
const formRef = ref();
const fileList = ref([]);
const rules = ref({
    title: [
        { required: true, message: 'Bắt buộc nhập tên việc', trigger: 'change' },
    ],
    priority: [
        { required: true, message: 'Bắt buộc chọn mức độ ưu tiên', trigger: 'change' },
    ],
    startDate: [
        { type: 'date', required: true, message: 'Bắt buộc chọn ngày bắt đầu', trigger: 'change' }
    ],
    deadline: [
        { type: 'date', message: 'Bắt buộc chọn deadline', trigger: 'change' }
    ],
    owner_id: [
        { required: true, message: 'Bắt buộc chọn người làm', trigger: 'change' },
    ],
    verifier_id: [
        { required: true, message: 'Bắt buộc chọn người duyệt', trigger: 'change' },
    ],
});
const employees = ref([
    { id: 1, email: 'thuntm@gmail.com', name: 'thuntm' },
    { id: 2, email: 'minhlq@gmail.com', name: 'minhlq' },
]);

onMounted(() => {
    store.dispatch('project/fetchProjects');
    store.dispatch('task/fetchTasks');
})

const report = () => {
    openReportDrawer.value = true;
}

const onSubmit = () => {
    formRef.value.validate((formValidated, fields) => {
        console.log('form validated', input.value);
        console.log('form validated', formValidated);
        console.log('form validated', fields);
    })
};

</script>

<template>
    <div class="tim-member-work grid-item">
        <div v-if="props.check === true">
            <div class="member-work-header">
                <div class="header-left">
                    <img :src="require(`@/assets/images/users/${props.user.avatar}`)" alt="avatar">
                    <span>{{ props.user.name }}</span>
                </div>
                <div class="header-right">
                    <!-- thêm biểu đồ phần trăm -->
                </div>
            </div>
            <div class="member-work-container">
                <div 
                    v-for="sprint in listSprint" 
                    :key="sprint.id" 
                    class="work-sprint"
                >
                    <div class="name-sprint">
                        <span>{{ sprint.title }}</span>
                    </div>
                    <div class="list-tasks">
                        <div 
                            v-for="task in listTasks.filter(x => x.sprint_id === sprint.id)" 
                            :key="task.id" 
                            class="task-item"
                        >
                            <div class="task-lable">
                                <span class="task-priority"></span>
                                <span class="task-title">
                                    <strong>#{{ task.code }}</strong>
                                    {{ task.title }}
                                </span>
                            </div>
                            <div class="task-status">
                                <el-popover 
                                    popper-class="popper-status" 
                                    placement="bottom" 
                                    trigger="click"
                                >
                                    <template #reference>
                                        <span
                                            :class="{
                                                statusNew: true
                                            }"
                                            @click="onClickOutside"
                                        >
                                            doing
                                        </span>
                                    </template>
                                    <div class="list-status">
                                        <div class="item-status">
                                            <span class="color-status"></span>
                                            <span class="text-status">Doing</span>
                                        </div>
                                        <div class="item-status">
                                            <span class="color-status"></span>
                                            <span class="text-status">Verifying</span>
                                        </div>
                                        <div class="item-status">
                                            <span class="color-status"></span>
                                            <span class="text-status">Blocked</span>
                                        </div>
                                    </div>
                                </el-popover>
                            </div>
                            <div class="task-deadline">
                                <span>{{ moment(task.deadline).format("DD/MM/YYYY") }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="member-work-footer">
                <div class="footer-left">
                    <button class="btn" @click="report">Báo cáo</button>
                </div>
                <div class="footer-right">
                    <!-- <button class="btn m-r-10">Hỏi</button> -->
                    <button class="btn">Giao việc</button>
                </div>
            </div>
        </div>
        
        <div v-else>
            <div class="member-not-work member-work-header">
                <div class="header-left">
                    <img :src="require(`@/assets/images/users/${props.user.avatar}`)" alt="avatar">
                    <span>{{ props.user.name }}</span>
                </div>
                <div class="header-right button">
                    <!-- <span class="m-r-10">Hỏi</span> -->
                    <span>Giao việc</span>
                </div>
            </div>
        </div>
    </div>

    <el-drawer v-model="openReportDrawer" direction="rtl" size="40%">
        <template #header="{ titleId, titleClass }">
            <div :id="titleId" :class="titleClass">
                Báo cáo ngày {{ moment(new Date()).format("DD/MM/YYYY") }}
            </div>
        </template>
        <el-form label-position="top" require-asterisk-position="right" :model="input" :rules="rules" ref="formRef">
            <el-form-item class="mb-4" label="Người nhận" prop="emailSend">
                <el-input v-model="input.emailSend" placeholder="Người nhận" />
            </el-form-item>
            <el-form-item class="mb-4" label="CC cho" prop="emailCC">
                <el-select v-model="input.emailCC" multiple placeholder="CC cho" class="w-100">
                    <el-option 
                        v-for="item in employees" 
                        :key="item.id" 
                        :label="item.name"
                        :value="item.email"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="mb-4" label="Tiêu đề" prop="title">
                <el-input v-model="input.title" placeholder="Tiêu đề" />
            </el-form-item>
            <el-form-item class="mb-4" label="Nội dung" prop="content">
                <el-input type="textarea" rows="10" v-model="input.content" placeholder="Nội dung" />
            </el-form-item>
            <el-upload
                action=""
                multiple
                :limit="3"
                :file-list="fileList"
                :auto-upload="false"
            >
                <el-button size="small" type="primary">File đính kèm</el-button>
            </el-upload>
            <i class="text-muted">Báo cáo này sẽ tự động gửi vào hòm thư và email của trưởng nhóm</i>
            <div class="d-flex justify-content-end">
                <button class="btn btn-success w-25" type="button" @click="onSubmit">Lưu</button>
            </div>
        </el-form>
    </el-drawer>
</template>