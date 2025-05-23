// 是否中文环境
const isZh = localStorage.getItem("i18n") == "zh";

//区域电力--7个区域的坐标信息
// x越大越右，y越大越上
const areaLngLat = {
  HZ: {
    name: isZh ? "华中" : "Central China",
    lnglat: [112, 30],
  },
  XN: {
    name: isZh ? "西南" : "South West",
    lnglat: [96, 31],
  },
  HN: {
    name: isZh ? "南方" : "South China",
    lnglat: [109, 24],
  },
  XB: {
    name: isZh ? "西北" : "North West",
    lnglat: [90, 40],
  },
  HB: {
    name: isZh ? "华北" : "North China",
    lnglat: [114, 42],
  },
  HD: {
    name: isZh ? "华东" : "East China",
    lnglat: [118, 33],
  },
  DB: {
    name: isZh ? "东北" : "North East",
    lnglat: [126, 46],
  },

}

//省级电力--30个省的坐标信息
// x越大越右，y越大越上
const proLngLat = {
  NMG: {
    name: "内蒙古",
    lnglat: [110, 44],
  },
  SICHUAN: {
    name: "四川",
    lnglat: [101, 32],
  },
  TIANJIN: {
    name: "天津",
    lnglat: [117, 41.5],
  },
  ANHUI: {
    name: "安徽",
    lnglat: [116.8, 34],
  },
  YUNNAN: {
    name: "云南",
    lnglat: [100, 25.040609],
  },
  FUJIAN: {
    name: "福建",
    lnglat: [118, 27],
  },
  CHONGQIN: {
    name: "重庆",
    lnglat: [107, 32],
  },
  ZHEJIANG: {
    name: "浙江",
    lnglat: [120.153576, 31],
  },
  GUIZHOU: {
    name: "贵州",
    lnglat: [106.713478, 28],
  },
  HEBEI: {
    name: "河北",
    lnglat: [114.502461, 40],
  },
  SHANGHAI: {
    name: "上海",
    lnglat: [121.472644, 34],
  },
  HAINAN: {
    name: "海南",
    lnglat: [109, 19.8],
  },
  QINHAI: {
    name: "青海",
    lnglat: [95, 38],
  },
  JIANGXI: {
    name: "江西",
    lnglat: [115, 28.5],
  },
  NINXIA: {
    name: "宁夏",
    lnglat: [105.8, 40],
  },
  SHANDONG: {
    name: "山东",
    lnglat: [117.000923, 38],
  },
  XINJIANG: {
    name: "新疆",
    lnglat: [87.617733, 43.792818],
  },
  GUANGXI: {
    name: "广西",
    lnglat: [108, 24.5],
  },
  SHANXI: {
    name: "山西",
    lnglat: [112, 39],
  },
  HUBEI: {
    name: "湖北",
    lnglat: [112, 33],
  },
  LIAONIN: {
    name: "辽宁",
    lnglat: [123.429096, 43],
  },
  JILIN: {
    name: "吉林",
    lnglat: [125.3245, 46],
  },
  SHX: {
    name: "陕西",
    lnglat: [108, 36],
  },
  GUANGDONG: {
    name: "广东",
    lnglat: [113.280637, 25],
  },
  HLJ: {
    name: "黑龙江",
    lnglat: [128, 49],
  },
  BEIJIN: {
    name: "北京",
    lnglat: [116.405285, 42],
  },
  HENAN: {
    name: "河南",
    lnglat: [113.665412, 36],
  },
  JIANGSU: {
    name: "江苏",
    lnglat: [120, 35],
  },
  HUNAN: {
    name: "湖南",
    lnglat: [112, 30],
  },
  GANSU: {
    name: "甘肃",
    lnglat: [103.823557, 38],
  },
}

//电量转出5个省外的坐标信息
// x越大越右，y越大越上
const outProLngLat = {
  //山西
  SHANXI: {
    name: "山西",
    lnglat: [116.21712582980837, 34.351702327715586],
  },
  //四川
  SICHUAN: {
    name: "四川",
    lnglat: [115.88454472807257, 32.165732956265956],
  },
  //安徽
  ANHUI: {
    name: "安徽",
    lnglat: [117.8, 30.6],
  },
  //上海
  SHANGHAI: {
    name: "上海",
    lnglat: [120.8, 30.2],
  },
  //浙江
  ZHEJIANG: {
    name: "浙江",
    lnglat: [121.9, 31.2],
  },
};

