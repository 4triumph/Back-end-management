<script setup>
import { it } from 'element-plus/es/locales.mjs'
import * as echarts from 'echarts'
import { ref, getCurrentInstance, onMounted, reactive } from 'vue'
// import axios, {Axios} from 'axios'
const { proxy } = getCurrentInstance()

const getImageUrl = (user) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url).href
}

const tableData = ref([])
const countData = ref([])
const chartData = ref([])
const observer = ref(null)

const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
})
const xOptions = reactive({
    // 图例文字颜色
    textStyle: {
        color: '#333',
    },
    legend: {},
    grid: {
        left: '20%',
    },
    // 提示框
    tooltip: {
        trigger: 'axis',
    },
    xAxis: {
        type: 'category', // 类目轴
        data: [],
        axisLine: {
            lineStyle: {
                color: '#17b3a3',
            },
        },
        axisLabel: {
            interval: 0,
            color: '#333',
        },
    },
    yAxis: [
        {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#17b3a3',
                },
            },
        },
    ],
    color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3'],
    series: [],
})

const pieOptions = reactive({
    tooltip: {
        trigger: 'item',
    },
    legend: {},
    color: [
        '#0f78f4',
        '#dd536b',
        '#9462e5',
        '#a6a6a6',
        '#e1bb22',
        '#39c362',
        '#3ed1cf',
    ],
    series: [],
})

// axios({
//     url: '/api/home/getTableData',
//     method: 'get'

// }).then(res=>{

//     if(res.data.code === 200){
//         console.log(res.data.data.tableData)
//         tableData.value = res.data.data.tableData
//     }
// })

const getTableData = async () => {
    const data = await proxy.$api.getTableData()
    tableData.value = data.tableData
    //   console.log(data)
}
const getCountData = async () => {
    const data = await proxy.$api.getCountData()
    countData.value = data
    // console.log(data)
}
const getChartData = async () => {
    const { orderData, userData, videoData } = await proxy.$api.getChartData()
    // 第一个图表进行x轴和series赋值
    xOptions.xAxis.data = orderData.date;
    xOptions.series = Object.keys(orderData.data[0]).map(val => ({
        name: val,
        data: orderData.data.map(item => item[val]),
        type: 'line'
    }))
    const oneEchart = echarts.init(proxy.$refs['echart'])
    oneEchart.setOption(xOptions)

    // 第二个表格进行渲染
    xOptions.xAxis.data = userData.map((item) => item.date)
    xOptions.series = [
        {
            name: '新增用户',
            data: userData.map((item) => item.new),
            type: 'bar',
        },
        {
            name: '活跃用户',
            data: userData.map((item) => item.active),
            type: 'bar',
        },
    ]
    const twoEchart = echarts.init(proxy.$refs['userEchart'])
    twoEchart.setOption(xOptions)

    // 饼状图渲染
    pieOptions.series = [
        {
            data: videoData,
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '70%'],
            startAngle: 180,
            endAngle: 360,
        }
    ]
    const threeEchart = echarts.init(proxy.$refs['videoEchart'])
    threeEchart.setOption(pieOptions)

    // 监听页面变化
    observer.value = new ResizeObserver((en) => {
        oneEchart.resize()
        twoEchart.resize()
        threeEchart.resize()
    })

    // 容器存在
    if (proxy.$refs['echart']) {
        observer.value.observe(proxy.$refs['echart'])
    }
}

// 定义变量
const loginTime = ref('')
const loginLocation = ref('')

// 获取当前时间
const getCurrentTime = () => {
    const now = new Date()
    loginTime.value = now.toLocaleString('zh-CN', { hour12: false })
}

// 通过 IP 获取城市（使用示例 API）
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            // 使用逆地理编码 API 将经纬度转换为城市名称
            try {
                const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=zh`)
                const data = await res.json()
                loginLocation.value = data.city || '未知地点'
            } catch (error) {
                console.error('逆地理编码失败', error)
                loginLocation.value = '未知地点'
            }
        }, (error) => {
            console.error('获取地理位置失败', error)
            loginLocation.value = '未知地点'
        })
    } else {
        console.error('浏览器不支持地理定位')
        loginLocation.value = '未知地点'
    }
}

onMounted(() => {
    getTableData()
    getCountData()
    getChartData()
    getCurrentTime()
    getLocation()
})
</script>

<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8">
            <el-card shadow="hover" class="user-board">
                <div class="user">
                    <img :src="getImageUrl('user')" class="user" />
                    <div class="user-info">
                        <p class="user-info-admin">admin</p>
                        <p class="user-info-p">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>本次登录时间：<span>{{ loginTime }}</span></p>
                    <p>本次登录地点：<span>{{ loginLocation }}</span></p>
                </div>
            </el-card>
            <el-card shadow="hover" class="user-table">
                <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">

                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16">
            <div class="num">
                <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData" :key="item.name">
                    <component :is="item.icon" class="icons" :style="{ background: item.color }"></component>
                    <div class="detail">
                        <p class="num">￥{{ item.value }}</p>
                        <p class="txt">￥{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card class="top-echart" style="height: 200px; border-radius: 10px;">
                <div ref="echart" style="height: 200px;"></div>
            </el-card>
            <div class="graph">
                <el-card style="border-radius: 10px;">
                    <div ref="userEchart" style="height: 230px;">

                    </div>
                </el-card>
                <el-card style="border-radius: 10px;">
                    <div ref="videoEchart" style="height: 240px;">

                    </div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<style scoped lang="less">
.home {
    height: 100%;
    overflow: hidden;

    .user-board {
        border-radius: 20px;
    }

    .user {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: 0;

        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: 20px;
            // margin: 40px;
        }

        .user-info {
            p {
                line-height: 30px;
            }

            .user-info-admin {
                font-size: 25px;
            }

            .user-info-p {
                color: #999;
            }

        }
    }

    .login-info {
        p {
            line-height: 30px;
            font-size: 12px;
            color: #999;

            span {
                color: #666;
                margin-left: 60px;
            }
        }
    }

    .user-table {
        margin-top: 20px;
        border-radius: 20px;
    }

    .num {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-card {
            width: 32%;
            margin-bottom: 10px;
            border-radius: 10px;
        }

        .icons {
            width: 50px;
            height: 50px;
            font-size: 20px;
            text-align: center;
            line-height: 80px;
            color: #fff;
        }

        .detail {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .num {
                font-size: 20px;
                margin-bottom: 10px;
            }

            .txt {
                font-size: 10px;
                text-align: center;
                color: #999;
            }
        }
    }

    .graph {
        display: flex;
        justify-content: space-between;

        .el-card {
            margin-top: 20px;
            width: 48%;
            height: 240px;
        }
    }
}
</style>
