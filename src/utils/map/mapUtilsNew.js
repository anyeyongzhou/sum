import useMapLogin from "/@/hooks/mapLoginNew.js";
import { getColor } from "/@/utils/colorUtil";
import { calculateAngleAndLength, rotatePoint } from "/@/utils/tools.ts";
import lineUrl from "/@/assets/imgs/carbonEmissionFactorDatabase/lines.png";
import cityList, { provinceFeatures } from "/@/hooks/map/mapData/index.js";

// 是否中文环境
const isZh = localStorage.getItem("i18n") == "zh";

function clickHandle(e) {
  mapUtils.clickHandle(e);
}

function mouseOverHandle(e) {
  mapUtils.mouseOverHandle(e);
}

// 计算柱状体高度
function calcPercent(num, minNum, difference) {
  let percent = null;
  if (num == 0) {
    percent = 0;
  } else {
    percent = 20 + ((num - minNum) / difference) * 100;
  }
  return percent;
}

// 移除图层和数据源
function removeLayerAndSource(map, id) {
  if (map.getLayer(id)) {
    // 先移除图层，再移除数据源
    map.removeLayer(id);
  }
  if (map.getSource(id)) {
    map.removeSource(id);
  }
}

// 数组合并成一纬度
function arrayConcat(arr) {
  var newArr = [];
  for (var i = 0, j = arr.length; i < j; i++) {
    newArr.push.apply(newArr, arr[i][0]);
  }
  return newArr;
}

/* 地图初始化的封装 */
const mapInitFn = {
  /**
   *  description:获取地图资源，进行登录
   *  param: districtTask 操作思级地图的工具类
   *         cb 回调函数
   *         configuration 方法结束后需要执行回调函数
   *             container 地图绑定的DOM元素ID
   *             style 地图样式
   *             container 地图绑定的DOM元素ID
   *             zoom 默认缩放层级
   *             center 地图中心点
   *             localIdeographFontFamily 地图默认字体
   *             scrollZoom 地图缩放（默认true）
   *             dragPan 拖拽平移操作（默认true）
   *             doubleClickZoom 双击放大操作（默认true）
   */
  mapLogin: function (map, districtTask = null, cb, configuration = {}) {
    useMapLogin(districtTask, map, cb, configuration);
  },
};