//供电分区--32个分区的坐标信息
// x越大越右，y越大越上
const zoneLngLat = {
  //东龙
  DONGLONG: {
    name: "东龙",
    lnglat: [118.87645942669673, 31.80114778433068],
  },
  //苏州西
  SUZHOUXI: {
    name: "苏州西",
    lnglat: [120.30468208294803, 31.11703680043469],
  },
  //盐城北
  YANCHENGBEI: {
    name: "盐城北",
    lnglat: [119.90917427044701, 34.10555650692693],
  },
  //太仓
  TAICANG: {
    name: "太仓",
    lnglat: [121.16161567669837, 31.52997624125406],
  },
  //淮安
  HUAIAN: {
    name: "淮安",
    lnglat: [119.11815864544724, 33.49388566266866],
  },
  //常熟
  CHANGSHU: {
    name: "常熟",
    lnglat: [120.85399848919735, 31.679686024647893],
  },
  //连云港
  LIANYUNGANG: {
    name: "连云港",
    lnglat: [119.20604927044718, 34.56821584214575],
  },
  //斗陆
  DOULU: {
    name: "斗陆",
    lnglat: [120.33764106732218, 31.81982006522057],
  },
  //宁北
  NINGBEI: {
    name: "宁北",
    lnglat: [118.81054145794843, 32.38750547066337],
  },
  //通西北
  TONGXIBEI: {
    name: "通西北",
    lnglat: [120.76610786419735, 32.4709629865328],
  },
  //泰扬北
  TAIYANGBEI: {
    name: "泰扬北",
    lnglat: [119.73339302044707, 32.988513550965024],
  },
  //惠泉
  HUIQUAN: {
    name: "惠泉",
    lnglat: [120.31566841107275, 31.64228114955381],
  },
  //石牌
  SHIPAI: {
    name: "石牌",
    lnglat: [121.01879341107258, 31.37064622280525],
  },
  //廻上
  HUISHANG: {
    name: "廻上",
    lnglat: [119.24999458294826, 32.052904658847325],
  },
  //茅溧
  MAOLI: {
    name: "茅溧",
    lnglat: [119.45873481732247, 31.567426247933014],
  },
  //盐城中
  YANCHENGZHONG: {
    name: "盐城中",
    lnglat: [120.10692817669866, 33.548840149102546],
  },
  //张家港
  ZHANGJIAGANG: {
    name: "张家港",
    lnglat: [120.63427192669855, 31.903798594646688],
  },
  //通东南
  TONGDONGNAN: {
    name: "通东南",
    lnglat: [121.31542427044889, 32.00633504258201],
  },
  //武南
  WUNAN: {
    name: "武南",
    lnglat: [119.90917427044701, 31.67033621770733],
  },
  //玉山
  YUSHAN: {
    name: "玉山",
    lnglat: [120.64525825482326, 31.38002607502466],
  },
  //访晋
  FANGJIN: {
    name: "访晋",
    lnglat: [119.7773383329482, 31.978381909990688],
  },
  //吴江东
  WUJIANGDONG: {
    name: "吴江东",
    lnglat: [120.78808052044678, 31.032349183044673],
  },
  //徐州西
  XUZHOUXI: {
    name: "徐州西",
    lnglat: [117.14061958294889, 34.332669173775685],
  },
  //泰南
  TAINAN: {
    name: "泰南",
    lnglat: [120.10692817669866, 32.220359000590946],
  },
  //梅里
  MEILI: {
    name: "梅里",
    lnglat: [120.29369575482332, 31.473773064425345],
  },
  //吴江西
  WUJIANGXI: {
    name: "吴江西",
    lnglat: [120.51342231732212, 30.81558310304291],
  },
  //盐城南
  YANCHENGNAN: {
    name: "盐城南",
    lnglat: [120.62328559857377, 33.07141055541365],
  },
  //徐宿
  XUSU: {
    name: "徐宿",
    lnglat: [118.32714302044747, 34.06006055803191],
  },
  //岷珠
  MINZHU: {
    name: "岷珠",
    lnglat: [119.85424262982343, 31.342501048802234],
  },
  //秦淮
  QINHUAI: {
    name: "秦淮",
    lnglat: [118.8544867704473, 32.11806232027456],
  },
  //车坊
  CHEFANG: {
    name: "车坊",
    lnglat: [120.72216255169849, 31.248622995614383],
  },
  //扬州
  YANGZHOU: {
    name: "扬州",
    lnglat: [119.53563911419775, 32.4616937439383],
  },
}

// 江苏13个地市的坐标信息
// x越大越右，y越大越上
const jiangsuCityLngLat = {
  //苏州
  SUZHOU: {
    name: "苏州市",
    lnglat: [120.726279, 31.2],
  },
  //泰州
  TAIZHOU: {
    name: "泰州市",
    lnglat: [120, 32.509155],
  },
  //扬州
  YANGZHOU: {
    name: "扬州市",
    lnglat: [119.49, 32.694210],
  },
  //南京
  NANJIN: {
    name: "南京市",
    lnglat: [118.72, 31.8],
  },
  //镇江
  ZHENJIANG: {
    name: "镇江市",
    lnglat: [119.5, 31.95],
  },
  //宿迁
  SUQIAN: {
    name: "宿迁市",
    lnglat: [118.5, 33.763232],
  },
  //徐州
  XUZHOU: {
    name: "徐州市",
    lnglat: [117.55, 34.15],
  },
  //南通
  NANTONG: {
    name: "南通市",
    lnglat: [120.994291, 32.15],
  },
  //盐城
  YANCHENG: {
    name: "盐城市",
    lnglat: [120.163561, 33.5],
  },
  //无锡
  WUXI: {
    name: "无锡市",
    lnglat: [120.111910, 31.4],
  },
  //常州
  CHANGZHOU: {
    name: "常州市",
    lnglat: [119.52, 31.55],
  },
  //淮安
  HUAIAN: {
    name: "淮安市",
    lnglat: [119.015285, 33.310353],
  },
  //连云港
  LIANYUNGANG: {
    name: "连云港市",
    lnglat: [119.221611, 34.45],
  },
};

