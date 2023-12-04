<script setup>
import { defineProps, ref, computed, defineEmits, watch, onMounted } from 'vue';
import { useStore } from "vuex";
import { ElMessage } from 'element-plus';

const store = useStore();

const props = defineProps({
    open: Boolean,
    mode: String,
    owner_id: Number
});
const emit = defineEmits(['close'])

const task = computed(() => store.state.task.detail);
const users = computed(() => store.state.user.users);
const sprints = computed(() => store.state.project.projects);
const openDrawer = computed(() => props.open);
const input = ref({
    owner_id: props.owner_id
});
const formRef = ref();
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
const options = ref([
    { id: 1, name: 'Nghiêm trọng' },
    { id: 2, name: 'Cao' },
    { id: 3, name: 'Trung bình' },
    { id: 4, name: 'Thấp' },
]);

const onSubmit = () => {
    formRef.value.validate((formValidated) => {
        if (formValidated) {
            if (props.mode === 'create') {
                store.dispatch('task/addTask', {
                    ...input.value,
                    ownerId: users.value.filter(x => x.id === input.value.owner_id),
                    sprintId: input.value.sprint_id ? sprints.value.filter(x => x.id === input.value.sprint_id) : {},
                });

                ElMessage({
                    message: 'Tạo công việc thành công',
                    type: 'success',
                });
            } else {
                store.dispatch('task/editTask', {
                    ...input.value,
                    ownerId: users.value.filter(x => x.id === input.value.owner_id),
                    sprintId: input.value.sprint_id ? sprints.value.filter(x => x.id === input.value.sprint_id) : {},
                    id: task.value.id
                });

                ElMessage({
                    message: 'Cập nhật công việc thành công',
                    type: 'success',
                });
            }

            if (formRef.value) formRef.value.resetFields();
            emit('close');
        }
    })
};

watch(() => store.state.task.detail, (task) => {
    if (props.mode !== 'create') input.value = {
        ...input.value,
        ...task
    };
})

onMounted(() => {
    store.dispatch('user/fetchUsers');
    store.dispatch('project/fetchProjects');
});

</script>

<template>
    <el-drawer v-model="openDrawer" direction="rtl" size="40%" class="task-info-drawer" @closed="emit('close')">
        <template #header="{ titleId, titleClass }">
            <div :id="titleId" :class="titleClass">
                {{ mode === 'create' ? 'Tạo công việc mới' : 'Cập nhật công việc' }}
            </div>
        </template>
        <el-form label-position="top" require-asterisk-position="right" :model="input" :rules="rules" ref="formRef">
            <el-form-item class="mb-4" label="Tên việc" prop="title">
                <el-input v-model="input.title" placeholder="Tên việc" />
            </el-form-item>
            <el-form-item class="mb-4" label="Sprint" prop="sprint_id">
                <el-select v-model="input.sprint_id" placeholder="Sprint" class="w-100">
                    <el-option 
                        v-for="item in sprints" 
                        :key="item.id" 
                        :label="item.title"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="mb-4" label="Mức độ ưu tiên" prop="priority">
                <el-select v-model="input.priority" placeholder="Mức độ ưu tiên" class="w-100">
                    <el-option 
                        v-for="item in options" 
                        :key="item.id" 
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="mb-4" label="Ngày bắt đầu" prop="startDate">
                <el-date-picker class="w-100" v-model="input.startDate" type="date" placeholder="Ngày bắt đầu"
                    size="large" format="DD/MM/YYYY" />
            </el-form-item>
            <el-form-item class="mb-4" label="Deadline" prop="deadline">
                <el-date-picker class="w-100" v-model="input.deadline" type="date" placeholder="Deadline"
                    size="large" format="DD/MM/YYYY" />
            </el-form-item>
            <el-form-item class="mb-4" label="Người làm" prop="owner_id">
                <el-select v-model="input.owner_id" placeholder="Người làm" class="w-100" :disabled="props.owner_id">
                    <el-option 
                        v-for="item in users" 
                        :key="item.id" 
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="mb-4" label="Người duyệt" prop="verifier_id">
                <el-select v-model="input.verifier_id" placeholder="Người duyệt" class="w-100">
                    <el-option 
                        v-for="item in users" 
                        :key="item.id" 
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <div class="d-flex justify-content-end">
                <button class="btn btn-success w-25" type="button" @click="onSubmit">Lưu</button>
            </div>
        </el-form>
    </el-drawer>
</template>