/* 地图的工具类：图层的添加、删除、 */
const mapUtils = {
  /**
   *  初始化中国地图 图层边界色 填充色
   *  params:map
   *         mapData ->type:Object 区域的信息
   *         layerListObj ->type:Array 存储图层的id，便于以后删除
   */
  initChinaLayer: function (
    map,
    mapData,
    layerListObj,
    areaLngLat,
    regionData,
    opacity = 1
  ) {
    if (mapData.length == 0) return;
    let maxNum = 0;
    let minNum = 0;
    for (let item in mapData) {
      let num = mapData[item]?.num ?? 0;
      maxNum = Math.max(num, maxNum);
      minNum = Math.min(num, minNum);
    }

    // 因为被除数, 所以不能为 0
    if (maxNum == 0 && minNum == 0) {
      maxNum = 1;
    }

    for (let i in mapData) {
      let item = mapData[i];
      if (!item.num && item.num !== 0) continue;
      let bgColor = getColor(item.num / maxNum, [
        "#049b50",
        "#00be5e",
        "#50dd17",
        "#a3d921",
        "#fad502",
        "#fec901",
        "#fea556",
        "#e98615",
        "#f1691a",
        "#fa2319",
        "#fa2319",
      ]);
      map.addLayer({
        id: item.code + "-polygon",
        type: "fill",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: regionData[item.code].features[0].type,
                geometry: regionData[item.code].features[0].geometry,
                properties: {
                  name: item.name,
                  code: item.code,
                },
              },
            ],
          },
        },
        paint: {
          "fill-color": bgColor,
          "fill-opacity": opacity,
        },
      });
      layerListObj.push(item.code + "-polygon");
      map.addLayer({
        id: item.code + "-line",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: regionData[item.code].features[0].type,
                geometry: regionData[item.code].features[0].geometry,
                properties: {
                  name: item.name,
                  code: item.code,
                },
              },
            ],
          },
        },
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#fff",
          "line-width": 1,
        },
      });
      layerListObj.push(item.code + "-line");
    }
  },
  initChinaLayerOne: function (
    map,
    mapData,
    layerListObj,
    areaLngLat,
    regionData,
    opacity = 1
  ) {
    if (mapData.length == 0) return;
    let maxNum = 1;
    let minNum = 0;
    for (let item in mapData) {
      let num = mapData[item]?.num ?? 0;
      maxNum = Math.max(num, maxNum);
      minNum = Math.min(num, minNum);
    }

    // 因为被除数, 所以不能为 0
    if (maxNum == 0 && minNum == 0) {
      maxNum = 1;
    }

    for (let i in mapData) {
      let item = mapData[i];
      if (!item.num && item.num !== 0) continue;
      let bgColor = getColor(item.num / maxNum, [
        "#009b50",
        "#009b50",
        "#00ac55",
        "#03bf6d",
        "#51de15",
        "#a2dd21",
        "#ffc403",
        "#f0a655",
        "#ed8717",
        "#f36a19",
        "#fb2318",
      ]);

      map.addLayer({
        id: item.code + "-polygon",
        type: "fill",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: regionData[item.code].features[0].type,
                geometry: regionData[item.code].features[0].geometry,
                properties: {
                  name: item.name,
                  code: item.code,
                },
              },
            ],
          },
        },
        paint: {
          "fill-color": bgColor,
          "fill-opacity": opacity,
        },
      });
      layerListObj.push(item.code + "-polygon");
      map.addLayer({
        id: item.code + "-line",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: regionData[item.code].features[0].type,
                geometry: regionData[item.code].features[0].geometry,
                properties: {
                  name: item.name,
                  code: item.code,
                },
              },
            ],
          },
        },
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#fff",
          "line-width": 1,
        },
      });
      layerListObj.push(item.code + "-line");
    }
  },
  initOtherChinaLayer: function (
    map,
    layerListObj,
    regionData,
    opacity = 1
  ) {
    map.addLayer({
      id: "other-polygon",
      type: "fill",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: regionData['Other'].features[0].type,
              geometry: regionData['Other'].features[0].geometry,
            },
          ],
        },
      },
      paint: {
        "fill-color": "#f00",
        "fill-opacity": opacity,
      },
    });
    layerListObj.push("other-polygon");
    map.addLayer({
      id: "other-line",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: regionData['Other'].features[0].type,
              geometry: regionData['Other'].features[0].geometry,
            },
          ],
        },
      },
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#fff",
        "line-width": 1,
      },
    });
    layerListObj.push("other-line");
  },

  /**
   *  图层重现塞值
   *  params:map
   *         mapData ->type:Object 区域的信息
   *         layerListObj ->type:Array 存储图层的id，便于以后删除
   */
  updateLayerData: function (map, mapData, layerListObj, opacity = 1) {
    if (layerListObj.length == 0) return
    let maxNum = 0;
    let minNum = 0;
    for (let item in mapData) {
      let num = mapData[item]?.num ?? 0;
      maxNum = Math.max(num, maxNum);
      minNum = Math.min(num, minNum);
    }

    // 因为被除数, 所以不能为 0
    if (maxNum == 0 && minNum == 0) {
      maxNum = 1;
    }
    for (let i = 0; i < layerListObj.length; i++) {
      let areaCode = layerListObj[i].split("-")[0]
      let item = mapData[areaCode];
      if (!item.num && item.num !== 0) continue;

      let bgColor = getColor(item.num / maxNum, [
        "#00df8c",
        "#11eb92",
        "#81ee56",
        "#ccf39c",
        "#e9f5db",
        "#ede9af",
        "#f9cd71",
        "#feb405",
        "#f97a00",
        "#fc180b",
        "#fe1407",
      ]);
      map.setPaintProperty(areaCode + "-polygon", "fill-color", bgColor);
    }
  },
  /**
   *  图层重现塞值
   *  params:map
   *         mapData ->type:Object 区域的信息
   *         layerListObj ->type:Array 存储图层的id，便于以后删除
   */
  updateLayerDataOne: function (map, mapData, layerListObj, opacity = 1) {
    if (layerListObj.length == 0) return
    let maxNum = 1;
    let minNum = 0;
    for (let item in mapData) {
      let num = mapData[item]?.num ?? 0;
      maxNum = Math.max(num, maxNum);
      minNum = Math.min(num, minNum);
    }

    // 因为被除数, 所以不能为 0
    if (maxNum == 0 && minNum == 0) {
      maxNum = 1;
    }
    for (let i = 0; i < layerListObj.length; i++) {
      let areaCode = layerListObj[i].split("-")[0]
      let item = mapData[areaCode];
      if (!item.num && item.num !== 0) continue;
      let bgColor = getColor(item.num / maxNum, [
        "#00df8c",
        "#11eb92",
        "#81ee56",
        "#ccf39c",
        "#e9f5db",
        "#ede9af",
        "#f9cd71",
        "#feb405",
        "#f97a00",
        "#fc180b",
        "#fe1407",
      ]);
      map.setPaintProperty(areaCode + "-polygon", "fill-color", bgColor);
    }
  },

  /**
   * 使用json数据填充地图的区域和边界坐标
   * params:map
   *        areaLngLat 地图区域的信息（获取区域的code）
   *        regionData json地图区域的信息（区域的features）
   *
   */
  jsonDataFill: function (map, areaLngLat, regionData) {
    for (let item of Object.keys(areaLngLat)) {
      map.getSource(item + "-polygon").setData({
        type: "FeatureCollection",
        features: regionData[item].features,
      });
      map.getSource(item + "-line").setData({
        type: "FeatureCollection",
        features: regionData[item].features,
      });
    }
  },

  /**
   * 监听鼠标点击，让鼠标点击的图层高亮，并且展示区域的因子值
   *
   */
  addListenerHighLightLayer: function (
    map,
    areaLngLat,
    layerListObj,
    lastedLayerCode,
    optionData,
    markBarListObj,
    fn = () => { }
  ) {
    for (let item of Object.keys(areaLngLat)) {
      map.on("click", item + "-polygon", (e) => {
        mapUtils.clearHighLightLayer(map, areaLngLat, markBarListObj);
        mapUtils.highLightLayer(
          map,
          item,
          lastedLayerCode,
          optionData,
          markBarListObj,
          areaLngLat,
          fn
        );
      });
    }
    return areaLngLat;
  },

  /**
  * 监听鼠标点击，让鼠标点击的图层高亮
  *
  */
  addListenerHighLightLayerDefault: function (
    map,
    areaLngLat,
    markBarListObj,
  ) {
    for (let item of Object.keys(areaLngLat)) {
      map.on("click", item + "-polygon", (e) => {
        mapUtils.clearHighLightLayer(map, areaLngLat, markBarListObj);
        //透明度变为1
        map.setPaintProperty(item + "-polygon", "fill-opacity", 1);
        //线宽变为4
        map.setPaintProperty(item + "-line", "line-width", 2);
      });
    }
    return areaLngLat;
  },

  /**
   * 让鼠标点击的图层高亮，并且展示区域的因子值
   *
   */
  addCityFillAddMarker: function (
    map,
    areaLngLat,
    guGanLngLat,
    mapData,
    areaInOutData,
    markBarListObj,
    spellCityNameCorresponding,
    bgColor,
    fn = () => { }
  ) {
    // 1.清除上一次的Marker点，恢复city图层的颜色
    mapUtils.clearHighLightLayerByMapData(map, areaLngLat, markBarListObj, bgColor);
    // 2.给当前区域添加颜色
    // 添加当前区域的Marker点
    let currentCityData = mapData[spellCityNameCorresponding[areaInOutData.currentCity.code]]
    // mapUtils.addSingleCityMarker(map, currentCityData, markBarListObj, areaLngLat)
    map.setPaintProperty(areaInOutData.currentCity.code + "-polygon", "fill-color", "#f4ad42")
    // 省内转入City的Marker点
    for (let item of areaInOutData.withinProvince) {
      let inCityData = mapData[spellCityNameCorresponding[item.code]]
      // mapUtils.addSingleCityMarker(map, inCityData, markBarListObj, areaLngLat)
      map.setPaintProperty(item.code + "-polygon", "fill-color", "#46825f")
    }
    // 骨干电网的Marker点
    mapUtils.addBackBoneMarker(map,
      areaInOutData.outProvince,
      markBarListObj,
      guGanLngLat
    )
    // mapUtils.addBackBoneTextMarker(map,
    //   areaInOutData.outProvince,
    //   markBarListObj,
    //   {
    //     lnglat: [118, 31.5]
    //   }
    // )
  },
  /**
   * 销毁监听事件
   *
   */
  offListenerHighLightLayer: function (
    map,
    areaLngLat,
    layerListObj,
    lastedLayerCode,
    optionData,
    markBarListObj,
    fn = () => { }
  ) {
    for (let item of Object.keys(areaLngLat)) {
      map.off("click", item + "-polygon", (e) => {
        mapUtils.clearHighLightLayer(map, areaLngLat, markBarListObj);
        mapUtils.highLightLayer(
          map,
          item,
          lastedLayerCode,
          optionData,
          markBarListObj,
          areaLngLat,
          fn
        );
      });
    }
  },
  clearHighLightLayer: function (map, areaLngLat, markBarListObj) {
    for (let item of Object.keys(areaLngLat)) {
      map.setPaintProperty(item + "-polygon", "fill-opacity", 0.8);
      map.setPaintProperty(item + "-line", "line-width", 2);
      mapUtils.removeMarkerList(markBarListObj);
    }
  },
  clearHighLightLayerByMapData: function (map, areaLngLat, markBarListObj, bgColor) {
    for (let item of Object.keys(areaLngLat)) {
      map.setPaintProperty(item + "-polygon", "fill-color", bgColor);
      map.setPaintProperty(item + "-polygon", "fill-opacity", 0.8);
      map.setPaintProperty(item + "-line", "line-width", 2);
      mapUtils.removeMarkerList(markBarListObj);
    }
  },
  /**
   * 高亮某个区域
   * params:map
   *        currentLayerCode 当前需要被高亮的区域
   *        lastedLayerCode 上一次被高亮的区域
   *
   */
  highLightLayer: function (
    map,
    currentLayerCode,
    lastedLayerCode,
    optionData,
    markBarListObj,
    areaLngLat,
    fn
  ) {
    // if (currentLayerCode == lastedLayerCode) return;
    // if (lastedLayerCode) {
    //   map.setPaintProperty(lastedLayerCode + "-polygon", "fill-opacity", 0.8);
    //   map.setPaintProperty(lastedLayerCode + "-line", "line-width", 2);
    //   mapUtils.removeMarkerList(markBarListObj);
    // }

    //透明度变为1
    map.setPaintProperty(currentLayerCode + "-polygon", "fill-opacity", 1);
    //线宽变为4
    map.setPaintProperty(currentLayerCode + "-line", "line-width", 2);
    mapUtils.addSingleRegionMarkerChina(
      map,
      currentLayerCode,
      optionData,
      markBarListObj,
      areaLngLat,
      fn
    );
    fn(currentLayerCode);
  },

  /**
   *  description:初始化省市区 图层边界色 填充色，描边粗细
   *  params: map
   *          cityList 13个城市的地理信息
   *          provinceFeatures 江苏省的地理信息
   *          layerListObj 江苏省的地理信息
   *          proFlag 是否初始化省的区域和边界layer
   *          cityFlag 是否初始化市的区域和边界layer
   *          cityFlag 是否初始化市的区域和边界layer
   *          countyFlag 是否初始化区县的区域和边界layer
   *          opacity 透明度
   */
  initProCityCountyLayer: function (
    map,
    cityList,
    provinceFeatures,
    layerListObj,
    proFlag,
    cityFlag,
    countyFlag,
    opacity = 0.8
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
            features: provinceFeatures,
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
      var cityListPointConcat = [];
      for (var i = 0, j = cityList.length; i < j; i++) {
        cityListPointConcat.push.apply(
          cityListPointConcat,
          cityList[i].dataList[0].geometry.coordinates
        );
      }
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
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "MultiPolygon",
                  coordinates: cityListPointConcat,
                },
              },
            ],
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

  /**
   * description:给每个城市添加颜色遮罩 鼠标移到上面时变色，和点击事件
   * params: map
   *         cityObj 13个城市的json数据
   *         mapData 需要再地图上展示的数据(为了计算地市区域的颜色)
   *         layerListObj 存储layerId
   *         opacity 透明度
   *         fn 点击执行的回调函数
   *
   */
  addCityFill: function (
    map,
    cityObj,
    mapData,
    layerListObj,
    opacity = 1,
    fn = () => { }
  ) {
    if (Object.keys(mapData).length == 0 || mapData.length == 0) return;
    let maxNum = 1;
    let minNum = 0;
    for (let item in mapData) {
      let num = mapData[item]?.num ?? 0;
      maxNum = Math.max(num, maxNum);
      minNum = Math.min(num, minNum);
    }

    // 因为被除数, 所以不能为 0
    if (maxNum == 0 && minNum == 0) {
      maxNum = 1;
    }

    for (let i in mapData) {
      let item = mapData[i];
      if (!item.num && item.num !== 0) continue;
      let bgColor = getColor(item.num / maxNum, [
        "#009b50",
        "#009b50",
        "#00ac55",
        "#03bf6d",
        "#51de15",
        "#a2dd21",
        "#ffc403",
        "#f0a655",
        "#ed8717",
        "#f36a19",
        "#fb2318",
      ]);
      map.addLayer({
        id: item.code + "-polygon",
        type: "fill",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: cityObj[item.code].dataList[0].geometry,
                properties: {
                  name: item.name,
                  code: item.code,
                  num: item.num,
                },
              },
            ],
          },
        },
        paint: {
          "fill-color": bgColor,
          "fill-opacity": opacity,
        },
      });
      layerListObj.push(item.code + "-polygon");
      map.addLayer({
        id: item.code + "-line",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: cityObj[item.code].dataList[0].geometry,
                properties: {
                  name: item.name,
                  code: item.code,
                  num: item.num,
                },
              },
            ],
          },
        },
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#fff",
          "line-width": 1,
        },
      });
      layerListObj.push(item.code + "-line");
    }
  },

  /**
   * description:给每个城市添加颜色遮罩,不根据数值变色，只有一个统一颜色
   * params: map
   *         cityObj 13个城市的json数据
   *         mapData 需要再地图上展示的数据(为了计算地市区域的颜色)
   *         layerListObj 存储layerId
   *         bgColor 填充区域的颜色
   *         opacity 透明度
   *
   */
  addCityFillNotData: function (
    map,
    cityObj,
    layerListObj,
    bgColor = "#f00",
    opacity = 1,
  ) {

    for (let item in cityObj) {
      map.addLayer({
        id: item + "-polygon",
        type: "fill",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: cityObj[item].dataList[0].geometry,
                properties: {
                  name: cityObj[item].dataList[0].name,
                  code: item,
                },
              },
            ],
          },
        },
        paint: {
          "fill-color": bgColor,
          "fill-opacity": opacity,
        },
      });
      layerListObj.push(item.code + "-polygon");
      map.addLayer({
        id: item + "-line",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: cityObj[item].dataList[0].geometry,
                properties: {
                  name: cityObj[item].dataList[0].name,
                  code: item,
                },
              },
            ],
          },
        },
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#fff",
          "line-width": 1,
        },
      });
      layerListObj.push(item.code + "-line");
    }
  },

  /**
   * description:对江苏13个地市的面图层颜色重新进行计算赋值
   * params: map
   *         cityObj 13个地市的code(为了拼接面图层和线图层的id)
   *         mapData 地图数据
   *
   */
  updateCityFill: function (map, cityObj, mapData, autoColor = true) {
    if (Object.keys(mapData).length == 0 || mapData.length == 0) return;
    let maxNum = 0;
    let minNum = 0;
    if (autoColor) {
      //不取动态的
      for (let item in mapData) {
        let num = Number(mapData[item]?.num) ?? 0;
        maxNum = Math.max(num, maxNum);
        minNum = Math.min(num, minNum);
      }
    }
    // 因为被除数, 所以不能为 0
    if (maxNum == 0 && minNum == 0) {
      maxNum = 1;
    }

    for (let i in mapData) {
      let item = mapData[i];
      if (!item.num && item.num !== 0) continue;
      let bgColor = getColor(item.num / maxNum, [
        "#009b50",
        "#009b50",
        "#00ac55",
        "#03bf6d",
        "#51de15",
        "#a2dd21",
        "#ffc403",
        "#f0a655",
        "#ed8717",
        "#f36a19",
        "#fb2318",
      ]);
      map.setPaintProperty(item.code + "-polygon", "fill-color", bgColor);
    }
  },

  /**
   * description:移除江苏13个地市的面图层和线图层
   * params: map
   *         cityObj 13个地市的code(为了拼接面图层和线图层的id)
   *
   */
  removeCityFillLayers: function (map, cityObj, layerListObj) {
    if (layerListObj.length == 0) return;
    let keys = Object.keys(cityObj);
    for (let item of keys) {
      removeLayerAndSource(map, item + "-polygon");
      removeLayerAndSource(map, item + "-line");
    }

    layerListObj = layerListObj.filter((item) => {
      !keys.includes(item);
    });
  },

  /* 遮罩中国(省市区) */
  drawBackgroundProCityCountyLayer: function (
    map,
    proFlag,
    cityFlag,
    countyFlag,
    opacity = 0.8,
    bgColor = "#001c2c"
  ) {
    map.addLayer({
      id: "choicePoi",
      type: "background",
      paint: {
        "background-color": bgColor,
        "background-opacity": opacity,
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

  /**
   * description:往地图上添加图片图层
   * params: map
   *         layerListObj 图层id集合
   *         layerName 图层的名称
   *         imgUrl 图层的资源
   *         coordinates 图层的位置
   */
  addImageLayer: function (map, layerListObj, layerName, imgUrl, coordinates) {
    map.addLayer({
      id: layerName, //图层名称
      type: "raster", //显示类型为栅格
      source: {
        type: "image", //数据源为类型为image
        url: imgUrl, //图像地址
        // coordinates: [
        //   [116.15, 35.3], //左上
        //   [122.17, 35.3], //右上
        //   [122.17, 30.6], //右下
        //   [116.15, 30.6], //左下
        // ],
        coordinates: coordinates,
      },
    });
    layerListObj.push(layerName);
  },

  /* 添加区域名Marker点--区域电力、省级电力 */
  addRegionMarker: function (
    map,
    data,
    markRegionListObj,
    regionType = 0,
    fn = () => { }
  ) {
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
        el.style.lineHeight = "32px";
        el.style.width = "160px";
        el.style.height = "32px";
        el.style.paddingLeft = "40px";
        el.style.backgroundColor = "#083666";
        el.style.backgroundImage =
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVRIib2WXUybZRTHf3R0QluQSWsLpcIFzYR0WzFsYDc+ZGMr2ZYMhh9xYR/GyUzM9MLEuAsvTHTGRM1IE42bRBhLlPGVwaKwgnGaTBO3gWNltHOjNIOVF1lTSvlaixcdjc1oLQn4v3rfc/7P+b/nOed53hMjMdUAaIGTwA7gSVYObsAMnAAGY4FM4Hdg3QqKLCIRqABKAIMI+GSVhP6NJOAjEYGt+z9QKmJlaxQJstiomWIx5ZmZvLVJjy5ZzuCDCUx9fTTZrLjn5qKKESMx1SxEIhSq03gnJ4dd6RkATMzM0GW384JGg1IiAaDH4eBU7zXMw8MRxSJmJomN5Yd95QDUWSzUWvr5w+kM+vUKBUeydbyu01Gi0ZBRewZhenr5mUnFYpp376VArUZ95mtcs7MRP0qofpM+QcDY1hJ2W0VLGT82bOX+0WoK1Gre6DaHCOkVCnoPVGFISQ3avA8fcrirk00KBaNHq/m8sCh6sbdznsPp9VLU1Mi5WwMhvi+KitEmJXGquDjEft5mxdD4HUNuN9UbNkYvBlA3YAnWJ1UqoyBVzYfPG9iiVNFpHyL7qWRObt1GoTqNNJkMgD5B4HT/jXAhwzeIJDbgylel0L2/MmjvtA9R0dFO3U4jx/U5HNfnAGBsbeGXkXskrF0bVixsZiqJFICRKQ+jU1MAvHixg4qOdgAOdf3IngttQOA4ODyTj9ZJlifm9HrZolIBMDw5SfbZOq4LY3xZsj2Ed3p7KZaJv8mq/5YhtxuAXKUSz/wyurHbMUxGYmLwfc7no/3OHeTx8aQnJFKp1aKWyUiRSrlkt+OZnw9ydclyehyOJcWWrFntzX5eXf8spc+kc2nYDsBmZSBTy8FDIVy94ungc74qBYBvbvZHn9mV0VHm/f6Q87Iu7gkALt69y54LbZy3WQFIjo8LchaPQ7hrK2w3HunqpMFYxv5MLc23bRzrNiMVi+kVBAB+cjj47NpV5nx+AMoyMtAlyznWYw4XMrxY61+3+XXkHvW7jPw5LmBzuR7j3BgfB0CTkEDT7r1cHXNydmDgMd4iwrY+QFlbK8L0NL0HqshVKpfkbJQruHXwMK7ZWXa2NEcKF1nMv7DAhoZ67JNufq58iQ/y8kP87+Vu5srLr+D0etE11DPj80UU+8//2SK+KtlBVVYW/oUFvrcOUp6pJW7NGhptVl7r6iSaIDESU42LKEeDXKWST7cVkqdScV0Y493Ll/nt/mg0SwE8MRJTTTOBcWu10SYC3gcerLKQCzghAqxAHtBCYIJdSUw+ipsPDPwDT5xONBBJWh0AAAAASUVORK5CYII=")';
        el.style.backgroundSize = "22px 22px";
      } else {
        el.className = "pro-hover";
        el.style.fontSize = "10px";
        el.style.lineHeight = "16px";
        el.style.width = "85px";
        el.style.height = "40px";
        el.style.textAlign = "center";
        el.style.paddingLeft = "4px";
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

  /* 添加单个区域名Marker点--国家发布 */
  addSingleRegionMarkerChina: function (
    map,
    currentLayerCode,
    optionData,
    markBarListObj,
    areaLngLat,
    fn = () => { }
  ) {
    let item = null;
    //画marker点
    var el = document.createElement("div");
    el.style.borderRadius = "6px";
    el.style.opacity = 0.9;
    el.style.width = isZh ? "120px" : "200px";
    el.style.height = "60px";
    el.style.textAlign = "center";
    el.style.paddingTop = "4px";
    el.style.paddingLeft = "4px";
    el.style.backgroundImage =
      'url("data:image/png;base64,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")';
    el.style.backgroundSize = "100% 100%";
    // el.addEventListener("click", (e) => {
    //   fn(e);
    // });

    el.style.backgroundPosition = "5px center";
    el.style.backgroundRepeat = "no-repeat";

    for (let i in optionData) {
      if (optionData[i].code == currentLayerCode) {
        item = optionData[i];
        el.innerHTML = `${item.name}：${item.num}`
        break;
      }
    }

    var elMarker = new SGMap.Marker({
      element: el,
    })
      .setLngLat(areaLngLat[item.code]?.lnglat)
      .addTo(map);

    markBarListObj.push(elMarker);
  },
  /* 添加骨干电网的Marker点 */
  addBackBoneTextMarker: function (
    map,
    item,
    markBarListObj,
    guGanLngLat
  ) {
    //画marker点
    var el = document.createElement("div");
    el.innerText = item.name + " " + item.num;
    el.style.color = "#ffffff";
    el.style.borderRadius = "6px";
    el.style.lineHeight = "40px";
    el.style.opacity = 0.9;
    el.className = "pro-hover";
    el.style.fontSize = "10px";
    el.style.lineHeight = "16px";
    el.style.width = isZh ? "100px" : "200px";
    el.style.height = "40px";
    el.style.textAlign = "left";
    el.style.paddingTop = "4px";
    el.style.paddingLeft = "4px";
    el.style.backgroundColor = "#011324"
    var elMarker = new SGMap.Marker({
      element: el,
    })
      .setLngLat(guGanLngLat.lnglat)
      .addTo(map);

    markBarListObj.push(elMarker);
  },
  /* 添加省内转入电量的Marker点 */
  addProvinceInTextMarker: function (
    map,
    item,
    markBarListObj,
    guGanLngLat
  ) {
    //画marker点
    var el = document.createElement("div");
    el.innerText = item.num + "MWh";
    el.style.color = "#ffffff";
    el.style.borderRadius = "6px";
    el.style.lineHeight = "40px";
    el.style.opacity = 0.9;
    el.className = "pro-hover";
    el.style.fontSize = "10px";
    el.style.lineHeight = "16px";
    el.style.width = (item.num.length + 3) * 15 + "px";
    el.style.height = "20px";
    el.style.textAlign = "left";
    el.style.paddingTop = "2px";
    el.style.paddingLeft = "4px";
    el.style.paddingRight = "4px";
    el.style.backgroundColor = "#011324"
    var elMarker = new SGMap.Marker({
      element: el,
    })
      .setLngLat(guGanLngLat.lnglat)
      .addTo(map);

    markBarListObj.push(elMarker);
  },
  /* 添加骨干电网的Marker点 */
  addBackBoneMarker: function (
    map,
    item,
    markBarListObj,
    guGanLngLat
  ) {
    //画marker点
    var el = document.createElement("div");
    el.style.borderRadius = "6px";
    el.style.opacity = 0.9;
    el.className = "pro-hover";
    el.style.width = "200px";
    el.style.height = "300px";
    el.style.textAlign = "center";
    el.style.paddingTop = "4px";
    el.style.paddingLeft = "4px";
    el.style.backgroundImage =
      'url("data:image/png;base64,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")';

    el.style.backgroundPosition = "5px center";
    el.style.backgroundSize = "60% 100%";
    el.style.backgroundRepeat = "no-repeat";
    var elMarker = new SGMap.Marker({
      element: el,
    })
      .setLngLat(guGanLngLat.lnglat)
      .addTo(map);

    markBarListObj.push(elMarker);
  },
  /* 添加单个区域名Marker点 */
  addSingleCityMarker: function (
    map,
    item,
    markBarListObj,
    areaLngLat
  ) {
    //画marker点
    var el = document.createElement("div");
    el.innerText = item.name + " " + item.num;
    el.style.color = "#ffffff";
    el.style.borderRadius = "6px";
    el.style.lineHeight = "60px";
    el.style.opacity = 0.9;
    el.className = "pro-hover";
    el.style.fontSize = "14px";
    el.style.lineHeight = "16px";
    el.style.width = isZh ? "120px" : "200px";
    el.style.height = "60px";
    el.style.textAlign = "center";
    el.style.paddingTop = "4px";
    el.style.paddingLeft = "4px";
    el.style.backgroundImage =
      'url("data:image/png;base64,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")';
    el.style.backgroundSize = "100% 100%";
    // el.addEventListener("click", (e) => {
    //   fn(e);
    // });

    el.style.backgroundPosition = "5px center";
    el.style.backgroundRepeat = "no-repeat";
    var elMarker = new SGMap.Marker({
      element: el,
    })
      .setLngLat(areaLngLat[item.code].lnglat)
      .addTo(map);

    markBarListObj.push(elMarker);
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
      el.style.lineHeight = "22px";
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
      el.className = "el-national";

      var titleEl = document.createElement("div");
      titleEl.innerText = item.title;
      titleEl.className = "title-el-national";
      el.appendChild(titleEl);
      var numEl = document.createElement("div");
      numEl.innerText = item.num;
      numEl.className = "num-el-national";
      el.appendChild(numEl);
      var unitEl = document.createElement("div");
      unitEl.innerText = item.unit;
      unitEl.className = "unit-el-national";
      el.appendChild(unitEl);

      var elMarker = new SGMap.Marker({
        element: el,
      })
        .setLngLat(item.lnglat)
        .addTo(map);

      markRegionListObj.push(elMarker);
    }
  },

  /* 分压因子--添加区域名Marker点 */
  addPressureRegionMarker: function (
    map,
    data,
    markRegionListObj,
    fn = () => { }
  ) {
    for (let item of data) {
      //画marker点
      var el = document.createElement("div");
      el.className = "el";

      // el.innerText = item.content;
      var childrenEl1 = document.createElement("div");
      childrenEl1.className = "children-el1";
      childrenEl1.style.backgroundImage =
        'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVRIib2WXUybZRTHf3R0QluQSWsLpcIFzYR0WzFsYDc+ZGMr2ZYMhh9xYR/GyUzM9MLEuAsvTHTGRM1IE42bRBhLlPGVwaKwgnGaTBO3gWNltHOjNIOVF1lTSvlaixcdjc1oLQn4v3rfc/7P+b/nOed53hMjMdUAaIGTwA7gSVYObsAMnAAGY4FM4Hdg3QqKLCIRqABKAIMI+GSVhP6NJOAjEYGt+z9QKmJlaxQJstiomWIx5ZmZvLVJjy5ZzuCDCUx9fTTZrLjn5qKKESMx1SxEIhSq03gnJ4dd6RkATMzM0GW384JGg1IiAaDH4eBU7zXMw8MRxSJmJomN5Yd95QDUWSzUWvr5w+kM+vUKBUeydbyu01Gi0ZBRewZhenr5mUnFYpp376VArUZ95mtcs7MRP0qofpM+QcDY1hJ2W0VLGT82bOX+0WoK1Gre6DaHCOkVCnoPVGFISQ3avA8fcrirk00KBaNHq/m8sCh6sbdznsPp9VLU1Mi5WwMhvi+KitEmJXGquDjEft5mxdD4HUNuN9UbNkYvBlA3YAnWJ1UqoyBVzYfPG9iiVNFpHyL7qWRObt1GoTqNNJkMgD5B4HT/jXAhwzeIJDbgylel0L2/MmjvtA9R0dFO3U4jx/U5HNfnAGBsbeGXkXskrF0bVixsZiqJFICRKQ+jU1MAvHixg4qOdgAOdf3IngttQOA4ODyTj9ZJlifm9HrZolIBMDw5SfbZOq4LY3xZsj2Ed3p7KZaJv8mq/5YhtxuAXKUSz/wyurHbMUxGYmLwfc7no/3OHeTx8aQnJFKp1aKWyUiRSrlkt+OZnw9ydclyehyOJcWWrFntzX5eXf8spc+kc2nYDsBmZSBTy8FDIVy94ungc74qBYBvbvZHn9mV0VHm/f6Q87Iu7gkALt69y54LbZy3WQFIjo8LchaPQ7hrK2w3HunqpMFYxv5MLc23bRzrNiMVi+kVBAB+cjj47NpV5nx+AMoyMtAlyznWYw4XMrxY61+3+XXkHvW7jPw5LmBzuR7j3BgfB0CTkEDT7r1cHXNydmDgMd4iwrY+QFlbK8L0NL0HqshVKpfkbJQruHXwMK7ZWXa2NEcKF1nMv7DAhoZ67JNufq58iQ/y8kP87+Vu5srLr+D0etE11DPj80UU+8//2SK+KtlBVVYW/oUFvrcOUp6pJW7NGhptVl7r6iSaIDESU42LKEeDXKWST7cVkqdScV0Y493Ll/nt/mg0SwE8MRJTTTOBcWu10SYC3gcerLKQCzghAqxAHtBCYIJdSUw+ipsPDPwDT5xONBBJWh0AAAAASUVORK5CYII=")';
      childrenEl1.style.backgroundSize = "100% 100%";
      childrenEl1.style.backgroundPosition = "5px center";
      childrenEl1.style.backgroundRepeat = "no-repeat";
      el.appendChild(childrenEl1);

      var childrenEl2 = document.createElement("div");
      childrenEl2.className = "children-el2";

      var unitEl = document.createElement("div");
      unitEl.innerText = item.unit;
      unitEl.className = "unit-el";
      childrenEl2.appendChild(unitEl);
      var numEl = document.createElement("div");
      numEl.innerText = item.num;
      numEl.className = "num-el";
      childrenEl2.appendChild(numEl);
      el.appendChild(childrenEl2);

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
    let maxNum = 0;
    for (let item of regionItemData) {
      maxNum = Math.max(maxNum, item.ElectricNum);
    }
    for (let item of regionItemData) {
      //画marker点
      //1.决定marker点大小的用电量ElectricNum 默认的marker点大小是30px*30px 对应的ElectricNum是10000；最大是50px*50px;最小是15px*15px
      let scaleRate = maxNum == 0 ? 0 : item.ElectricNum / maxNum;
      let circlePx = 60 * scaleRate < 30 ? 30 : 60 * scaleRate;
      let fontSizePx = 16 * scaleRate < 8 ? 8 : 16 * scaleRate;

      //2.决定marker点颜色的是因子值factorNum ，因子值最大1，最小0，对应的颜色
      let bgColor = getColor(item.factorNum);

      var el = document.createElement("div");
      el.className = "region-marker";
      el.style.color = "#00f";
      el.style.borderRadius = "50%";
      // el.style.lineHeight = circlePx + "px";
      el.style.fontSize = fontSizePx + "px";
      el.style.display = "flex";
      el.style.flexDirection = "column";
      el.style.justifyContent = "center";
      el.style.alignItems = "center";
      el.style.width = circlePx + "px";
      el.style.height = circlePx + "px";
      el.style.backgroundColor = bgColor;
      el.style.border = "1px solid #fff";
      var elName = document.createElement("div");
      elName.className = "el-name";
      elName.innerText = item.name;
      el.appendChild(elName);
      var elFactorNum = document.createElement("div");
      elFactorNum.innerText = item.factorNum.toFixed(4);
      el.appendChild(elFactorNum);

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

  addLinesToMap: function (map, areaInOutData, layerListObj, markBarListObj, mapData, spellCityNameCorresponding, animationId) {
    let currentCityData = mapData[spellCityNameCorresponding[areaInOutData.currentCity.code]]
    for (let item of areaInOutData.withinProvince) {
      let inCityData = mapData[spellCityNameCorresponding[item.code]]
      // 1.添加省内转入的箭头
      mapUtils.addLineToMap(map, inCityData, currentCityData, layerListObj, animationId)
      // 添加转入的电量Marker
      mapUtils.addProvinceInTextMarker(map, {
        num: item.num,
      }, markBarListObj, {
        lnglat: [(inCityData.center[0] + currentCityData.center[0]) / 2, (inCityData.center[1] + currentCityData.center[1]) / 2]
      })
    }
    // 2.添加骨干电网转入的箭头
    mapUtils.addLineToMap(map, {
      center: [116.7, 31.5],
      code: "dc_city_ggdw",
    }, currentCityData, layerListObj, animationId)
  },

  addLineToMap: function (map, startCity, endCity, layerListObj, animationId) {
    let startPoint = startCity.center;
    let endPoint = endCity.center;
    let sumCode = startCity.code + "-" + endCity.code;

    // 生成静态线条
    let { lineGeoJSON } = mapUtils.createArrowFlowGeoJSON(startPoint, endPoint);

    // 清除旧图层
    if (map.getLayer("carbonArrowLineLayer" + sumCode)) {
      map.removeLayer("carbonArrowLineLayer" + sumCode);
      map.removeSource("carbonArrowLineLayer" + sumCode);
    }
    if (map.getLayer("carbonArrowSymbolLayer" + sumCode)) {
      map.removeLayer("carbonArrowSymbolLayer" + sumCode);
      map.removeSource("carbonArrowSymbolLayer" + sumCode);
    }

    // 添加线图层（不变）
    map.addSource("carbonArrowLineLayer" + sumCode, {
      type: "geojson",
      data: lineGeoJSON,
    });
    map.addLayer({
      id: "carbonArrowLineLayer" + sumCode,
      type: "line",
      source: "carbonArrowLineLayer" + sumCode,
      paint: {
        "line-color": lineGeoJSON.features[0].properties.color,
        "line-width": lineGeoJSON.features[0].properties.width,
      },
    });
    layerListObj.push("carbonArrowLineLayer" + sumCode);

    // =============== 新增动画部分 ===============
    // 1. 创建动画箭头数据源
    const movingArrowsGeoJSON = mapUtils.createMovingArrowsGeoJSON(
      startPoint,
      endPoint,
      0 // 初始进度
    );

    map.addSource("carbonArrowSymbolLayer" + sumCode, {
      type: "geojson",
      data: movingArrowsGeoJSON,
    });

    map.addLayer({
      id: "carbonArrowSymbolLayer" + sumCode,
      type: "symbol",
      source: "carbonArrowSymbolLayer" + sumCode,
      layout: {
        "icon-image": "arrowImg",
        "icon-rotate": ["get", "angle"],
        "icon-size": 0.8,
        "icon-allow-overlap": true,
      },
      paint: {
        "icon-color": ["get", "color"],
      },
    });
    layerListObj.push("carbonArrowSymbolLayer" + sumCode);

    // 2. 启动动画
    mapUtils.startArrowAnimation(
      map,
      startPoint,
      endPoint,
      "carbonArrowSymbolLayer" + sumCode,
      animationId
    );
  },

  /**
 * 创建带箭头的线GeoJSON（仅在终点显示一个箭头）
 * @param {Array} startPoint - 起点坐标 [lng, lat]
 * @param {Array} endPoint - 终点坐标 [lng, lat]
 * @param {Object} options - 可选配置
 * @param {string} [options.color="#3388ff"] - 线条和箭头颜色
 * @param {number} [options.lineWidth=3] - 线条宽度
 * @param {number} [options.arrowSize=0.5] - 箭头大小
 * @returns {Object} { lineGeoJSON, arrowGeoJSON }
 */
  createArrowFlowGeoJSON: function (startPoint, endPoint, options = {}) {
    const { color = "#0deabd", lineWidth = 3, arrowSize = 0.5 } = options;

    // 1. 创建线GeoJSON
    const lineFeature = {
      type: "Feature",
      properties: {
        color: color,
        width: lineWidth,
      },
      geometry: {
        type: "LineString",
        coordinates: [startPoint, endPoint],
      },
    };

    // 2. 计算箭头角度（从起点指向终点）
    // const angle =
    //   (Math.atan2(endPoint[1] - startPoint[1], endPoint[0] - startPoint[0]) *
    //     180) /
    //   Math.PI;
    const angle = mapUtils.calculateSphericalBearing(startPoint, endPoint)

    // 3. 创建箭头GeoJSON（仅放在终点）
    const arrowFeature = {
      type: "Feature",
      properties: {
        angle: angle,
        size: arrowSize,
        color: color,
      },
      geometry: {
        type: "Point",
        coordinates: endPoint,
      },
    };

    return {
      lineGeoJSON: {
        type: "FeatureCollection",
        features: [lineFeature],
      },
      arrowGeoJSON: {
        type: "FeatureCollection",
        features: [arrowFeature],
      },
    };
  },

  calculateSphericalBearing: function (start, end) {
    const [lng1, lat1] = start.map(deg => deg * Math.PI / 180)
    const [lng2, lat2] = end.map(deg => deg * Math.PI / 180)

    const y = Math.sin(lng2 - lng1) * Math.cos(lat2)
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1)

    let bearing = Math.atan2(y, x) * 180 / Math.PI
    return bearing
  },

  /**
   * 创建移动箭头组GeoJSON
   * @param {Array} start - 起点坐标
   * @param {Array} end - 终点坐标
   * @param {number} progress - 当前进度 (0-1)
   * @returns {Object} GeoJSON
   */
  createMovingArrowsGeoJSON: function (start, end, progress) {
    const angle = mapUtils.calculateSphericalBearing(start, end);
    const features = [];
    const arrowCount = 3;
    const spacing = 0.2; // 箭头间距

    for (let i = 0; i < arrowCount; i++) {
      // 计算每个箭头的位置（偏移进度）
      const arrowProgress = (progress + i * spacing) % 1;
      const position = mapUtils.interpolatePoint(start, end, arrowProgress);

      features.push({
        type: "Feature",
        properties: {
          angle: angle,
          color: "#0deabd",
          progress: arrowProgress // 可选：用于动态控制大小
        },
        geometry: {
          type: "Point",
          coordinates: position
        }
      });
    }

    // 添加终点固定箭头
    features.push({
      type: "Feature",
      properties: {
        angle: angle,
        color: "#0deabd",
        size: 1.2 // 终点箭头稍大
      },
      geometry: {
        type: "Point",
        coordinates: end
      }
    });

    return {
      type: "FeatureCollection",
      features: features
    };
  },

  /**
   * 两点间线性插值
   */
  interpolatePoint: function (start, end, ratio) {
    return [
      start[0] + (end[0] - start[0]) * ratio,
      start[1] + (end[1] - start[1]) * ratio
    ];
  },

  /**
   * 启动箭头动画
   */
  startArrowAnimation: function (map, start, end, sourceId, animationId) {
    let progress = 0;
    const duration = 3000; // 3秒完成一次循环

    const animate = () => {
      progress = (performance.now() % duration) / duration;
      const geojson = mapUtils.createMovingArrowsGeoJSON(start, end, progress);
      if (map.getLayer(sourceId)) {
        map.getSource(sourceId).setData(geojson);
      }
      animationId = requestAnimationFrame(animate);
    };

    // 停止已有动画
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(animate);
  },

  /* 移除传入数组的marker */
  removeMarkerList: function (markListObj) {
    for (let item of markListObj) {
      item.remove();
    }
    markListObj.length = 0;
    markListObj = [];
  },

  /**
   * description: 从layerListObj移除单个layer和resource
   * params: map
   *         layerListObj 图层id集合
   *         removeLayerName 待删除的图层id
   */
  removeSingleLayerList: function (map, layerListObj, removeLayerName) {
    removeLayerAndSource(map, removeLayerName);
    layerListObj = layerListObj.filter((item) => {
      removeLayerName !== item;
    });
  },

  /**
   * description: 移除所有layer和resource
   * params: map
   *         layerListObj 待删除的图层id集合
   */
  removeAllLayerList: function (map, layerListObj) {
    for (let item of layerListObj) {
      removeLayerAndSource(map, item);
    }

    layerListObj.length = 0;
    layerListObj = [];
  },

  /**
   * description: 添加城市地名Marker 圆柱体数据
   * params: map 地图Ref
   *         mapData 数据
   *         markBarListObj 存储marker点数据
   *         minNum 最小值
   *         maxNum 最大值
   */
  createMarkerBarDivDom: function (
    map,
    mapData,
    markBarListObj,
    minNum,
    maxNum
  ) {
    if (mapData.length == 0) return;
    // 当数值为0时不展示柱状体，有数值柱状体高度最小20%，最大100%
    let difference = maxNum - minNum;
    for (let item of mapData) {
      // 计算柱状体高度
      let percent = calcPercent(item.num, minNum, difference);

      // 计算数值的颜色(数值的百分比)
      let bgColor =
        maxNum == 0
          ? "transparent"
          : getColor(item.num / maxNum, [
            "#049b50",
            "#00be5e",
            "#50dd17",
            "#a3d921",
            "#fad502",
            "#fec901",
            "#fea556",
            "#e98615",
            "#f1691a",
            "#fa2319",
            "#fa2319",
          ]);

      var el = document.createElement("div");
      el.className = "cylinder";

      var elBox = document.createElement("div");
      elBox.className = "elBox";

      // 数值
      var elBoxItemTop = document.createElement("div");
      elBoxItemTop.innerText = item.num;
      elBoxItemTop.className = "elBoxItem";
      elBoxItemTop.style.backgroundColor = bgColor;

      // 柱状体
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

  /**
   * description:添加城市地名Marker点
   * params: bgShow 城市名是否有背景图片
   *
   */
  addCityNameMarker: function (
    map,
    mapData,
    markCityNameListObj,
    bgShow = true
  ) {
    if (mapData.length == 0) return;
    for (let item of mapData) {
      //画marker点
      var el = document.createElement("div");
      el.innerText = item.name;
      el.style.paddingRight = "10px";
      el.style.color = "#fff";
      el.style.borderRadius = "6px";
      el.style.lineHeight = "25px";
      el.style.opacity = 0.9;
      el.style.height = "25px";
      el.style.fontSize = "14px";

      if (bgShow) {
        el.style.backgroundImage =
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVRIib2WXUybZRTHf3R0QluQSWsLpcIFzYR0WzFsYDc+ZGMr2ZYMhh9xYR/GyUzM9MLEuAsvTHTGRM1IE42bRBhLlPGVwaKwgnGaTBO3gWNltHOjNIOVF1lTSvlaixcdjc1oLQn4v3rfc/7P+b/nOed53hMjMdUAaIGTwA7gSVYObsAMnAAGY4FM4Hdg3QqKLCIRqABKAIMI+GSVhP6NJOAjEYGt+z9QKmJlaxQJstiomWIx5ZmZvLVJjy5ZzuCDCUx9fTTZrLjn5qKKESMx1SxEIhSq03gnJ4dd6RkATMzM0GW384JGg1IiAaDH4eBU7zXMw8MRxSJmJomN5Yd95QDUWSzUWvr5w+kM+vUKBUeydbyu01Gi0ZBRewZhenr5mUnFYpp376VArUZ95mtcs7MRP0qofpM+QcDY1hJ2W0VLGT82bOX+0WoK1Gre6DaHCOkVCnoPVGFISQ3avA8fcrirk00KBaNHq/m8sCh6sbdznsPp9VLU1Mi5WwMhvi+KitEmJXGquDjEft5mxdD4HUNuN9UbNkYvBlA3YAnWJ1UqoyBVzYfPG9iiVNFpHyL7qWRObt1GoTqNNJkMgD5B4HT/jXAhwzeIJDbgylel0L2/MmjvtA9R0dFO3U4jx/U5HNfnAGBsbeGXkXskrF0bVixsZiqJFICRKQ+jU1MAvHixg4qOdgAOdf3IngttQOA4ODyTj9ZJlifm9HrZolIBMDw5SfbZOq4LY3xZsj2Ed3p7KZaJv8mq/5YhtxuAXKUSz/wyurHbMUxGYmLwfc7no/3OHeTx8aQnJFKp1aKWyUiRSrlkt+OZnw9ydclyehyOJcWWrFntzX5eXf8spc+kc2nYDsBmZSBTy8FDIVy94ungc74qBYBvbvZHn9mV0VHm/f6Q87Iu7gkALt69y54LbZy3WQFIjo8LchaPQ7hrK2w3HunqpMFYxv5MLc23bRzrNiMVi+kVBAB+cjj47NpV5nx+AMoyMtAlyznWYw4XMrxY61+3+XXkHvW7jPw5LmBzuR7j3BgfB0CTkEDT7r1cHXNydmDgMd4iwrY+QFlbK8L0NL0HqshVKpfkbJQruHXwMK7ZWXa2NEcKF1nMv7DAhoZ67JNufq58iQ/y8kP87+Vu5srLr+D0etE11DPj80UU+8//2SK+KtlBVVYW/oUFvrcOUp6pJW7NGhptVl7r6iSaIDESU42LKEeDXKWST7cVkqdScV0Y493Ll/nt/mg0SwE8MRJTTTOBcWu10SYC3gcerLKQCzghAqxAHtBCYIJdSUw+ipsPDPwDT5xONBBJWh0AAAAASUVORK5CYII=")';
        el.style.backgroundSize = "18px 18px";
        el.style.backgroundPosition = "5px center";
        el.style.paddingLeft = "30px";
        el.style.backgroundRepeat = "no-repeat";
        el.style.backgroundColor = "#01406b";
        el.style.fontSize = "12px";
      }

      var elMarker = new SGMap.Marker({
        element: el,
      })
        .setLngLat(item.lnglat)
        .addTo(map);

      markCityNameListObj.push(elMarker);
    }
  },

  /**
   * description:添加区域地名Marker点
   * params: bgShow 城市名是否有背景图片
   *
   */
  addAreaNameMarker: function (map, mapData, areaLngLat) {
    if (Object.keys(mapData).length == 0) return;
    for (let i in mapData) {
      let item = mapData[i];
      //画marker点
      var el = document.createElement("div");
      el.innerText = areaLngLat[item.code].name;
      el.style.paddingTop = "10px";
      el.style.paddingRight = "10px";
      el.style.color = "#fff";
      el.style.borderRadius = "6px";
      el.style.lineHeight = "25px";
      el.style.opacity = 0.9;
      el.style.height = "25px";
      el.style.fontSize = "14px";

      var elMarker = new SGMap.Marker({
        element: el,
      })
        .setLngLat(areaLngLat[item.code].lnglat)
        .addTo(map);
    }
  },

  /**
   * description:添加区域地名Marker点
   * params: 
   *
   */
  addAreaNameMarkerByMapData: function (map, mapData) {
    if (Object.keys(mapData).length == 0) return;
    for (let i in mapData) {
      let item = mapData[i];
      //画marker点
      var el = document.createElement("div");
      el.innerText = item.name;
      el.style.paddingTop = "10px";
      el.style.paddingRight = "10px";
      el.style.color = "#fff";
      el.style.borderRadius = "6px";
      el.style.lineHeight = "25px";
      el.style.opacity = 0.9;
      el.style.height = "25px";
      el.style.fontSize = "14px";

      var elMarker = new SGMap.Marker({
        element: el,
      })
        .setLngLat(item.center)
        .addTo(map);
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

      mapUtils.mouseOverHandle = function (e) {
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

      map.on("mouseover", "power-polygon-county" + i, mouseOverHandle);
      mapUtils.clickHandle = function (e) {
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
      map.off("mouseover", "power-polygon-county" + i, mouseOverHandle);
      map.off("click", "power-polygon-county" + i, clickHandle);
      removeLayerAndSource(map, "power-polygon-county" + i);
    }

    // 移除省 城市边红和 填充色
    removeLayerAndSource(map, "city-polygon");
    removeLayerAndSource(map, "county-polygon");
    removeLayerAndSource(map, "county-line");
    removeLayerAndSource(map, "choicePoi");
  },
};

const proUtils = {
  // 数组合并成一纬度
  // arr 2纬度  [[1,2],[3,4]] = [1,2,3,4]
  arrayConcat: function (arr) {
    var newArr = [];
    for (var i = 0, j = arr.length; i < j; i++) {
      newArr.push.apply(newArr, arr[i][0]);
    }
    return newArr;
  },

  /* 初始化省市区 图层边界色 填充色，描边粗细 */
  initProvinceCityCountyLayer: function (map) {
    // 显示查询行政区划范围
    // 省：蓝线
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
        "fill-color": "#206bf5",
        "fill-opacity": 0.3,
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
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 3,
      },
    });
    // 市：绿面、绿线
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
        "line-width": 2,
      },
    });
    // 区/县：黄面、黑线
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
        "fill-color": "#f2f520",
        "fill-opacity": 0.7,
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
        "line-color": "#888a01",
        "line-width": 3,
      },
    });
  },

  /* 填充 省,市边数据 */
  provinceCityDataFill: function (map) {
    map.getSource("province-line").setData({
      type: "FeatureCollection",
      features: provinceFeatures,
    });

    var cityListPointConcat = [];
    for (var i = 0, j = cityList.length; i < j; i++) {
      cityListPointConcat.push.apply(
        cityListPointConcat,
        cityList[i].dataList[0].geometry.coordinates
      );
    }

    map.getSource("city-line").setData({
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

  /* 给每个城市添加颜色遮罩 鼠标移到上面时变色，和点击事件 */
  addCityFill: function (map, initCityMap) {
    var cityMarkData = [];
    for (let i = 0, j = cityList.length; i < j; i++) {
      var cityObj = cityList[i].dataList[0];
      cityMarkData = proUtils.arrayConcat(
        cityList[i].dataList[0].geometry.coordinates
      );

      map.addLayer({
        id: "power-polygon" + i,
        type: "fill",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  // Polygon类型的几何对象为3层数组，MultiPolygon类型为4层数组
                  // 面图层的几何描述对象需闭合，即第一个点和最后一个点坐标相同
                  coordinates: [cityMarkData],
                },
                properties: {
                  // 对应上面设置的{name}
                  name: cityObj.name,
                  center: cityObj.center.join(","),
                  code: cityObj.code,
                  zoom: cityObj.zoom,
                  cityCode: cityObj.cityCode,
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

      map.on("mouseover", "power-polygon" + i, function (e) {
        var features = e.features;
        map.setPaintProperty(features[0].layer.id, "fill-color", "#206bf5");
        map.on("mouseleave", "power-polygon" + i, function (e) {
          if (map.getLayer("power-polygon" + i)) {
            map.setPaintProperty("power-polygon" + i, "fill-color", "#034c8a");
          }
        });
      });

      map.on("click", "power-polygon" + i, function (e) {
        var features = e.features;
        initCityMap(features[0]);
      });
    }
  },

  /* 添加城市地名Marker点 */
  addCityMarker: function (map, markCityListObj) {
    for (let item in cityPropertyInitData) {
      const objCity = cityPropertyInitData[item].properties;
      //画marker点
      var el = document.createElement("div");
      el.innerText = objCity.name;
      el.className = "marker";
      el.style.color = "#ffffff";
      el.style.borderRadius = "6px";
      // el.style.backgroundColor = '#0e1015';
      el.style.backgroundColor = "rgba(14,16,21,0.9)";
      el.style.lineHeight = "25px";
      el.style.opacity = 0.9;
      el.style.backgroundImage =
        'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVRIib2WXUybZRTHf3R0QluQSWsLpcIFzYR0WzFsYDc+ZGMr2ZYMhh9xYR/GyUzM9MLEuAsvTHTGRM1IE42bRBhLlPGVwaKwgnGaTBO3gWNltHOjNIOVF1lTSvlaixcdjc1oLQn4v3rfc/7P+b/nOed53hMjMdUAaIGTwA7gSVYObsAMnAAGY4FM4Hdg3QqKLCIRqABKAIMI+GSVhP6NJOAjEYGt+z9QKmJlaxQJstiomWIx5ZmZvLVJjy5ZzuCDCUx9fTTZrLjn5qKKESMx1SxEIhSq03gnJ4dd6RkATMzM0GW384JGg1IiAaDH4eBU7zXMw8MRxSJmJomN5Yd95QDUWSzUWvr5w+kM+vUKBUeydbyu01Gi0ZBRewZhenr5mUnFYpp376VArUZ95mtcs7MRP0qofpM+QcDY1hJ2W0VLGT82bOX+0WoK1Gre6DaHCOkVCnoPVGFISQ3avA8fcrirk00KBaNHq/m8sCh6sbdznsPp9VLU1Mi5WwMhvi+KitEmJXGquDjEft5mxdD4HUNuN9UbNkYvBlA3YAnWJ1UqoyBVzYfPG9iiVNFpHyL7qWRObt1GoTqNNJkMgD5B4HT/jXAhwzeIJDbgylel0L2/MmjvtA9R0dFO3U4jx/U5HNfnAGBsbeGXkXskrF0bVixsZiqJFICRKQ+jU1MAvHixg4qOdgAOdf3IngttQOA4ODyTj9ZJlifm9HrZolIBMDw5SfbZOq4LY3xZsj2Ed3p7KZaJv8mq/5YhtxuAXKUSz/wyurHbMUxGYmLwfc7no/3OHeTx8aQnJFKp1aKWyUiRSrlkt+OZnw9ydclyehyOJcWWrFntzX5eXf8spc+kc2nYDsBmZSBTy8FDIVy94ungc74qBYBvbvZHn9mV0VHm/f6Q87Iu7gkALt69y54LbZy3WQFIjo8LchaPQ7hrK2w3HunqpMFYxv5MLc23bRzrNiMVi+kVBAB+cjj47NpV5nx+AMoyMtAlyznWYw4XMrxY61+3+XXkHvW7jPw5LmBzuR7j3BgfB0CTkEDT7r1cHXNydmDgMd4iwrY+QFlbK8L0NL0HqshVKpfkbJQruHXwMK7ZWXa2NEcKF1nMv7DAhoZ67JNufq58iQ/y8kP87+Vu5srLr+D0etE11DPj80UU+8//2SK+KtlBVVYW/oUFvrcOUp6pJW7NGhptVl7r6iSaIDESU42LKEeDXKWST7cVkqdScV0Y493Ll/nt/mg0SwE8MRJTTTOBcWu10SYC3gcerLKQCzghAqxAHtBCYIJdSUw+ipsPDPwDT5xONBBJWh0AAAAASUVORK5CYII=")';
      el.style.backgroundSize = "18px 18px";
      el.style.backgroundPosition = "5px center";
      el.style.width = objCity.name.length <= 3 ? "80px" : "95px";
      el.style.height = "25px";
      el.style.paddingLeft = "30px";
      el.style.backgroundRepeat = "no-repeat";

      var elMarker = new SGMap.Marker({
        element: el,
        anchor: "top",
      })
        .setLngLat(objCity.center.split(","))
        .addTo(map);

      markCityListObj.push(elMarker);
    }
  },

  /**
   * description: 从layerListObj移除单个layer和resource
   * params: map
   *         layerListObj 图层id集合
   *         removeLayerName 待删除的图层id
   */
  removeSingleLayerList: function (map, layerListObj, removeLayerName) {
    removeLayerAndSource(map, removeLayerName);
    layerListObj =
      layerListObj &&
      layerListObj.filter((item) => {
        removeLayerName !== item;
      });
  },

  /* 遮罩中国(省市区) */
  drawBackgroundProCityCountyLayer: function (
    map,
    proFlag,
    cityFlag,
    countyFlag,
    opacity = 0.8,
    bgColor = "#001c2c"
  ) {
    map.addLayer({
      id: "choicePoi",
      type: "background",
      paint: {
        "background-color": bgColor,
        "background-opacity": opacity,
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

  /**
   * description:往地图上添加图片图层
   * params: map
   *         layerListObj 图层id集合
   *         layerName 图层的名称
   *         imgUrl 图层的资源
   *         coordinates 图层的位置
   */
  addImageLayer: function (map, layerListObj, layerName, imgUrl, coordinates) {
    map.addLayer({
      id: layerName, //图层名称
      type: "raster", //显示类型为栅格
      source: {
        type: "image", //数据源为类型为image
        url: imgUrl, //图像地址
        // coordinates: [
        //   [116.15, 35.3], //左上
        //   [122.17, 35.3], //右上
        //   [122.17, 30.6], //右下
        //   [116.15, 30.6], //左下
        // ],
        coordinates: coordinates,
      },
    });
    layerListObj.push(layerName);
  },

  /**
   * description:添加区域地名Marker点
   * params: bgShow 城市名是否有背景图片
   *
   */
  addCityNameMarker: function (map, mapData, areaLngLat, markCityListObj) {
    if (Object.keys(mapData).length == 0) return;
    for (let i in mapData) {
      let item = mapData[i];
      //画marker点
      var el = document.createElement("div");
      el.innerText = item.name;
      el.style.paddingTop = "10px";
      el.style.paddingRight = "10px";
      el.style.color = "#fff";
      el.style.borderRadius = "6px";
      el.style.lineHeight = "25px";
      el.style.opacity = 0.9;
      el.style.height = "25px";
      el.style.fontSize = "14px";

      var elMarker = new SGMap.Marker({
        element: el,
        anchor: "top",
      })
        .setLngLat(areaLngLat[item.code].lnglat)
        .addTo(map);
      markCityListObj.push(elMarker);
    }
  },

  /* 添加城市圆柱体数据 */
  createProDivDom: function (map, barCityListObj, cityAreaMetric) {
    if (map) {
      for (let item of cityAreaMetric) {
        //画marker点
        var el = document.createElement("div");
        el.className = "cylinder";
        var elBox = document.createElement("div");
        elBox.className = "el-box";
        var elBoxItemTop = document.createElement("div");
        elBoxItemTop.innerText = "top";
        elBoxItemTop.className = "el-box-item";
        var elBoxItemBottom = document.createElement("div");
        elBoxItemBottom.className = "el-box-item";
        elBoxItemBottom.style.flex = "0 0" + item?.percent + "%";
        elBoxItemTop.innerText = item?.value.toFixed(2);
        elBox.append(elBoxItemTop);
        elBox.append(elBoxItemBottom);
        el.append(elBox);

        var elMarker = new SGMap.Marker({
          element: el,
          anchor: "bottom",
        })
          .setLngLat(item.center)
          .setOffset([0, 0])
          .addTo(map);

        barCityListObj.push(elMarker);
      }
    }
  },

  /* 销毁省级地图上面的城市柱状图图层 */
  destroyCityMetric: function (barCityListObj) {
    // 移除城市柱状图
    for (let item of barCityListObj) {
      item.remove();
      item = undefined;
    }
    barCityListObj.length = 0;
    barCityListObj = [];
  },

  /* 销毁省地图上面数据 */
  destroyProvinceData: function (map, markCityListObj, barCityListObj) {
    // 移除城市柱状图
    for (let item of barCityListObj) {
      item.remove();
      item = undefined;
    }
    barCityListObj.length = 0;
    barCityListObj = [];
    // 移除城市名
    for (var i = 0, j = markCityListObj.length; i < j; i++) {
      markCityListObj[i].remove();
      markCityListObj[i] = undefined;
    }
    markCityListObj.length = 0;
    markCityListObj = [];

    // 删除13个城市面图层
    for (var i = 0; i < 13; i++) {
      map.off("mouseover", "power-polygon" + i, () => { });
      map.off("click", "power-polygon" + i, () => { });
      removeLayerAndSource(map, "power-polygon" + i);
    }

    removeLayerAndSource(map, "province-polygon");
    removeLayerAndSource(map, "province-polygon");
    removeLayerAndSource(map, "province-line");
    removeLayerAndSource(map, "city-polygon");
    removeLayerAndSource(map, "city-line");
    removeLayerAndSource(map, "county-polygon");
    removeLayerAndSource(map, "county-line");
    removeLayerAndSource(map, "choicePoi");
  },

  // 遮罩江苏省
  drawBackgroundLayer: function (map) {
    if (!map.getLayer("choicePoi")) {
      map.addLayer({
        id: "choicePoi",
        type: "background",
        paint: {
          "background-color": "#000000",
          "background-opacity": 0.85,
        },
      });
    }

    map.moveLayer(
      "choicePoi",
      "province-polygon",
      "province-line",
      "city-polygon",
      "city-line",
      "county-polygon",
      "county-line"
    );
  },

  removeLayer(map, id) {
    if (map.getLayer(id)) {
      // 先移除图层，再移除数据源
      map.removeLayer(id);
      map.removeSource(id);
    }
  },
};

const cityUtils = {
  /*  初始化市区 图层边界色 填充色，描边粗细 */
  initCityCountyLayer: function (map) {
    // 市：绿面、绿线
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
    // 区/县：黄面、黑线
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
        // "fill-color": "#f2f520",
        "fill-color": "#206bf5",
        // "fill-opacity": 0.7
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
  },

  /* 遮罩江苏省 */
  drawBackgroundLayer: function (map) {
    map.addLayer({
      id: "choicePoi",
      type: "background",
      paint: {
        "background-color": "#080e1a",
        "background-opacity": 0.9,
      },
    });

    map.moveLayer(
      "choicePoi",
      "city-polygon",
      "city-line",
      "county-polygon",
      "county-line"
    );
  },

  /* 填充 市,区 边线数据 */
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

    // var cityListPointConcat = [];
    // for (var i = 0, j = cityDistricts.sub_districts.length; i < j; i++) {
    //   cityListPointConcat.push.apply(
    //     cityListPointConcat,
    //     cityDistricts.sub_districts[i].shape.coordinates
    //   );
    // }

    // map.getSource("county-line").setData({
    //   type: "FeatureCollection",
    //   features: [
    //     {
    //       type: "Feature",
    //       geometry: {
    //         type: "MultiPolygon",
    //         coordinates: cityListPointConcat,
    //       },
    //     },
    //   ],
    // });
  },

  /* 添加城市圆柱体数据 */
  createCityDivDom: function (
    map,
    cityDistricts,
    markCountyListObj,
    cityAreaMetric
  ) {
    if (!cityDistricts) return;
    for (let i = 0, j = cityDistricts?.sub_districts?.length; i < j; i++) {
      const objCounty = cityDistricts.sub_districts[i];
      const objCityAreaMetric = cityAreaMetric.find((item) =>
        item.name.includes(objCounty.name.slice(0, 2))
      );
      //画marker点
      var el = document.createElement("div");
      el.className = "cylinder";
      var elBox = document.createElement("div");
      elBox.className = "el-box";
      var elBoxItemTop = document.createElement("div");
      elBoxItemTop.innerText = "top";
      elBoxItemTop.className = "el-box-item";
      var elBoxItemBottom = document.createElement("div");
      elBoxItemBottom.className = "el-box-item";
      elBoxItemBottom.style.flex = "0 0" + objCityAreaMetric?.percent + "%";
      elBoxItemTop.innerText = objCityAreaMetric?.value.toFixed(2);
      elBox.append(elBoxItemTop);
      elBox.append(elBoxItemBottom);
      el.append(elBox);

      var elMarker = new SGMap.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat(objCounty.newcenter)
        .setOffset([0, -15])
        .addTo(map);

      markCountyListObj.push(elMarker);
    }
  },

  /*  添加城市地名Marker点 */
  addCityMarker: function (map, cityDistricts, markCountyListObj) {
    for (var i = 0, j = cityDistricts.sub_districts.length; i < j; i++) {
      const objCounty = cityDistricts.sub_districts[i];
      //画marker点
      var el = document.createElement("div");
      el.innerText = objCounty.name;
      el.className = "marker marker2";
      el.style.color = "#ffffff";
      el.style.borderRadius = "6px";
      el.style.backgroundColor = "rgba(14,16,21,0.9)";
      el.style.lineHeight = "25px";
      el.style.opacity = 0.9;
      el.style.backgroundImage =
        'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVRIib2WXUybZRTHf3R0QluQSWsLpcIFzYR0WzFsYDc+ZGMr2ZYMhh9xYR/GyUzM9MLEuAsvTHTGRM1IE42bRBhLlPGVwaKwgnGaTBO3gWNltHOjNIOVF1lTSvlaixcdjc1oLQn4v3rfc/7P+b/nOed53hMjMdUAaIGTwA7gSVYObsAMnAAGY4FM4Hdg3QqKLCIRqABKAIMI+GSVhP6NJOAjEYGt+z9QKmJlaxQJstiomWIx5ZmZvLVJjy5ZzuCDCUx9fTTZrLjn5qKKESMx1SxEIhSq03gnJ4dd6RkATMzM0GW384JGg1IiAaDH4eBU7zXMw8MRxSJmJomN5Yd95QDUWSzUWvr5w+kM+vUKBUeydbyu01Gi0ZBRewZhenr5mUnFYpp376VArUZ95mtcs7MRP0qofpM+QcDY1hJ2W0VLGT82bOX+0WoK1Gre6DaHCOkVCnoPVGFISQ3avA8fcrirk00KBaNHq/m8sCh6sbdznsPp9VLU1Mi5WwMhvi+KitEmJXGquDjEft5mxdD4HUNuN9UbNkYvBlA3YAnWJ1UqoyBVzYfPG9iiVNFpHyL7qWRObt1GoTqNNJkMgD5B4HT/jXAhwzeIJDbgylel0L2/MmjvtA9R0dFO3U4jx/U5HNfnAGBsbeGXkXskrF0bVixsZiqJFICRKQ+jU1MAvHixg4qOdgAOdf3IngttQOA4ODyTj9ZJlifm9HrZolIBMDw5SfbZOq4LY3xZsj2Ed3p7KZaJv8mq/5YhtxuAXKUSz/wyurHbMUxGYmLwfc7no/3OHeTx8aQnJFKp1aKWyUiRSrlkt+OZnw9ydclyehyOJcWWrFntzX5eXf8spc+kc2nYDsBmZSBTy8FDIVy94ungc74qBYBvbvZHn9mV0VHm/f6Q87Iu7gkALt69y54LbZy3WQFIjo8LchaPQ7hrK2w3HunqpMFYxv5MLc23bRzrNiMVi+kVBAB+cjj47NpV5nx+AMoyMtAlyznWYw4XMrxY61+3+XXkHvW7jPw5LmBzuR7j3BgfB0CTkEDT7r1cHXNydmDgMd4iwrY+QFlbK8L0NL0HqshVKpfkbJQruHXwMK7ZWXa2NEcKF1nMv7DAhoZ67JNufq58iQ/y8kP87+Vu5srLr+D0etE11DPj80UU+8//2SK+KtlBVVYW/oUFvrcOUp6pJW7NGhptVl7r6iSaIDESU42LKEeDXKWST7cVkqdScV0Y493Ll/nt/mg0SwE8MRJTTTOBcWu10SYC3gcerLKQCzghAqxAHtBCYIJdSUw+ipsPDPwDT5xONBBJWh0AAAAASUVORK5CYII=")';
      // 'url("https://map.sgcc.com.cn/products/js-sdk/v3/assets/images/markers_new2_4ab0bc5_78.png")';
      el.style.backgroundSize = "18px 18px";
      el.style.backgroundPosition = "5px center";
      // el.style.width = objCounty.name.length <= 3 ? "45px" : '55px';
      // el.style.width =  '85px';
      el.style.height = "25px";
      el.style.paddingLeft = "30px";
      // el.style.paddingRight = '10px'
      el.style.backgroundRepeat = "no-repeat";

      var elMarker = new SGMap.Marker({
        element: el,
        // anchor: "top"
      })
        .setLngLat(objCounty.newcenter)
        .addTo(map);

      markCountyListObj.push(elMarker);
    }
  },
  /*  添加城市地名Marker点 */
  addCityMarkerNoName: function (map, cityDistricts, markCountyListObj) {
    for (var i = 0, j = cityDistricts.sub_districts.length; i < j; i++) {
      const objCounty = cityDistricts.sub_districts[i];
      //画marker点
      var el = document.createElement("div");
      el.innerText = objCounty.name;
      el.className = "marker marker2";
      el.style.color = "#ffffff";
      el.style.borderRadius = "6px";
      el.style.backgroundColor = "rgba(14,16,21,0.9)";
      el.style.lineHeight = "25px";
      el.style.opacity = 0.9;
      el.style.backgroundImage =
        'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVRIib2WXUybZRTHf3R0QluQSWsLpcIFzYR0WzFsYDc+ZGMr2ZYMhh9xYR/GyUzM9MLEuAsvTHTGRM1IE42bRBhLlPGVwaKwgnGaTBO3gWNltHOjNIOVF1lTSvlaixcdjc1oLQn4v3rfc/7P+b/nOed53hMjMdUAaIGTwA7gSVYObsAMnAAGY4FM4Hdg3QqKLCIRqABKAIMI+GSVhP6NJOAjEYGt+z9QKmJlaxQJstiomWIx5ZmZvLVJjy5ZzuCDCUx9fTTZrLjn5qKKESMx1SxEIhSq03gnJ4dd6RkATMzM0GW384JGg1IiAaDH4eBU7zXMw8MRxSJmJomN5Yd95QDUWSzUWvr5w+kM+vUKBUeydbyu01Gi0ZBRewZhenr5mUnFYpp376VArUZ95mtcs7MRP0qofpM+QcDY1hJ2W0VLGT82bOX+0WoK1Gre6DaHCOkVCnoPVGFISQ3avA8fcrirk00KBaNHq/m8sCh6sbdznsPp9VLU1Mi5WwMhvi+KitEmJXGquDjEft5mxdD4HUNuN9UbNkYvBlA3YAnWJ1UqoyBVzYfPG9iiVNFpHyL7qWRObt1GoTqNNJkMgD5B4HT/jXAhwzeIJDbgylel0L2/MmjvtA9R0dFO3U4jx/U5HNfnAGBsbeGXkXskrF0bVixsZiqJFICRKQ+jU1MAvHixg4qOdgAOdf3IngttQOA4ODyTj9ZJlifm9HrZolIBMDw5SfbZOq4LY3xZsj2Ed3p7KZaJv8mq/5YhtxuAXKUSz/wyurHbMUxGYmLwfc7no/3OHeTx8aQnJFKp1aKWyUiRSrlkt+OZnw9ydclyehyOJcWWrFntzX5eXf8spc+kc2nYDsBmZSBTy8FDIVy94ungc74qBYBvbvZHn9mV0VHm/f6Q87Iu7gkALt69y54LbZy3WQFIjo8LchaPQ7hrK2w3HunqpMFYxv5MLc23bRzrNiMVi+kVBAB+cjj47NpV5nx+AMoyMtAlyznWYw4XMrxY61+3+XXkHvW7jPw5LmBzuR7j3BgfB0CTkEDT7r1cHXNydmDgMd4iwrY+QFlbK8L0NL0HqshVKpfkbJQruHXwMK7ZWXa2NEcKF1nMv7DAhoZ67JNufq58iQ/y8kP87+Vu5srLr+D0etE11DPj80UU+8//2SK+KtlBVVYW/oUFvrcOUp6pJW7NGhptVl7r6iSaIDESU42LKEeDXKWST7cVkqdScV0Y493Ll/nt/mg0SwE8MRJTTTOBcWu10SYC3gcerLKQCzghAqxAHtBCYIJdSUw+ipsPDPwDT5xONBBJWh0AAAAASUVORK5CYII=")';
      // 'url("https://map.sgcc.com.cn/products/js-sdk/v3/assets/images/markers_new2_4ab0bc5_78.png")';
      el.style.backgroundSize = "18px 18px";
      el.style.backgroundPosition = "5px center";
      // el.style.width = objCounty.name.length <= 3 ? "45px" : '55px';
      // el.style.width =  '85px';
      el.style.height = "25px";
      el.style.paddingLeft = "30px";
      // el.style.paddingRight = '10px'
      el.style.backgroundRepeat = "no-repeat";

      var elMarker = new SGMap.Marker({
        element: el,
        // anchor: "top"
      })
        .setLngLat(objCounty.newcenter)
        .addTo(map);

      markCountyListObj.push(elMarker);
    }
  },

  /* 给每个城市添加颜色遮罩 鼠标移到上面时变色，和点击事件 */
  addCountyFill: function (map, cityDistricts, initCountyMap) {
    var countyMarkData = [];
    for (let i = 0, j = cityDistricts.sub_districts.length; i < j; i++) {
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
                  // 对应上面设置的{name}
                  name: countyObj.name,
                  center: countyObj.center,
                  code: countyObj.code,
                  zoom: countyObj.zoom,
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

      // map.on("mouseover", "power-polygon-county" + i, function (e) {
      //   var features = e.features;
      //   map.setPaintProperty(features[0].layer.id, "fill-color", "#206bf5");
      //   map.on("mouseleave", "power-polygon-county" + i, function (e) {
      //     if (map.getLayer("power-polygon-county" + i)) {
      //       map.setPaintProperty(
      //         "power-polygon-county" + i,
      //         "fill-color",
      //         "#034c8a"
      //       );
      //     }
      //   });
      // });

      map.on("click", "power-polygon-county" + i, (e) => {
        var features = e.features;
        initCountyMap(features[0]);
      });
    }
  },

  /* 销毁区上面的，柱状图图层 */
  destroyCountyMetric: function (markCountyListObj, len) {
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

  /* 销毁市级地图上面数据 */
  destroyCityData: function (map, markCountyListObj, countyCount) {
    // 移除城市各区名
    for (var i = 0, j = markCountyListObj.length; i < j; i++) {
      markCountyListObj[i].remove();
      markCountyListObj[i] = undefined;
    }
    markCountyListObj.length = 0;
    markCountyListObj = [];

    // 删除城市每个区面图层
    for (var i = 0; i < countyCount; i++) {
      map.off("mouseover", "power-polygon-county" + i, () => { });
      map.off("click", "power-polygon-county" + i, () => { });
      removeLayerAndSource(map, "power-polygon-county" + i);
    }

    // 移除省 城市边红和 填充色
    removeLayerAndSource(map, "city-polygon");
    removeLayerAndSource(map, "city-line");
    removeLayerAndSource(map, "county-polygon");
    removeLayerAndSource(map, "county-line");
    removeLayerAndSource(map, "choicePoi");
  },
};

const countyUtils = {
  /* 存储区县上面的marker点（1个名称+n个项目点） */
  pointMarker: [],
  /* 初始化省市区 图层边界色 填充色，描边粗细 */
  initCountyLayer: function (map) {
    // 区/县：黄面、黑线
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
  },

  /* 遮罩江苏省 */
  drawBackgroundLayer: function (map) {
    map.addLayer({
      id: "choicePoi",
      type: "background",
      paint: {
        "background-color": "#06111f",
        "background-opacity": 0.85,
      },
    });
    map.moveLayer("choicePoi", "county-polygon", "county-line");
  },

  /* 填充 市,区 边线数据 */
  countyDataFill: function (map, coordinates) {
    map.getSource("county-polygon").setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "MultiPolygon",
            coordinates: coordinates,
          },
        },
      ],
    });

    map.getSource("county-line").setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "MultiPolygon",
            coordinates: coordinates,
          },
        },
      ],
    });
  },

  /* 添加城市地名Marker点 */
  addCountyMarker: function (map, features) {
    //画marker点
    var el = document.createElement("div");
    el.innerText = features.name;
    el.className = "marker";
    el.style.color = "#ffffff";
    el.style.borderRadius = "6px";
    el.style.backgroundColor = "rgba(14,16,21,0.9)";
    el.style.lineHeight = "25px";
    el.style.opacity = 0.9;
    el.style.backgroundImage =
      'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVRIib2WXUybZRTHf3R0QluQSWsLpcIFzYR0WzFsYDc+ZGMr2ZYMhh9xYR/GyUzM9MLEuAsvTHTGRM1IE42bRBhLlPGVwaKwgnGaTBO3gWNltHOjNIOVF1lTSvlaixcdjc1oLQn4v3rfc/7P+b/nOed53hMjMdUAaIGTwA7gSVYObsAMnAAGY4FM4Hdg3QqKLCIRqABKAIMI+GSVhP6NJOAjEYGt+z9QKmJlaxQJstiomWIx5ZmZvLVJjy5ZzuCDCUx9fTTZrLjn5qKKESMx1SxEIhSq03gnJ4dd6RkATMzM0GW384JGg1IiAaDH4eBU7zXMw8MRxSJmJomN5Yd95QDUWSzUWvr5w+kM+vUKBUeydbyu01Gi0ZBRewZhenr5mUnFYpp376VArUZ95mtcs7MRP0qofpM+QcDY1hJ2W0VLGT82bOX+0WoK1Gre6DaHCOkVCnoPVGFISQ3avA8fcrirk00KBaNHq/m8sCh6sbdznsPp9VLU1Mi5WwMhvi+KitEmJXGquDjEft5mxdD4HUNuN9UbNkYvBlA3YAnWJ1UqoyBVzYfPG9iiVNFpHyL7qWRObt1GoTqNNJkMgD5B4HT/jXAhwzeIJDbgylel0L2/MmjvtA9R0dFO3U4jx/U5HNfnAGBsbeGXkXskrF0bVixsZiqJFICRKQ+jU1MAvHixg4qOdgAOdf3IngttQOA4ODyTj9ZJlifm9HrZolIBMDw5SfbZOq4LY3xZsj2Ed3p7KZaJv8mq/5YhtxuAXKUSz/wyurHbMUxGYmLwfc7no/3OHeTx8aQnJFKp1aKWyUiRSrlkt+OZnw9ydclyehyOJcWWrFntzX5eXf8spc+kc2nYDsBmZSBTy8FDIVy94ungc74qBYBvbvZHn9mV0VHm/f6Q87Iu7gkALt69y54LbZy3WQFIjo8LchaPQ7hrK2w3HunqpMFYxv5MLc23bRzrNiMVi+kVBAB+cjj47NpV5nx+AMoyMtAlyznWYw4XMrxY61+3+XXkHvW7jPw5LmBzuR7j3BgfB0CTkEDT7r1cHXNydmDgMd4iwrY+QFlbK8L0NL0HqshVKpfkbJQruHXwMK7ZWXa2NEcKF1nMv7DAhoZ67JNufq58iQ/y8kP87+Vu5srLr+D0etE11DPj80UU+8//2SK+KtlBVVYW/oUFvrcOUp6pJW7NGhptVl7r6iSaIDESU42LKEeDXKWST7cVkqdScV0Y493Ll/nt/mg0SwE8MRJTTTOBcWu10SYC3gcerLKQCzghAqxAHtBCYIJdSUw+ipsPDPwDT5xONBBJWh0AAAAASUVORK5CYII=")';
    // 'url("https://map.sgcc.com.cn/products/js-sdk/v3/assets/images/markers_new2_4ab0bc5_78.png")';
    el.style.backgroundSize = "18px 18px";
    el.style.backgroundPosition = "5px center";
    // el.style.width = features.name.length <= 3 ? "45px" : '55px';
    el.style.height = "25px";
    el.style.paddingLeft = "30px";
    el.style.backgroundRepeat = "no-repeat";

    countyUtils.elMarker = new SGMap.Marker({
      element: el,
      // anchor: "top"
    })
      .setLngLat(features.newcenter)
      .addTo(map);
  },

  /* 添加区里的项目marker点 */
  addPointMarker: function (map, pointArry) {
    var pointMarkers = pointArry;
    for (let i = 0, j = pointMarkers.length; i < j; i++) {
      var pointMarker = pointMarkers[i];
      //画marker点
      var el = document.createElement("div");
      el.className = "countyMarkerPoints";
      el.innerHTML = `<div class='countyMarkerPoints' onclick='handleClickPoint("${pointMarker.title}","${pointMarker.center}")'>
                        <div class='county-marker-pointsIcon'>
                          <div class='county-marker-points-content'>${pointMarker.title}</div>
                        </div>
                      </div>`;
      var elMarker = new SGMap.Marker({
        element: el,
        // anchor: "bottom"
      })
        .setLngLat(pointMarker.center)
        .setOffset([0, -15])
        .addTo(map);
      countyUtils.pointMarker.push(elMarker);
    }
  },

  /* 销毁点坐标 */
  destoryPointMarker: function () {
    for (let item of countyUtils.pointMarker) {
      item.remove();
      item = undefined;
    }
  },

  /* 销毁区县地图上面数据 */
  destroyCountyData: function (map, popupDOM) {
    // 移除弹框
    popupDOM.remove();
    // 移除 区名
    if (countyUtils.elMarker) {
      countyUtils.elMarker.remove();
      countyUtils.elMarker = undefined;
    }
    // 移除点击事件
    // map.off("click", "county-polygon", pointClick)

    // 移除区上面的打点
    countyUtils.pointMarker.forEach((marker) => {
      marker.remove();
      marker = undefined;
    });

    // 移除省 城市边红和 填充色
    removeLayerAndSource(map, "city-line");
    removeLayerAndSource(map, "county-polygon");
    removeLayerAndSource(map, "county-line");
    removeLayerAndSource(map, "choicePoi");
  },
};

