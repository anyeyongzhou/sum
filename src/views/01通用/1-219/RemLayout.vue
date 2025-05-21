<template>
  <section class="container">
    <header>375 * 150</header>
    <nav>
      <ul>
        <li v-for="(item, index) in navItems" :key="index">
          <span class="icon">60 * 60</span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </nav>
    <main>
      <h3>填写信息</h3>
      <div class="info-items">
        <p class="info-item">
          <span>姓名</span>
          <input
            type="text"
            class="info-item__name"
            placeholder="请填写姓名"
            v-model="formData.name"
          />
        </p>
        <p class="info-item">
          <span>手机</span>
          <input
            type="number"
            class="info-item__tel"
            placeholder="请填写手机号"
            v-model="formData.phone"
          />
        </p>
      </div>
      <h3>个人介绍</h3>
      <div class="info-items">
        <p class="info-item f-p-0">
          <textarea
            class="info-item__intro"
            placeholder="请填写一段简要的自我介绍"
            v-model="formData.intro"
          ></textarea>
        </p>
      </div>
      <div class="info-confirm">
        <a href="javascript:;" class="info-confirm__btn" @click="handleSubmit"
          >确认</a
        >
      </div>
    </main>
    <footer>375 * 75</footer>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 导航项数据
const navItems = ["导航入口", "导航入口", "导航入口"];

// 表单数据
const formData = ref({
  name: "",
  phone: "",
  intro: "",
});

// 提交表单
const handleSubmit = () => {
  console.log("表单数据：", formData.value);
  // 这里可以添加表单验证和提交逻辑
};

// 初始化 rem 布局
onMounted(() => {
  const setRem = () => {
    const html = document.documentElement;
    const width = html.clientWidth;
    const rem = width / 10;
    html.style.fontSize = rem + "px";
  };

  // 初始化
  setRem();

  // 监听窗口大小变化
  window.addEventListener("resize", setRem);
});
</script>

<style scoped>
.f-p-0 {
  padding: 0 !important;
}

.container {
  background-color: #fff;
}

header {
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  background-color: #f2f2f2;
}

nav ul {
  display: flex;
  justify-content: space-around;
  padding: 0;
}

nav ul li {
  display: flex;
  flex-wrap: wrap;
  width: 2.6666666667rem;
  justify-content: center;
}

nav ul .icon {
  margin-bottom: 0.2666666667rem;
  width: 1.6rem;
  height: 1.6rem;
  line-height: 1.6rem;
  text-align: center;
  background-color: #f2f2f2;
}

main {
  padding: 0.2666666667rem;
}

main h3 {
  position: relative;
  margin-top: 0.6666666667rem;
  margin-left: 0.3466666667rem;
  font-size: 0.4rem;
}

main h3:before {
  content: "";
  position: absolute;
  left: -0.2666666667rem;
  width: 0.16rem;
  height: 100%;
  background-color: #fc8200;
}

.info-items {
  margin-top: 0.2666666667rem;
  margin-bottom: 0.2666666667rem;
}

.info-item {
  margin-top: 0.2666666667rem;
  padding: 0.4rem;
  padding-left: 0;
  border: 1px solid #ddd;
  display: flex;
}

.info-item span {
  min-width: 1.6rem;
  text-align: center;
  border-right: 1px solid #ddd;
}

.info-item input {
  width: 100%;
  border: none;
  font-size: 0.3733333333rem;
  caret-color: #fc8200;
  outline: none;
}

.info-item textarea {
  padding: 0.2666666667rem;
  width: 100%;
  border: none;
  height: 3.3333333333rem;
  font-size: 0.3733333333rem;
  font-family: "Microsoft YaHei";
  caret-color: #fc8200;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

.info-confirm {
  margin-bottom: 0.5333333333rem;
  text-align: center;
}

.info-confirm__btn {
  display: inline-block;
  margin-top: 1.0666666667rem;
  width: 2.6666666667rem;
  height: 1.0666666667rem;
  line-height: 1.0666666667rem;
  text-align: center;
  background-color: #fc8200;
  text-decoration: none !important;
  color: #fff !important;
}

footer {
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background-color: #f2f2f2;
}
</style>
