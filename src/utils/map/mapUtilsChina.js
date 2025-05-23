import { getColor } from "/@/utils/colorUtil";
import { calculateAngleAndLength, rotatePoint } from '/@/utils/tools.ts'
import lineUrl from "/@/assets/imgs/carbonEmissionFactorDatabase/lines.png";

function clickHandle(e) {
  mapUtilsChina.clickHandle(e);
}

function mouseoverhandle(e) {
  mapUtilsChina.mouseoverhandle(e);
}

const mapUtilsChina = {
  /* 数组合并成一纬度 */
  arrayConcat: function (arr) {
    var newArr = [];
    for (var i = 0, j = arr.length; i < j; i++) {
      newArr.push.apply(newArr, arr[i][0]);
    }
    return newArr;
  },

  /* 初始化省市区 图层边界色 填充色，描边粗细 */
  initProCityCountyLayer: function (
    map,
    layerListObj,
    proFlag,
    cityFlag,
    countyFlag
  ) {
    if (proFlag) {
      // 省：蓝面、白线
      map.addLayer({
        id: "province-polygon",
        type: "fill",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        },
        paint: {
          "fill-color": "transparent",
          "fill-opacity": 1,
        },
      });
      map.addLayer({
        id: "province-line",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        },
        paint: {
          "line-color": "#ffffff",
          "line-width": 3,
        },
      });
      layerListObj.push("province-polygon");
      layerListObj.push("province-line");
    }
    if (cityFlag) {
      // 市：蓝面、白线
      map.addLayer({
        id: "city-polygon",
        type: "fill",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        },
        paint: {
          "fill-color": "#206bf5",
          "fill-opacity": 0.3,
        },
      });
      map.addLayer({
        id: "city-line",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        },
        paint: {
          "line-color": "#ffffff",
          "line-width": 3,
        },
      });
      layerListObj.push("city-polygon");
      layerListObj.push("city-line");
    }
    if (countyFlag) {
      // 区/县：蓝面、白线
      map.addLayer({
        id: "county-polygon",
        type: "fill",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        },
        paint: {
          "fill-color": "#206bf5",
          "fill-opacity": 0.3,
        },
      });
      map.addLayer({
        id: "county-line",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        },
        paint: {
          "line-color": "#ffffff",
          "line-width": 3,
        },
      });
      layerListObj.push("county-polygon");
      layerListObj.push("county-line");
    }
  },

  /* 遮罩中国(省市区) */
  drawBackgroundProCityCountyLayer: function (
    map,
    proFlag,
    cityFlag,
    countyFlag,
    opacity = 0.8
  ) {
    map.addLayer({
      id: "choicePoi",
      type: "background",
      paint: {
        "background-color": "#001c2c",
        "background-opacity": 0.8,
      },
    });

    let moveLayerArr = ["choicePoi"];
    if (proFlag) {
      moveLayerArr.push("province-polygon");
      moveLayerArr.push("province-line");
    }
    if (cityFlag) {
      moveLayerArr.push("city-polygon");
      moveLayerArr.push("city-line");
    }
    if (countyFlag) {
      moveLayerArr.push("county-polygon");
      moveLayerArr.push("county-line");
    }

    map.moveLayer(...moveLayerArr);
  },

  /* 添加区域名Marker点--区域电力、省级电力 */
  addRegionMarker: function (map, data, markRegionListObj, regionType = 0, fn = () => { }) {
    for (let item of data) {
      //画marker点
      var el = document.createElement("div");
      el.innerText = item.content;
      el.style.color = "#ffffff";
      el.style.borderRadius = "6px";
      el.style.lineHeight = "40px";
      el.style.opacity = 0.9;
      if (regionType == 0) {
        el.style.fontSize = "16px";
        el.style.lineHeight = '32px'
        el.style.width = "160px";
        el.style.height = "32px";
        el.style.paddingLeft = "40px";
        el.style.backgroundColor = "#083666";
        el.style.backgroundImage =
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVRIib2WXUybZRTHf3R0QluQSWsLpcIFzYR0WzFsYDc+ZGMr2ZYMhh9xYR/GyUzM9MLEuAsvTHTGRM1IE42bRBhLlPGVwaKwgnGaTBO3gWNltHOjNIOVF1lTSvlaixcdjc1oLQn4v3rfc/7P+b/nOed53hMjMdUAaIGTwA7gSVYObsAMnAAGY4FM4Hdg3QqKLCIRqABKAIMI+GSVhP6NJOAjEYGt+z9QKmJlaxQJstiomWIx5ZmZvLVJjy5ZzuCDCUx9fTTZrLjn5qKKESMx1SxEIhSq03gnJ4dd6RkATMzM0GW384JGg1IiAaDH4eBU7zXMw8MRxSJmJomN5Yd95QDUWSzUWvr5w+kM+vUKBUeydbyu01Gi0ZBRewZhenr5mUnFYpp376VArUZ95mtcs7MRP0qofpM+QcDY1hJ2W0VLGT82bOX+0WoK1Gre6DaHCOkVCnoPVGFISQ3avA8fcrirk00KBaNHq/m8sCh6sbdznsPp9VLU1Mi5WwMhvi+KitEmJXGquDjEft5mxdD4HUNuN9UbNkYvBlA3YAnWJ1UqoyBVzYfPG9iiVNFpHyL7qWRObt1GoTqNNJkMgD5B4HT/jXAhwzeIJDbgylel0L2/MmjvtA9R0dFO3U4jx/U5HNfnAGBsbeGXkXskrF0bVixsZiqJFICRKQ+jU1MAvHixg4qOdgAOdf3IngttQOA4ODyTj9ZJlifm9HrZolIBMDw5SfbZOq4LY3xZsj2Ed3p7KZaJv8mq/5YhtxuAXKUSz/wyurHbMUxGYmLwfc7no/3OHeTx8aQnJFKp1aKWyUiRSrlkt+OZnw9ydclyehyOJcWWrFntzX5eXf8spc+kc2nYDsBmZSBTy8FDIVy94ungc74qBYBvbvZHn9mV0VHm/f6Q87Iu7gkALt69y54LbZy3WQFIjo8LchaPQ7hrK2w3HunqpMFYxv5MLc23bRzrNiMVi+kVBAB+cjj47NpV5nx+AMoyMtAlyznWYw4XMrxY61+3+XXkHvW7jPw5LmBzuR7j3BgfB0CTkEDT7r1cHXNydmDgMd4iwrY+QFlbK8L0NL0HqshVKpfkbJQruHXwMK7ZWXa2NEcKF1nMv7DAhoZ67JNufq58iQ/y8kP87+Vu5srLr+D0etE11DPj80UU+8//2SK+KtlBVVYW/oUFvrcOUp6pJW7NGhptVl7r6iSaIDESU42LKEeDXKWST7cVkqdScV0Y493Ll/nt/mg0SwE8MRJTTTOBcWu10SYC3gcerLKQCzghAqxAHtBCYIJdSUw+ipsPDPwDT5xONBBJWh0AAAAASUVORK5CYII=")';
        el.style.backgroundSize = "22px 22px";
      } else {
        el.className = "pro-hover"
        el.style.fontSize = "10px";
        el.style.lineHeight = '16px'
        el.style.width = "85px";
        el.style.height = "40px";
        el.style.textAlign = "center";
        el.style.paddingLeft = "4px"
        // el.style.border="1px solid red"
        el.style.backgroundImage =
          'url("data:image/png;base64,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")';
        el.style.backgroundSize = "100% 100%";
        // el.style.position = "relative";
        // el.style.left = "0px";
        // el.style.top = "0";

        el.addEventListener("click", () => {
          fn(item.content);
        });
      }
      el.style.backgroundPosition = "5px center";
      el.style.backgroundRepeat = "no-repeat";

      var elMarker = new SGMap.Marker({
        element: el,
      })
        .setLngLat(item.lnglat)
        .addTo(map);

      markRegionListObj.push(elMarker);
    }
  },

  /* 添加区域名Marker点--行政分区 */
  addAdministeredRegionMarker: function (map, data, markRegionListObj) {
    for (let item of data) {
      //画marker点
      var el = document.createElement("div");
      el.innerText = item.content;
      el.style.color = "#ffffff";
      el.style.borderRadius = "6px";
      el.style.lineHeight = "40px";
      el.style.opacity = 0.9;

      el.style.fontSize = "12px";
      el.style.lineHeight = '22px'
      el.style.width = "140px";
      el.style.height = "22px";
      el.style.paddingLeft = "40px";
      el.style.backgroundColor = "#083666";
      el.style.backgroundImage =
        'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVRIib2WXUybZRTHf3R0QluQSWsLpcIFzYR0WzFsYDc+ZGMr2ZYMhh9xYR/GyUzM9MLEuAsvTHTGRM1IE42bRBhLlPGVwaKwgnGaTBO3gWNltHOjNIOVF1lTSvlaixcdjc1oLQn4v3rfc/7P+b/nOed53hMjMdUAaIGTwA7gSVYObsAMnAAGY4FM4Hdg3QqKLCIRqABKAIMI+GSVhP6NJOAjEYGt+z9QKmJlaxQJstiomWIx5ZmZvLVJjy5ZzuCDCUx9fTTZrLjn5qKKESMx1SxEIhSq03gnJ4dd6RkATMzM0GW384JGg1IiAaDH4eBU7zXMw8MRxSJmJomN5Yd95QDUWSzUWvr5w+kM+vUKBUeydbyu01Gi0ZBRewZhenr5mUnFYpp376VArUZ95mtcs7MRP0qofpM+QcDY1hJ2W0VLGT82bOX+0WoK1Gre6DaHCOkVCnoPVGFISQ3avA8fcrirk00KBaNHq/m8sCh6sbdznsPp9VLU1Mi5WwMhvi+KitEmJXGquDjEft5mxdD4HUNuN9UbNkYvBlA3YAnWJ1UqoyBVzYfPG9iiVNFpHyL7qWRObt1GoTqNNJkMgD5B4HT/jXAhwzeIJDbgylel0L2/MmjvtA9R0dFO3U4jx/U5HNfnAGBsbeGXkXskrF0bVixsZiqJFICRKQ+jU1MAvHixg4qOdgAOdf3IngttQOA4ODyTj9ZJlifm9HrZolIBMDw5SfbZOq4LY3xZsj2Ed3p7KZaJv8mq/5YhtxuAXKUSz/wyurHbMUxGYmLwfc7no/3OHeTx8aQnJFKp1aKWyUiRSrlkt+OZnw9ydclyehyOJcWWrFntzX5eXf8spc+kc2nYDsBmZSBTy8FDIVy94ungc74qBYBvbvZHn9mV0VHm/f6Q87Iu7gkALt69y54LbZy3WQFIjo8LchaPQ7hrK2w3HunqpMFYxv5MLc23bRzrNiMVi+kVBAB+cjj47NpV5nx+AMoyMtAlyznWYw4XMrxY61+3+XXkHvW7jPw5LmBzuR7j3BgfB0CTkEDT7r1cHXNydmDgMd4iwrY+QFlbK8L0NL0HqshVKpfkbJQruHXwMK7ZWXa2NEcKF1nMv7DAhoZ67JNufq58iQ/y8kP87+Vu5srLr+D0etE11DPj80UU+8//2SK+KtlBVVYW/oUFvrcOUp6pJW7NGhptVl7r6iSaIDESU42LKEeDXKWST7cVkqdScV0Y493Ll/nt/mg0SwE8MRJTTTOBcWu10SYC3gcerLKQCzghAqxAHtBCYIJdSUw+ipsPDPwDT5xONBBJWh0AAAAASUVORK5CYII=")';
      el.style.backgroundSize = "12px 12px";

      el.style.backgroundPosition = "5px center";
      el.style.backgroundRepeat = "no-repeat";

      var elMarker = new SGMap.Marker({
        element: el,
      })
        .setLngLat(item.lnglat)
        .addTo(map);

      markRegionListObj.push(elMarker);
    }
  },

  /* 添加区域名Marker点--全国电力 */
  addNationalPowerMarker: function (map, data, markRegionListObj) {
    for (let item of data) {
      var el = document.createElement("div");
      el.className = 'el-national'

      var titleEl = document.createElement("div");
      titleEl.innerText = item.title
      titleEl.className = 'title-el-national'
      el.appendChild(titleEl)
      var numEl = document.createElement("div");
      numEl.innerText = item.num
      numEl.className = 'num-el-national'
      el.appendChild(numEl)
      var unitEl = document.createElement("div");
      unitEl.innerText = item.unit
      unitEl.className = 'unit-el-national'
      el.appendChild(unitEl)

      var elMarker = new SGMap.Marker({
        element: el,
      })
        .setLngLat(item.lnglat)
        .addTo(map);

      markRegionListObj.push(elMarker);
    }
  },

  /* 分压因子--添加区域名Marker点 */
  addPressureRegionMarker: function (map, data, markRegionListObj, fn = () => { }) {
    for (let item of data) {
      //画marker点
      var el = document.createElement("div");
      el.className = 'el'

      // el.innerText = item.content;
      var childrenEl1 = document.createElement("div");
      childrenEl1.className = 'children-el1'
      childrenEl1.style.backgroundImage =
        'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVRIib2WXUybZRTHf3R0QluQSWsLpcIFzYR0WzFsYDc+ZGMr2ZYMhh9xYR/GyUzM9MLEuAsvTHTGRM1IE42bRBhLlPGVwaKwgnGaTBO3gWNltHOjNIOVF1lTSvlaixcdjc1oLQn4v3rfc/7P+b/nOed53hMjMdUAaIGTwA7gSVYObsAMnAAGY4FM4Hdg3QqKLCIRqABKAIMI+GSVhP6NJOAjEYGt+z9QKmJlaxQJstiomWIx5ZmZvLVJjy5ZzuCDCUx9fTTZrLjn5qKKESMx1SxEIhSq03gnJ4dd6RkATMzM0GW384JGg1IiAaDH4eBU7zXMw8MRxSJmJomN5Yd95QDUWSzUWvr5w+kM+vUKBUeydbyu01Gi0ZBRewZhenr5mUnFYpp376VArUZ95mtcs7MRP0qofpM+QcDY1hJ2W0VLGT82bOX+0WoK1Gre6DaHCOkVCnoPVGFISQ3avA8fcrirk00KBaNHq/m8sCh6sbdznsPp9VLU1Mi5WwMhvi+KitEmJXGquDjEft5mxdD4HUNuN9UbNkYvBlA3YAnWJ1UqoyBVzYfPG9iiVNFpHyL7qWRObt1GoTqNNJkMgD5B4HT/jXAhwzeIJDbgylel0L2/MmjvtA9R0dFO3U4jx/U5HNfnAGBsbeGXkXskrF0bVixsZiqJFICRKQ+jU1MAvHixg4qOdgAOdf3IngttQOA4ODyTj9ZJlifm9HrZolIBMDw5SfbZOq4LY3xZsj2Ed3p7KZaJv8mq/5YhtxuAXKUSz/wyurHbMUxGYmLwfc7no/3OHeTx8aQnJFKp1aKWyUiRSrlkt+OZnw9ydclyehyOJcWWrFntzX5eXf8spc+kc2nYDsBmZSBTy8FDIVy94ungc74qBYBvbvZHn9mV0VHm/f6Q87Iu7gkALt69y54LbZy3WQFIjo8LchaPQ7hrK2w3HunqpMFYxv5MLc23bRzrNiMVi+kVBAB+cjj47NpV5nx+AMoyMtAlyznWYw4XMrxY61+3+XXkHvW7jPw5LmBzuR7j3BgfB0CTkEDT7r1cHXNydmDgMd4iwrY+QFlbK8L0NL0HqshVKpfkbJQruHXwMK7ZWXa2NEcKF1nMv7DAhoZ67JNufq58iQ/y8kP87+Vu5srLr+D0etE11DPj80UU+8//2SK+KtlBVVYW/oUFvrcOUp6pJW7NGhptVl7r6iSaIDESU42LKEeDXKWST7cVkqdScV0Y493Ll/nt/mg0SwE8MRJTTTOBcWu10SYC3gcerLKQCzghAqxAHtBCYIJdSUw+ipsPDPwDT5xONBBJWh0AAAAASUVORK5CYII=")';
      childrenEl1.style.backgroundSize = "100% 100%";
      childrenEl1.style.backgroundPosition = "5px center";
      childrenEl1.style.backgroundRepeat = "no-repeat";
      el.appendChild(childrenEl1)

      var childrenEl2 = document.createElement("div");
      childrenEl2.className = 'children-el2'

      var unitEl = document.createElement("div");
      unitEl.innerText = item.unit
      unitEl.className = 'unit-el'
      childrenEl2.appendChild(unitEl)
      var numEl = document.createElement("div");
      numEl.innerText = item.num
      numEl.className = 'num-el'
      childrenEl2.appendChild(numEl)
      el.appendChild(childrenEl2)

      var elMarker = new SGMap.Marker({
        element: el,
      })
        .setLngLat(item.lnglat)
        .addTo(map);

      markRegionListObj.push(elMarker);
    }
  },

  /* 添加省外来电Marker点 */
  addOutProElectricMarker: function (
    map,
    regionItemData,
    markOutProElectricListObj
  ) {
    for (let item in regionItemData) {
      //画marker点
      var el = document.createElement("div");
      el.innerText = regionItemData[item].name;
      el.style.color = "#ffffff";
      el.style.borderRadius = "50%";
      el.style.lineHeight = "60px";
      el.style.fontSize = "16px";
      el.style.textAlign = "center";
      el.style.width = "60px";
      el.style.height = "60px";
      // el.style.paddingLeft = '40px'
      el.style.backgroundColor = "rgba(255,255,255,0.3)";
      el.style.boxShadow = "0 0 20px rgba(255,255,255,0.6)";

      var elMarker = new SGMap.Marker({
        element: el,
      })
        .setLngLat(regionItemData[item].lnglat)
        .addTo(map);

      markOutProElectricListObj.push(elMarker);
    }
  },

  /* 往32个区域添加marker图标 */
  addEveryRegionMarker: function (
    map,
    regionItemData,
    markOutProElectricListObj,
    fn = () => { }
  ) {
    let maxNum = 0
    for (let item of regionItemData) {
      maxNum = Math.max(maxNum, item.ElectricNum)
    }
    for (let item of regionItemData) {
      //画marker点
      //1.决定marker点大小的用电量ElectricNum 默认的marker点大小是30px*30px 对应的ElectricNum是10000；最大是50px*50px;最小是15px*15px
      let scaleRate = item.ElectricNum / maxNum;
      let circlePx = 60 * scaleRate < 30 ? 30 : 60 * scaleRate
      let fontSizePx = 16 * scaleRate < 8 ? 8 : 16 * scaleRate

      //2.决定marker点颜色的是因子值factorNum ，因子值最大1，最小0，对应的颜色
      let bgColor = getColor(item.factorNum);

      var el = document.createElement("div");
      el.className = "region-marker";
      el.style.color = "#00f";
      el.style.borderRadius = "50%";
      // el.style.lineHeight = circlePx + "px";
      el.style.fontSize = fontSizePx + "px";
      el.style.display = "flex"
      el.style.flexDirection = "column"
      el.style.justifyContent = "center"
      el.style.alignItems = "center"
      el.style.width = circlePx + "px";
      el.style.height = circlePx + "px";
      el.style.backgroundColor = bgColor;
      el.style.border = "1px solid #fff";
      var elName = document.createElement("div");
      elName.className = "el-name";
      elName.innerText = item.name
      el.appendChild(elName)
      var elFactorNum = document.createElement("div");
      elFactorNum.innerText = item.factorNum.toFixed(4);
      el.appendChild(elFactorNum)

      el.addEventListener("click", () => {
        fn(item);
      });

      var elMarker = new SGMap.Marker({
        element: el,
      })
        .setLngLat(item.lnglat)
        .addTo(map);

      markOutProElectricListObj.push(elMarker);
    }
  },

  /* marker图标之间的连线 */
  addEveryRegionLines: function (map, regionItemData, layerListObj) {
    // for (let item of regionItemData) {
    //   let code = item.code;
    //   let selfLnglat = item.selfLnglat;
    //   let toLngLatArr = item.toLngLatArr;
    //   for (let i = 0; i < toLngLatArr.length; i++) {
    //     let lineLayerId = "imageLayer-" + code + "-" + i;
    //     let { angle } = calculateAngleAndLength(selfLnglat, toLngLatArr[i])
    //     let offsetX = 0.04
    //     let offsetY = 0.01
    //     let left = selfLnglat
    //     let right = toLngLatArr[i]
    //     let rightBottom = rotatePoint(toLngLatArr[i], [toLngLatArr[i][0] + offsetX, toLngLatArr[i][1] - offsetY], -angle)
    //     let leftBottom = rotatePoint(selfLnglat, [selfLnglat[0] + offsetX, selfLnglat[1] - offsetY], -angle)
    //     map.addLayer({
    //       id: lineLayerId, //图层名称
    //       type: "raster", //显示类型为栅格
    //       source: {
    //         type: "image", //数据源为类型为image
    //         url: lineUrl,
    //         coordinates: [
    //           //图像显示4个点的位置信息
    //           left, //左上
    //           right, //右上
    //           rightBottom, //右下
    //           leftBottom, //左下
    //         ],
    //       },
    //     });
    //     layerListObj.push(lineLayerId);
    //   }
    // }
    for (let item of regionItemData) {
      let code = item.code;
      let selfLnglat = item.selfLnglat;
      let toLngLatArr = item.toLngLatArr;
      for (let i = 0; i < toLngLatArr.length; i++) {
        let lineLayerId = "imageLayer-" + code + "-" + i;
        map.addLayer({
          id: lineLayerId, //图层名称
          type: "raster", //显示类型为栅格
          source: {
            type: "image", //数据源为类型为image
            url: lineUrl,
            coordinates: [
              //图像显示4个点的位置信息
              selfLnglat, //左上
              [toLngLatArr[i][0] - 0.03, toLngLatArr[i][1]], //右上
              [toLngLatArr[i][0] + 0.06, toLngLatArr[i][1] - 0.01], //右下
              [selfLnglat[0] + 0.06, selfLnglat[1] - 0.01], //左下
            ],
          },
        });

        layerListObj.push(lineLayerId);
      }
    }
  },

  /* 移除传入数组的marker */
  removeMarkerList: function (markListObj) {
    for (let item of markListObj) {
      item.remove();
    }
    markListObj.length = 0;
    markListObj = [];
  },

  /* 移除供电分区的image图层 */
  removeImageLayerList: function (map, layerListObj) {
    for (let item of layerListObj) {
      map.removeLayer(item);
      map.removeSource(item);
    }

    layerListObj.length = 0;
    layerListObj = [];
  },

  /* 添加城市地名Marker 圆柱体数据 */
  createMarkerBarDivDom: function (
    map,
    mapData,
    markBarListObj,
    minNum,
    maxNum
  ) {
    if (mapData.length == 0) return;
    for (let item of mapData) {
      let percent = null;
      if (item.num < minNum) {
        percent = 20;
      } else if (item.num > maxNum) {
        percent = 100;
      } else {
        percent = (item.num * 100) / maxNum;
      }

      //画marker点
      var el = document.createElement("div");
      el.className = "cylinder";

      var elBox = document.createElement("div");
      elBox.className = "elBox";

      var elBoxItemTop = document.createElement("div");
      elBoxItemTop.innerText = item.num;
      elBoxItemTop.className = "elBoxItem";

      var elBoxItemBottom = document.createElement("div");
      elBoxItemBottom.className = "elBoxItem";
      elBoxItemBottom.style.flex = "0 0" + percent + "%";

      elBox.append(elBoxItemTop);
      elBox.append(elBoxItemBottom);
      el.append(elBox);

      var elMarker = new SGMap.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat(item.lnglat)
        .setOffset([0, -15])
        .addTo(map);

      markBarListObj.push(elMarker);
    }
  },

  /* 添加城市地名Marker点 */
  addCityNameMarker: function (map, mapData, markCityNameListObj) {
    if (mapData.length == 0) return;
    for (let item of mapData) {
      //画marker点
      var el = document.createElement("div");
      el.innerText = item.name;
      el.style.paddingRight = "10px";
      el.style.color = "#ffffff";
      el.style.borderRadius = "6px";
      el.style.backgroundColor = "#01406b";
      el.style.lineHeight = "25px";
      el.style.opacity = 0.9;
      el.style.backgroundImage =
        'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVRIib2WXUybZRTHf3R0QluQSWsLpcIFzYR0WzFsYDc+ZGMr2ZYMhh9xYR/GyUzM9MLEuAsvTHTGRM1IE42bRBhLlPGVwaKwgnGaTBO3gWNltHOjNIOVF1lTSvlaixcdjc1oLQn4v3rfc/7P+b/nOed53hMjMdUAaIGTwA7gSVYObsAMnAAGY4FM4Hdg3QqKLCIRqABKAIMI+GSVhP6NJOAjEYGt+z9QKmJlaxQJstiomWIx5ZmZvLVJjy5ZzuCDCUx9fTTZrLjn5qKKESMx1SxEIhSq03gnJ4dd6RkATMzM0GW384JGg1IiAaDH4eBU7zXMw8MRxSJmJomN5Yd95QDUWSzUWvr5w+kM+vUKBUeydbyu01Gi0ZBRewZhenr5mUnFYpp376VArUZ95mtcs7MRP0qofpM+QcDY1hJ2W0VLGT82bOX+0WoK1Gre6DaHCOkVCnoPVGFISQ3avA8fcrirk00KBaNHq/m8sCh6sbdznsPp9VLU1Mi5WwMhvi+KitEmJXGquDjEft5mxdD4HUNuN9UbNkYvBlA3YAnWJ1UqoyBVzYfPG9iiVNFpHyL7qWRObt1GoTqNNJkMgD5B4HT/jXAhwzeIJDbgylel0L2/MmjvtA9R0dFO3U4jx/U5HNfnAGBsbeGXkXskrF0bVixsZiqJFICRKQ+jU1MAvHixg4qOdgAOdf3IngttQOA4ODyTj9ZJlifm9HrZolIBMDw5SfbZOq4LY3xZsj2Ed3p7KZaJv8mq/5YhtxuAXKUSz/wyurHbMUxGYmLwfc7no/3OHeTx8aQnJFKp1aKWyUiRSrlkt+OZnw9ydclyehyOJcWWrFntzX5eXf8spc+kc2nYDsBmZSBTy8FDIVy94ungc74qBYBvbvZHn9mV0VHm/f6Q87Iu7gkALt69y54LbZy3WQFIjo8LchaPQ7hrK2w3HunqpMFYxv5MLc23bRzrNiMVi+kVBAB+cjj47NpV5nx+AMoyMtAlyznWYw4XMrxY61+3+XXkHvW7jPw5LmBzuR7j3BgfB0CTkEDT7r1cHXNydmDgMd4iwrY+QFlbK8L0NL0HqshVKpfkbJQruHXwMK7ZWXa2NEcKF1nMv7DAhoZ67JNufq58iQ/y8kP87+Vu5srLr+D0etE11DPj80UU+8//2SK+KtlBVVYW/oUFvrcOUp6pJW7NGhptVl7r6iSaIDESU42LKEeDXKWST7cVkqdScV0Y493Ll/nt/mg0SwE8MRJTTTOBcWu10SYC3gcerLKQCzghAqxAHtBCYIJdSUw+ipsPDPwDT5xONBBJWh0AAAAASUVORK5CYII=")';
      el.style.backgroundSize = "18px 18px";
      el.style.backgroundPosition = "5px center";
      el.style.height = "25px";
      el.style.paddingLeft = "30px";
      el.style.backgroundRepeat = "no-repeat";

      var elMarker = new SGMap.Marker({
        element: el,
      })
        .setLngLat(item.lnglat)
        .addTo(map);

      markCityNameListObj.push(elMarker);
    }
  },

  // 填充 市,区 边线数据
  cityDataFill: function (map, cityDistricts) {
    map.getSource("city-line").setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "MultiPolygon",
            coordinates: cityDistricts.shape.coordinates,
          },
        },
      ],
    });

    var cityListPointConcat = [];
    for (var i = 0, j = cityDistricts.sub_districts.length; i < j; i++) {
      cityListPointConcat.push.apply(
        cityListPointConcat,
        cityDistricts.sub_districts[i].shape.coordinates
      );
    }
    map.getSource("county-line").setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "MultiPolygon",
            coordinates: cityListPointConcat,
          },
        },
      ],
    });
  },

  // 给每个城市添加颜色遮罩 鼠标移到上面时变色，和点击事件
  addCountyFill: function (map, cityDistricts, initCountyData, sjutils) {
    var countyMarkData = [];
    for (var i = 0, j = cityDistricts.sub_districts.length; i < j; i++) {
      var countyObj = cityDistricts.sub_districts[i];
      countyMarkData = countyObj.shape;

      map.addLayer({
        id: "power-polygon-county" + i,
        type: "fill",
        source: {
          type: "geojson",

          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: countyMarkData,
                properties: {
                  name: countyObj.name,
                  center: countyObj.center,
                  code: countyObj.code,
                  index: i,
                },
              },
            ],
          },
        },
        paint: {
          "fill-color": "#034c8a",
          "fill-opacity": 0.5,
        },
      });

      mapUtilsChina.mouseoverhandle = function (e) {
        var features = e.features;
        for (var i = 0, j = cityDistricts.sub_districts.length; i < j; i++) {
          // 市区地图颜色
          map.setPaintProperty(
            "power-polygon-county" + i,
            "fill-color",
            "#034c8a"
          );
        }
        // 鼠标划入颜色
        map.setPaintProperty(features[0].layer.id, "fill-color", "#206bf5");
      };

      map.on("mouseover", "power-polygon-county" + i, mouseoverhandle);
      mapUtilsChina.clickHandle = function (e) {
        var features = e.features;
        initCountyData(features[0]);
        sjutils.mapLevel = 2;
      };
      map.on("click", "power-polygon-county" + i, clickHandle);
    }
  },

  // 销毁区上面的，柱状图图层
  destroyCountyMetrice: function (markCountyListObj, len) {
    if (markCountyListObj.length > len) {
      // 移除城市各区名
      for (
        let i = markCountyListObj.length / 2, j = markCountyListObj.length;
        i < j;
        i++
      ) {
        markCountyListObj[i].remove();
        markCountyListObj[i] = undefined;
      }

      markCountyListObj.splice(markCountyListObj.length / 2);
    }
  },

  // 销毁省地图上面数据
  destroyCityData: function (map, markCountyListObj, countyCount, sjutils) {
    // 移除城市各区名
    for (var i = 0, j = markCountyListObj.length; i < j; i++) {
      markCountyListObj[i].remove();
      markCountyListObj[i] = undefined;
    }
    markCountyListObj.length = 0;
    markCountyListObj = [];

    // 删除城市每个区面图层
    for (var i = 0; i < countyCount; i++) {
      map.off("mouseover", "power-polygon-county" + i, mouseoverhandle);
      map.off("click", "power-polygon-county" + i, clickHandle);
      if (map.getLayer("power-polygon-county" + i)) {
        // 先移除图层，再移除数据源
        map.removeLayer("power-polygon-county" + i);
        map.removeSource("power-polygon-county" + i);
      }
    }

    // 移除省 城市边红和 填充色
    sjutils.removeLayer(map, "city-polygon");
    sjutils.removeLayer(map, "county-polygon");
    sjutils.removeLayer(map, "county-line");

    map.removeLayer("choicePoi");
  },

  removeLayer(id) {
    if (map.getLayer(id)) {
      // 先移除图层，再移除数据源
      map.removeLayer(id);
      map.removeSource(id);
    }
  },

};

export default mapUtilsChina;
