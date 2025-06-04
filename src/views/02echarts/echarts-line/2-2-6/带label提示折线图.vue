<template>
  <div class="home">
    <div class="containers">
      <div ref="chartRef" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
let chart = null;
const chartRef = ref(null);

const banner = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAA5CAYAAADeO77OAAAACXBIWXMAAC4jAAAuIwF4pT92AAAGvmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDg4LCAyMDIwLzA3LzEwLTIyOjA2OjUzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDI1LTA1LTI2VDE2OjQ1OjIyKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI1LTA1LTI2VDE2OjQ3OjI1KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNS0wNS0yNlQxNjo0NzoyNSswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2ZGQ4MDI0Ny03YWI3LTFhNGMtOTNiZS1mNzUwZGY5YTZiODkiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDplNDJkNjExNy0yMTFkLWE4NGQtYTQxNS0wYjhjMTVkZDRlYjMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxYzA2MjY3NC1jMGVkLTkzNDMtYWVhNS1mYzE3MmFiZGZkZGYiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjFjMDYyNjc0LWMwZWQtOTM0My1hZWE1LWZjMTcyYWJkZmRkZiIgc3RFdnQ6d2hlbj0iMjAyNS0wNS0yNlQxNjo0NToyMiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2NWI2MjhmNy0zZTcwLTVjNDgtOGVkZC00ODA1NmRiZDczOTUiIHN0RXZ0OndoZW49IjIwMjUtMDUtMjZUMTY6NDU6MjIrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4wIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NmRkODAyNDctN2FiNy0xYTRjLTkzYmUtZjc1MGRmOWE2Yjg5IiBzdEV2dDp3aGVuPSIyMDI1LTA1LTI2VDE2OjQ3OjI1KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+R5TXSwAAA7RJREFUeNrtnElIVWEYhhspaFGr2kSbqEVBtIhoUzRAm2jRpl2LaFaMomgiKipooEDInEorbwNKo5YSGkolaZSoZZERmZg2OOU9587nfL3/SetmKg5H/cP3hWcj1+Ple/jP8Pl/Z5SIjOrMxgTvcpAF6oEFhAwJEVAHboDF0U46C5oALh/wmPLkTUiavbbYtjBDFAu1bmqzpeh1SPZeMZW4JDC+K1GexFy/hMIs2nAnELIlPtunZCX/JQo/WHX4uinhCIukk6x9Gc7KWhotKvd5NZeSbnlcFVKisjokjQY+X5AXJN2i7hPgpqFD1OTYFINV0TBq6cCP/VtUXCpF6Rp1605RFMVQFEUxFMVQFEUxFMVQFEUxFMVQFEUxFMVQFEUxFEVRFEVRDEVRFENRjEuiuK9Pz6ghDTVRE72l2fD6uVNWtzS2OTtl66JF3S1+y73nuuVRpbP3/Gq0qGVqLor7z/WJOsPtvmTYcLOw83xU8pm7PjEDlKWDpJO3nPmoeOlikG0sOLsr3bDyXgal9rslbT7bEddX3E5/vsP/hqr1p2+WPHgRlB0XDTWSe0xN2vwjKkrY/PaxxCrQBJr7iOvjcNsvGLLpz6yrvx/f6X+gEbwC58Ac6W6G1w3wBzZgRUY+N1muCIrgMKXVYTme5UzeVYNYMMnt7607bkvasfeKaX9rHbgkA+foXJx+cTFVgh6B1WDMSBPkuigU8dDBa6YzITeQNLRY4ikKSEyyN4BjpoN5I1WOq6Lax0rPHM00nYthv56+QVVtROJzfOo69BXHOwKmUZBLotrvElNO3OzfLX0o8muYWE3j4zgVYL161wXFuChKvagCXFfPXWrMvi9pNW25UxKUnWnOLWgOWEEZgyAKhZ0Iss/d9zurordRzwhp+X7ZmuQ18PsJYDYlDJIodWsM8lMf+p1b5950f8s+hOX0becpuxbsAVNY/EEUpQoMijMKA857e3qKH6fDgoqQ7Pc4159nYC0Yx6IPsigUeSooy3oaELvHtrwlmfhMXKoRxuczwSIWeohEodjTwdvs58FuBb2vj0hSnl82n/e24LOnwAwWeAhFoeAz8WzzMb881GV7p+Qd2zvDLgpFn4sVUq+edXpo7xSM9PbOsIpC4RdsSfQ2lka9cayh2RJPIds72oiCgCXbkrw/yj+GO7d3vrC9o4koSFgZm2KYlTURtnd0FQURa7Bqgmfv+Tr+w5jN9o5moiBkXftbgjvaO7NYIM1EQUoMqGF7R2NR6sWybO/oz0/5gJLn+L7zqwAAAABJRU5ErkJggg==`;

const init = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value);
  }

  const option = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    grid: {
      containLabel: true,
      left: 24,
      right: 24,
      top: 24,
      bottom: 24,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260].map((item, index) => {
          if (index % 2 === 0) {
            return {
              value: item,
              label: {
                show: false,
              },
            };
          } else {
            return {
              value: item,
              symbolSize: 10,
            };
          }
        }),
        type: "line",
        smooth: true,
        symbolSize: 0,
        label: {
          show: true,
          distance: 0,
          formatter: v => {
            return `{r|}{rect|文字文字}`;
          },
          rich: {
            r: {
              width: 106,
            },
            rect: {
              width: 106,
              height: 41,
              padding: [0, 0, 16, 0],
              align: "center",
              backgroundColor: {
                image: banner,
              },
            },
          },
        },
      },
    ],
  };

  chart.setOption(option);
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: relative;
  display: flex;
  // flex-wrap: nowrap;
  // flex-direction: row;
  justify-content: center;
  align-items: center;

  .containers {
    width: 600px;
    height: 400px;
    padding: 10px;
    background-color: #7f8de0;

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
