<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Title
          :orderNum="1"
          context="元素宽度不够，长串单词不会被截断"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <Title
          :orderNum="1"
          context="原始单词"
          :size="2"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div>
          LoremipsumdolorsitametconsecteturadipisicingelitseddoeiusmodtemporincididuntutlaboreetdoloremagnaaliquaUtencimadminimveniamquisnostrudexercitationullamcolaborisnisiutaliquipexeacommodoconsequatDuisautereprehenderitinvoluptatevelitessecillumdoloreeufugiatnullapariaturexcepteursintoccaecatcupidatatnonproident,suntinculpaquiofficiadeseruntmollitanimidestlaborum
        </div>
        <Title
          :orderNum="2"
          context="不会被截断的单词"
          :size="2"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <div class="long-word">
          LoremipsumdolorsitametconsecteturadipisicingelitseddoeiusmodtemporincididuntutlaboreetdoloremagnaaliquaUtencimadminimveniamquisnostrudexercitationullamcolaborisnisiutaliquipexeacommodoconsequatDuisautereprehenderitinvoluptatevelitessecillumdoloreeufugiatnullapariaturexcepteursintoccaecatcupidatatnonproident,suntinculpaquiofficiadeseruntmollitanimidestlaborum
        </div>
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
  const replaceUrl = `../src/views/${route.name.split("-").at(0)}/${
    route.fullPath
  }`;
  const markdownText = marked(mdFileContent.default);
  markdownContent.value = markdownText
    .replace(/src="(images\/code\/\d+\.png)"/, `src="${replaceUrl}/$1"`)
    .replace(/(<img[^>]*)(>)/, '$1 style="width:100%;height:100%;"$2');
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
    .long-word {
      word-break: break-all;
    }

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
