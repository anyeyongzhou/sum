## 水球图
使用第三方库来实现
```javascript
<div ref="liquidEchart" class="liquidData"></div>

import * as echarts from 'echarts';
import 'echarts-liquidfill'

const liquidEchart = ref(null);

const chartsLiquid = ref();

const initLiquidEchart = () => {
  setTimeout(() => {
    chartsLiquid.value = echarts.init(liquidEchart.value);
    // 把配置和数据放这里
    chartsLiquid.value.setOption({
      series: [
        {
          type: 'liquidFill',
          data: [0.52, 0.17], // 两条水波
        },
      ],
    });
  }, 50);
};

onMounted(()=>{
    initLiquidEchart() 
})
```