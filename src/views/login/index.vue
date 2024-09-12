<template>
  <div id="loginHome">
    <div class="boardSide boardLeft"></div>
    <div class="boardSide">
      <div class="login">
        <div class="login-title">
          <img
            style="width: 80px; margin-bottom: 10px"
            src="/@/assets/login/login_title.png"
            alt=""
          />
          <span class="login-title-name">暗夜永昼的个人代码仓库</span>
        </div>
        <div class="login-main">
          <el-input
            v-model="state.ruleForm.username"
            class="w-50 m-2 username"
            size="large"
            placeholder="请输入用户名"
            @keydown.enter="login"
            :prefix-icon="User"
          />
          <el-input
            v-model="state.ruleForm.password"
            class="w-50 m-2 password"
            size="large"
            placeholder="请输入密码"
            type="password"
            show-password
            :prefix-icon="Lock"
            @keydown.enter="login"
          />
          <el-button type="primary" class="goto" @click="login">
            登 录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="loginIndex">
import { ref, computed, reactive } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { Session } from "/@/utils/storage";
import { formatAxis } from "/@/utils/formatTime";
import { NextLoading } from "/@/utils/loading";
import Cookies from "js-cookie";
import { useThemeConfig } from "/@/stores/themeConfig";
import { storeToRefs } from "pinia";
import { initFrontEndControlRoutes } from "/@/router/frontEnd";
import { initBackEndControlRoutes } from "/@/router/backEnd";
import { useLoginApi } from "/@/api/login";

const useLoginApis = useLoginApi();
const router = useRouter();
const route = useRoute();
// 登录
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const state = reactive({
  isShowPassword: false,
  ruleForm: {
    username: "admin",
    password: "123456",
  },
  loading: {
    signIn: false,
  },
});

const login = async () => {
  const { username, password } = state.ruleForm;
  if (username !== "admin" || password !== "123456") {
    ElMessage.warning("用户名或者密码不正确");
    return;
  }
  Session.set("token", "123456");
  // 前端控制路由
  let res: any = await initFrontEndControlRoutes();
  signInSuccess(res);
};
// 时间获取
const currentTime = computed(() => {
  return formatAxis(new Date());
});
// 登录成功后的跳转
const signInSuccess = (isNoPower: boolean | undefined) => {
  if (isNoPower) {
    ElMessage.warning("抱歉，您没有登录权限");
    Session.clear();
  } else {
    // 初始化登录成功时间问候语
    let currentTimeInfo = currentTime.value;
    // 登录成功，跳到转首页
    // 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
    if (route.query?.redirect) {
      router.push({
        path: <string>route.query?.redirect,
        query:
          Object.keys(<string>route.query?.params).length > 0
            ? JSON.parse(<string>route.query?.params)
            : "",
      });
    } else {
      router.push("/");
    }
    // 登录成功提示
    ElMessage.success(`登录成功！`);
    // 添加 loading，防止第一次进入界面时出现短暂空白
    // NextLoading.start();
  }
};
</script>

<style scoped lang="scss">
@import "../../theme/media/index.scss";
#loginHome {
  width: 100%;
  height: 100%;
  display: flex;
  background: url("/@/assets/login/login_bg.png");
  background-size: 100% 100%;
}
/* 页面宽度小于1200px大于768px
------------------------------- */
@media screen and (min-width: $sm) {
  #loginHome {
    .boardSide {
      width: 50%;
      position: relative;
      .logo {
        position: absolute;
        top: 40px;
        left: 40px;
      }
      .login {
        width: 72%;
        height: 53.3%;
        position: absolute;
        top: calc(50% - 26.55%);
        right: 14.7%;
        background: url(/@/assets/login/login_box.png) no-repeat;
        min-height: 480px;
        background-size: 100% 100%;
        .login-title {
          width: 60%;
          height: 75px;
          margin: 0 auto;
          margin-top: 75px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .login-title-name {
            font-size: 28px;
            font-weight: 700;
          }
          // img {
          // 	width: 100%;
          // 	height: 100%;
          // }
        }
        .login-main {
          width: 60%;
          height: calc(100% - 75px - 75px);
          margin: 0 auto;
          padding-top: 60px;
          .username {
            margin-bottom: 39px;
          }
          .password {
            margin-bottom: 40px;
          }
          .goto {
            width: 100%;
          }
        }
      }
    }
  }
}

/* 页面宽度小于768px
------------------------------- */
@media screen and (max-width: $sm) {
  #loginHome {
    .boardLeft {
      display: none;
    }
    .boardSide {
      width: 100%;
      position: relative;
      .login {
        width: 72%;
        height: 53.3%;
        position: absolute;
        top: calc(50% - 26.55%);
        min-height: 350px;
        right: 14.7%;
        background: url(/@/assets/login/login_box.png) no-repeat;
        background-size: 100% 100%;
        .login-title {
          width: 60%;
          height: 75px;
          margin: 0 auto;
          margin-top: 65px;
          img {
            width: 100%;
            height: 60%;
          }
        }
        .login-main {
          width: 60%;
          height: calc(100% - 75px - 75px);
          margin: 0 auto;
          padding-top: 20px;
          padding-bottom: 10px;
          .username {
            margin-bottom: 25px;
          }
          .password {
            margin-bottom: 25px;
          }
          .goto {
            width: 100%;
          }
          &:deep(.el-input) {
            height: 30px;
          }
          &:deep(.el-button) {
            height: 30px;
          }
        }
      }
    }
  }
}

:deep(.el-input--large .el-input__wrapper) {
  background-color: #f2f4f5;
  box-shadow: none;
}
</style>
