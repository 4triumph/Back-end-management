<template>
  <div class="header">
    <div class="l-content">
      <el-button size="small" @click="handleCollapse" class="collapse-btn">
        <el-icon><Grid /></el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="current" :to="current.path">{{ current.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImageUrl('user')" class="user" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAllDataStore } from '@/stores'
import { useRouter } from 'vue-router'
import { Grid } from '@element-plus/icons-vue'

const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};
const store = useAllDataStore()
const handleCollapse = () => (
  store.state.isCollapse = !store.state.isCollapse
)
const router = useRouter()
const handleLoginOut = () => {
  store.clean();
  router.push('/login')
}
const current = computed(() => store.state.currentMenu)
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background: linear-gradient(180deg, #01162c 100%, #022362 0%);
  padding: 0 20px;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.collapse-btn {
  color: #fff;
  background-color: #003d82;
  border: none;
}

.collapse-btn:hover {
  background-color: #3f6ed3;
}

.icons {
  width: 20px;
  height: 20px;
}

.l-content {
  display: flex;
  align-items: center;

  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
}

:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}

:deep(.el-breadcrumb__separator) {
  color: #b4b4ff !important;
}

:deep(.el-dropdown-menu) {
  background-color: #000f82;
  color: #fff;
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: #3f6ed3;
}
</style>