// 修正每个城市区名打点位置
const countyCenterFixed = {
  320500: {
    // 苏州
    320582: [120.655821, 31.85], // 张家港市
    320505: [120.373456, 31.335301], // 虎丘区
    320581: [120.8, 31.653584], // 常熟市
    320507: [120.642566, 31.439044], // 相城区
    320508: [120.3, 31.1], // 姑苏区
    320509: [120.645126, 30.95], // 吴江区
    320585: [121.13055, 31.537735], // 太仓市
    320506: [120.331978, 31.162791], // 吴中区
    320583: [120.98115, 31.284913], // 昆山市
    320571: [120.726279, 31.320789], // 苏州工业园区（有些版本sg有）
    countyConcat: {
      newAdcode: "320508",
      name: "苏州市区",
      center: [120.331978, 31.162791],
      districtsList: ["320508", "320507", "320506", "320505", "320571"],
    },
  },
  321200: {
    // 泰州
    321202: [119.96424, 32.321016], // 海陵区
    321204: [120.147934, 32.45], // 姜堰区
    321203: [119.881717, 32.318821], // 高港区
    321282: [120.277138, 32.022751], // 靖江市
    321281: [120.00254, 32.85], // 兴化市
    321283: [120.151743, 32.171853], // 泰兴市
    countyConcat: {
      newAdcode: "321202",
      name: "泰州市区",
      center: [119.96424, 32.321016],
      districtsList: ["321202", "321203"],
    },
  },
  321000: {
    // 扬州
    321081: [119.184766, 32.372258], // 仪征市
    321084: [119.5, 32.781659], // 高邮市
    321003: [119.498015, 32.327528], // 邗江区
    321023: [119.460729, 33.15], // 宝应县
    321012: [119.669989, 32.484672], // 江都区
    321002: [119.431849, 32.39472], // 广陵区
    countyConcat: {
      newAdcode: "321002",
      name: "扬州市区",
      center: [119.398015, 32.377528],
      districtsList: ["321002", "321003"],
    },
  },
  320100: {
    // 南京市
    320111: [118.528071, 32.058928], // 浦口区
    320114: [118.678901, 31.892322], // 雨花台区
    320104: [118.794778, 32.038989], // 秦淮区
    320105: [118.731688, 32.003369], // 建邺区
    320117: [119.028295, 31.551125], // 溧水区
    320106: [118.76979, 32.066335], // 鼓楼区
    320115: [118.839685, 31.853702], // 江宁区
    320116: [118.821401, 32.322247], // 六合区
    320118: [118.992402, 31.25], // 高淳区
    320102: [118.797858, 32.048628], // 玄武区
    320113: [118.998493, 32.156168], // 栖霞区
    countyConcat: {
      newAdcode: "320106",
      name: "南京市区",
      center: [118.998493, 32.156168],
      districtsList: [
        "320106",
        "320113",
        "320114",
        "320104",
        "320105",
        "320102",
        "320111",
      ],
    },
  },
  321100: {
    // 镇江
    321181: [119.606535, 31.9], // 丹阳市
    321111: [119.411944, 32.195332], // 润州区
    321102: [119.47016, 32.19828], // 京口区
    321182: [119.85, 32.15], // 扬中市
    321112: [119.5, 32.131962], // 丹徒区
    321183: [119.2, 31.85], // 句容市
    countyConcat: {
      newAdcode: "321112",
      name: "镇江市区",
      center: [119.433853, 32.131962],
      districtsList: ["321112", "321111", "321102"],
    },
  },
  321300: {
    // 宿迁市
    321323: [118.703037, 33.72314], // 泗阳县
    321311: [118.330782, 33.85], // 宿豫区
    321324: [118.3, 33.45], // 泗洪县
    321322: [118.804784, 34.111022], // 沭阳县
    321302: [118.242533, 33.963029], // 宿城区
    countyConcat: {
      newAdcode: "321311",
      name: "宿迁市区",
      center: [118.242533, 33.963029],
      districtsList: ["321311", "321302"],
    },
  },
  320300: {
    // 徐州市
    320302: [117.4, 34.35], // 鼓楼区
    320305: [117.453583, 34.443013], // 贾汪区
    320381: [118.354537, 34.25], // 新沂市
    320382: [117.92, 34.338888], // 邳州市
    320312: [117.07, 34.18026], // 铜山区
    320324: [117.941563, 33.912597], // 睢宁县
    320321: [116.54, 34.693906], // 丰县
    320303: [117.251469, 34.253164], // 云龙区
    320311: [117.193805, 34.244258], // 泉山区
    320322: [116.9, 34.721656], // 沛县
    countyConcat: {
      newAdcode: "320302",
      name: "徐州市区",
      center: [117.185591, 34.288511],
      districtsList: ["320302", "320305", "320303", "320311"],
    },
  },
  320600: {
    // 南通市
    320685: [120.467343, 32.533573], // 海安市
    99320600: [121.594801, 32.215639], // 海域
    320602: [120.861027, 31.95], // 崇川区
    320612: [121.075056, 32.12], // 通州区
    320682: [120.574945, 32.25], // 如皋市
    320623: [121.151, 32.4], // 如东县
    320681: [121.657537, 31.808043], // 启东市
    320684: [121.28, 31.94], // 海门区
    countyConcat: {
      newAdcode: "320602",
      name: "南通市区",
      center: [120.861027, 32.006985],
      districtsList: ["320602"],
    },
  },
  320900: {
    // 盐城市
    320904: [120.55, 33.1], // 大丰区
    99320900: [120.628941, 33.629202], // 海域
    320925: [119.82, 33.464177], // 建湖县
    320924: [120.258053, 33.774805], // 射阳县
    320903: [120.155036, 33.337722], // 盐都区
    320902: [120.197358, 33.390536], // 亭湖区
    320923: [119.75, 33.7], // 阜宁县
    320921: [119.75, 34.199479], // 响水县
    320981: [120.5, 32.75], // 东台市
    320922: [119.95, 34], // 滨海县
    countyConcat: {
      newAdcode: "320903",
      name: "盐城市区",
      center: [120.155036, 33.337722],
      districtsList: ["320903", "320902"],
    },
  },
  320200: {
    // 无锡市
    320205: [120.357866, 31.589717], // 锡山区
    320206: [120.298499, 31.681012], // 惠山区
    320282: [119.823407, 31.340637], // 宜兴市
    320214: [120.359123, 31.551626], // 新吴区
    320211: [120.282692, 31.527954], // 滨湖区
    320213: [120.299073, 31.575967], // 梁溪区
    320281: [120.32008, 31.81314], // 江阴市
    countyConcat: {
      newAdcode: "320205",
      name: "无锡市区",
      center: [120.357866, 31.589717],
      districtsList: ["320205", "320206", "320214", "320211", "320213"],
    },
  },
  320400: {
    // 常州市
    320411: [119.9715, 31.830187], // 新北区
    320412: [119.942474, 31.701235], // 武进区
    320404: [119.90177, 31.802157], // 钟楼区
    320413: [119.5, 31.723247], // 金坛区
    320481: [119.38, 31.416911], // 溧阳市
    320402: [119.974677, 31.65], // 天宁区
    countyConcat: {
      newAdcode: "320402",
      name: "常州市区",
      center: [119.9715, 31.830187],
      districtsList: ["320402", "320411", "320412", "320404"],
    },
  },
  320800: {
    // 淮安市
    320812: [119.008062, 33.5], // 清江浦区
    320804: [118.9, 33.631893], // 淮阴区
    320813: [118.873138, 33.2], // 洪泽区
    320803: [119.33, 33.502869], // 淮安区
    320830: [118.54436, 32.9], // 盱眙县
    320826: [119.260335, 33.85], // 涟水县
    320831: [119.13, 32.95], // 金湖县
    countyConcat: {
      newAdcode: "320812",
      name: "淮安市区",
      center: [119.008062, 33.599504],
      districtsList: ["320812"],
    },
  },
  320700: {
    // 连云港市
    320723: [119.3, 34.284381], // 灌云县
    320722: [118.752842, 34.542308], // 东海县
    99320700: [119.448782, 34.773274], // 海域
    320703: [119.372778, 34.752815], // 连云区
    320724: [119.36, 34.087134], // 灌南县
    320706: [119.3, 34.572292], // 海州区
    320707: [119.05, 34.841348], // 赣榆区
    countyConcat: {
      newAdcode: "320706",
      name: "连云港市区",
      center: [119.163575, 34.572292],
      districtsList: ["320706", "320703"],
    },
  },

  init: function (cityDistricts) {
    var suzhouCountyLngLat = countyCenterFixed[cityDistricts.adcode];
    cityDistricts.sub_districts = cityDistricts.sub_districts.filter(
      (item) => item.name !== "海域"
    );
    cityDistricts.sub_districts.forEach((item) => {
      item.newcenter =
        suzhouCountyLngLat !== undefined
          ? suzhouCountyLngLat[item.adcode]
          : item.center.split(",");
    });

    // 是不是有需要合并的区
    if (suzhouCountyLngLat !== undefined && suzhouCountyLngLat.countyConcat) {
      var coordinates = [];

      cityDistricts.sub_districts.forEach((item) => {
        if (
          suzhouCountyLngLat.countyConcat.districtsList.includes(item.adcode)
        ) {
          item.shape.coordinates.forEach((itemChild) =>
            coordinates.push(itemChild)
          );
        }
      });
      var deleteCounty = suzhouCountyLngLat.countyConcat.districtsList.slice(1);
      cityDistricts.sub_districts = cityDistricts.sub_districts.filter(
        (item) => !deleteCounty.includes(item.adcode)
      );
      var o = cityDistricts.sub_districts.find(
        (item) =>
          item.adcode === suzhouCountyLngLat.countyConcat.districtsList[0]
      );

      if (o) {
        o.name = suzhouCountyLngLat.countyConcat.name;
        o.shape.coordinates = coordinates;
      }
    }
  },
};

