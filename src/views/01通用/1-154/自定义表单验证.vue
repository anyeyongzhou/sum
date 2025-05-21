<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div
      v-for="(field, index) in fields"
      :key="index"
      class="form-item"
      :data-field="field.name"
    >
      <div class="item">
        <div class="left">{{ field.label }}</div>
        <div class="right">
          <input
            :type="field.type"
            v-model="formData[field.name]"
            @input="validateField(field.name)"
          />
        </div>
      </div>
      <div v-if="errors[field.name]" class="error">
        {{ errors[field.name] }}
      </div>
    </div>
    <div class="form-item">
      <div class="button">
        <button type="submit">提交</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const formData = ref({
  loginId: "",
  pwd: "",
  pwdAgain: "",
  mobile: "",
});

const errors = ref({});

const fields = [
  { name: "loginId", label: "账号", type: "text" },
  { name: "pwd", label: "密码", type: "password" },
  { name: "pwdAgain", label: "确认密码", type: "password" },
  { name: "mobile", label: "手机号", type: "text" },
];

const validateField = field => {
  const value = formData.value[field];
  errors.value[field] = "";

  if (!value) {
    errors.value[field] = "请输入" + fields.find(f => f.name === field).label;
    return;
  }

  if (field === "loginId" || field === "pwd") {
    if (value.length < 6 || value.length > 12) {
      errors.value[field] =
        field === "loginId" ? "账号必须是6到12位字符" : "密码必须是6到12位字符";
    }
  }

  if (field === "pwdAgain" && value !== formData.value.pwd) {
    errors.value[field] = "两次密码不一致";
  }

  if (field === "mobile" && !/^1\d{10}$/.test(value)) {
    errors.value[field] = "手机号格式不正确";
  }
};

const handleSubmit = () => {
  let valid = true;
  for (const field of fields) {
    validateField(field.name);
    if (errors.value[field.name]) valid = false;
  }

  if (valid) {
    alert("表单提交成功！");
  }
};
</script>

<style scoped lang="scss">
.form {
  width: 500px !important;
  margin: 30px auto;

  .item {
    margin: 5px 0;

    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }

  .left {
    float: left;
    width: 25%;
    text-align: right;
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 10px;

    &::after {
      content: "：";
    }
  }

  .right {
    float: right;
    width: 75%;
    box-sizing: border-box;

    input {
      border: 1px solid #aaa;
      border-radius: 5px;
      height: 40px;
      padding: 0 10px;
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;

      &:focus {
        outline: none;
        box-shadow: 0px 0px 0px 1px #008c8c;
      }
    }
  }

  .error {
    color: #f40;
    margin-left: 25%;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
  }

  .button {
    margin-left: 25%;

    button {
      width: 100%;
      box-sizing: border-box;
      background: #008c8c;
      border: none;
      color: #fff;
      height: 40px;
      cursor: pointer;
      border-radius: 5px;

      &:hover {
        background: #1dadad;
      }
    }
  }
}
</style>
