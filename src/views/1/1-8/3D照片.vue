<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Heads :context="route.meta.title" />
        <div>
          <div class="containers">
            <div class="stage">
              <div class="control">
                <div class="imgWrap">
                  <div class="img-bg1"></div>
                  <div class="img-bg2"></div>
                  <div class="img-bg3"></div>
                  <div class="img-bg4"></div>
                  <div class="img-bg5"></div>
                  <div class="img-bg6"></div>
                  <div class="img-bg7"></div>
                  <div class="img-bg8"></div>
                  <div class="img-bg9"></div>
                  <div class="img-bg10"></div>
                  <div class="img-bg11"></div>
                  <div class="img-bg12"></div>
                  <div class="img-bg13"></div>
                  <div class="img-bg14"></div>
                  <div class="img-bg15"></div>
                  <div class="img-bg16"></div>
                  <div class="img-bg17"></div>
                  <div class="img-bg18"></div>
                  <div class="img-bg19"></div>
                  <div class="img-bg20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="code">
          <pre><code>{{ indexFile }}</code></pre>
        </div>
      </template>
    </div>
    <div class="button">
      <el-button type="primary" @click="handleClick">{{
        buttonContent
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
/* 不改的代码 begin */
import { useRoute } from "vue-router";

const route = useRoute();
const flag = ref(true);
const buttonContent = ref("查看代码");
const indexFile = ref(""); // 用于存储动态加载的内容

const handleClick = async () => {
  flag.value = !flag.value;
  buttonContent.value = flag.value ? "查看代码" : "返回";

  if (!flag.value) {
    // 动态加载 .vue 文件的原始内容
    const filePath = `./${route.meta.title}.vue?raw`; // 根据实际路径设置
    try {
      const module = await import(filePath);
      indexFile.value = module.default; // 读取原始代码
    } catch (error) {
      console.error("加载文件错误:", error);
    }
  }
};
/* 不改的代码 end */
</script>

<style lang="scss" scoped>
.home {
  height: 110%;
  width: 100%;
  background-color: #fff;
  position: relative;
  overflow-y: scroll;

  .container {
    width: 100%;
    height: 100%;
    padding: 10px;
    border: 1px solid black;

    .containers {
      width: 640px;
      margin: 0 auto;
      position: relative;
    }

    .containers .stage {
      width: 100%;
      height: 2000px;
      position: relative;
      -webkit-perspective: 742px;
      -moz-perspective: 742px;
      perspective: 742px;
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
    }

    .containers .stage .control {
      transform: translateZ(350px) rotateY(50deg) rotateZ(0deg);
      transform-style: preserve-3d;
    }

    .containers .stage .imgWrap {
      position: absolute;
      width: 174px;
      height: 2000px;
      left: 50%;
      -webkit-transition: -webkit-transform 1s;
      transition: transform 1s;
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
      animation: photoRotate 20s linear infinite;
    }

    .containers .stage .imgWrap > div {
      width: 174px;
      height: 2000px;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      -webkit-transform-origin: 50% 50% 0px;
      transform-origin: 50% 50% 0px;
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
      background-image: url("/@/assets/beauty/1/1-1.jpg");
      background-repeat: no-repeat;
    }

    .containers .stage .img-bg1 {
      background-position: 0px 0;
      -webkit-transform: rotateY(18deg) translateZ(543px);
      transform: rotateY(18deg) translateZ(543px);
    }

    .containers .stage .img-bg2 {
      background-position: -174px 0;
      -webkit-transform: rotateY(36deg) translateZ(543px);
      transform: rotateY(36deg) translateZ(543px);
    }

    .containers .stage .img-bg3 {
      background-position: -348px 0;
      -webkit-transform: rotateY(54deg) translateZ(543px);
      transform: rotateY(54deg) translateZ(543px);
    }

    .containers .stage .img-bg4 {
      background-position: -522px 0;
      -webkit-transform: rotateY(72deg) translateZ(543px);
      transform: rotateY(72deg) translateZ(543px);
    }

    .containers .stage .img-bg5 {
      background-position: -696px 0;
      -webkit-transform: rotateY(90deg) translateZ(543px);
      transform: rotateY(90deg) translateZ(543px);
    }

    .containers .stage .img-bg6 {
      background-position: -870px 0;
      -webkit-transform: rotateY(108deg) translateZ(543px);
      transform: rotateY(108deg) translateZ(543px);
    }

    .containers .stage .img-bg7 {
      background-position: -1044px 0;
      -webkit-transform: rotateY(126deg) translateZ(543px);
      transform: rotateY(126deg) translateZ(543px);
    }

    .containers .stage .img-bg8 {
      background-position: -1218px 0;
      -webkit-transform: rotateY(144deg) translateZ(543px);
      transform: rotateY(144deg) translateZ(543px);
    }

    .containers .stage .img-bg9 {
      background-position: -1392px 0;
      -webkit-transform: rotateY(162deg) translateZ(543px);
      transform: rotateY(162deg) translateZ(543px);
    }

    .containers .stage .img-bg10 {
      background-position: -1566px 0;
      -webkit-transform: rotateY(180deg) translateZ(543px);
      transform: rotateY(180deg) translateZ(543px);
    }

    .containers .stage .img-bg11 {
      background-position: -1740px 0;
      -webkit-transform: rotateY(198deg) translateZ(543px);
      transform: rotateY(198deg) translateZ(543px);
    }

    .containers .stage .img-bg12 {
      background-position: -1914px 0;
      -webkit-transform: rotateY(216deg) translateZ(543px);
      transform: rotateY(216deg) translateZ(543px);
    }

    .containers .stage .img-bg13 {
      background-position: -2088px 0;
      -webkit-transform: rotateY(234deg) translateZ(543px);
      transform: rotateY(234deg) translateZ(543px);
    }

    .containers .stage .img-bg14 {
      background-position: -2262px 0;
      -webkit-transform: rotateY(252deg) translateZ(543px);
      transform: rotateY(252deg) translateZ(543px);
    }

    .containers .stage .img-bg15 {
      background-position: -2436px 0;
      -webkit-transform: rotateY(270deg) translateZ(543px);
      transform: rotateY(270deg) translateZ(543px);
    }

    .containers .stage .img-bg16 {
      background-position: -2610px 0;
      -webkit-transform: rotateY(288deg) translateZ(543px);
      transform: rotateY(288deg) translateZ(543px);
    }

    .containers .stage .img-bg17 {
      background-position: -2784px 0;
      -webkit-transform: rotateY(306deg) translateZ(543px);
      transform: rotateY(306deg) translateZ(543px);
    }

    .containers .stage .img-bg18 {
      background-position: -2958px 0;
      -webkit-transform: rotateY(324deg) translateZ(543px);
      transform: rotateY(324deg) translateZ(543px);
    }

    .containers .stage .img-bg19 {
      background-position: -3132px 0;
      -webkit-transform: rotateY(342deg) translateZ(543px);
      transform: rotateY(342deg) translateZ(543px);
    }

    .containers .stage .img-bg20 {
      background-position: -3306px 0;
      -webkit-transform: rotateY(360deg) translateZ(543px);
      transform: rotateY(360deg) translateZ(543px);
    }

    @keyframes photoRotate {
      0% {
        -webkit-transform: rotateY(0deg);
        transform: rotateY(0deg);
      }
      100% {
        -webkit-transform: rotateY(360deg);
        transform: rotateY(360deg);
      }
    }

    .code {
      padding: 20px;
      border: 1px solid gray;
      font-size: 20px;
    }
  }

  .tip {
    width: 30%;
    min-height: 100px;
    max-height: 600px;
    position: fixed;
    right: 50px;
    top: 200px;
    overflow-y: scroll;
    padding: 10px;
    background-color: #e0e0e0;
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }

  .button {
    position: fixed;
    right: 50px;
    top: 130px;
  }
}
</style>
