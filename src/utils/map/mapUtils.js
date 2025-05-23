import cityList, { provinceFeatures } from "/@/hooks/map/mapData/index.js"

const proUtils = {
  // 数组合并成一纬度
  // arr 2纬度  [[1,2],[3,4]] = [1,2,3,4]
  arrayConcat: function (arr) {
    var newArr = [];
    for (var i = 0, j = arr.length; i < j; i++) {
      newArr.push.apply(newArr, arr[i][0])
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
          features: []
        }
      },
      paint: {
        "fill-color": "#206bf5",
        "fill-opacity": 0.3
      }
    });
    map.addLayer({
      id: "province-line",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      },
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 3
      }
    });
    // 市：绿面、绿线
    map.addLayer({
      id: "city-polygon",
      type: "fill",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      },
      paint: {
        "fill-color": "#206bf5",
        "fill-opacity": 0.3
      }
    });
    map.addLayer({
      id: "city-line",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 2
      }
    });
    // 区/县：黄面、黑线
    map.addLayer({
      id: "county-polygon",
      type: "fill",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      },
      paint: {
        "fill-color": "#f2f520",
        "fill-opacity": 0.7
      }
    });
    map.addLayer({
      id: "county-line",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      },
      paint: {
        "line-color": "#888a01",
        "line-width": 3
      }
    });
  },

  /* 填充 省,市边数据 */
  provinceCityDataFill: function (map) {
    map.getSource("province-line").setData({
      type: "FeatureCollection",
      features: provinceFeatures
    });

    var cityListPointConcat = []
    for (var i = 0, j = cityList.length; i < j; i++) {
      cityListPointConcat.push.apply(cityListPointConcat, cityList[i].dataList[0].geometry.coordinates)
    }

    map.getSource("city-line").setData({
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: cityListPointConcat
        }
      }]
    });
  },

  /* 给每个城市添加颜色遮罩 鼠标移到上面时变色，和点击事件 */
  addCityFill: function (map, initCityMap) {
    var cityMarkData = []
    for (let i = 0, j = cityList.length; i < j; i++) {
      var cityObj = cityList[i].dataList[0]
      cityMarkData = proUtils.arrayConcat(cityList[i].dataList[0].geometry.coordinates)

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
                  coordinates: [
                    cityMarkData
                  ],
                },
                properties: {
                  // 对应上面设置的{name}
                  name: cityObj.name,
                  center: cityObj.center.join(','),
                  code: cityObj.code,
                  zoom: cityObj.zoom,
                  cityCode: cityObj.cityCode,
                }
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
        map.setPaintProperty(features[0].layer.id, "fill-color", '#206bf5');
        map.on('mouseleave', "power-polygon" + i, function (e) {
          if (map.getLayer("power-polygon" + i)) {
            map.setPaintProperty("power-polygon" + i, "fill-color", '#034c8a');
          }
        })
      });


      map.on("click", "power-polygon" + i, function (e) {
        var features = e.features;
        initCityMap(features[0])
      });
    }
  },

  /* 添加城市地名Marker点 */
  addCityMarker: function (map, markCityListObj) {
    for (let item in cityPropertyInitData) {
      const objCity = cityPropertyInitData[item].properties
      //画marker点
      var el = document.createElement("div");
      el.innerText = objCity.name;
      el.className = "marker";
      el.style.color = '#ffffff';
      el.style.borderRadius = '6px';
      // el.style.backgroundColor = '#0e1015';
      el.style.backgroundColor = 'rgba(14,16,21,0.9)';
      el.style.lineHeight = "25px";
      el.style.opacity = 0.9
      el.style.backgroundImage =
        'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVRIib2WXUybZRTHf3R0QluQSWsLpcIFzYR0WzFsYDc+ZGMr2ZYMhh9xYR/GyUzM9MLEuAsvTHTGRM1IE42bRBhLlPGVwaKwgnGaTBO3gWNltHOjNIOVF1lTSvlaixcdjc1oLQn4v3rfc/7P+b/nOed53hMjMdUAaIGTwA7gSVYObsAMnAAGY4FM4Hdg3QqKLCIRqABKAIMI+GSVhP6NJOAjEYGt+z9QKmJlaxQJstiomWIx5ZmZvLVJjy5ZzuCDCUx9fTTZrLjn5qKKESMx1SxEIhSq03gnJ4dd6RkATMzM0GW384JGg1IiAaDH4eBU7zXMw8MRxSJmJomN5Yd95QDUWSzUWvr5w+kM+vUKBUeydbyu01Gi0ZBRewZhenr5mUnFYpp376VArUZ95mtcs7MRP0qofpM+QcDY1hJ2W0VLGT82bOX+0WoK1Gre6DaHCOkVCnoPVGFISQ3avA8fcrirk00KBaNHq/m8sCh6sbdznsPp9VLU1Mi5WwMhvi+KitEmJXGquDjEft5mxdD4HUNuN9UbNkYvBlA3YAnWJ1UqoyBVzYfPG9iiVNFpHyL7qWRObt1GoTqNNJkMgD5B4HT/jXAhwzeIJDbgylel0L2/MmjvtA9R0dFO3U4jx/U5HNfnAGBsbeGXkXskrF0bVixsZiqJFICRKQ+jU1MAvHixg4qOdgAOdf3IngttQOA4ODyTj9ZJlifm9HrZolIBMDw5SfbZOq4LY3xZsj2Ed3p7KZaJv8mq/5YhtxuAXKUSz/wyurHbMUxGYmLwfc7no/3OHeTx8aQnJFKp1aKWyUiRSrlkt+OZnw9ydclyehyOJcWWrFntzX5eXf8spc+kc2nYDsBmZSBTy8FDIVy94ungc74qBYBvbvZHn9mV0VHm/f6Q87Iu7gkALt69y54LbZy3WQFIjo8LchaPQ7hrK2w3HunqpMFYxv5MLc23bRzrNiMVi+kVBAB+cjj47NpV5nx+AMoyMtAlyznWYw4XMrxY61+3+XXkHvW7jPw5LmBzuR7j3BgfB0CTkEDT7r1cHXNydmDgMd4iwrY+QFlbK8L0NL0HqshVKpfkbJQruHXwMK7ZWXa2NEcKF1nMv7DAhoZ67JNufq58iQ/y8kP87+Vu5srLr+D0etE11DPj80UU+8//2SK+KtlBVVYW/oUFvrcOUp6pJW7NGhptVl7r6iSaIDESU42LKEeDXKWST7cVkqdScV0Y493Ll/nt/mg0SwE8MRJTTTOBcWu10SYC3gcerLKQCzghAqxAHtBCYIJdSUw+ipsPDPwDT5xONBBJWh0AAAAASUVORK5CYII=")';
      el.style.backgroundSize = '18px 18px'
      el.style.backgroundPosition = '5px center'
      el.style.width = objCity.name.length <= 3 ? "80px" : '95px';
      el.style.height = "25px";
      el.style.paddingLeft = '30px'
      el.style.backgroundRepeat = 'no-repeat';

      var elMarker = new SGMap.Marker({
        element: el,
        anchor: "top"
      })
        .setLngLat(objCity.center.split(','))
        .addTo(map);

      markCityListObj.push(elMarker)
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
        elBoxItemTop.innerText = 'top'
        elBoxItemTop.className = "el-box-item";
        var elBoxItemBottom = document.createElement("div");
        elBoxItemBottom.className = "el-box-item";
        elBoxItemBottom.style.flex = '0 0' + item?.percent + '%'
        elBoxItemTop.innerText = item?.value.toFixed(2)
        elBox.append(elBoxItemTop)
        elBox.append(elBoxItemBottom)
        el.append(elBox)

        var elMarker = new SGMap.Marker({
          element: el,
          anchor: "bottom"
        })
          .setLngLat(item.center)
          .setOffset([0, 0])
          .addTo(map);

        barCityListObj.push(elMarker)
      }
    }
  },

  /* 销毁省级地图上面的城市柱状图图层 */
  destroyCityMetric: function (barCityListObj) {
    // 移除城市柱状图
    for (let item of barCityListObj) {
      item.remove()
      item = undefined
    }
    barCityListObj.length = 0
    barCityListObj = []
  },

  /* 销毁省地图上面数据 */
  destroyProvinceData: function (map, markCityListObj, barCityListObj) {
    // 移除城市柱状图
    for (let item of barCityListObj) {
      item.remove()
      item = undefined
    }
    barCityListObj.length = 0
    barCityListObj = []
    // 移除城市名
    for (var i = 0, j = markCityListObj.length; i < j; i++) {
      markCityListObj[i].remove()
      markCityListObj[i] = undefined
    }
    markCityListObj.length = 0
    markCityListObj = []

    // 删除13个城市面图层
    for (var i = 0; i < 13; i++) {
      map.off("mouseover", "power-polygon" + i, () => { });
      map.off("click", "power-polygon" + i, () => { });
      if (map.getLayer("power-polygon" + i)) {
        // 先移除图层，再移除数据源
        map.removeLayer("power-polygon" + i);
        map.removeSource("power-polygon" + i);
      }
    }

    proUtils.removeLayer(map, 'province-polygon')
    proUtils.removeLayer(map, 'province-polygon')
    proUtils.removeLayer(map, 'province-line')
    proUtils.removeLayer(map, 'city-polygon')
    proUtils.removeLayer(map, 'city-line')
    proUtils.removeLayer(map, 'county-polygon')
    proUtils.removeLayer(map, 'county-line')
    proUtils.removeLayer(map, 'choicePoi')
  },

  // 遮罩江苏省
  drawBackgroundLayer: function (map) {
    if (!map.getLayer('choicePoi')) {
      map.addLayer({
        id: "choicePoi",
        type: "background",
        paint: {
          "background-color": "#000000",
          "background-opacity": 0.85,
        },
      });
    }

    map.moveLayer("choicePoi", "province-polygon", "province-line", "city-polygon", "city-line", "county-polygon", "county-line");
  },


  removeLayer(map, id) {
    if (map.getLayer(id)) {
      // 先移除图层，再移除数据源
      map.removeLayer(id);
      map.removeSource(id);
    }
  }
}

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
          features: []
        }
      },
      paint: {
        "fill-color": "#206bf5",
        "fill-opacity": 0.3
      }
    });
    map.addLayer({
      id: "city-line",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 3
      }
    });
    // 区/县：黄面、黑线
    map.addLayer({
      id: "county-polygon",
      type: "fill",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      },
      paint: {
        // "fill-color": "#f2f520",
        "fill-color": "#206bf5",
        // "fill-opacity": 0.7
        "fill-opacity": 0.3
      }
    });
    map.addLayer({
      id: "county-line",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 3
      }
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

    map.moveLayer("choicePoi", "city-polygon", "city-line", "county-polygon", "county-line");
  },

  /* 填充 市,区 边线数据 */
  cityDataFill: function (map, cityDistricts) {
    map.getSource("city-line").setData({
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: cityDistricts.shape.coordinates
        }
      }]
    });

    var cityListPointConcat = []
    for (var i = 0, j = cityDistricts.sub_districts.length; i < j; i++) {
      cityListPointConcat.push.apply(cityListPointConcat, cityDistricts.sub_districts[i].shape.coordinates)
    }

    map.getSource("county-line").setData({
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: cityListPointConcat
        }
      }]
    });
  },

  /* 添加城市圆柱体数据 */
  createCityDivDom: function (map, cityDistricts, markCountyListObj, cityAreaMetric) {
    if (!cityDistricts) return
    for (let i = 0, j = cityDistricts?.sub_districts?.length; i < j; i++) {
      const objCounty = cityDistricts.sub_districts[i]
      const objCityAreaMetric = cityAreaMetric.find(item => item.name.includes(objCounty.name.slice(0, 2)))
      //画marker点
      var el = document.createElement("div");
      el.className = "cylinder";
      var elBox = document.createElement("div");
      elBox.className = "el-box";
      var elBoxItemTop = document.createElement("div");
      elBoxItemTop.innerText = 'top'
      elBoxItemTop.className = "el-box-item";
      var elBoxItemBottom = document.createElement("div");
      elBoxItemBottom.className = "el-box-item";
      elBoxItemBottom.style.flex = '0 0' + objCityAreaMetric?.percent + '%'
      elBoxItemTop.innerText = objCityAreaMetric?.value.toFixed(2)
      elBox.append(elBoxItemTop)
      elBox.append(elBoxItemBottom)
      el.append(elBox)

      var elMarker = new SGMap.Marker({
        element: el,
        anchor: "bottom"
      })
        .setLngLat(objCounty.newcenter)
        .setOffset([0, -15])
        .addTo(map);

      markCountyListObj.push(elMarker)
    }
  },

  /*  添加城市地名Marker点 */
  addCityMarker: function (map, cityDistricts, markCountyListObj) {
    for (var i = 0, j = cityDistricts.sub_districts.length; i < j; i++) {
      const objCounty = cityDistricts.sub_districts[i]
      //画marker点
      var el = document.createElement("div");
      el.innerText = objCounty.name;
      el.className = "marker marker2";
      el.style.color = '#ffffff';
      el.style.borderRadius = '6px';
      el.style.backgroundColor = 'rgba(14,16,21,0.9)';
      el.style.lineHeight = "25px";
      el.style.opacity = 0.9
      el.style.backgroundImage =
        'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVRIib2WXUybZRTHf3R0QluQSWsLpcIFzYR0WzFsYDc+ZGMr2ZYMhh9xYR/GyUzM9MLEuAsvTHTGRM1IE42bRBhLlPGVwaKwgnGaTBO3gWNltHOjNIOVF1lTSvlaixcdjc1oLQn4v3rfc/7P+b/nOed53hMjMdUAaIGTwA7gSVYObsAMnAAGY4FM4Hdg3QqKLCIRqABKAIMI+GSVhP6NJOAjEYGt+z9QKmJlaxQJstiomWIx5ZmZvLVJjy5ZzuCDCUx9fTTZrLjn5qKKESMx1SxEIhSq03gnJ4dd6RkATMzM0GW384JGg1IiAaDH4eBU7zXMw8MRxSJmJomN5Yd95QDUWSzUWvr5w+kM+vUKBUeydbyu01Gi0ZBRewZhenr5mUnFYpp376VArUZ95mtcs7MRP0qofpM+QcDY1hJ2W0VLGT82bOX+0WoK1Gre6DaHCOkVCnoPVGFISQ3avA8fcrirk00KBaNHq/m8sCh6sbdznsPp9VLU1Mi5WwMhvi+KitEmJXGquDjEft5mxdD4HUNuN9UbNkYvBlA3YAnWJ1UqoyBVzYfPG9iiVNFpHyL7qWRObt1GoTqNNJkMgD5B4HT/jXAhwzeIJDbgylel0L2/MmjvtA9R0dFO3U4jx/U5HNfnAGBsbeGXkXskrF0bVixsZiqJFICRKQ+jU1MAvHixg4qOdgAOdf3IngttQOA4ODyTj9ZJlifm9HrZolIBMDw5SfbZOq4LY3xZsj2Ed3p7KZaJv8mq/5YhtxuAXKUSz/wyurHbMUxGYmLwfc7no/3OHeTx8aQnJFKp1aKWyUiRSrlkt+OZnw9ydclyehyOJcWWrFntzX5eXf8spc+kc2nYDsBmZSBTy8FDIVy94ungc74qBYBvbvZHn9mV0VHm/f6Q87Iu7gkALt69y54LbZy3WQFIjo8LchaPQ7hrK2w3HunqpMFYxv5MLc23bRzrNiMVi+kVBAB+cjj47NpV5nx+AMoyMtAlyznWYw4XMrxY61+3+XXkHvW7jPw5LmBzuR7j3BgfB0CTkEDT7r1cHXNydmDgMd4iwrY+QFlbK8L0NL0HqshVKpfkbJQruHXwMK7ZWXa2NEcKF1nMv7DAhoZ67JNufq58iQ/y8kP87+Vu5srLr+D0etE11DPj80UU+8//2SK+KtlBVVYW/oUFvrcOUp6pJW7NGhptVl7r6iSaIDESU42LKEeDXKWST7cVkqdScV0Y493Ll/nt/mg0SwE8MRJTTTOBcWu10SYC3gcerLKQCzghAqxAHtBCYIJdSUw+ipsPDPwDT5xONBBJWh0AAAAASUVORK5CYII=")';
      // 'url("https://map.sgcc.com.cn/products/js-sdk/v3/assets/images/markers_new2_4ab0bc5_78.png")';
      el.style.backgroundSize = '18px 18px'
      el.style.backgroundPosition = '5px center'
      // el.style.width = objCounty.name.length <= 3 ? "45px" : '55px';
      // el.style.width =  '85px';
      el.style.height = "25px";
      el.style.paddingLeft = '30px'
      // el.style.paddingRight = '10px'
      el.style.backgroundRepeat = 'no-repeat';

      var elMarker = new SGMap.Marker({
        element: el,
        // anchor: "top"
      })
        .setLngLat(objCounty.newcenter)
        .addTo(map);

      markCountyListObj.push(elMarker)
    }
  },

  /* 给每个城市添加颜色遮罩 鼠标移到上面时变色，和点击事件 */
  addCountyFill: function (map, cityDistricts, initCountyMap) {
    var countyMarkData = []
    for (let i = 0, j = cityDistricts.sub_districts.length; i < j; i++) {
      var countyObj = cityDistricts.sub_districts[i]
      countyMarkData = countyObj.shape

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
                  index: i
                }
              },
            ],
          },
        },
        paint: {
          "fill-color": "#034c8a",
          "fill-opacity": 0.5,
        },
      });

      map.on("mouseover", "power-polygon-county" + i, function (e) {
        var features = e.features;
        map.setPaintProperty(features[0].layer.id, "fill-color", '#206bf5');
        map.on('mouseleave', "power-polygon-county" + i, function (e) {
          if (map.getLayer("power-polygon-county" + i)) {
            map.setPaintProperty("power-polygon-county" + i, "fill-color", '#034c8a');
          }
        })
      });

      map.on("click", "power-polygon-county" + i, (e) => {
        var features = e.features;
        initCountyMap(features[0])
      });
    }
  },

  /* 销毁区上面的，柱状图图层 */
  destroyCountyMetric: function (markCountyListObj, len) {
    if (markCountyListObj.length > len) {
      // 移除城市各区名
      for (let i = markCountyListObj.length / 2, j = markCountyListObj.length; i < j; i++) {
        markCountyListObj[i].remove()
        markCountyListObj[i] = undefined
      }
      markCountyListObj.splice(markCountyListObj.length / 2)
    }
  },

  /* 销毁市级地图上面数据 */
  destroyCityData: function (map, markCountyListObj, countyCount) {
    // 移除城市各区名
    for (var i = 0, j = markCountyListObj.length; i < j; i++) {
      markCountyListObj[i].remove()
      markCountyListObj[i] = undefined
    }
    markCountyListObj.length = 0
    markCountyListObj = []

    // 删除城市每个区面图层
    for (var i = 0; i < countyCount; i++) {
      map.off("mouseover", "power-polygon-county" + i, () => { });
      map.off("click", "power-polygon-county" + i, () => { });
      if (map.getLayer("power-polygon-county" + i)) {
        // 先移除图层，再移除数据源
        map.removeLayer("power-polygon-county" + i);
        map.removeSource("power-polygon-county" + i);
      }
    }

    // 移除省 城市边红和 填充色
    removeLayer(map, 'city-polygon')
    removeLayer(map, 'city-line')
    removeLayer(map, 'county-polygon')
    removeLayer(map, 'county-line')
    map.removeLayer('choicePoi');
  },
}

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
          features: []
        }
      },
      paint: {
        "fill-color": "#206bf5",
        "fill-opacity": 0.3
      }
    });
    map.addLayer({
      id: "county-line",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 3
      }
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
      features: [{
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: coordinates
        }
      }]
    });

    map.getSource("county-line").setData({
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: coordinates
        }
      }]
    });
  },

  /* 添加城市地名Marker点 */
  addCountyMarker: function (map, features) {
    //画marker点
    var el = document.createElement("div");
    el.innerText = features.name;
    el.className = "marker";
    el.style.color = '#ffffff';
    el.style.borderRadius = '6px';
    el.style.backgroundColor = 'rgba(14,16,21,0.9)';
    el.style.lineHeight = "25px";
    el.style.opacity = 0.9
    el.style.backgroundImage =
      'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAACXBIWXMAAAsTAAALEwEAmpwYAAADy0lEQVRIib2WXUybZRTHf3R0QluQSWsLpcIFzYR0WzFsYDc+ZGMr2ZYMhh9xYR/GyUzM9MLEuAsvTHTGRM1IE42bRBhLlPGVwaKwgnGaTBO3gWNltHOjNIOVF1lTSvlaixcdjc1oLQn4v3rfc/7P+b/nOed53hMjMdUAaIGTwA7gSVYObsAMnAAGY4FM4Hdg3QqKLCIRqABKAIMI+GSVhP6NJOAjEYGt+z9QKmJlaxQJstiomWIx5ZmZvLVJjy5ZzuCDCUx9fTTZrLjn5qKKESMx1SxEIhSq03gnJ4dd6RkATMzM0GW384JGg1IiAaDH4eBU7zXMw8MRxSJmJomN5Yd95QDUWSzUWvr5w+kM+vUKBUeydbyu01Gi0ZBRewZhenr5mUnFYpp376VArUZ95mtcs7MRP0qofpM+QcDY1hJ2W0VLGT82bOX+0WoK1Gre6DaHCOkVCnoPVGFISQ3avA8fcrirk00KBaNHq/m8sCh6sbdznsPp9VLU1Mi5WwMhvi+KitEmJXGquDjEft5mxdD4HUNuN9UbNkYvBlA3YAnWJ1UqoyBVzYfPG9iiVNFpHyL7qWRObt1GoTqNNJkMgD5B4HT/jXAhwzeIJDbgylel0L2/MmjvtA9R0dFO3U4jx/U5HNfnAGBsbeGXkXskrF0bVixsZiqJFICRKQ+jU1MAvHixg4qOdgAOdf3IngttQOA4ODyTj9ZJlifm9HrZolIBMDw5SfbZOq4LY3xZsj2Ed3p7KZaJv8mq/5YhtxuAXKUSz/wyurHbMUxGYmLwfc7no/3OHeTx8aQnJFKp1aKWyUiRSrlkt+OZnw9ydclyehyOJcWWrFntzX5eXf8spc+kc2nYDsBmZSBTy8FDIVy94ungc74qBYBvbvZHn9mV0VHm/f6Q87Iu7gkALt69y54LbZy3WQFIjo8LchaPQ7hrK2w3HunqpMFYxv5MLc23bRzrNiMVi+kVBAB+cjj47NpV5nx+AMoyMtAlyznWYw4XMrxY61+3+XXkHvW7jPw5LmBzuR7j3BgfB0CTkEDT7r1cHXNydmDgMd4iwrY+QFlbK8L0NL0HqshVKpfkbJQruHXwMK7ZWXa2NEcKF1nMv7DAhoZ67JNufq58iQ/y8kP87+Vu5srLr+D0etE11DPj80UU+8//2SK+KtlBVVYW/oUFvrcOUp6pJW7NGhptVl7r6iSaIDESU42LKEeDXKWST7cVkqdScV0Y493Ll/nt/mg0SwE8MRJTTTOBcWu10SYC3gcerLKQCzghAqxAHtBCYIJdSUw+ipsPDPwDT5xONBBJWh0AAAAASUVORK5CYII=")';
    // 'url("https://map.sgcc.com.cn/products/js-sdk/v3/assets/images/markers_new2_4ab0bc5_78.png")';
    el.style.backgroundSize = '18px 18px'
    el.style.backgroundPosition = '5px center'
    // el.style.width = features.name.length <= 3 ? "45px" : '55px';
    el.style.height = "25px";
    el.style.paddingLeft = '30px'
    el.style.backgroundRepeat = 'no-repeat';

    countyUtils.elMarker = new SGMap.Marker({
      element: el,
      // anchor: "top"
    })
      .setLngLat(features.newcenter)
      .addTo(map);
  },

  /* 添加区里的项目marker点 */
  addPointMarker: function (map, pointArry) {
    var pointMarkers = pointArry
    for (let i = 0, j = pointMarkers.length; i < j; i++) {
      var pointMarker = pointMarkers[i]
      //画marker点
      var el = document.createElement("div");
      el.className = "countyMarkerPoints";
      el.innerHTML = `<div class='countyMarkerPoints' onclick='handleClickPoint("${pointMarker.title}","${pointMarker.center}")'>
                        <div class='county-marker-pointsIcon'>
                          <div class='county-marker-points-content'>${pointMarker.title}</div>
                        </div>
                      </div>`
      var elMarker = new SGMap.Marker({
        element: el,
        // anchor: "bottom"
      })
        .setLngLat(pointMarker.center)
        .setOffset([0, -15])
        .addTo(map)
      countyUtils.pointMarker.push(elMarker)
    }
  },

  /* 销毁点坐标 */
  destoryPointMarker: function () {
    for (let item of countyUtils.pointMarker) {
      item.remove()
      item = undefined
    }
  },

  /* 销毁区县地图上面数据 */
  destroyCountyData: function (map, popupDOM) {
    // 移除弹框
    popupDOM.remove()
    // 移除 区名
    if (countyUtils.elMarker) {
      countyUtils.elMarker.remove()
      countyUtils.elMarker = undefined
    }
    // 移除点击事件
    // map.off("click", "county-polygon", pointClick)

    // 移除区上面的打点
    countyUtils.pointMarker.forEach(marker => {
      marker.remove()
      marker = undefined
    })

    // 移除省 城市边红和 填充色
    removeLayer(map, 'city-line')
    removeLayer(map, 'county-polygon')
    removeLayer(map, 'county-line')
    map.removeLayer('choicePoi');
  },
}

