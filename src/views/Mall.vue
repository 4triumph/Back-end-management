<script setup>
</script>

<template>
  <div class="mall-container">
    <div class="mall-content">
      <h1 class="glow-text">待施工...</h1>
      <div class="dots-container">
        <span class="dot" v-for="n in 12" :key="n"></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.mall-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: black;
}

.mall-content {
  position: relative;
  text-align: center;
  color: #fff;
}

.glow-text {
  font-size: 64px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 4px;
  position: relative;
  animation: glow 3s ease-in-out infinite;
  background: linear-gradient(90deg, #fff, #b4c7fe, #6387ff, #6fcfff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes glow {
  0%, 100% {
    text-shadow: 0 0 10px #fff, 0 0 20px #001aff, 0 0 30px #0099ff, 0 0 40px #5ddaf3;
  }
  50% {
    text-shadow: 0 0 20px #6fadff, 0 0 30px #b4c8fe, 0 0 40px #6387ff, 0 0 50px #6fd1ff;
  }
}

/* 旋转小点容器 */
.dots-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  animation: rotateDots 5s linear infinite;
}

/* 旋转动画 */
@keyframes rotateDots {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* 旋转小点样式 */
.dot {
  width: 12px;
  height: 12px;
  background-color: #178fb0;
  border-radius: 50%;
  animation: scaleDots 1.5s infinite ease-in-out;
  opacity: 0.7;
}

/* 小点缩放动画 */
@keyframes scaleDots {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
}
</style>
