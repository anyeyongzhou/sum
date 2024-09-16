<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Title
          :orderNum="1"
          context="利用radial-gradient和background-size实现各种背景"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="bg bg1"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>
        <div class="bg bg4"></div>
        <div class="bg bg5"></div>
        <div class="bg bg6"></div>
        <div class="bg bg7"></div>
        <div class="bg bg8"></div>
        <div class="bg bg9"></div>
        <div class="bg bg10"></div>
        <div class="bg bg11"></div>
        <div class="bg bg12"></div>
        <div class="bg bg13"></div>
        <div class="bg bg14"></div>
        <div class="bg bg15"></div>
        <div class="bg bg16"></div>
        <div class="bg bg17"></div>
        <div class="bg bg18"></div>
        <div class="bg bg19"></div>
        <div class="bg bg20"></div>
        <div class="bg bg21"></div>
        <div class="bg bg22"></div>
        <div class="bg bg23"></div>
        <div class="bg bg24"></div>
        <div class="bg bg25"></div>
        <div class="bg bg26"></div>
        <div class="bg bg27"></div>
        <div class="bg bg28"></div>
        <div class="bg bg29"></div>
        <div class="bg bg30"></div>
        <div class="bg bg31"></div>
        <div class="bg bg32"></div>
        <div class="bg bg33"></div>
        <div class="bg bg34"></div>
        <div class="bg bg35"></div>
        <div class="bg bg36"></div>
        <div class="bg bg37"></div>
        <div class="bg bg38"></div>
        <div class="bg bg39"></div>
        <div class="bg bg40"></div>
        <div class="bg bg41"></div>
        <div class="bg bg42"></div>
      </template>
      <template v-else>
        <div class="code">
          <pre><code>{{ indexFile }}</code></pre>
        </div>
      </template>
    </div>
    <div class="tip" v-marked:hl="markdownContent"></div>
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
import { marked } from "marked";
import "highlight.js/styles/monokai-sublime.css";

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

