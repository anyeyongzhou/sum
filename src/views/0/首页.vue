<template>
  <div class="home">
    <el-button
      v-for="(button, index) in buttonList"
      :key="index"
      @click="handleClick(button.path)"
      class="button"
      type="primary"
      >{{ button.meta.title }}</el-button
    >
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const viewsModules = import.meta.glob("../../views/**/*.{vue,tsx}");
const dynamicViewsModules = Object.assign({}, { ...viewsModules });

const buttonList = reactive([]);

const constructButtonList = () => {
  for (let item of Object.keys(dynamicViewsModules)) {
    let nameList = item.split("/");
    let name = nameList[nameList.length - 2];
    const nameLists = ["login", "components", "0"];
    if (nameLists.includes(name)) {
      continue;
    }
    let path = "/" + nameList[nameList.length - 2];
    let component = dynamicViewsModules[item];
    let segments = component.toString().split("/").at(-1);
    let segment = segments.split(".").at(0);
    let meta = {
      isAffix: true,
      isHide: false,
      isIframe: false,
      isKeepAlive: false,
      isLink: "",
      roles: ["admin", "common"],
      title: segment,
    };

    buttonList.push({
      component,
      meta,
      name,
      path,
    });
  }
};

const handleClick = path => {
  router.push(path);
};

onMounted(() => {
  constructButtonList();
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background: #fff;

  .button {
    margin: 10px;
  }
}
</style>
