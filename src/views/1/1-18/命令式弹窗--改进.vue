<template>
  <div class="home">
    <div class="container">
      <template v-if="flag">
        <Title
          :orderNum="1"
          context="命令式弹窗"
          :size="1"
          :color="9"
          :wight="1"
          :backgroundColor="3"
        />
        <el-config-provider namespace="shilim">
          <el-button type="primary" @click="openCommandDialog">
            打开命令弹窗
          </el-button>
          <el-button
            type="primary"
            @click="openDialog({ content: '我是Ref弹窗' })"
          >
            打开Ref弹窗
          </el-button>
          <el-button type="primary" @click="openDialogManageDialog">
            打开dialogManager弹窗
          </el-button>
          <el-button type="primary" @click="openDialogManageDialogCache">
            打开dialogManager弹窗(缓存)
          </el-button>
          <RefDialog ref="refDialog" />
          <DialogManager />
        </el-config-provider>
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
import RefDialog from "./components/RefDialog.vue";
import CommandDialog from "./components/CommandDialog.vue";
import DialogManagerDialog from "./components/DialogManagerDialog.vue";
import useCommandComponent from "./hooks/useCommandComponent";
import useDialogRef from "./hooks/useDialogRef";
import { createDialogManager } from "./hooks/createDialogManager";
import { useRoute } from "vue-router";
import { marked } from "marked";
import "highlight.js/styles/monokai-sublime.css";

const route = useRoute();
const flag = ref(true);
const buttonContent = ref("查看代码");
const indexFile = ref("");

const handleClick = async () => {
  flag.value = !flag.value;
  buttonContent.value = flag.value ? "查看代码" : "返回";

  if (!flag.value) {
    const filePath = `./${route.meta.title}.vue?raw`;
    try {
      const module = await import(filePath);
      indexFile.value = module.default;
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

const commandDialog = useCommandComponent(CommandDialog);
const openCommandDialog = () => {
  commandDialog({
    visible: true,
  });
};

const { refDialog, openDialog } = useDialogRef();

const DialogManager = createDialogManager();
const openDialogManageDialog = () => {
  DialogManager.open(DialogManagerDialog, {
    content: "我是DialogManagerDialog弹窗",
  });
};
const openDialogManageDialogCache = () => {
  DialogManager.openInCache(
    DialogManagerDialog,
    {
      content: "我是DialogManagerDialog弹窗",
    },
    "DialogManagerDialogCache"
  );
};
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
