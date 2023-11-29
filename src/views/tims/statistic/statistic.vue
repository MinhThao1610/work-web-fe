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
const chartOptions = ref({
    chart: {
        height: 370,
        type: "line",
        toolbar: {
            show: false,
        },
    },
    stroke: {
        curve: "straight",
        width: [2, 2, 2],
    },
    fill: {
        opacity: [1, 1, 1],
    },
    markers: {
        size: [0, 0, 0],
        strokeWidth: 2,
        hover: {
            size: 4,
        },
    },
    xaxis: {
        categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
    },
    grid: {
        show: true,
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: false,
            },
        },
        padding: {
            top: 0,
            right: -2,
            bottom: 15,
            left: 10,
        },
    },
    legend: {
        show: true,
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: -5,
        markers: {
            width: 9,
            height: 9,
            radius: 6,
        },
        itemMargin: {
            horizontal: 10,
            vertical: 0,
        },
    },
    plotOptions: {
        bar: {
            columnWidth: "30%",
            barHeight: "70%",
        },
    },
    colors: ["#405189", "#0AB39C", "#F06548"],
})
const series = ref([{
    name: "Tồn",
    type: "line",
    data: [3, 6, 4, 6, 4, 6, 4, 4, 7, 5, 6, 6],
},
{
    name: "Đã xong",
    type: "line",
    data: [8, 9, 6, 10, 7, 8, 5, 2, 9, 4, 8, 3],
},
{
    name: "Mới",
    type: "line",
    data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35],
},
]);

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
                            <div class="workfeed-item-header">Tổng hợp công việc của tim theo biểu đồ</div>
                            <div class="workfeed-item-content">
                                <apexchart class="apex-charts" dir="ltr" height="320" :series="series"
                                    :options="chartOptions">
                                </apexchart>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Tổng hợp công việc của tim theo bảng">
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
                    <el-tab-pane label="Tổng hợp công việc của nhân viên theo biểu đồ">
                        <div class="workfeed-item statistic">
                            <div class="workfeed-item-header">Tổng hợp công việc của nhân viên theo biểu đồ</div>
                            <div class="workfeed-item-content">
                                <apexchart class="apex-charts" dir="ltr" height="320" :series="series"
                                    :options="chartOptions">
                                </apexchart>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Báo cáo chi tiết công việc">
                        <div class="workfeed-item statistic">
                            <div class="workfeed-item-header">Báo cáo chi tiết công việc</div>
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
                </el-tabs>
            </div>
        </div>
    </Layout>
</template>
