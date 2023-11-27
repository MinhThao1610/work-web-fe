<script setup>
import { defineProps, ref, computed, defineEmits, watch } from 'vue';
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
    open: Boolean,
    mode: String
});
const emit = defineEmits(['close'])

const openDrawer = computed(() => props.open);
const input = ref({});
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
const employees = ref([
    { id: 1, name: 'thuntm' },
    { id: 2, name: 'minhlq' },
]);

const onSubmit = () => {
    formRef.value.validate((formValidated, fields) => {
        console.log('form validated', input.value);
        console.log('form validated', formValidated);
        console.log('form validated', fields);
    })
};

watch(() => store.state.task.detail, (task) => { 
    if (props.mode.value !== 'create') input.value = task;
})

</script>

<template>
    <el-drawer v-model="openDrawer" direction="rtl" size="40%" class="task-info-drawer" @closed="emit('close')">
        <template #header="{ titleId, titleClass }">
            <div :id="titleId" :class="titleClass">
                Tạo công việc mới
            </div>
        </template>
        <el-form label-position="top" require-asterisk-position="right" :model="input" :rules="rules" ref="formRef">
            <el-form-item class="mb-4" label="Tên việc" prop="title">
                <el-input v-model="input.title" placeholder="Tên việc" />
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
                <el-select v-model="input.owner_id" placeholder="Người làm" class="w-100">
                    <el-option 
                        v-for="item in employees" 
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
                        v-for="item in employees" 
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