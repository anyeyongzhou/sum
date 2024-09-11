<template>
  <div id="myDialog">
    <el-dialog
      v-bind="$attrs"
      ref="refDialog"
      v-if="$attrs.modelValue"
      destroy-on-close
    >
      <template v-for="(_value, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template>
      <div id="main">
        <!-- 表单、表格放置于此 -->
        <slot name="main"></slot>
      </div>
      <template #footer v-if="props.needFooter">
        <span class="dialog-footer">
          <el-button
            @click="cancel"
            size="default"
            :loading="props.loadingBtn.closebtn"
          >
            {{ props.closeText }}
          </el-button>
          <el-button
            type="primary"
            class="manageBtn"
            @click="otherOrder"
            size="default"
            v-if="props.standbyBtn.enable"
            :loading="props.loadingBtn.standbybtn"
          >
            {{ props.standbyBtn.text }}
          </el-button>
          <el-button
            @click="confirm"
            class="confirmBtn"
            size="default"
            v-if="props.needSure"
            :loading="props.loadingBtn.confirmBtn"
          >
            {{ props.sureText }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<!-- 防止变量透传 -->
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { throttle } from "/@/utils/myself/tools";
// 定义数组中的对象的每一项具体类型
interface charItem {
  enable: boolean;
  text: string;
}

interface Props {
  standbyBtn?: charItem;
  needSure?: boolean;
  needFooter?: boolean;
  closeText?: string;
  sureText?: string;
  loadingBtn?: any;
}

const emit = defineEmits([
  "update:confirm",
  "update:cancel",
  "update:otherOrder",
]);
// 取消按钮
const cancel = () => {
  emit("update:cancel");
};
// 父传子，带默认值
const props = withDefaults(defineProps<Props>(), {
  // 是否需要弹窗底部
  needFooter: () => true,
  // 关闭、取消按钮的文字
  closeText: () => {
    return "取消";
  },
  // 确定、保存按钮的文字
  sureText: () => {
    return "确定";
  },
  // 备用按钮
  standbyBtn: () => {
    return {
      enable: false,
      text: "提交",
    };
  },
  // 是否需要确认按钮
  needSure: () => true,
  // 加入按钮的loading
  loadingBtn: () => {
    return {
      // 关闭按钮的loading
      closebtn: false,
      // 其他按钮的loading
      standbybtn: false,
      // 确认按钮的loading
      confirmBtn: false,
    };
  },
});

const updateConfirm = () => {
  emit("update:confirm");
};
// 确定按钮
const confirm = throttle(() => {
  updateConfirm();
}, 1000);

// 备用按钮
const otherOrder = () => {
  emit("update:otherOrder");
};
</script>
<style lang="scss" scoped>
#myDialog:deep(.el-overlay .el-overlay-dialog .el-dialog .el-dialog__body) {
  padding-top: 10px !important;
}
#myDialog:deep(.el-dialog__footer) {
  text-align: center !important;
}
</style>
