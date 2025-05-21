<template>
  <div class="login">
    <div class="login-inner">
      <img class="title-logo" :src="logo2" alt="Logo" />
      <div class="login-form">
        <h2><span>登录</span></h2>
        <ul>
          <li>
            <input
              v-model="username"
              class="user"
              type="text"
              placeholder="请输入手机号"
            />
            <label class="label-img">
              <img :src="user" alt="" />
            </label>
            <label class="label-error" v-if="usernameError">
              <div class="text-error">11位手机号</div>
            </label>
          </li>
          <li>
            <input
              v-model="password"
              class="key"
              type="password"
              placeholder="请输入密码"
            />
            <label class="label-img">
              <img :src="key" alt="" />
            </label>
            <label class="label-error" v-if="passwordError">
              <div class="text-error">首字母大写且不小于六位</div>
            </label>
          </li>
        </ul>
        <div class="error" v-if="showError">
          输入错误，请检查手机号和密码格式
        </div>
        <div class="login-tab1">
          <div class="login-tab1-item1">
            <button @click="login" class="btn-login">登录</button>
            不是会员？<a href="#">去注册</a>
          </div>
          <div class="login-tab1-item2">
            <a href="#">忘记密码</a>
          </div>
        </div>
        <div class="login-tab2">
          <a href="#">
            <img :src="weixin" alt="" />
            微信登录
          </a>
          <a href="#">
            <img :src="zhifubao" alt="" />
            支付宝登录
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import logo2 from "./image/logo2.png";
import user from "./image/user.png";
import key from "./image/key.png";
import weixin from "./image/weixin.png";
import zhifubao from "./image/zhifubao.png";

const username = ref("");
const password = ref("");
const showError = ref(false);
const usernameError = ref(false);
const passwordError = ref(false);

const login = () => {
  const regUser = /^[1]\d{10}$/g;
  const regKey = /^[A-Z]\w{5,}/g;

  usernameError.value = !regUser.test(username.value);
  passwordError.value = !regKey.test(password.value);

  if (!usernameError.value && !passwordError.value) {
    showError.value = false;
    // Simulate login process
    console.log("登录中...");
  } else {
    showError.value = true;
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("./image/bg.png");
  background-repeat: no-repeat;
  background-color: #fef9f0;
  background-position: center center;
}
.login-inner {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translate(-50%);
}
.title-logo {
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
}
.login-form {
  background: #fff;
  width: 450px;
  padding: 50px;
  border-top: 5px solid #dd3e42;
  border-radius: 3px 3px 0 0;
}
.login-form h2 {
  margin-bottom: 30px;
  text-align: center;
}
.login-form h2 span {
  color: #dd3e42;
  border-bottom: 1px solid #ee3e42;
  padding-bottom: 10px;
  font-size: 16px;
}
.login-form li {
  position: relative;
  margin-bottom: 20px;
}
.login-form li input {
  width: 100%;
  padding: 12px;
  height: 54px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 4px;
}
.label-img {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}
.label-error {
  position: absolute;
  left: 12px;
  bottom: -8px;
  background: #fff;
}
.text-error {
  color: orange;
}
.error {
  color: #ee3e42;
}
.login-tab1 {
  width: 100%;
  margin: 20px 0 40px;
  color: #999;
}
.login-tab1-item1 {
  display: inline-block;
}
.btn-login {
  width: 150px;
  height: 45px;
  background-color: #ee3e42;
  color: #fff;
  border: none;
  cursor: pointer;
}
.login-tab1-item2 {
  position: absolute;
  right: 0;
  line-height: 45px;
}
.login-tab1-item2 a {
  color: #999;
}
.login-tab2 {
  width: 100%;
  text-align: center;
}
.login-tab2 a {
  margin: 0 30px;
  color: #999;
}
.login-tab2 img {
  width: 36px;
  height: 36px;
  margin-right: 7px;
  vertical-align: middle;
}
</style>