const cityPropertyInitData = {
  // 苏州 来自于下拉框选择的城市值，显示城市地图
  dc_city_sz: {
    properties: {
      name: "苏州市",
      center: "120.726279,31.2",
      code: "320500",
    },
  },
  dc_city_tz: {
    properties: {
      name: "泰州市",
      center: "120,32.509155",
      code: "321200",
    },
  },
  dc_city_yz: {
    properties: {
      name: "扬州市",
      center: "119.49,32.694210",
      code: "321000",
    },
  },
  dc_city_nj: {
    properties: {
      name: "南京市",
      center: "118.72,31.8",
      code: "320100",
    },
  },
  dc_city_zj: {
    properties: {
      name: "镇江市",
      center: "119.5,31.95",
      code: "321100",
    },
  },
  dc_city_sq: {
    properties: {
      name: "宿迁市",
      center: "118.5,33.763232",
      code: "321300",
    },
  },
  dc_city_xz: {
    properties: {
      name: "徐州市",
      center: "117.55,34.15",
      code: "320300",
    },
  },
  dc_city_nt: {
    properties: {
      name: "南通市",
      center: "120.994291,32.15",
      code: "320600",
    },
  },
  dc_city_yc: {
    properties: {
      name: "盐城市",
      center: "120.163561,33.5",
      code: "320900",
    },
  },
  dc_city_wx: {
    properties: {
      name: "无锡市",
      center: "120.111910,31.4",
      code: "320200",
    },
  },
  dc_city_cz: {
    properties: {
      name: "常州市",
      center: "119.52, 31.55",
      code: "320400",
    },
  },
  dc_city_ha: {
    properties: {
      name: "淮安市",
      center: "119.015285,33.310353",
      code: "320800",
    },
  },
  dc_city_lyg: {
    properties: {
      name: "连云港市",
      center: "119.221611,34.45",
      code: "320700",
    },
  },
};

export {
  mapInitFn,
  mapUtils,
  proUtils,
  cityUtils,
  countyUtils,
  countyCenterFixed,
  cityPropertyInitData,
};
