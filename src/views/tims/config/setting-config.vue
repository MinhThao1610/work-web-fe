<script setup>
import { onMounted, defineProps, reactive, ref } from 'vue';
import Data from "./dataForm";
import MethodService from "@/service/MethodService";
// import { ElNotification } from 'element-plus';

const props = defineProps({
    header: String,
});

const dataForm = reactive({
    value: MethodService.copyObject(Data.dataFormInfo),
});
const errorName = ref([]);
const errorColor = ref([]);
const errorType = ref([]);
const errorNamePri = ref([]);
const errorColorPri = ref([]);

const dataStatus = reactive({ value: [
    {
        'name': 'Doing',
        'color': '#006cd9',
        'type': 'doing',
        'action': '',
    },
    {
        'name': 'Veryfying',
        'color': '#ff4081',
        'type': 'veryfying',
        'action': '',
    },
    {
        'name': 'Done',
        'color': '#0bb251',
        'type': 'done',
        'action': '',
    },
    {
        'name': undefined,
        'color': undefined,
        'type': undefined,
        'action': 'add',
    }
] });

const dataPriority = reactive({ value: [
  {
    'name': undefined,
    'color': undefined,
    'action': 'add',
  }
] });

const listEmployees = ref([]);
const loadingBtn = ref(false);

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

const changeName = (value, index) => {
    if(value) {
        errorName.value[index] = undefined;
    } else {
        errorName.value[index] = index;
    }
};

const changeColor = (value, index) => {
  if(value) {
    errorColor.value[index] = undefined;
  } else {
    errorColor.value[index] = index;
  }
};

const changeType = (value, index) => {
  if(value) {
    errorType.value[index] = undefined;
  } else {
    errorType.value[index] = index;
  }
};

const changeNamePri = (value, index) => {
    if(value) {
        errorName.value[index] = undefined;
    } else {
        errorName.value[index] = index;
    }
};

const changeColorPri = (value, index) => {
  if(value) {
    errorColor.value[index] = undefined;
  } else {
    errorColor.value[index] = index;
  }
};

// const openNotiSuccess = () => {
//     ElNotification({
//         title: 'Thông báo',
//         message: 'Tạo team thành công',
//         type: 'success',
//     })
// };

// const openNotiErr = () => {
//     ElNotification({
//         title: 'Lỗi',
//         message: 'Tạo team thất bại!',
//         type: 'error',
//     })
// };

const addStatus = (row, index) => {
    if(row.color && row.name && row.type) {
        errorColor.value[index] = undefined;
        errorName.value[index] = undefined;
        errorType.value[index] = undefined;
        const length = dataStatus.value.length;
        dataStatus.value[length - 1] = {
            'name': row.name,
            'type': row.type,
            'color': row.color,
            'action': '',
        };
        dataStatus.value.push({
            'name': undefined,
            'type': undefined,
            'color': undefined,
            'action': 'add',
        })
    } else {
        if(!row.color) errorColor.value[index] = index;
        if(!row.name) errorName.value[index] = index;
        if(!row.type) errorType.value[index] = index;
    }
};

const deleteStatus = (index) => {
  dataStatus.value.splice(index, 1);
  errorColor.value[index] = undefined;
  errorName.value[index] = undefined;
  errorType.value[index] = undefined;
};

const addPriority = (row, index) => {
    if(row.color && row.name && row.type) {
        errorColorPri.value[index] = undefined;
        errorNamePri.value[index] = undefined;
        const length = dataPriority.value.length;
        dataPriority.value[length - 1] = {
            'name': row.name,
            'color': row.color,
            'action': '',
        };
        dataPriority.value.push({
            'name': undefined,
            'color': undefined,
            'action': 'add',
        })
    } else {
        if(!row.color) errorColorPri.value[index] = index;
        if(!row.name) errorNamePri.value[index] = index;
    }
};

const deletePriority = (index) => {
    dataPriority.value.splice(index, 1);
    errorColorPri.value[index] = undefined;
    errorNamePri.value[index] = undefined;
};

const updateTim = async () => {

};

