<template>
  <div :id="id" :ref="id" class="echart-box"></div>
</template>

<script>
export default {
  name: "echartBox",
  props: {
    id: {
      type: String,
      default: "echartBox" + Math.floor(Math.random() * 100000)
    },
    option: {
      type: Object,
      default: () => {}
    },
    distance: {
      type: Number,
      default: 10
    }
  },
  data: () => {
    return {
      lastX: 0,
      isTouch: false
    };
  },
  watch: {
    option() {
      this.initChart();
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    debounce(func, delay = 100) {
      let timer;
      return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    mousemove(e) {
      if (this.isTouch) {
        const currentX = e.offsetX || e.event.zrX;
        const distance = currentX - this.lastX;
        if (distance > this.distance) {
          this.$emit("moveRight");
        } else if (distance < -this.distance) {
          this.$emit("moveLeft");
        }
        this.lastX = currentX;
      }
    },
    initListent(myEcharts) {
      // 监听touchstart事件或mousedown事件，记录起始位置
      myEcharts.getZr().on("mousedown", e => {
        this.lastX = e.offsetX || e.event.zrX;
        this.isTouch = true;
      });
      myEcharts.getZr().on("touchstart", e => {
        this.lastX = e.offsetX || e.event.zrX;
        this.isTouch = true;
      });

      // 监听touchmove事件或mousemove事件，计算滑动距离并触发相应操作
      myEcharts.getZr().on("mousemove", this.debounce(this.mousemove));
      myEcharts.getZr().on("touchmove", this.debounce(this.mousemove));

      // 监听touchend事件或mouseup事件，重置状态
      myEcharts.getZr().on("mouseup", () => {
        this.isTouch = false;
      });
      myEcharts.getZr().on("touchend", () => {
        this.isTouch = false;
      });
    },
    initChart() {
      try {
        let myEcharts = this.myEcharts;
        if (!myEcharts) {
          myEcharts = this.$echarts.init(this.$refs[this.id]);
          this.myEcharts = myEcharts;
        }
        myEcharts.clear();
        myEcharts.setOption(this.option);
        this.initListent(myEcharts);
      } catch (err) {
        console.log(err);
      }
    },
    // 隐藏tooltip
    hideTooltip() {
      this.myEcharts.dispatchAction({
        type: "hideTip"
      });
    }
  }
};
</script>

<style scoped>
.echart-box {
  height: 100%;
  width: 100%;
}
</style>
