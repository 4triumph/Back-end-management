<script setup>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTab from '../components/CommonTab.vue';
</script>

<template>
<div class="commom-layout">
    <el-container class="lay-container">
        <!-- 自定义左侧的组件组件 -->
         <common-aside />
         <el-container>
            <el-header class="el-header">
                <common-header />
            </el-header>
            <common-tab />
            <el-main class="right-main">
                <router-view></router-view>

            </el-main>
         </el-container>
    </el-container>
</div>
</template>

<style scoped lang="less">
    .common-layout, .lay-container {
        height: 100%;
    }
    .el-header {
        background: linear-gradient(180deg, #01162c 100%, #022362 0%);
    }
</style>
