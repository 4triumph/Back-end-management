<template>
  <el-aside :width="width" class="sidebar">
    <el-menu background-color="transparent" text-color="#fff" :collapse="isCollapse" :collapse-transition="false"
      :default-active="activeMenu" class="custom-menu">
      <h3 v-show="!isCollapse" class="menu-title">通用后台管理系统</h3>
      <h3 v-show="isCollapse" class="menu-title">后台</h3>
      <el-menu-item v-for="item in noChildren" :index="item.path" :key="item.path" @click="handleMenu(item)"
        class="menu-item">
        <component class="icons" :is="item.icon"></component>
        <span v-show="!isCollapse">{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu v-for="item in hasChildren" :index="item.path" :key="item.path" class="menu-item">
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span v-show="!isCollapse">{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="subItem in item.children" :index="subItem.path" :key="subItem.path"
            @click="handleMenu(item)">
            <component class="icons" :is="subItem.icon"></component>
            <span v-show="!isCollapse">{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAllDataStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'

const noChildren = computed(() => list.value.filter(item => !item.children))
const hasChildren = computed(() => list.value.filter(item => item.children))

const store = useAllDataStore()
const isCollapse = computed(() => store.state.isCollapse)
const width = computed(() => store.state.isCollapse ? '64px' : '200px')


const router = useRouter()
const route = useRoute()

const activeMenu = computed(() => route.path)
const list = computed(() => store.state.menuList)
const handleMenu = (item) => {
  router.push(item.path)
  store.selectMenu(item)
}
</script>

<style lang="less" scoped>
.sidebar {
  height: 100vh;
  background: linear-gradient(180deg, #2d2d2d 0%, #0f3abc 100%);
  transition: width 0.3s ease;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.custom-menu {
  border-right: none;
}

.menu-title {
  color: #fff;
  text-align: center;
  padding: 10px 0;
  font-size: 16px;
  font-weight: bold;
}

.menu-item {
  transition: all 0.3s;
  margin: 5px 0;
}

.menu-item:hover {
  background-color: rgba(0, 52, 130, 0.7);
}

.icons {
  width: 22px;
  height: 22px;
  margin-right: 15px;
  color: #fff;
}

.el-menu-item.is-active {
  background-color: #1761bc;
  border-radius: 4px;
  color: #fff;
}

.el-menu-item.is-active .icons {
  color: #fff;
}

.el-sub-menu__title:hover {
  color: #175ebc;
}

.el-sub-menu {
  color: #fff;
}
</style>
