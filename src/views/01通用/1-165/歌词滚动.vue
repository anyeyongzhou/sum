<template>
  <div class="container">
    <audio ref="audioRef" :src="audioSrc" controls></audio>
    <div class="lrc-container">
      <ul :style="{ marginTop: `${marginTop}px` }">
        <li
          v-for="(item, index) in lrcArray"
          :key="index"
          :class="{ active: index === currentIndex }"
        >
          {{ item.word }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import audioSrc from "./media/1.mp3";

const lrcText = `[00:01.06]难念的经
[00:03.95]演唱：周华健
[00:06.78]
[00:30.96]笑你我枉花光心计
[00:34.15]爱竞逐镜花那美丽
[00:36.75]怕幸运会转眼远逝
[00:39.32]为贪嗔喜恶怒着迷
[00:41.99]责你我太贪功恋势
[00:44.48]怪大地众生太美丽
[00:47.00]悔旧日太执信约誓
[00:49.66]为悲欢哀怨妒着迷
[00:52.56]啊 舍不得璀灿俗世
[00:57.66]啊 躲不开痴恋的欣慰
[01:02.86]啊 找不到色相代替
[01:08.09]啊 参一生参不透这条难题
[01:13.15]吞风吻雨葬落日未曾彷徨
[01:15.73]欺山赶海践雪径也未绝望
[01:18.23]拈花把酒偏折煞世人情狂
[01:20.90]凭这两眼与百臂或千手不能防
[01:23.76]天阔阔雪漫漫共谁同航
[01:26.09]这沙滚滚水皱皱笑着浪荡
[01:28.68]贪欢一刻偏教那女儿情长埋葬
[01:32.38]
[01:34.09]吞风吻雨葬落日未曾彷徨
[01:36.50]欺山赶海践雪径也未绝望
[01:39.07]拈花把酒偏折煞世人情狂
[01:41.69]凭这两眼与百臂或千手不能防
[01:44.68]天阔阔雪漫漫共谁同航
[01:46.93]这沙滚滚水皱皱笑着浪荡
[01:49.54]贪欢一刻偏教那女儿情长埋葬
[01:53.41]
[02:15.45]笑你我枉花光心计
[02:18.53]爱竞逐镜花那美丽
[02:21.14]怕幸运会转眼远逝
[02:23.76]为贪嗔喜恶怒着迷
[02:26.43]责你我太贪功恋势
[02:28.98]怪大地众生太美丽
[02:31.60]悔旧日太执信约誓
[02:34.26]为悲欢哀怨妒着迷
[02:36.90]啊 舍不得璀灿俗世
[02:42.04]啊 躲不开痴恋的欣慰
[02:47.34]啊 找不到色相代替
[02:52.52]啊 参一生参不透这条难题
[02:57.47]吞风吻雨葬落日未曾彷徨
[03:00.05]欺山赶海践雪径也未绝望
[03:02.64]拈花把酒偏折煞世人情狂
[03:05.27]凭这两眼与百臂或千手不能防
[03:08.22]天阔阔雪漫漫共谁同航
[03:10.49]这沙滚滚水皱皱笑着浪荡
[03:13.06]贪欢一刻偏教那女儿情长埋葬
[03:18.45]吞风吻雨葬落日未曾彷徨
[03:20.90]欺山赶海践雪径也未绝望
[03:23.54]拈花把酒偏折煞世人情狂
[03:26.21]凭这两眼与百臂或千手不能防
[03:29.07]天阔阔雪漫漫共谁同航
[03:31.32]这沙滚滚水皱皱笑着浪荡
[03:33.92]贪欢一刻偏教那女儿情长埋葬
[03:39.32]吞风吻雨葬落日未曾彷徨
[03:41.84]欺山赶海践雪径也未绝望
[03:44.38]拈花把酒偏折煞世人情狂
[03:47.04]凭这两眼与百臂或千手不能防
[03:49.99]天阔阔雪漫漫共谁同航
[03:52.20]这沙滚滚水皱皱笑着浪荡
[03:54.89]贪欢一刻偏教那女儿情长埋葬
[04:00.28]吞风吻雨葬落日未曾彷徨
[04:02.68]欺山赶海践雪径也未绝望
[04:05.25]拈花把酒偏折煞世人情狂
[04:07.90]凭这两眼与百臂或千手不能防
[04:10.85]天阔阔雪漫漫共谁同航
[04:13.08]这沙滚滚水皱皱笑着浪荡
[04:15.75]贪欢一刻偏教那女儿情长埋葬
[04:19.48]`;

const config = {
  height: 400,
  liHeight: 35,
  revise: 0.8,
};

const audioRef = ref(null);
const lrcArray = ref([]);
const currentIndex = ref(-1);
const marginTop = ref(0);

function parseLrc(lrc) {
  const reg = /^\[(\d{2}):(\d{2}\.\d{2})\](.*)$/gm;
  const result = [];
  let match;
  while ((match = reg.exec(lrc))) {
    const time = parseInt(match[1]) * 60 + parseFloat(match[2]);
    const word = match[3];
    result.push({ time, word });
  }
  return result;
}

function updateCurrentIndex() {
  const audio = audioRef.value;
  if (!audio) return;

  const curTime = audio.currentTime + config.revise;
  for (let i = lrcArray.value.length - 1; i >= 0; i--) {
    if (curTime >= lrcArray.value[i].time) {
      currentIndex.value = i;
      const maxOffset = config.height / 2 - config.liHeight;
      const offset = i * config.liHeight;
      marginTop.value = -Math.max(offset - maxOffset, 0);
      return;
    }
  }

  currentIndex.value = -1;
}

onMounted(() => {
  lrcArray.value = parseLrc(lrcText);
  audioRef.value.addEventListener("timeupdate", updateCurrentIndex);
});
</script>

<style scoped lang="scss">
.container {
  width: 500px !important;
  margin: 0 auto;

  audio {
    display: block;
    width: 100%;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }
  }
}

.lrc-container {
  overflow: hidden;
  height: 400px;
  text-align: center;
  margin-top: 30px;
  position: relative;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    transition: margin-top 0.7s;

    li {
      height: 35px;
      line-height: 35px;
      transition: 0.7s;

      &.active {
        color: #fff;
      }
    }
  }
}
</style>
