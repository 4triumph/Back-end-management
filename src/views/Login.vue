<script setup>
import { reactive, getCurrentInstance } from 'vue'
import { useAllDataStore } from '@/stores'
import { useRouter } from 'vue-router'

const loginForm = reactive({
    username: '',
    password: '',
})

const { proxy } = getCurrentInstance()
const store = useAllDataStore()
const router = useRouter()

const handleLogin = async () => {
    const res = await proxy.$api.getMenu(loginForm)
    console.log(res)
    store.updateMenuList(res.menuList)
    store.state.token = res.token
    router.push('/home')
    store.addMenu(router)
}
</script>

<template>
    <div class="body-login">
        <div class="login-wrapper">
            <el-form :model="loginForm" class="login-container">
                <h1>欢迎登录</h1>
                <el-form-item>
                    <el-input type="input" placeholder="请输入账号" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleLogin" class="login-btn">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped lang="less">
.body-login {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #fca2e0, #a4cffd);
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
}

.login-container {
    width: 400px;
    background-color: #fff;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
    font-weight: bold;
    background: linear-gradient(135deg, #6ea0f8, #e999fb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}


:deep(.el-input) {
    height: 45px;
    border-radius: 8px;
}

:deep(.el-button) {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    font-size: 18px;
    background: linear-gradient(135deg, #fca2e0, #a4cffd);
    color: white;
    border: none;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background: linear-gradient(135deg, #6ea0f8, #e999fb);
        transform: translateY(-2px);
    }
}

</style>