// 江苏13个地市的坐标信息
// x越大越右，y越大越上
const jiangsuCityCodeLngLat = {
  //苏州
  dc_city_sz: {
    name: isZh ? "苏州市" : "SuZhou",
    lnglat: [120.78487969481387, 31.4],
  },
  //泰州
  dc_city_tz: {
    name: isZh ? "泰州市" : "TaiZhou",
    lnglat: [120.01018320965306, 32.7],
  },
  //扬州
  dc_city_yz: {
    name: isZh ? "扬州市" : "YangZhou",
    lnglat: [119.49371888621334, 32.8],
  },
  //南京
  dc_city_nj: {
    name: isZh ? "南京市" : "NanJing",
    lnglat: [118.89117717553364, 32],
  },
  //镇江
  dc_city_zj: {
    name: isZh ? "镇江市" : "ZhenJiang",
    lnglat: [119.5, 32.09074691083978],
  },
  //宿迁
  dc_city_sq: {
    name: isZh ? "宿迁市" : "SuQian",
    lnglat: [118.5, 33.9],
  },
  //徐州
  dc_city_xz: {
    name: isZh ? "徐州市" : "XuZhou",
    lnglat: [117.7, 34.3],
  },
  //南通
  dc_city_nt: {
    name: isZh ? "南通市" : "NanTong",
    lnglat: [121.04311185653376, 32.3],
  },
  //盐城
  dc_city_yc: {
    name: isZh ? "盐城市" : "YanCheng",
    lnglat: [120.09626059689305, 33.6],
  },
  //无锡
  dc_city_wx: {
    name: isZh ? "无锡市" : "WuXi",
    lnglat: [120.4, 31.692847771507502],
  },
  //常州
  dc_city_cz: {
    name: isZh ? "常州市" : "ChangZhou",
    lnglat: [119.85, 31.75],
  },
  //淮安
  dc_city_ha: {
    name: isZh ? "淮安市" : "HuaiAn",
    lnglat: [119.1, 33.5],
  },
  //连云港
  dc_city_lyg: {
    name: isZh ? "连云港市" : "LianYunGang",
    lnglat: [119.07289610415165, 34.6],
  },
};

const guGanLngLat = {
  name: isZh ? "骨干电网输入电量" : "GuGanDianWang",
  lnglat: [116.7, 32],
}

const jiangsuCityMarkerLngLat = {
  //苏州
  dc_city_sz: {
    name: isZh ? "苏州市" : "SuZhou",
    lnglat: [120.726279, 31.4],
  },
  //泰州
  dc_city_tz: {
    name: isZh ? "泰州市" : "TaiZhou",
    lnglat: [120.1, 32.509155],
  },
  //扬州
  dc_city_yz: {
    name: isZh ? "扬州市" : "YangZhou",
    lnglat: [119.49, 32.694210],
  },
  //南京
  dc_city_nj: {
    name: isZh ? "南京市" : "NanJing",
    lnglat: [118.9, 31.8],
  },
  //镇江
  dc_city_zj: {
    name: isZh ? "镇江市" : "ZhenJiang",
    lnglat: [119.5, 32.05],
  },
  //宿迁
  dc_city_sq: {
    name: isZh ? "宿迁市" : "SuQian",
    lnglat: [118.5, 33.763232],
  },
  //徐州
  dc_city_xz: {
    name: isZh ? "徐州市" : "XuZhou",
    lnglat: [117.55, 34.3],
  },
  //南通
  dc_city_nt: {
    name: isZh ? "南通市" : "NanTong",
    lnglat: [120.994291, 32.15],
  },
  //盐城
  dc_city_yc: {
    name: isZh ? "盐城市" : "YanCheng",
    lnglat: [120.163561, 33.5],
  },
  //无锡
  dc_city_wx: {
    name: isZh ? "无锡市" : "WuXi",
    lnglat: [120.3, 31.6],
  },
  //常州
  dc_city_cz: {
    name: isZh ? "常州市" : "ChangZhou",
    lnglat: [119.52, 31.6],
  },
  //淮安
  dc_city_ha: {
    name: isZh ? "淮安市" : "HuaiAn",
    lnglat: [119.015285, 33.310353],
  },
  //连云港
  dc_city_lyg: {
    name: isZh ? "连云港市" : "LianYunGang",
    lnglat: [119.221611, 34.6],
  },
};

export { areaLngLat, proLngLat, outProLngLat, zoneLngLat, jiangsuCityLngLat, jiangsuCityCodeLngLat, jiangsuCityMarkerLngLat, guGanLngLat };
