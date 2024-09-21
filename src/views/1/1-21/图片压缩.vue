<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Title
          :orderNum="1"
          context="使用canvas实现图片压缩"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <el-upload ref="uploadRef" @change="uploadChange" :auto-upload="false"
          ><template #trigger>
            <el-button type="primary">选择被压缩的图片</el-button>
          </template>
        </el-upload>
        <div>
          被选中图片的大小&nbsp;{{
            fileList ? (fileList?.size / 1024).toFixed(2) : "--"
          }}&nbsp;Kb
        </div>
        <el-button type="primary" @click="compressClick">压缩图片</el-button>
        <div>
          压缩后图片的大小&nbsp;{{
            compressImg ? (compressImg.size / 1024).toFixed(2) : "--"
          }}&nbsp;Kb
        </div>
        <el-image :src="imgSrc" lazy loading="lazy" fit="contain"></el-image>
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
import compressImage from "./compress";
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
  const replaceUrl = `../src/views/${route.name.split("-").at(0)}/${
    route.fullPath
  }`;
  const markdownText = marked(mdFileContent.default);
  markdownContent.value = markdownText
    .replace(/src="(images\/code\/\d+\.png)"/, `src="${replaceUrl}/$1"`)
    .replace(/(<img[^>]*)(>)/, '$1 style="width:100%;height:100%;"$2');
});
/* 不改的代码 end */

const uploadRef = ref(null);

// 选择的文件对象
const fileList = ref(null);

const compressImg = ref(null);

const imgSrc = ref(null);

const uploadChange = (file, fileListsfile) => {
  if (fileListsfile.length > 1) {
    uploadRef.value.handleRemove(fileListsfile[0]);
  }
  fileList.value = file;
};

const compressClick = async () => {
  // console.log("fileList", fileList.value);
  // base64地址图片加载完毕后
  const compressedBlob = await compressImage(fileList.value.raw, 800, 600, 0.8);
  compressImg.value = compressedBlob;
  imgSrc.value = URL.createObjectURL(compressedBlob);
  // console.log("压缩后的图片Blob对象:", compressImg.value);
};
//
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

    /* 编写CSS end */

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
