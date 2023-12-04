<script setup>
import { onMounted, defineProps, ref, reactive } from 'vue';
import account from "@/assets/images/account.jpg";

const props = defineProps({
    header: String,
});

const listMemeber = ref([]);
const listEmployees = ref([]);
const formAddMember = reactive({
    employee_id: null,
});
const showFormAddMember = ref(false);
const listEmployeesAdd = ref([]);

const getListMember = async () => {
    listMemeber.value = [
        {
            id: '1111',
            name: 'Nguyễn Văn A',
            email: "nguyena@gmail.com",
            position: 'Leader',
            avatar: null
        },
        {
            id: '2222',
            name: 'Nguyễn Văn B',
            email: "nguyenb@gmail.com",
            position: '',
            avatar: null
        },
        {
            id: '3333',
            name: 'Nguyễn Văn C',
            email: "nguyenc@gmail.com",
            position: '',
            avatar: null
        },
    ]
}

const getListEmployees = async () => {
    // gọi api lấy về danh sách nhân viên
    listEmployees.value = [
        {
            id: '11111',
            name: "Nguyễn Văn A"
        },
        {
            id: '22222',
            name: "Nguyễn Văn B"
        },
    ]
};

const addMemberTim = async () => {
    // gọi api thêm thành viên
}

onMounted(async () => {
    console.log(props)
    await getListMember();
    await getListEmployees();
})
</script>

<template>
    <div class="card">
        <div class="card-header align-items-center d-flex">
            <h4 
                class="card-title mb-0 flex-grow-1"
            >
                {{ props.header }}
            </h4>
            <el-tooltip
                content="Thêm thành viên"
                effect="light"
            >
                <button
                    class="btn btn-border button-add-mamber"
                    @click="showFormAddMember = true"
                >
                    <i class="ri-user-add-fill"></i>
                </button>
            </el-tooltip>
        </div>

        <div class="card-body">
            <div class="main-body">
                <div class="list-member">
                    <div 
                        v-for="member in listMemeber"
                        :key="member.id"
                        class="member"
                    >
                        <div class="member-left">
                            <div class="avatar">
                                <img :src="member.avatar ?? account" alt="avatar">
                            </div>
                            <div class="member-info">
                                <span class="name">
                                    {{ member.name }}
                                </span>
                                <span class="email">
                                    {{ member.email }}
                                </span>
                            </div>
                        </div>
                        <div class="member-right">
                            <div class="member-position">
                                {{ member.position }}
                            </div>
                            <div class="button-remove" v-if="member.position !== 'Leader'">
                                
                                    <button
                                        type="button"
                                        class="btn btn-soft-danger waves-effect waves-light btn-sm"
                                        v-b-popover.hover.left="'Xóa'"
                                        @click="delete(member.id)"
                                    >
                                        <i class="ri-delete-bin-6-line"></i>
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog v-model="showFormAddMember" title="Thêm thành viên">
            <el-form :model="formAddMember">
                <el-form-item label="Chọn thành viên" :label-width="formLabelWidth">
                    <el-select v-model="formAddMember.employee_id" class="m-2" placeholder="Chọn thành viên thêm vào team">
                        <el-option
                        v-for="item in listEmployeesAdd"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="showFormAddMember = false">Đóng</el-button>
                <el-button 
                    type="primary" 
                    @click="addMemberTim()"
                    :disabled="!formAddMember.employee_id"
                >
                    Thêm thành viên
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped>
.el-radio {
  margin-bottom: 0;
}
.el-select {
    width: 100%;
}
:deep .el-date-editor.el-input {
    width: 100%;
}

</style>
