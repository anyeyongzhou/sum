<template>
  <div class="cmp-progress">
    <div
      class="line"
      :style="{
        height: strokeWidth + 'px',
        width: textInside ? '100%' : '94%',
        marginRight: textInside ? '0' : '1%',
      }"
    >
      <div class="bottom"></div>
      <div
        class="top"
        :class="status !== 'default' ? status : ''"
        :style="{ width: percentage + '%', lineHeight: strokeWidth + 'px' }"
      >
        <div v-if="textInside" class="inside-text">{{ percentage }}%</div>
      </div>
    </div>
    <div v-if="!textInside" class="outer-text">{{ percentage }}%</div>
  </div>
</template>

<script setup>
const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
    validator: v => v >= 0 && v <= 100,
  },
  status: {
    type: String,
    default: "default",
    validator: v => ["default", "success", "exception", "warning"].includes(v),
  },
  strokeWidth: {
    type: Number,
    default: 6,
  },
  textInside: {
    type: Boolean,
    default: false,
  },
});
const { percentage, status, strokeWidth, textInside } = props;
</script>

<style lang="scss" scoped>
.cmp-progress {
  position: relative;
  width: 100%;
  font-size: 0;
  margin-bottom: 10px;
  .line {
    position: relative;
    display: inline-block;
    margin-right: 1%;
    vertical-align: middle;
    width: 100%;
    height: 6px;
  }
  .line > div {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 100px;
  }
  .bottom {
    width: 100%;
    background-color: #ebeef5;
    z-index: 1;
  }
  .top {
    background-color: #409eff;
    z-index: 2;
    transition: width 0.3s;
    &.success {
      background-color: #67c23a;
    }
    &.exception {
      background-color: #f56c6c;
    }
    &.warning {
      background-color: #e6a23c;
    }
  }
  .inside-text {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-right: 10px;
    text-align: right;
    font-size: 12px;
    color: #fff;
  }
  .outer-text {
    display: inline-block;
    width: 5%;
    font-size: 12px;
    vertical-align: middle;
    color: #606266;
    text-align: left;
    margin-left: 8px;
  }
}
</style>