const removeLayer = (map, id) => {
  if (map.getLayer(id)) {
    // 先移除图层，再移除数据源
    map.removeLayer(id);
    map.removeSource(id);
  }
}

// 修正每个城市区名打点位置
const countyCenterFixed = {
  320500: { // 苏州
    320582: [120.655821, 31.85], // 张家港市
    320505: [120.373456, 31.335301], // 虎丘区
    320581: [120.8, 31.653584], // 常熟市
    320507: [120.642566, 31.439044], // 相城区
    320508: [120.3, 31.1], // 姑苏区
    320509: [120.645126, 30.95], // 吴江区
    320585: [121.130550, 31.537735], // 太仓市
    320506: [120.331978, 31.162791], // 吴中区
    320583: [120.981150, 31.284913], // 昆山市
    320571: [120.726279, 31.320789], // 苏州工业园区（有些版本sg有）
    countyConcat: {
      newAdcode: '320508',
      name: '苏州市区',
      center: [120.331978, 31.162791],
      districtsList: ['320508', '320507', '320506', '320505', '320571']
    }
  },
  321200: { // 泰州
    321202: [119.96424, 32.321016], // 海陵区
    321204: [120.147934, 32.45], // 姜堰区
    321203: [119.881717, 32.318821], // 高港区
    321282: [120.277138, 32.022751], // 靖江市
    321281: [120.002540, 32.85], // 兴化市
    321283: [120.151743, 32.171853], // 泰兴市
    countyConcat: {
      newAdcode: '321202',
      name: '泰州市区',
      center: [119.96424, 32.321016],
      districtsList: ['321202', '321203']
    }
  },
  321000: { // 扬州
    321081: [119.184766, 32.372258], // 仪征市
    321084: [119.5, 32.781659], // 高邮市
    321003: [119.498015, 32.327528], // 邗江区
    321023: [119.460729, 33.15], // 宝应县
    321012: [119.669989, 32.484672], // 江都区
    321002: [119.431849, 32.394720], // 广陵区
    countyConcat: {
      newAdcode: '321002',
      name: '扬州市区',
      center: [119.398015, 32.377528],
      districtsList: ['321002', '321003']
    }
  },
  320100: { // 南京市
    320111: [118.528071, 32.058928], // 浦口区
    320114: [118.678901, 31.892322], // 雨花台区
    320104: [118.794778, 32.038989], // 秦淮区
    320105: [118.731688, 32.003369], // 建邺区
    320117: [119.028295, 31.551125], // 溧水区
    320106: [118.769790, 32.066335], // 鼓楼区
    320115: [118.839685, 31.853702], // 江宁区
    320116: [118.821401, 32.322247], // 六合区
    320118: [118.992402, 31.25], // 高淳区
    320102: [118.797858, 32.048628], // 玄武区
    320113: [118.998493, 32.156168], // 栖霞区
    countyConcat: {
      newAdcode: '320106',
      name: '南京市区',
      center: [118.998493, 32.156168],
      districtsList: ['320106', '320113', '320114', '320104', '320105', '320102', '320111']
    }
  },
  321100: { // 镇江
    321181: [119.606535, 31.9], // 丹阳市
    321111: [119.411944, 32.195332], // 润州区
    321102: [119.470160, 32.198280], // 京口区
    321182: [119.85, 32.15], // 扬中市
    321112: [119.5, 32.131962], // 丹徒区
    321183: [119.2, 31.85], // 句容市
    countyConcat: {
      newAdcode: '321112',
      name: '镇江市区',
      center: [119.433853, 32.131962],
      districtsList: ['321112', '321111', '321102']
    }
  },
  321300: { // 宿迁市
    321323: [118.703037, 33.723140], // 泗阳县
    321311: [118.330782, 33.85], // 宿豫区
    321324: [118.3, 33.45], // 泗洪县
    321322: [118.804784, 34.111022], // 沭阳县
    321302: [118.242533, 33.963029], // 宿城区
    countyConcat: {
      newAdcode: '321311',
      name: '宿迁市区',
      center: [118.242533, 33.963029],
      districtsList: ['321311', '321302',]
    }
  },
  320300: { // 徐州市
    320302: [117.4, 34.35], // 鼓楼区
    320305: [117.453583, 34.443013], // 贾汪区
    320381: [118.354537, 34.25], // 新沂市
    320382: [117.92, 34.338888], // 邳州市
    320312: [117.07, 34.180260], // 铜山区
    320324: [117.941563, 33.912597], // 睢宁县
    320321: [116.54, 34.693906], // 丰县
    320303: [117.251469, 34.253164], // 云龙区
    320311: [117.193805, 34.244258], // 泉山区
    320322: [116.9, 34.721656], // 沛县
    countyConcat: {
      newAdcode: '320302',
      name: '徐州市区',
      center: [117.185591, 34.288511],
      districtsList: ['320302', '320305', '320303', '320311']
    }
  },
  320600: { // 南通市
    320685: [120.467343, 32.533573], // 海安市
    99320600: [121.594801, 32.215639], // 海域
    320602: [120.861027, 31.95], // 崇川区
    320612: [121.075056, 32.12], // 通州区
    320682: [120.574945, 32.25], // 如皋市
    320623: [121.151, 32.4], // 如东县
    320681: [121.657537, 31.808043], // 启东市
    320684: [121.28, 31.94], // 海门区
    countyConcat: {
      newAdcode: '320602',
      name: '南通市区',
      center: [120.861027, 32.006985],
      districtsList: ['320602']
    }
  },
  320900: { // 盐城市
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
      newAdcode: '320903',
      name: '盐城市区',
      center: [120.155036, 33.337722],
      districtsList: ['320903', '320902']
    }
  },
  320200: { // 无锡市
    320205: [120.357866, 31.589717], // 锡山区
    320206: [120.298499, 31.681012], // 惠山区
    320282: [119.823407, 31.340637], // 宜兴市
    320214: [120.359123, 31.551626], // 新吴区
    320211: [120.282692, 31.527954], // 滨湖区
    320213: [120.299073, 31.575967], // 梁溪区
    320281: [120.32008, 31.8131400], // 江阴市
    countyConcat: {
      newAdcode: '320205',
      name: '无锡市区',
      center: [120.357866, 31.589717],
      districtsList: ['320205', '320206', '320214', '320211', '320213']
    }
  },
  320400: { // 常州市
    320411: [119.971500, 31.830187], // 新北区
    320412: [119.942474, 31.701235], // 武进区
    320404: [119.901770, 31.802157], // 钟楼区
    320413: [119.5, 31.723247], // 金坛区
    320481: [119.38, 31.416911], // 溧阳市
    320402: [119.974677, 31.65], // 天宁区
    countyConcat: {
      newAdcode: '320402',
      name: '常州市区',
      center: [119.971500, 31.830187],
      districtsList: ['320402', '320411', '320412', '320404']
    }
  },
  320800: { // 淮安市
    320812: [119.008062, 33.5], // 清江浦区
    320804: [118.9, 33.631893], // 淮阴区
    320813: [118.873138, 33.2], // 洪泽区
    320803: [119.33, 33.502869], // 淮安区
    320830: [118.544360, 32.9], // 盱眙县
    320826: [119.260335, 33.85], // 涟水县
    320831: [119.13, 32.95], // 金湖县
    countyConcat: {
      newAdcode: '320812',
      name: '淮安市区',
      center: [119.008062, 33.599504],
      districtsList: ['320812']
    }
  },
  320700: { // 连云港市
    320723: [119.3, 34.284381], // 灌云县
    320722: [118.752842, 34.542308], // 东海县
    99320700: [119.448782, 34.773274], // 海域
    320703: [119.372778, 34.752815], // 连云区
    320724: [119.36, 34.087134], // 灌南县
    320706: [119.3, 34.572292], // 海州区
    320707: [119.05, 34.841348], // 赣榆区
    countyConcat: {
      newAdcode: '320706',
      name: '连云港市区',
      center: [119.163575, 34.572292],
      districtsList: ['320706', '320703']
    }
  },

  init: function (cityDistricts) {
    var suzhouCountyLngLat = countyCenterFixed[cityDistricts.adcode]
    cityDistricts.sub_districts = cityDistricts.sub_districts.filter(item => item.name !== '海域')
    cityDistricts.sub_districts.forEach(item => {
      item.newcenter = suzhouCountyLngLat !== undefined ? suzhouCountyLngLat[item.adcode] : item.center.split(',')
    })

    // 是不是有需要合并的区
    if (suzhouCountyLngLat !== undefined && suzhouCountyLngLat.countyConcat) {
      var coordinates = []

      cityDistricts.sub_districts.forEach(item => {
        if (suzhouCountyLngLat.countyConcat.districtsList.includes(item.adcode)) {
          item.shape.coordinates.forEach(itemChild => coordinates.push(itemChild))
        }
      })
      var deleteCounty = suzhouCountyLngLat.countyConcat.districtsList.slice(1)
      cityDistricts.sub_districts = cityDistricts.sub_districts.filter(item => !deleteCounty.includes(item.adcode))
      var o = cityDistricts.sub_districts.find(item => item.adcode === suzhouCountyLngLat.countyConcat.districtsList[0])

      if (o) {
        o.name = suzhouCountyLngLat.countyConcat.name;
        o.shape.coordinates = coordinates;

      }
    }
  }
}

