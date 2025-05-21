<template>
  <section id="fifth">
    <div class="header">
      <h2>黑洞</h2>
      <div class="line"></div>
    </div>
    <div class="fImg" ref="fImg"></div>
    <div class="fCenter">
      <div
        v-for="(item, index) in items"
        :key="index"
        :ref="el => (divs[index] = el)"
      >
        <template v-if="index % 2 === 0">
          <dl>
            <dt>{{ item.title }}</dt>
            <dd>
              <p v-for="(line, i) in item.lines" :key="i">{{ line }}</p>
            </dd>
          </dl>
          <span>{{ index + 1 }}</span>
        </template>
        <template v-else>
          <span>{{ index + 1 }}</span>
          <dl>
            <dt>{{ item.title }}</dt>
            <dd>
              <p v-for="(line, i) in item.lines" :key="i">{{ line }}</p>
            </dd>
          </dl>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const fImg = ref(null);
const divs = ref([]);

const items = [
  {
    title: "黑洞_百科",
    lines: [
      "黑洞是现代广义相对论中",
      "宇宙空间内存在的一种天体",
      "黑洞的引力很大",
    ],
  },
  {
    title: "黑洞_电视剧",
    lines: ["管虎执导", "陶泽如、陈道明领衔主演", "警匪电视剧"],
  },
  {
    title: "黑洞_电影",
    lines: [
      "黑洞影评、图片",
      "用犯罪完成弑父",
      "副市长之子",
      "龙腾集团董事长",
      "闻名全省的企业家",
      "技术1vs1指导",
    ],
  },
  {
    title: "黑洞_照片",
    lines: ["国家科学基金会", "A星系(M87)中心", "有点小小的失望"],
  },
];

onMounted(() => {
  fImg.value.style.animation = "3s black linear";

  // 把文字吸进去
  setTimeout(() => {
    divs.value.forEach(div => {
      if (div) {
        div.l = div.offsetLeft;
        div.t = div.offsetTop;

        div.style.left =
          fImg.value.offsetWidth / 2 - div.offsetWidth / 2 + "px";
        div.style.top =
          fImg.value.offsetHeight / 2 - div.offsetHeight / 2 + "px";
        div.style.transform = "scale(0)";
      }
    });
  }, 2000);

  fImg.value.addEventListener("animationend", end);

  function end() {
    this.style.transform = "scale(0)";

    // 停止一段时间后再吐出来
    setTimeout(() => {
      divs.value.forEach(div => {
        if (div) {
          div.style.left = div.l + "px";
          div.style.top = div.t + "px";
          div.style.transform = "scale(1)";
        }
      });

      // 让黑洞慢慢放大，有过渡的效果
      fImg.value.style.transition = "0.2s";
      fImg.value.style.transform = "scale(1)";
    }, 500);

    // 在过渡完成以后让它转起来
    fImg.value.addEventListener(
      "transitionend",
      function () {
        this.style.animation = "10s blackRoate linear infinite";
      },
      false
    );
  }
});
</script>

<style lang="scss">
body,
h1,
h2,
h3,
h4,
p,
dl,
dt,
dd {
  margin: 0;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  text-decoration: none;
}

img {
  border: none;
}

html {
  width: 100%;
  overflow-x: hidden;
}

body {
  background: #000000;
  font-family: "微软雅黑";
  color: #fff;
  overflow: hidden;
}

.clear:after,
.center:after {
  clear: both;
  content: "";
  display: block;
}

.center {
  width: 960px;
  margin: 0 auto;
}

.header {
  text-align: center;

  h2 {
    font-size: 36px;
    font-weight: normal;
  }
}

.line {
  width: 103px;
  height: 4px;
  background: #fff;
  overflow: hidden;
  margin: 14px auto;
  transition: 0.5s;
  transform: scaleX(0);
}

.header h3 {
  font-size: 22px;
  font-weight: normal;
  color: #d1d1d1;
}

/* fifth */
#fifth {
  margin-bottom: 50px;

  .header {
    margin: 20px auto 40px auto;
  }
}

.fCenter {
  width: 620px;
  height: 618px;
  margin: -618px auto 0 auto;
  position: relative;
}

.fImg {
  width: 620px;
  height: 618px;
  margin: 0 auto;
  overflow: hidden;
  transform: scale(1.2);
  background: url(./img/blackhole.png) center no-repeat;
  background-size: cover;
}

@keyframes black {
  30% {
    transform: scale(1.4) rotate(30deg);
  }
  50% {
    transform: scale(1.6) rotate(50deg);
  }
  70% {
    transform: scale(1.8) rotate(70deg);
  }
  90% {
    transform: scale(2) rotate(90deg);
  }
  100% {
    transform: scale(0) rotate(110deg);
  }
}

@keyframes blackRoate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fCenter div {
  transition: 1.2s;

  dt {
    font: 22px/40px "微软雅黑";
    color: #fff;
  }

  dd {
    font: 14px/22px "微软雅黑";
    color: #fff;
  }

  span {
    font-size: 40px;
  }

  i {
    font-style: normal;
    transition: 0.3s;
  }

  &:nth-of-type(1) {
    position: absolute;
    left: 70px;
    top: 215px;
  }

  &:nth-of-type(2) {
    position: absolute;
    top: 60px;
    left: 220px;

    span,
    dl {
      float: left;
      margin-right: 10px;
    }
  }

  &:nth-of-type(3) {
    position: absolute;
    width: 150px;
    left: 400px;
    top: 200px;
    text-align: right;
  }

  &:nth-of-type(4) {
    position: absolute;
    top: 440px;
    left: 140px;
    text-align: right;

    span,
    dl {
      float: right;
      margin-left: 10px;
    }
  }
}
</style>
