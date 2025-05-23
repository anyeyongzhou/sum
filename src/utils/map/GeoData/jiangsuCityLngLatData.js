// 是否中文环境
const isZh = localStorage.getItem("i18n") == "zh";

/* 江苏省13个地市的名称 */
const cityNameList = [
  "苏州市",
  "泰州市",
  "扬州市",
  "南京市",
  "镇江市",
  "宿迁市",
  "徐州市",
  "南通市",
  "盐城市",
  "无锡市",
  "常州市",
  "淮安市",
  "连云港市",
];

/* 江苏省13个地市的名称 */
const cityNameList1 = [
  "苏州",
  "泰州",
  "扬州",
  "南京",
  "镇江",
  "宿迁",
  "徐州",
  "南通",
  "盐城",
  "无锡",
  "常州",
  "淮安",
  "连云港",
];

/* 江苏省13个地市的名称对应的code */
const cityNameCodeCorresponding = {
  "苏州": "dc_city_sz",
  "泰州": "dc_city_tz",
  "扬州": "dc_city_yz",
  "南京": "dc_city_nj",
  "镇江": "dc_city_zj",
  "宿迁": "dc_city_sq",
  "徐州": "dc_city_xz",
  "南通": "dc_city_nt",
  "盐城": "dc_city_yc",
  "无锡": "dc_city_wx",
  "常州": "dc_city_cz",
  "淮安": "dc_city_ha",
  "连云港": "dc_city_lyg",
  "江苏": "dc_city_jiangsusheng",
  "江苏省": "dc_city_jiangsusheng",
}

/* 江苏省13个地市的名称对应的拼音 */
const cityNameSpellCorresponding = {
  苏州: "suzhou",
  泰州: "taizhou",
  扬州: "yangzhou",
  南京: "nanjin",
  镇江: "zhenjiang",
  宿迁: "suqian",
  徐州: "xuzhou",
  南通: "nantong",
  盐城: "yancheng",
  无锡: "wuxi",
  常州: "changzhou",
  淮安: "huaian",
  连云港: "lianyungang",
  江苏省: "jiangsusheng",
  江苏: "jiangsusheng"
}

const spellCityNameCorresponding = {
  dc_city_sz: "suzhou",
  dc_city_tz: "taizhou",
  dc_city_yz: "yangzhou",
  dc_city_nj: "nanjin",
  dc_city_zj: "zhenjiang",
  dc_city_sq: "suqian",
  dc_city_xz: "xuzhou",
  dc_city_nt: "nantong",
  dc_city_yc: "yancheng",
  dc_city_wx: "wuxi",
  dc_city_cz: "changzhou",
  dc_city_ha: "huaian",
  dc_city_lyg: "lianyungang",
  dc_city_jiangsusheng: "jiangsusheng",
}

/* 江苏省13个地级市的定位坐标 */
const jiangsuCityLngLatData = {
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
  },
};

const jsMapData = {
  suzhou: {
    name: isZh ? "苏州" : "Suzhou",
    code: "dc_city_sz",
    num: 0,
    center: [120.585315, 31.298886],
  },
  taizhou: {
    name: isZh ? "泰州" : "Taizhou",
    code: "dc_city_tz",
    num: 0,
    center: [120.1, 32.5],
  },
  yangzhou: {
    name: isZh ? "扬州" : "Yangzhou",
    code: "dc_city_yz",
    num: 0,
    center: [119.512966, 32.69421],
  },
  nanjin: {
    name: isZh ? "南京" : "Nanjing",
    code: "dc_city_nj",
    num: 0,
    center: [118.796877, 32],
  },
  zhenjiang: {
    name: isZh ? "镇江" : "Zhenjiang",
    code: "dc_city_zj",
    num: 0,
    center: [119.5, 32.1],
  },
  suqian: {
    name: isZh ? "宿迁" : "Suqian",
    code: "dc_city_sq",
    num: 0,
    center: [118.475198, 33.8],
  },
  xuzhou: {
    name: isZh ? "徐州" : "Xuzhou",
    code: "dc_city_xz",
    num: 0,
    center: [117.5, 34.3],
  },
  nantong: {
    name: isZh ? "南通" : "Nantong",
    code: "dc_city_nt",
    num: 0,
    center: [120.994291, 32.15],
  },
  yancheng: {
    name: isZh ? "盐城" : "Yancheng",
    code: "dc_city_yc",
    num: 0,
    center: [120.163561, 33.5],
  },
  wuxi: {
    name: isZh ? "无锡" : "Wuxi",
    code: "dc_city_wx",
    num: 0,
    center: [120.4, 31.7],
  },
  changzhou: {
    name: isZh ? "常州" : "Changzhou",
    code: "dc_city_cz",
    num: 0,
    center: [119.5, 31.6],
  },
  huaian: {
    name: isZh ? "淮安" : "Huaian",
    code: "dc_city_ha",
    num: 0,
    center: [119, 33.4],
  },
  lianyungang: {
    name: isZh ? "连云港" : "Lianyungang",
    code: "dc_city_lyg",
    num: 0,
    center: [119.221611, 34.596653],
  }
}

export { cityNameList, cityNameList1, cityNameCodeCorresponding, jiangsuCityLngLatData, jsMapData, cityNameSpellCorresponding, spellCityNameCorresponding };
