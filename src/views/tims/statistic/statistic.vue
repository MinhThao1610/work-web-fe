<script setup>
import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const title = ref("Widgets");
const items = ref([
    {
        text: "Velzon",
        href: "/",
    },
    {
        text: "Widgets",
        active: true,
    },
]);
const focusButton = ref("today");
const route = useRoute();

const changeFocusButton = (text) => {
    focusButton.value = text;
};

onMounted(() => {
    console.log("route", route.query);
});
</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items" type="tim" :focusButton="focusButton"
            @changeFocusButton="changeFocusButton" />
        <div class="row">
            <div id="tim-statistic">
                <el-tabs tab-position="left">
                    <el-tab-pane label="Tổng hợp công việc của tim theo biểu đồ">
                        <div class="workfeed-item statistic">
                            <div class="workfeed-item-header">Tổng hợp công việc của tim theo bảng</div>
                            <div class="workfeed-item-content">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>STT.</th>
                                            <th>Họ và tên</th>
                                            <th>Tồn đầu kỳ</th>
                                            <th>Phát sinh</th>
                                            <th>Hoàn thành</th>
                                            <th>Tồn cuối kỳ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td style="text-align: left;">Nguyễn Hòa </td>
                                            <td>9</td>
                                            <td>1</td>
                                            <td>0</td>
                                            <td>10</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td style="text-align: left;">Lê Quang Minh </td>
                                            <td>3</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td style="text-align: left;">Phan Thị Ngọc Minh</td>
                                            <td>1</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td style="text-align: left;">Nguyễn Thị Minh Thảo</td>
                                            <td>11</td>
                                            <td>1</td>
                                            <td>3</td>
                                            <td>13</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td style="text-align: left;">Nguyễn Duy Thịnh</td>
                                            <td>18</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>18</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td style="text-align: left;">Trần Hoàng Việt</td>
                                            <td>4</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>4</td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td style="text-align: left;">Mai Long Vũ </td>
                                            <td>5</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>5</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Tổng hợp công việc của tim theo bảng">
                        <p>Tổng hợp công việc của tim theo bảng</p>
                    </el-tab-pane>
                    <el-tab-pane label="Tổng hợp công việc của nhân viên theo biểu đồ">
                        <p>Tổng hợp công việc của nhân viên theo biểu đồ</p>
                    </el-tab-pane>
                    <el-tab-pane label="Báo cáo chi tiết công việc">
                        <p>Báo cáo chi tiết công việc</p>
                    </el-tab-pane>
                </el-tabs>

                <!-- <div class="panel-left">
                    <div class="workfeed-item">
                        <div class="workfeed-item-header">Menu</div>
                        <div class="workfeed-item-content">
                            <div class="statistic-item pointer-link">Tổng hợp công việc của tim theo biểu đồ</div>
                            <div class="statistic-item pointer-link">Tổng hợp công việc của tim theo bảng</div>
                            <div class="statistic-item pointer-link">Tổng hợp công việc của nhân viên theo biểu đồ</div>
                            <div class="statistic-item pointer-link">Báo cáo chi tiết công việc</div>
                        </div>
                    </div>
                </div>
                <div class="panel-right">
                    <div class="workfeed-item statistic">
                        <div class="workfeed-item-header">Tổng hợp công việc của tim theo bảng</div>
                        <div class="workfeed-item-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT.</th>
                                        <th>Họ và tên</th>
                                        <th>Tồn đầu kỳ</th>
                                        <th>Phát sinh</th>
                                        <th>Hoàn thành</th>
                                        <th>Tồn cuối kỳ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td style="text-align: left;">Nguyễn Hòa </td>
                                        <td>9</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>10</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td style="text-align: left;">Lê Quang Minh </td>
                                        <td>3</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td style="text-align: left;">Phan Thị Ngọc Minh</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td style="text-align: left;">Nguyễn Thị Minh Thảo</td>
                                        <td>11</td>
                                        <td>1</td>
                                        <td>3</td>
                                        <td>13</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td style="text-align: left;">Nguyễn Duy Thịnh</td>
                                        <td>18</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>18</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td style="text-align: left;">Trần Hoàng Việt</td>
                                        <td>4</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>4</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td style="text-align: left;">Mai Long Vũ </td>
                                        <td>5</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>5</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </Layout>
</template>