onMounted(async () => {
    console.log(props)
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
        </div>

        <div class="card-body">
            <div class="main-body">
                <el-form
                    :model="dataForm.value"
                    status-icon
                    label-width="200px"
                    class="form-user"
                >
                    <div class="label">Các trạng thái của công việc</div>
                    <div class="status">
                        <el-table
                            :data="dataStatus.value"
                        >
                            <el-table-column
                                prop="name"
                                label="Tên"
                                min-width="100"
                                align="start"
                            >
                                <template #default="scope">
                                    <el-input 
                                        type="text"
                                        v-model="scope.row.name" 
                                        placeholder="Nhập tên" 
                                        :class="{error_text: errorName[scope.$index] === scope.$index}"
                                        @change="changeName(scope.row.name, scope.$index)"
                                    />
                                    <span v-if="errorName[scope.$index] === scope.$index" class="error">Vui lòng nhập giá trị</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="color"
                                label="Màu sắc"
                                min-width="150"
                                align="start"
                            >
                            <template #default="scope">
                                <div>
                                <el-input 
                                    v-model="scope.row.color" 
                                    placeholder="" 
                                    style="width: 70%; padding-right: 5px;" 
                                    :class="{error_text: errorColor[scope.$index] === scope.$index}"
                                    @change="changeColor(scope.row.color, scope.$index)"
                                />
                                <el-color-picker 
                                    v-model="scope.row.color" 
                                    @change="changeColor(scope.row.color, scope.$index)" 
                                />
                                </div>
                                <span v-if="errorColor[scope.$index] === scope.$index" class="error">Vui lòng chọn màu sắc</span>
                            </template>
                            </el-table-column>
                            
                            <el-table-column
                                prop="type"
                                label="Phạm vi xử lý"
                                min-width="100"
                                align="start"
                            >
                            <template #default="scope">
                                <el-select 
                                    v-model="scope.row.type" 
                                    class="m-2" 
                                    placeholder="Chọn phạm vi"
                                    :disabled="scope.$index < 3"
                                    :class="{error_text: errorType[scope.$index] === scope.$index}"
                                    @change="changeType(scope.row.type, scope.$index)" 
                                >
                                    <el-option
                                        v-for="item in Data.listTypeStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    />
                                </el-select>
                                <span v-if="errorType[scope.$index] === scope.$index" class="error">Vui lòng nhập giá trị</span>
                            </template>
                            </el-table-column>
                            <el-table-column 
                                label="Thao tác" 
                                align="center" 
                                width="100px"
                            >
                            <template #default="scope">
                                <div class="btn-group-thao-tac">
                                <button
                                    type="button"
                                    class="btn btn-soft-info waves-effect waves-light btn-sm"
                                    v-b-popover.hover.left="'Thêm'"
                                    v-if="scope.row.action === 'add'"
                                    @click="addStatus(scope.row, scope.$index)"
                                >
                                    <i class="ri-add-circle-line"></i>
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-soft-danger waves-effect waves-light btn-sm"
                                    v-b-popover.hover.left="'Xóa'"
                                    v-if="scope.row.action === '' && scope.$index > 2"
                                    @click="deleteStatus(scope.$index)"
                                >
                                    <i class="ri-delete-bin-6-line"></i>
                                </button>
                                </div>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <div class="label">Mức độ ưu tiên của công việc</div>
                    <div class="status">
                        <el-table
                            :data="dataPriority.value"
                        >
                            <el-table-column
                                prop="name"
                                label="Tên"
                                min-width="100"
                                align="start"
                            >
                                <template #default="scope">
                                    <el-input 
                                        type="text"
                                        v-model="scope.row.name" 
                                        placeholder="Nhập tên" 
                                        :class="{error_text: errorNamePri[scope.$index] === scope.$index}"
                                        @change="changeNamePri(scope.row.name, scope.$index)"
                                    />
                                    <span v-if="errorNamePri[scope.$index] === scope.$index" class="error">Vui lòng nhập giá trị</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="color"
                                label="Màu sắc"
                                min-width="150"
                                align="start"
                            >
                            <template #default="scope">
                                <div>
                                <el-input 
                                    v-model="scope.row.color" 
                                    placeholder="" 
                                    style="width: 70%; padding-right: 5px;" 
                                    :class="{error_text: errorColorPri[scope.$index] === scope.$index}"
                                    @change="changeColorPri(scope.row.color, scope.$index)"
                                />
                                <el-color-picker 
                                    v-model="scope.row.color" 
                                    @change="changeColorPri(scope.row.color, scope.$index)" 
                                />
                                </div>
                                <span v-if="errorColorPri[scope.$index] === scope.$index" class="error">Vui lòng chọn màu sắc</span>
                            </template>
                            </el-table-column>
                            
                            <el-table-column 
                                label="Thao tác" 
                                align="center" 
                                width="100px"
                            >
                            <template #default="scope">
                                <div class="btn-group-thao-tac">
                                <button
                                    type="button"
                                    class="btn btn-soft-info waves-effect waves-light btn-sm"
                                    v-b-popover.hover.left="'Thêm'"
                                    v-if="scope.row.action === 'add'"
                                    @click="addPriority(scope.row, scope.$index)"
                                >
                                    <i class="ri-add-circle-line"></i>
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-soft-danger waves-effect waves-light btn-sm"
                                    v-b-popover.hover.left="'Xóa'"
                                    v-else
                                    @click="deletePriority(scope.$index)"
                                >
                                    <i class="ri-delete-bin-6-line"></i>
                                </button>
                                </div>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                 
                    <div class="text-center">
                        <el-button
                            type="button"
                            style="height: 38px"
                            class="btn btn-secondary btn-border"
                            @click="updateTim()"
                            :loading="loadingBtn"
                        >
                            Lưu
                        </el-button>
                    </div>
                </el-form>
            </div>
        </div>
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
.label {
    display: inline-flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 0 0 auto;
    font-size: var(--el-form-label-font-size);
    color: var(--el-text-color-regular);
    height: 32px;
    line-height: 32px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
    font-weight: 500;
    margin-bottom: 0.5rem;
}
</style>