const markdownContent = ref(null);
onMounted(async () => {
  const mdFileContent = await import("./code.md?raw");
  markdownContent.value = marked(mdFileContent.default);
});
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
    width: 60%;
    height: 100%;
    padding: 10px;
    border: 1px solid black;

    /* 编写CSS begin */
    .bg {
      width: 100%;
      height: 200px;
      border: 1px solid green;
    }

    .bg1 {
      background: radial-gradient(
            circle at 0% 50%,
            rgba(96, 16, 48, 0) 9px,
            #613 10px,
            rgba(96, 16, 48, 0) 11px
          )
          0px 10px,
        radial-gradient(
          at 100% 100%,
          rgba(96, 16, 48, 0) 9px,
          #613 10px,
          rgba(96, 16, 48, 0) 11px
        ),
        #8a3;
      background-size: 20px 20px;
    }

    .bg2 {
      background: linear-gradient(63deg, #999 23%, transparent 23%) 7px 0,
        linear-gradient(63deg, transparent 74%, #999 78%),
        linear-gradient(
          63deg,
          transparent 34%,
          #999 38%,
          #999 58%,
          transparent 62%
        ),
        #444;
      background-size: 16px 48px;
    }

    .bg3 {
      background: #36c;
      background: linear-gradient(
            115deg,
            transparent 75%,
            rgba(255, 255, 255, 0.8) 75%
          )
          0 0,
        linear-gradient(245deg, transparent 75%, rgba(255, 255, 255, 0.8) 75%) 0
          0,
        linear-gradient(115deg, transparent 75%, rgba(255, 255, 255, 0.8) 75%)
          7px -15px,
        linear-gradient(245deg, transparent 75%, rgba(255, 255, 255, 0.8) 75%)
          7px -15px,
        #36c;
      background-size: 15px 30px;
    }
    .bg4 {
      background: linear-gradient(45deg, #92baac 45px, transparent 45px) 64px
          64px,
        linear-gradient(
          45deg,
          #92baac 45px,
          transparent 45px,
          transparent 91px,
          #e1ebbd 91px,
          #e1ebbd 135px,
          transparent 135px
        ),
        linear-gradient(
          -45deg,
          #92baac 23px,
          transparent 23px,
          transparent 68px,
          #92baac 68px,
          #92baac 113px,
          transparent 113px,
          transparent 158px,
          #92baac 158px
        );
      background-color: #e1ebbd;
      background-size: 128px 128px;
    }
    .bg5 {
      background: linear-gradient(135deg, #eceddc 25%, transparent 25%) -50px 0,
        linear-gradient(225deg, #eceddc 25%, transparent 25%) -50px 0,
        linear-gradient(315deg, #eceddc 25%, transparent 25%),
        linear-gradient(45deg, #eceddc 25%, transparent 25%);
      background-size: 100px 100px;
      background-color: #ec173a;
    }
    .bg6 {
      background: linear-gradient(
          135deg,
          #708090 21px,
          #d9ecff 22px,
          #d9ecff 24px,
          transparent 24px,
          transparent 67px,
          #d9ecff 67px,
          #d9ecff 69px,
          transparent 69px
        ),
        linear-gradient(
            225deg,
            #708090 21px,
            #d9ecff 22px,
            #d9ecff 24px,
            transparent 24px,
            transparent 67px,
            #d9ecff 67px,
            #d9ecff 69px,
            transparent 69px
          )
          0 64px;
      background-color: #708090;
      background-size: 64px 128px;
    }
    .bg7 {
      background: radial-gradient(
            hsl(0, 100%, 27%) 4%,
            hsl(0, 100%, 18%) 9%,
            hsla(0, 100%, 20%, 0) 9%
          )
          0 0,
        radial-gradient(
            hsl(0, 100%, 27%) 4%,
            hsl(0, 100%, 18%) 8%,
            hsla(0, 100%, 20%, 0) 10%
          )
          50px 50px,
        radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 50px
          0,
        radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 0
          50px,
        radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%)
          50px 0,
        radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%)
          100px 50px,
        radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 0 0,
        radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 50px
          50px,
        linear-gradient(
            45deg,
            hsla(0, 100%, 20%, 0) 49%,
            hsla(0, 100%, 0%, 1) 50%,
            hsla(0, 100%, 20%, 0) 70%
          )
          0 0,
        linear-gradient(
            -45deg,
            hsla(0, 100%, 20%, 0) 49%,
            hsla(0, 100%, 0%, 1) 50%,
            hsla(0, 100%, 20%, 0) 70%
          )
          0 0;
      background-color: #300;
      background-size: 100px 100px;
    }
    .bg8 {
      background-color: black;
      background-image: radial-gradient(
          white,
          rgba(255, 255, 255, 0.2) 2px,
          transparent 40px
        ),
        radial-gradient(white, rgba(255, 255, 255, 0.15) 1px, transparent 30px),
        radial-gradient(white, rgba(255, 255, 255, 0.1) 2px, transparent 40px),
        radial-gradient(
          rgba(255, 255, 255, 0.4),
          rgba(255, 255, 255, 0.1) 2px,
          transparent 30px
        );
      background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
      background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
    }
    .bg9 {
      background-color: white;
      background-image: radial-gradient(midnightblue 9px, transparent 10px),
        repeating-radial-gradient(
          midnightblue 0,
          midnightblue 4px,
          transparent 5px,
          transparent 20px,
          midnightblue 21px,
          midnightblue 25px,
          transparent 26px,
          transparent 50px
        );
      background-size: 30px 30px, 90px 90px;
      background-position: 0 0;
    }
    .bg10 {
      background: radial-gradient(
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.15) 30%,
            rgba(255, 255, 255, 0.3) 32%,
            rgba(255, 255, 255, 0) 33%
          )
          0 0,
        radial-gradient(
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.1) 11%,
            rgba(255, 255, 255, 0.3) 13%,
            rgba(255, 255, 255, 0) 14%
          )
          0 0,
        radial-gradient(
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.2) 17%,
            rgba(255, 255, 255, 0.43) 19%,
            rgba(255, 255, 255, 0) 20%
          )
          0 110px,
        radial-gradient(
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.2) 11%,
            rgba(255, 255, 255, 0.4) 13%,
            rgba(255, 255, 255, 0) 14%
          ) -130px -170px,
        radial-gradient(
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.2) 11%,
            rgba(255, 255, 255, 0.4) 13%,
            rgba(255, 255, 255, 0) 14%
          )
          130px 370px,
        radial-gradient(
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.1) 11%,
            rgba(255, 255, 255, 0.2) 13%,
            rgba(255, 255, 255, 0) 14%
          )
          0 0,
        linear-gradient(
          45deg,
          #343702 0%,
          #184500 20%,
          #187546 30%,
          #006782 40%,
          #0b1284 50%,
          #760ea1 60%,
          #83096e 70%,
          #840b2a 80%,
          #b13e12 90%,
          #e27412 100%
        );
      background-size: 470px 470px, 970px 970px, 410px 410px, 610px 610px,
        530px 530px, 730px 730px, 100% 100%;
      background-color: #840b2a;
    }
    .bg11 {
      background: linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
        linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
        linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
        linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
        linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
        linear-gradient(
          #1d1d1d 25%,
          #1a1a1a 25%,
          #1a1a1a 50%,
          transparent 50%,
          transparent 75%,
          #242424 75%,
          #242424
        );
      background-color: #131313;
      background-size: 20px 20px;
    }
    .bg12 {
      background: radial-gradient(black 15%, transparent 16%) 0 0,
        radial-gradient(black 15%, transparent 16%) 8px 8px,
        radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 0 1px,
        radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 8px 9px;
      background-color: #282828;
      background-size: 16px 16px;
    }
    .bg13 {
      background: radial-gradient(
          circle closest-side at 60% 43%,
          #b03 26%,
          rgba(187, 0, 51, 0) 27%
        ),
        radial-gradient(
          circle closest-side at 40% 43%,
          #b03 26%,
          rgba(187, 0, 51, 0) 27%
        ),
        radial-gradient(
          circle closest-side at 42% 22%,
          #d35 43%,
          rgba(221, 51, 85, 0) 45%
        ),
        radial-gradient(
          circle closest-side at 58% 22%,
          #d35 43%,
          rgba(221, 51, 85, 0) 45%
        ),
        radial-gradient(
          circle closest-side at 50% 35%,
          #d35 32%,
          rgba(221, 51, 85, 0) 27%
        ),
        radial-gradient(
            circle closest-side at 60% 43%,
            #b03 26%,
            rgba(187, 0, 51, 0) 27%
          )
          50px 50px,
        radial-gradient(
            circle closest-side at 40% 43%,
            #b03 26%,
            rgba(187, 0, 51, 0) 27%
          )
          50px 50px,
        radial-gradient(
            circle closest-side at 40% 22%,
            #d35 40%,
            rgba(221, 51, 85, 0) 45%
          )
          52px 50px,
        radial-gradient(
            circle closest-side at 60% 22%,
            #d35 40%,
            rgba(221, 51, 85, 0) 45%
          )
          48px 50px,
        radial-gradient(
            circle closest-side at 50% 35%,
            #d35 30%,
            rgba(221, 51, 85, 0) 37%
          )
          50px 50px;
      background-color: #b03;
      background-size: 100px 100px;
    }
    .bg14 {
      background-color: #6d695c;
      background-image: repeating-linear-gradient(
          120deg,
          rgba(255, 255, 255, 0.1),
          rgba(255, 255, 255, 0.1) 1px,
          transparent 1px,
          transparent 60px
        ),
        repeating-linear-gradient(
          60deg,
          rgba(255, 255, 255, 0.1),
          rgba(255, 255, 255, 0.1) 1px,
          transparent 1px,
          transparent 60px
        ),
        linear-gradient(
          60deg,
          rgba(0, 0, 0, 0.1) 25%,
          transparent 25%,
          transparent 75%,
          rgba(0, 0, 0, 0.1) 75%,
          rgba(0, 0, 0, 0.1)
        ),
        linear-gradient(
          120deg,
          rgba(0, 0, 0, 0.1) 25%,
          transparent 25%,
          transparent 75%,
          rgba(0, 0, 0, 0.1) 75%,
          rgba(0, 0, 0, 0.1)
        );
      background-size: 70px 120px;
    }
    .bg15 {
      background-color: #ff7d9d;
      background-size: 58px 58px;
      background-position: 0px 2px, 4px 35px, 29px 31px, 33px 6px, 0px 36px,
        4px 2px, 29px 6px, 33px 30px;
      background-image: linear-gradient(335deg, #c90032 23px, transparent 23px),
        linear-gradient(155deg, #c90032 23px, transparent 23px),
        linear-gradient(335deg, #c90032 23px, transparent 23px),
        linear-gradient(155deg, #c90032 23px, transparent 23px),
        linear-gradient(335deg, #c90032 10px, transparent 10px),
        linear-gradient(155deg, #c90032 10px, transparent 10px),
        linear-gradient(335deg, #c90032 10px, transparent 10px),
        linear-gradient(155deg, #c90032 10px, transparent 10px);
    }
    .bg16 {
      background: radial-gradient(
          circle at 100% 50%,
          transparent 20%,
          rgba(255, 255, 255, 0.3) 21%,
          rgba(255, 255, 255, 0.3) 34%,
          transparent 35%,
          transparent
        ),
        radial-gradient(
            circle at 0% 50%,
            transparent 20%,
            rgba(255, 255, 255, 0.3) 21%,
            rgba(255, 255, 255, 0.3) 34%,
            transparent 35%,
            transparent
          )
          0 -50px;
      background-color: slategray;
      background-size: 75px 100px;
    }
    .bg17 {
      background: radial-gradient(
          circle,
          transparent 20%,
          slategray 20%,
          slategray 80%,
          transparent 80%,
          transparent
        ),
        radial-gradient(
            circle,
            transparent 20%,
            slategray 20%,
            slategray 80%,
            transparent 80%,
            transparent
          )
          50px 50px,
        linear-gradient(#a8b1bb 8px, transparent 8px) 0 -4px,
        linear-gradient(90deg, #a8b1bb 8px, transparent 8px) -4px 0;
      background-color: slategray;
      background-size: 100px 100px, 100px 100px, 50px 50px, 50px 50px;
    }
    .bg18 {
      background: radial-gradient(
            circle at 50% 59%,
            #d2caab 3%,
            #364e27 4%,
            #364e27 11%,
            rgba(54, 78, 39, 0) 12%,
            rgba(54, 78, 39, 0)
          )
          50px 0,
        radial-gradient(
            circle at 50% 41%,
            #364e27 3%,
            #d2caab 4%,
            #d2caab 11%,
            rgba(210, 202, 171, 0) 12%,
            rgba(210, 202, 171, 0)
          )
          50px 0,
        radial-gradient(
            circle at 50% 59%,
            #d2caab 3%,
            #364e27 4%,
            #364e27 11%,
            rgba(54, 78, 39, 0) 12%,
            rgba(54, 78, 39, 0)
          )
          0 50px,
        radial-gradient(
            circle at 50% 41%,
            #364e27 3%,
            #d2caab 4%,
            #d2caab 11%,
            rgba(210, 202, 171, 0) 12%,
            rgba(210, 202, 171, 0)
          )
          0 50px,
        radial-gradient(
          circle at 100% 50%,
          #d2caab 16%,
          rgba(210, 202, 171, 0) 17%
        ),
        radial-gradient(circle at 0% 50%, #364e27 16%, rgba(54, 78, 39, 0) 17%),
        radial-gradient(
            circle at 100% 50%,
            #d2caab 16%,
            rgba(210, 202, 171, 0) 17%
          )
          50px 50px,
        radial-gradient(circle at 0% 50%, #364e27 16%, rgba(54, 78, 39, 0) 17%)
          50px 50px;
      background-color: #63773f;
      background-size: 100px 100px;
    }
    .bg19 {
      background: linear-gradient(324deg, #232927 4%, transparent 4%) -70px 43px,
        linear-gradient(36deg, #232927 4%, transparent 4%) 30px 43px,
        linear-gradient(72deg, #e3d7bf 8.5%, transparent 8.5%) 30px 43px,
        linear-gradient(288deg, #e3d7bf 8.5%, transparent 8.5%) -70px 43px,
        linear-gradient(216deg, #e3d7bf 7.5%, transparent 7.5%) -70px 23px,
        linear-gradient(144deg, #e3d7bf 7.5%, transparent 7.5%) 30px 23px,
        linear-gradient(324deg, #232927 4%, transparent 4%) -20px 93px,
        linear-gradient(36deg, #232927 4%, transparent 4%) 80px 93px,
        linear-gradient(72deg, #e3d7bf 8.5%, transparent 8.5%) 80px 93px,
        linear-gradient(288deg, #e3d7bf 8.5%, transparent 8.5%) -20px 93px,
        linear-gradient(216deg, #e3d7bf 7.5%, transparent 7.5%) -20px 73px,
        linear-gradient(144deg, #e3d7bf 7.5%, transparent 7.5%) 80px 73px;
      background-color: #232927;
      background-size: 100px 100px;
    }
    .bg20 {
      background-image: radial-gradient(
          closest-side,
          transparent 0%,
          transparent 75%,
          #b6cc66 76%,
          #b6cc66 85%,
          #edffdb 86%,
          #edffdb 94%,
          #ffffff 95%,
          #ffffff 103%,
          #d9e6a7 104%,
          #d9e6a7 112%,
          #798b3c 113%,
          #798b3c 121%,
          #ffffff 122%,
          #ffffff 130%,
          #e0ead7 131%,
          #e0ead7 140%
        ),
        radial-gradient(
          closest-side,
          transparent 0%,
          transparent 75%,
          #b6cc66 76%,
          #b6cc66 85%,
          #edffdb 86%,
          #edffdb 94%,
          #ffffff 95%,
          #ffffff 103%,
          #d9e6a7 104%,
          #d9e6a7 112%,
          #798b3c 113%,
          #798b3c 121%,
          #ffffff 122%,
          #ffffff 130%,
          #e0ead7 131%,
          #e0ead7 140%
        );
      background-size: 110px 110px;
      background-color: #c8d3a7;
      background-position: 0 0, 55px 55px;
    }
    .bg21 {
      background-color: #def;
      background-image: radial-gradient(
          closest-side,
          transparent 98%,
          rgba(0, 0, 0, 0.3) 99%
        ),
        radial-gradient(closest-side, transparent 98%, rgba(0, 0, 0, 0.3) 99%);
      background-size: 80px 80px;
      background-position: 0 0, 40px 40px;
    }
    .bg22 {
      background-color: silver;
      background-image: linear-gradient(335deg, #b00 23px, transparent 23px),
        linear-gradient(155deg, #d00 23px, transparent 23px),
        linear-gradient(335deg, #b00 23px, transparent 23px),
        linear-gradient(155deg, #d00 23px, transparent 23px);
      background-size: 58px 58px;
      background-position: 0px 2px, 4px 35px, 29px 31px, 34px 6px;
    }
    .bg23 {
      background-color: silver;
      background-image: radial-gradient(
          circle at 100% 150%,
          silver 24%,
          white 24%,
          white 28%,
          silver 28%,
          silver 36%,
          white 36%,
          white 40%,
          transparent 40%,
          transparent
        ),
        radial-gradient(
          circle at 0 150%,
          silver 24%,
          white 24%,
          white 28%,
          silver 28%,
          silver 36%,
          white 36%,
          white 40%,
          transparent 40%,
          transparent
        ),
        radial-gradient(
          circle at 50% 100%,
          white 10%,
          silver 10%,
          silver 23%,
          white 23%,
          white 30%,
          silver 30%,
          silver 43%,
          white 43%,
          white 50%,
          silver 50%,
          silver 63%,
          white 63%,
          white 71%,
          transparent 71%,
          transparent
        ),
        radial-gradient(
          circle at 100% 50%,
          white 5%,
          silver 5%,
          silver 15%,
          white 15%,
          white 20%,
          silver 20%,
          silver 29%,
          white 29%,
          white 34%,
          silver 34%,
          silver 44%,
          white 44%,
          white 49%,
          transparent 49%,
          transparent
        ),
        radial-gradient(
          circle at 0 50%,
          white 5%,
          silver 5%,
          silver 15%,
          white 15%,
          white 20%,
          silver 20%,
          silver 29%,
          white 29%,
          white 34%,
          silver 34%,
          silver 44%,
          white 44%,
          white 49%,
          transparent 49%,
          transparent
        );
      background-size: 100px 50px;
    }
    .bg24 {
      background-color: #556;
      background-image: linear-gradient(
          30deg,
          #445 12%,
          transparent 12.5%,
          transparent 87%,
          #445 87.5%,
          #445
        ),
        linear-gradient(
          150deg,
          #445 12%,
          transparent 12.5%,
          transparent 87%,
          #445 87.5%,
          #445
        ),
        linear-gradient(
          30deg,
          #445 12%,
          transparent 12.5%,
          transparent 87%,
          #445 87.5%,
          #445
        ),
        linear-gradient(
          150deg,
          #445 12%,
          transparent 12.5%,
          transparent 87%,
          #445 87.5%,
          #445
        ),
        linear-gradient(
          60deg,
          #99a 25%,
          transparent 25.5%,
          transparent 75%,
          #99a 75%,
          #99a
        ),
        linear-gradient(
          60deg,
          #99a 25%,
          transparent 25.5%,
          transparent 75%,
          #99a 75%,
          #99a
        );
      background-size: 80px 140px;
      background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
    }
    .bg25 {
      background-color: #001;
      background-image: radial-gradient(white 15%, transparent 16%),
        radial-gradient(white 15%, transparent 16%);
      background-size: 60px 60px;
      background-position: 0 0, 30px 30px;
    }
    .bg26 {
      background: linear-gradient(
            -45deg,
            white 25%,
            transparent 25%,
            transparent 75%,
            black 75%,
            black
          )
          0 0,
        linear-gradient(
            -45deg,
            black 25%,
            transparent 25%,
            transparent 75%,
            white 75%,
            white
          )
          1em 1em,
        linear-gradient(
            45deg,
            black 17%,
            transparent 17%,
            transparent 25%,
            black 25%,
            black 36%,
            transparent 36%,
            transparent 64%,
            black 64%,
            black 75%,
            transparent 75%,
            transparent 83%,
            black 83%
          )
          1em 1em;
      background-color: white;
      background-size: 2em 2em;
    }
    .bg27 {
      background-color: #eee;
      background-image: linear-gradient(
          45deg,
          black 25%,
          transparent 25%,
          transparent 75%,
          black 75%,
          black
        ),
        linear-gradient(
          45deg,
          black 25%,
          transparent 25%,
          transparent 75%,
          black 75%,
          black
        );
      background-size: 60px 60px;
      background-position: 0 0, 30px 30px;
    }
    .bg28 {
      background-color: #eee;
      background-image: linear-gradient(
          45deg,
          black 25%,
          transparent 25%,
          transparent 75%,
          black 75%,
          black
        ),
        linear-gradient(
          -45deg,
          black 25%,
          transparent 25%,
          transparent 75%,
          black 75%,
          black
        );
      background-size: 60px 60px;
    }
    .bg29 {
      background-color: hsl(2, 57%, 40%);
      background-image: repeating-linear-gradient(
          transparent,
          transparent 50px,
          rgba(0, 0, 0, 0.4) 50px,
          rgba(0, 0, 0, 0.4) 53px,
          transparent 53px,
          transparent 63px,
          rgba(0, 0, 0, 0.4) 63px,
          rgba(0, 0, 0, 0.4) 66px,
          transparent 66px,
          transparent 116px,
          rgba(0, 0, 0, 0.5) 116px,
          rgba(0, 0, 0, 0.5) 166px,
          rgba(255, 255, 255, 0.2) 166px,
          rgba(255, 255, 255, 0.2) 169px,
          rgba(0, 0, 0, 0.5) 169px,
          rgba(0, 0, 0, 0.5) 179px,
          rgba(255, 255, 255, 0.2) 179px,
          rgba(255, 255, 255, 0.2) 182px,
          rgba(0, 0, 0, 0.5) 182px,
          rgba(0, 0, 0, 0.5) 232px,
          transparent 232px
        ),
        repeating-linear-gradient(
          270deg,
          transparent,
          transparent 50px,
          rgba(0, 0, 0, 0.4) 50px,
          rgba(0, 0, 0, 0.4) 53px,
          transparent 53px,
          transparent 63px,
          rgba(0, 0, 0, 0.4) 63px,
          rgba(0, 0, 0, 0.4) 66px,
          transparent 66px,
          transparent 116px,
          rgba(0, 0, 0, 0.5) 116px,
          rgba(0, 0, 0, 0.5) 166px,
          rgba(255, 255, 255, 0.2) 166px,
          rgba(255, 255, 255, 0.2) 169px,
          rgba(0, 0, 0, 0.5) 169px,
          rgba(0, 0, 0, 0.5) 179px,
          rgba(255, 255, 255, 0.2) 179px,
          rgba(255, 255, 255, 0.2) 182px,
          rgba(0, 0, 0, 0.5) 182px,
          rgba(0, 0, 0, 0.5) 232px,
          transparent 232px
        ),
        repeating-linear-gradient(
          125deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.2) 2px,
          rgba(0, 0, 0, 0.2) 3px,
          transparent 3px,
          transparent 5px,
          rgba(0, 0, 0, 0.2) 5px
        );
    }
    .bg30 {
      background-color: hsl(34, 53%, 82%);
      background-image: repeating-linear-gradient(
          45deg,
          transparent 5px,
          hsla(197, 62%, 11%, 0.5) 5px,
          hsla(197, 62%, 11%, 0.5) 10px,
          hsla(5, 53%, 63%, 0) 10px,
          hsla(5, 53%, 63%, 0) 35px,
          hsla(5, 53%, 63%, 0.5) 35px,
          hsla(5, 53%, 63%, 0.5) 40px,
          hsla(197, 62%, 11%, 0.5) 40px,
          hsla(197, 62%, 11%, 0.5) 50px,
          hsla(197, 62%, 11%, 0) 50px,
          hsla(197, 62%, 11%, 0) 60px,
          hsla(5, 53%, 63%, 0.5) 60px,
          hsla(5, 53%, 63%, 0.5) 70px,
          hsla(35, 91%, 65%, 0.5) 70px,
          hsla(35, 91%, 65%, 0.5) 80px,
          hsla(35, 91%, 65%, 0) 80px,
          hsla(35, 91%, 65%, 0) 90px,
          hsla(5, 53%, 63%, 0.5) 90px,
          hsla(5, 53%, 63%, 0.5) 110px,
          hsla(5, 53%, 63%, 0) 110px,
          hsla(5, 53%, 63%, 0) 120px,
          hsla(197, 62%, 11%, 0.5) 120px,
          hsla(197, 62%, 11%, 0.5) 140px
        ),
        repeating-linear-gradient(
          135deg,
          transparent 5px,
          hsla(197, 62%, 11%, 0.5) 5px,
          hsla(197, 62%, 11%, 0.5) 10px,
          hsla(5, 53%, 63%, 0) 10px,
          hsla(5, 53%, 63%, 0) 35px,
          hsla(5, 53%, 63%, 0.5) 35px,
          hsla(5, 53%, 63%, 0.5) 40px,
          hsla(197, 62%, 11%, 0.5) 40px,
          hsla(197, 62%, 11%, 0.5) 50px,
          hsla(197, 62%, 11%, 0) 50px,
          hsla(197, 62%, 11%, 0) 60px,
          hsla(5, 53%, 63%, 0.5) 60px,
          hsla(5, 53%, 63%, 0.5) 70px,
          hsla(35, 91%, 65%, 0.5) 70px,
          hsla(35, 91%, 65%, 0.5) 80px,
          hsla(35, 91%, 65%, 0) 80px,
          hsla(35, 91%, 65%, 0) 90px,
          hsla(5, 53%, 63%, 0.5) 90px,
          hsla(5, 53%, 63%, 0.5) 110px,
          hsla(5, 53%, 63%, 0) 110px,
          hsla(5, 53%, 63%, 0) 140px,
          hsla(197, 62%, 11%, 0.5) 140px,
          hsla(197, 62%, 11%, 0.5) 160px
        );
    }
    .bg31 {
      background-color: #fff;
      background-image: linear-gradient(
          90deg,
          transparent 79px,
          #abced4 79px,
          #abced4 81px,
          transparent 81px
        ),
        linear-gradient(#eee 0.1em, transparent 0.1em);
      background-size: 100% 1.2em;
    }
    .bg32 {
      background-color: #269;
      background-image: linear-gradient(white 2px, transparent 2px),
        linear-gradient(90deg, white 2px, transparent 2px),
        linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
      background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
      background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
    }
    .bg33 {
      background-color: white;
      background-image: linear-gradient(
          90deg,
          rgba(200, 0, 0, 0.5) 50%,
          transparent 50%
        ),
        linear-gradient(rgba(200, 0, 0, 0.5) 50%, transparent 50%);
      background-size: 50px 50px;
    }
    .bg34 {
      background-color: gray;
      background-image: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 35px,
        rgba(255, 255, 255, 0.5) 35px,
        rgba(255, 255, 255, 0.5) 70px
      );
    }
    .bg35 {
      background-color: #026873;
      background-image: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.07) 50%,
          transparent 50%
        ),
        linear-gradient(90deg, rgba(255, 255, 255, 0.13) 50%, transparent 50%),
        linear-gradient(90deg, transparent 50%, rgba(255, 255, 255, 0.17) 50%),
        linear-gradient(90deg, transparent 50%, rgba(255, 255, 255, 0.19) 50%);
      background-size: 13px, 29px, 37px, 53px;
    }
    .bg36 {
      background-color: gray;
      background-image: linear-gradient(
        90deg,
        transparent 50%,
        rgba(255, 255, 255, 0.5) 50%
      );
      background-size: 50px 50px;
    }
    .bg37 {
      background-color: gray;
      background-image: linear-gradient(
        transparent 50%,
        rgba(255, 255, 255, 0.5) 50%
      );
      background-size: 50px 50px;
    }
    .bg38 {
      background: radial-gradient(
            circle farthest-side at 0% 50%,
            #fb1 23.5%,
            rgba(240, 166, 17, 0) 0
          )
          21px 30px,
        radial-gradient(
            circle farthest-side at 0% 50%,
            #b71 24%,
            rgba(240, 166, 17, 0) 0
          )
          19px 30px,
        linear-gradient(
            #fb1 14%,
            rgba(240, 166, 17, 0) 0,
            rgba(240, 166, 17, 0) 85%,
            #fb1 0
          )
          0 0,
        linear-gradient(
            150deg,
            #fb1 24%,
            #b71 0,
            #b71 26%,
            rgba(240, 166, 17, 0) 0,
            rgba(240, 166, 17, 0) 74%,
            #b71 0,
            #b71 76%,
            #fb1 0
          )
          0 0,
        linear-gradient(
            30deg,
            #fb1 24%,
            #b71 0,
            #b71 26%,
            rgba(240, 166, 17, 0) 0,
            rgba(240, 166, 17, 0) 74%,
            #b71 0,
            #b71 76%,
            #fb1 0
          )
          0 0,
        linear-gradient(90deg, #b71 2%, #fb1 0, #fb1 98%, #b71 0%) 0 0 #fb1;
      background-size: 40px 60px;
    }
    .bg39 {
      background: linear-gradient(#ffffff 50%, rgba(255, 255, 255, 0) 0) 0 0,
        radial-gradient(
            circle closest-side,
            #ffffff 53%,
            rgba(255, 255, 255, 0) 0
          )
          0 0,
        radial-gradient(
            circle closest-side,
            #ffffff 50%,
            rgba(255, 255, 255, 0) 0
          )
          55px 0 #48b;
      background-size: 110px 200px;
      background-repeat: repeat-x;
    }
    .bg40 {
      background: linear-gradient(315deg, transparent 75%, #d45d55 0)-10px 0,
        linear-gradient(45deg, transparent 75%, #d45d55 0)-10px 0,
        linear-gradient(135deg, #a7332b 50%, transparent 0) 0 0,
        linear-gradient(45deg, #6a201b 50%, #561a16 0) 0 0 #561a16;
      background-size: 20px 20px;
    }
    .bg41 {
      background: linear-gradient(
          45deg,
          #dca 12%,
          transparent 0,
          transparent 88%,
          #dca 0
        ),
        linear-gradient(
          135deg,
          transparent 37%,
          #a85 0,
          #a85 63%,
          transparent 0
        ),
        linear-gradient(45deg, transparent 37%, #dca 0, #dca 63%, transparent 0)
          #753;
      background-size: 25px 25px;
    }
    .bg42 {
      background: radial-gradient(black 3px, transparent 4px),
        radial-gradient(black 3px, transparent 4px),
        linear-gradient(#fff 4px, transparent 0),
        linear-gradient(
          45deg,
          transparent 74px,
          transparent 75px,
          #a4a4a4 75px,
          #a4a4a4 76px,
          transparent 77px,
          transparent 109px
        ),
        linear-gradient(
          -45deg,
          transparent 75px,
          transparent 76px,
          #a4a4a4 76px,
          #a4a4a4 77px,
          transparent 78px,
          transparent 109px
        ),
        #fff;
      background-size: 109px 109px, 109px 109px, 100% 6px, 109px 109px,
        109px 109px;
      background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
    }

    /* 编写CSS end */

    .code {
      padding: 20px;
      border: 1px solid gray;
      font-size: 20px;
    }
  }

  .tip {
    width: 600px;
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
