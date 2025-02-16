<template>
  <div class="shadow"></div>
  <div class="reel">
    <div class="reel-bg"></div>
  </div>
  <article>
    <p v-for="i in 50" :key="i">
      范慎很困难地撑着上眼皮，看着指头算自己这辈子做过些什么有意义的事情...
    </p>
  </article>
</template>

<script setup>
import { onMounted, ref } from "vue";

const handleScroll = () => {
  const bg = document.querySelector(".reel-bg");
  bg.style.transform = `translateY(${
    (((window.scrollY / Math.PI) % 184) / 368) * 100 - 80
  }%)`;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<style scoped lang="scss">
article {
  background-color: #f5ebd4;
  border-left: 10px solid #405c53;
  border-right: 10px solid #405c53;
  margin: 10px 15px;
}

p {
  margin: 0;
  padding: 0.2em 0;
  color: #2c402e;
  line-height: 150%;
  text-indent: 2em;
}

h1 {
  text-align: center;
  color: #f5ebd4;
}

.shadow {
  position: sticky;
  width: 100%;
  height: 30px;
  top: 0;
  left: 0;
  background: #012430;
}

.reel {
  position: sticky;
  top: 10px;
  height: 28px;
  margin: 0 15px;
  border-radius: 1px;
  border-image: url("https://imgservices-1252317822.image.myqcloud.com/coco/s04232024/c510959b.0txvec.png")
    fill 40 36/14px 12px/0 12px;
  box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.3),
    0 10px 20px 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.reel-bg {
  position: absolute;
  left: 0;
  width: 100%;
  height: 368px;
  background: url("https://imgservices-1252317822.image.myqcloud.com/coco/s04232024/682ad393.to0id6.jpg")
    50% 0 / auto 50%;
  mix-blend-mode: multiply;
}

@supports (animation-timeline: scroll()) {
  .reel-bg {
    --s: 999999;
    animation: scroll 1s linear forwards calc(var(--s) / 184 / 3.14);
    animation-timeline: scroll(root);
    animation-range: 0 calc(var(--s) * 1px);
  }
}

@keyframes scroll {
  0% {
    transform: translateY(-80%);
  }
  100% {
    transform: translateY(-30%);
  }
}

::-webkit-scrollbar {
  display: none;
}
</style>
