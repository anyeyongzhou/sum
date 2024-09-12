<template>
  <div class="home">
    <template v-if="effect">
      <iframe :src="src" frameborder="0" class="iframe"></iframe>
    </template>
    <template v-else>
      <div>
        <pre>
          <code>{{ htmlContent }}</code>
        </pre>
      </div>
    </template>
    <div class="button">
      <el-button type="primary" @click="handleClick">{{
        buttonContent
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const path = route.path;
const segments = path.split("/");
let segment = segments[1];
let src = ref(`./src/views/${segment}/index.html`);
if (segment.includes("-")) {
  segment = segment.split("-")[0];
  src.value = `./src/views/${segment}/${segments[1]}/index.html`;
}

const effect = ref(true);
const buttonContent = ref("查看代码");

const handleClick = () => {
  effect.value = !effect.value;
  buttonContent.value = effect.value ? "查看代码" : "返回";
};

const htmlContent = ref();
const loadHTML = async () => {
  try {
    const response = await fetch(src.value); // 根据实际路径
    if (response.ok) {
      htmlContent.value = await response.text();
    } else {
      ElMessage.error("无法加载 HTML 文件");
    }
  } catch (error) {
    ElMessage.error("加载错误:", error);
  }
};

onMounted(() => {
  loadHTML();
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: relative;

  .iframe {
    width: 100%;
    height: 100%;
  }

  .button {
    position: fixed;
    right: 30px;
    top: 130px;
  }
}
</style>
