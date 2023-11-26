<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import moment from "moment";

const store = useStore();
const task = computed(() => store.state.task.detail)

</script>

<template>
    <div class="task-info-item">
        <div class="header-info">
            {{ task?.title }}
        </div>
        <div class="content-info">
            <div class="item" v-if="task?.sprint_id">
                <span class="item-title">
                    Kế hoạch
                </span>
                <span class="item-content">
                    {{ task?.sprintId?.title }}
                </span>
            </div>
            <div class="item" v-if="task?.testObject_id">
                <span class="item-title">
                    Đối tượng
                </span>
                <span class="item-content">
                    {{ task?.testObjectId?.title }}
                </span>
            </div>
            <div class="item" v-if="task?.testcase_id">
                <span class="item-title">
                    Test case
                </span>
                <span class="item-content">
                    {{ task?.testcaseId?.title }}
                </span>
            </div>
            <div class="item">
                <span class="item-title">
                    Người làm
                </span>
                <span class="item-content">
                    {{ task?.ownerId?.name }}
                </span>
            </div>
            <div class="item">
                <span class="item-title">
                    Tình trạng
                </span>
                <span class="item-content">
                    Đang làm
                </span>
            </div>
            <div class="item-double">
                <div class="item">
                    <span class="item-title">
                        Người giao
                    </span>
                    <span class="item-content">
                        {{ task?.creatorId?.name }}
                    </span>
                </div>
                <div class="item">
                    <span class="item-title">
                        Người duyệt
                    </span>
                    <span class="item-content">
                        {{ task?.verifierId?.name }}
                    </span>
                </div>
            </div>
            <div class="item-double">
                <div class="item">
                    <span class="item-title">
                        Ngày bắt đầu
                    </span>
                    <span class="item-content" v-if="task?.startDate">
                        {{ moment(new Date(task?.startDate)).format("DD/MM/YYYY") }}
                    </span>
                </div>
                <div class="item">
                    <span class="item-title">
                        Deadline
                    </span>
                    <span class="item-content" v-if="task?.deadline">
                        {{ moment(new Date(task?.deadline)).format("DD/MM/YYYY") }}
                    </span>
                </div>
            </div>
            <div class="item-double">
                <div class="item">
                    <span class="item-title">
                        Ngày tạo
                    </span>
                    <span class="item-content" v-if="task?.createAt">
                        {{ moment(new Date(task?.createAt)).format("DD/MM/YYYY") }}
                    </span>
                </div>
                <div class="item">
                    <span class="item-title">
                        Ngày sửa
                    </span>
                    <span class="item-content" v-if="task?.updateAt">
                        {{ moment(new Date(task?.updateAt)).format("DD/MM/YYYY") }}
                    </span>
                </div>
            </div>
            <div class="item">
                <span class="item-title">
                    Trạng thái
                </span>
                <span class="item-content item-status">
                    <el-popover 
                        popper-class="popper-status" 
                        placement="bottom" 
                        trigger="click"
                    >
                        <template #reference>
                            <span
                                class="button-status"
                                :class="{
                                    statusNew: true
                                }"
                                @click="onClickOutside"
                            >
                                {{ task?.statusId?.name }}
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
                </span>
            </div>
        </div>
    </div>
</template>