# 思路

最常用的弹窗就是 ElementsPlus 的弹窗常见的弹窗，但是它存在一个问题：

&emsp; &emsp;一旦你在也个组件中引入`Dialog`，就最少需要额外维护一个`visible`变量。如果只是额外维护一个变量这也不是不能接受，可是当同样的`Dialog`组件，即需要在父组件控制它的展示与隐藏，又需要在子组件中控制

```javascript
<script setup lang="ts">
import { computed } from 'vue';
import { ElDialog } from 'element-plus';

const props = defineProps<{
  visible: boolean;
  title?: string;
}>();

const emits = defineEmits<{
  (event: 'update:visible', visible: boolean): void;
  (event: 'close'): void;
}>();

const dialogVisible = computed<boolean>({
  get() {
    return props.visible;
  },
  set(visible) {
    emits('update:visible', visible);
    if (!visible) {
      emits('close');
    }
  },
});
</script>

<template>
  <ElDialog v-model="dialogVisible" :title="title" width="30%">
    <span>This is a message</span>
    <template #footer>
      <span>
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
      </span>
    </template>
  </ElDialog>
</template>

```

示例代码如下：

```javascript
<script setup lang="ts">
import { ref } from 'vue';
import { ElButton } from 'element-plus';

import Comp from './components/Comp.vue';
import MyDialog from './components/MyDialog.vue';

const dialogVisible = ref<boolean>(false);
const dialogTitle = ref<string>('');

const handleOpenDialog = () => {
  dialogVisible.value = true;
  dialogTitle.value = '父组件弹窗';
};

const handleComp1Dialog = () => {
  dialogVisible.value = true;
  dialogTitle.value = '子组件1弹窗';
};

const handleComp2Dialog = () => {
  dialogVisible.value = true;
  dialogTitle.value = '子组件2弹窗';
};
</script>

<template>
  <div>
    <ElButton @click="handleOpenDialog"> 打开弹窗 </ElButton>
    <Comp text="子组件1" @submit="handleComp1Dialog"></Comp>
    <Comp text="子组件2" @submit="handleComp2Dialog"></Comp>
    <MyDialog v-model:visible="dialogVisible" :title="dialogTitle"></MyDialog>
  </div>
</template>
```

这里的`MyDialog`会被父组件和两个`Comp`组件都会触发，如果父组件并不关心子组件的`onSubmit`事件，那么这里的`submit`在父组件里唯一的作用就是处理`Dialog`的展示

**`MyDialog`本来是`submit`动作的后续动作，所以理论上应该将`MyDialog`写在`Comp`组件中。但是这里为了管理方便，将`MyDialog`挂在父组件上，子组件通过事件来控制`MyDialog`。**

**再者，这里的`handleComp1Dialog`和`handleComp2Dialog`函数除了处理`MyDialog`外，对于父组件完全没有意义却写在父组件里。**
