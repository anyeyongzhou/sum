// 江苏 和 城市数据
import changzhou from './city-data-changzhou.js'
import huaian from './city-data-huaian.js'
import lianyungang from './city-data-lianyungang.js'
import nanjing from './city-data-nanjing.js'
import nantong from './city-data-nantong.js'
import suqian from './city-data-suqian.js'
import suzhou from './city-data-suzhou.js'
import taizhou from './city-data-taizhou.js'
import wuxi from './city-data-wuxi.js'
import xuzhou from './city-data-xuzhou.js'
import yancheng from './city-data-yancheng.js'
import yangzhou from './city-data-yangzhou.js'
import zhenjiang from './city-data-zhenjiang.js'

import provinceFeatures from './data-province.js'

export default [changzhou, huaian, lianyungang, nanjing, nantong, suqian, suzhou, taizhou, wuxi, xuzhou, yancheng, yangzhou, zhenjiang]

const cityObj = {
  "dc_city_cz": changzhou,
  "dc_city_ha": huaian,
  "dc_city_lyg": lianyungang,
  "dc_city_nj": nanjing,
  "dc_city_nt": nantong,
  "dc_city_sq": suqian,
  "dc_city_sz": suzhou,
  "dc_city_tz": taizhou,
  "dc_city_wx": wuxi,
  "dc_city_xz": xuzhou,
  "dc_city_yc": yancheng,
  "dc_city_yz": yangzhou,
  "dc_city_zj": zhenjiang,
}

export {
  provinceFeatures,
  cityObj
}
