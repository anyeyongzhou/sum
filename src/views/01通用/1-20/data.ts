export class OnlineUserAPI {
  /**
   * 在线用户实时数据展示
   */
  static STREAM_SSE = {
    chartOptions: (): any => {
      return {
        title: {
          text: "在线用户统计", // 图表标题
          left: "center", // 标题居中显示
        },
        xAxis: {
          type: "category",
          data: ["35s", "30s", "25s", "20s", "15s", "10s", "5s"], // 可以根据需要修改为时间段或其他表示
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: ["0", "0", "0", "0", "0", "0", "0"], // 数据
            type: "line",
          },
        ],
      };
    },
  };
}
