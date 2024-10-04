<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goHome = () => {
  //go方法: 按指定方向访问历史。如果是正数则是路由记录向前跳转，如果是负数则是向后回退
  //这里我们回退两个页面到跳转前的页面
  router.go(-2)
}
</script>
<template>
  <div class="bg">
    <div title="404">404</div>
    <el-button class="btn-home" @click="goHome">
      回到上一个页面
    </el-button>
  </div>
</template>

<style scoped>
.bg {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  margin: 0;
  background: #131313;
  color: #fff;
  font-size: 96px;
  font-family: 'Fira Mono', monospace;
  letter-spacing: -7px;

}

div {
  animation: glitch 1s linear infinite;
}

.btn-home {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50px;
}

@keyframes glitch {

  2%,
  64% {
    transform: translate(2px, 0) skew(0deg);
  }

  4%,
  60% {
    transform: translate(-2px, 0) skew(0deg);
  }

  62% {
    transform: translate(0, 0) skew(5deg);
  }
}

div:before,
div:after {
  content: attr(title);
  position: absolute;
  left: 0;
}

div:before {
  animation: glitchTop 1s linear infinite;
  clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
}

@keyframes glitchTop {

  2%,
  64% {
    transform: translate(2px, -2px);
  }

  4%,
  60% {
    transform: translate(-2px, 2px);
  }

  62% {
    transform: translate(13px, -1px) skew(-13deg);
  }
}

div:after {
  animation: glitchBotom 1.5s linear infinite;
  clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
}

@keyframes glitchBotom {

  2%,
  64% {
    transform: translate(-2px, 0);
  }

  4%,
  60% {
    transform: translate(-2px, 0);
  }

  62% {
    transform: translate(-22px, 5px) skew(21deg);
  }
}
</style>
