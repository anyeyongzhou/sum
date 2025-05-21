<template>
  <div class="transform-container">
    <div class="controls">
      <div class="control-group">
        <label>变换类型：</label>
        <select v-model="transformType">
          <option value="translate">平移</option>
          <option value="rotate">旋转</option>
          <option value="scale">缩放</option>
          <option value="skew">倾斜</option>
          <option value="matrix">矩阵</option>
        </select>
      </div>

      <div class="control-group" v-if="transformType === 'translate'">
        <label>X轴平移：</label>
        <input
          type="range"
          v-model="translateX"
          min="-100"
          max="100"
          step="1"
        />
        <span>{{ translateX }}px</span>

        <label>Y轴平移：</label>
        <input
          type="range"
          v-model="translateY"
          min="-100"
          max="100"
          step="1"
        />
        <span>{{ translateY }}px</span>
      </div>

      <div class="control-group" v-if="transformType === 'rotate'">
        <label>旋转角度：</label>
        <input type="range" v-model="rotate" min="0" max="360" step="1" />
        <span>{{ rotate }}°</span>
      </div>

      <div class="control-group" v-if="transformType === 'scale'">
        <label>X轴缩放：</label>
        <input type="range" v-model="scaleX" min="0.1" max="2" step="0.1" />
        <span>{{ scaleX }}x</span>

        <label>Y轴缩放：</label>
        <input type="range" v-model="scaleY" min="0.1" max="2" step="0.1" />
        <span>{{ scaleY }}x</span>
      </div>

      <div class="control-group" v-if="transformType === 'skew'">
        <label>X轴倾斜：</label>
        <input type="range" v-model="skewX" min="-45" max="45" step="1" />
        <span>{{ skewX }}°</span>

        <label>Y轴倾斜：</label>
        <input type="range" v-model="skewY" min="-45" max="45" step="1" />
        <span>{{ skewY }}°</span>
      </div>

      <div class="control-group" v-if="transformType === 'matrix'">
        <div class="matrix-inputs">
          <input type="number" v-model="matrix.a" step="0.1" placeholder="a" />
          <input type="number" v-model="matrix.b" step="0.1" placeholder="b" />
          <input type="number" v-model="matrix.c" step="0.1" placeholder="c" />
          <input type="number" v-model="matrix.d" step="0.1" placeholder="d" />
          <input type="number" v-model="matrix.e" step="0.1" placeholder="e" />
          <input type="number" v-model="matrix.f" step="0.1" placeholder="f" />
        </div>
      </div>

      <button class="reset-btn" @click="resetTransform">重置变换</button>
    </div>

    <div class="preview">
      <div class="transform-box" :style="transformStyle">
        <div class="content">
          <div class="grid"></div>
          <div class="center-point"></div>
        </div>
      </div>
    </div>

    <div class="code-preview">
      <pre>{{ transformCode }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const transformType = ref("translate");
const translateX = ref(0);
const translateY = ref(0);
const rotate = ref(0);
const scaleX = ref(1);
const scaleY = ref(1);
const skewX = ref(0);
const skewY = ref(0);
const matrix = ref({
  a: 1,
  b: 0,
  c: 0,
  d: 1,
  e: 0,
  f: 0,
});

const transformStyle = computed(() => {
  switch (transformType.value) {
    case "translate":
      return {
        transform: `translate(${translateX.value}px, ${translateY.value}px)`,
      };
    case "rotate":
      return {
        transform: `rotate(${rotate.value}deg)`,
      };
    case "scale":
      return {
        transform: `scale(${scaleX.value}, ${scaleY.value})`,
      };
    case "skew":
      return {
        transform: `skew(${skewX.value}deg, ${skewY.value}deg)`,
      };
    case "matrix":
      return {
        transform: `matrix(${matrix.value.a}, ${matrix.value.b}, ${matrix.value.c}, ${matrix.value.d}, ${matrix.value.e}, ${matrix.value.f})`,
      };
    default:
      return {};
  }
});

const transformCode = computed(() => {
  return `transform: ${transformStyle.value.transform};`;
});

function resetTransform() {
  translateX.value = 0;
  translateY.value = 0;
  rotate.value = 0;
  scaleX.value = 1;
  scaleY.value = 1;
  skewX.value = 0;
  skewY.value = 0;
  matrix.value = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0,
  };
}
</script>

<style lang="scss" scoped>
.transform-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 200px;

  label {
    font-weight: 500;
    color: #333;
  }

  input[type="range"] {
    width: 100%;
  }

  input[type="number"] {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .matrix-inputs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
  }
}

.preview {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.transform-box {
  width: 200px;
  height: 200px;
  background-color: #4caf50;
  border-radius: 8px;
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;

  .content {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .grid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.2) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  .center-point {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 4px;
    background-color: red;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
}

.code-preview {
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  pre {
    margin: 0;
    color: #d4d4d4;
    font-family: "Consolas", monospace;
  }
}

.reset-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #f44336;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d32f2f;
  }
}

select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}
</style>