const cityPropertyInitData = {
  // 苏州 来自于下拉框选择的城市值，显示城市地图
  "dc_city_sz": {
    properties: {
      name: "苏州市",
      center: "120.726279,31.2",
      code: "320500",
    },
  },
  "dc_city_tz": {
    properties: {
      name: "泰州市",
      center: "120,32.509155",
      code: "321200",
    },
  },
  "dc_city_yz": {
    properties: {
      name: "扬州市",
      center: "119.49,32.694210",
      code: "321000",
    },
  },
  "dc_city_nj": {
    properties: {
      name: "南京市",
      center: "118.72,31.8",
      code: "320100",
    },
  },
  "dc_city_zj": {
    properties: {
      name: "镇江市",
      center: "119.5,31.95",
      code: "321100",
    },
  },
  "dc_city_sq": {
    properties: {
      name: "宿迁市",
      center: "118.5,33.763232",
      code: "321300",
    },
  },
  "dc_city_xz": {
    properties: {
      name: "徐州市",
      center: "117.55,34.15",
      code: "320300",
    },
  },
  "dc_city_nt": {
    properties: {
      name: "南通市",
      center: "120.994291,32.15",
      code: "320600",
    },
  },
  "dc_city_yc": {
    properties: {
      name: "盐城市",
      center: "120.163561,33.5",
      code: "320900",
    },
  },
  "dc_city_wx": {
    properties: {
      name: "无锡市",
      center: "120.111910,31.4",
      code: "320200",
    },
  },
  "dc_city_cz": {
    properties: {
      name: "常州市",
      center: "119.52, 31.55",
      code: "320400",
    },
  },
  "dc_city_ha": {
    properties: {
      name: "淮安市",
      center: "119.015285,33.310353",
      code: "320800",
    },
  },
  "dc_city_lyg": {
    properties: {
      name: "连云港市",
      center: "119.221611,34.45",
      code: "320700",
    },
  }
}

export {
  proUtils,
  cityUtils,
  countyUtils,
  countyCenterFixed,
  cityPropertyInitData,
} 
