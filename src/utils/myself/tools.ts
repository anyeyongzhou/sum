/**
 *
 * @param obj 传入对象
 * @param objValue 对象中的对象名
 * 通过这个函数会置空表单
 */
export function toEmptyStr(obj: any, objValue: string | number | symbol) {
  if (
    obj[objValue] === "" ||
    obj[objValue] === undefined ||
    obj[objValue] === null
  ) {
    obj[objValue] = "";
  }
}

// 2 防抖
/**
 *
 * @param fn 回调函数
 * @param t 延迟毫秒数
 */
export function DebounceBy(fn: Function, t: number) {
  let delay = t || 500;

  let timer: boolean = false;
  return function () {
    let args = arguments;
    let y: any;
    if (timer) {
      // 每当用户触发事件就把前一个 setTimeout 清楚掉
      clearTimeout(y);
    }
    let callNow = !timer;
    y = setTimeout(() => {
      timer = false;
    }, delay);
    if (callNow) fn.apply(this, args);
  };
}
// 3 节流
// 用法与防抖类似
export function throttle(fn: Function, delay: number) {
  // 设置一个触发开关
  let canUse: boolean = true;
  return function () {
    //如果为true，就触发技能，否则就不能触发
    if (canUse) {
      fn.apply(this, arguments);
      //触发技能后，关闭开关
      canUse = false;
      //在3秒后打开开关
      setTimeout(() => (canUse = true), delay);
    }
  };
}

// 判断对象是否相等
function recursiveComparison(objA: any, objB: any, flag: boolean) {
  for (let key in objA) {
    // 如果objA的key不存在objB中,比较结果为false
    if (!objB.hasOwnProperty(key)) flag = false;
    // 递归调用compareDeeply,进行比较
    flag = compareDeeply(objA[key], objB[key]);
    // 当每一次递归调用递归compareDeeply的结果为false时，跳出循环
    if (!flag) break;
  }
  return flag;
}
const utils = {
  isArray: (value: any) => Array.isArray(value),
  isObject: (value: any) => typeof value === "object",
  getLength: (value: any) => {
    if (utils.isArray(value)) return value.length;
    if (utils.isObject(value)) return Object.keys(value).length;
  },
};
/**
 *
 * @param objA 对象1
 * @param objB 对象2
 * @returns 相等为 true，否则是 false
 * 抛出的是 compareDeeply 函数
 * 注：以上不适用于含有 null、undefined、function 类型的对象或者数组
 */
export const compareDeeply = (objA: object, objB: object) => {
  // 如果objA和objB的类型不全为Object,比较结果为两者严格相等===
  if (!utils.isObject(objA) || !utils.isObject(objB)) return objA === objB;
  // objA和objB都是Object，先判断类型是否全为Object或者Array
  if (objA.constructor !== objB.constructor) return false;
  // objA和objB都是Object,先比较两个obj的长度
  if (utils.getLength(objA) !== utils.getLength(objB)) return false;
  // 执行到此处时，说明要比较的两个对象的长度相等，类型为object / array
  return recursiveComparison(objA, objB, true);
};

/**
 *
 * @param arr 数组
 * @param val 原有的唯一标识（后台想要取得的value）
 * 取子集，转化为elementui的树状结构 el-cascader
 */
export function ifChild(arr: Array<any>, val: string | number = "id") {
  arr.forEach((it: any) => {
    it.value = it[val];
    if (it.children.length != 0) {
      this.ifChild(it.children);
    } else {
      delete it.children; // 有children会触发的是后面的级联
    }
  });
}

/**
 *
 * @param arr 数组
 * @param str 子集在数组对象中的名称，比如children
 * @returns 默认去取第一项不带children的最下层那项
 */
export function findChildItem(arr: Array<any>, str: string) {
  let t = arr[0];
  if (t[str] && t[str].length) {
    t = findChildItem(arr[0][str], str);
  }
  return t;
}

/**
 *
 * @param arr 数组
 * @param props 数组中已知属性
 * @param val 带筛选的已知属性的值
 * @returns 返回带有这个属性的数组的当前项
 */
export function findprop(
  arr: Array<any>,
  props: string,
  val: any
): { id?: string; [key: string]: any } {
  let uu = {};
  arr.forEach(it => {
    if (it[props] === val) {
      uu = it;
    }
  });
  return uu;
}

/**
 *
 * @param obj 表单对象
 * @param fn 执行清空表单后，进行的回调函数
 * 重置表单专用
 */
export async function resetForm(obj: any, fn: Function = () => {}) {
  for (let i in obj) {
    if (obj[i] === null || obj[i] === undefined) {
      obj[i] = "";
    }
    switch (obj[i].constructor) {
      case Array:
        obj[i] = [];
        break;
      case Object:
        obj[i] = {};
        break;
      default:
        obj[i] = "";
        break;
    }
  }
  await fn();
}

// // 7

/**
 *
 * @param arr 目标对象数组
 * @param objName 重复出现的对象名
 * @param objID 数组对象中的唯一标识
 * @returns 将目标对象数组中，根据出现过的重复对象名，拿出他们的 objID（唯一标识），并且存放在对应对象的数组中
 */
export function packRepeatItemsToObj(
  arr: Array<any>,
  objName: string | number,
  objID: string | number
) {
  var obj: any = {};
  arr.forEach(it => {
    if (!obj[it[objName]]) {
      obj[it[objName]] = [it[objID]];
    } else {
      obj[it[objName]].push(it[objID]);
    }
  });
  return obj;
}
// // 示例
// var y = [{
//   aa: 12,
//   type: "ee",
//   id: "gu129e"
// }, {
//   aa: 122,
//   type: "ee",
//   id: "gu119e"
// }, {
//   aa: 102,
//   type: "ee",
//   id: "934eff"
// }, {
//   aa: 12,
//   type: "e5e",
//   id: "934e11f"
// }, {
//   aa: 12,
//   type: "ee",
//   id: "93fase"
// }, {
//   aa: 12,
//   type: "w0ee",
//   id: "fds34e"
// }, {
//   aa: 12,
//   type: "ee",
//   id: "t53fde"
// }, ]
/* 结果：
// var t = {
//   ee: ["gu129e","gu119e","934eff","93fase","t53fde"],
//   e5e: ["934e11f"],
//   w0ee: ["fds34e"]
// }
*/

/**
 *
 * @param rgbStr rgb颜色
 * @returns 16进制
 * RGB颜色转换为16进制
 * 例：colorHex("rgb(52,83,139)"))	// #17f538
 */
export function colorHex(rgbStr: string) {
  //十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(rgbStr)) {
    const aColor = rgbStr.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    let strHex = "#";
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16);
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = rgbStr;
    }
    return strHex;
  } else if (reg.test(rgbStr)) {
    const aNum = rgbStr.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return rgbStr;
    } else if (aNum.length === 3) {
      let numHex = "#";
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += aNum[i] + aNum[i];
      }
      return numHex;
    }
  } else {
    return rgbStr;
  }
}

/**
 *
 * @param colorStr 十六进制颜色
 * @returns rgb颜色
 * 16进制颜色转换为RGB
 * 例子：colorRgb("#34538b")	// rgb(52,83,139)
 */
export function colorRgb(colorStr: string) {
  //十六进制颜色值的正则表达式
  const reg: RegExp = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let sColor: string = colorStr.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值f
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return "rgb(" + sColorChange.join(",") + ")";
  } else {
    return sColor;
  }
}

interface T {
  temperature: any;
  [key: string]: any; // 使用索引签名，允许动态的属性名及其对应的类型
}

/**
 *
 * @param obj 对象（类数组）形式
 * @returns
 */
export function mergeArrays(a: any, b: any, plus: string = "") {
  let result: any = [];

  let tempValues: any = {};

  a.forEach((obj: any) => {
    let tempKey = Object.keys(obj)[0];
    let tempObj: any = obj[tempKey];

    Object.entries(tempObj).forEach(([key, value]) => {
      if (tempValues[key]) {
        tempValues[key][tempKey] = value;
      } else {
        tempValues[key] = {
          [tempKey]: value,
        };
      }
    });
  });

  let tempKeys = Object.keys(tempValues);

  tempKeys.forEach((it: any) => {
    let tempObj: T = {
      temperature: it + plus,
    };

    b.forEach((key: string | number) => {
      tempObj[key] = tempValues[it][key.toString()] || null;
    });
    result.push(tempObj);
  });

  return result;
}

/*
	let a = [
	  {
		0: {
		  1: "1",
		  3: "1",
		  5: "1",
		  7: "1",
		  10: "1",
		  14: "1",
		  0.1: "1",
		  0.5: "1",
		  0.01: "1",
		},
	  },
	  {
		40: {
		  1: "167.2",
		  3: "167.2",
		  5: "167.2",
		  7: "167.2",
		  10: "167.2",
		  14: "167.2",
		  0.1: "167.2",
		  0.5: "167.2",
		  0.01: "167.2",
		},
	  },
	  {
		20: {
		  1: "83.6",
		  3: "83.6",
		  5: "83.6",
		  7: "83.6",
		  10: "83.6",
		  14: "83.6",
		  0.1: "83.6",
		  0.5: "83.6",
		  0.01: "83.6",
		},
	  },
	  {
		10: {
		  1: "42",
		  3: "42",
		  5: "42",
		  7: "42",
		  10: "42",
		  14: "42",
		  0.1: "42",
		  0.5: "42",
		  0.01: "42",
		},
	  },
	];
	let b = [0, 10, 20, 40];

	let mergedArray = mergeArrays(a, b);
	// //////////
	[
	  {
		0: "1",
		10: "42",
		20: "83.6",
		40: "167.2",
		temperature: "1",
	  },
	  {
		0: "1",
		10: "42",
		20: "83.6",
		40: "167.2",
		temperature: "3",
	  },
	  {
		0: "1",
		10: "42",
		20: "83.6",
		40: "167.2",
		temperature: "5",
	  },
	  {
		0: "1",
		10: "42",
		20: "83.6",
		40: "167.2",
		temperature: "7",
	  },
	  {
		0: "1",
		10: "42",
		20: "83.6",
		40: "167.2",
		temperature: "10",
	  },
	  {
		0: "1",
		10: "42",
		20: "83.6",
		40: "167.2",
		temperature: "14",
	  },
	  {
		0: "1",
		10: "42",
		20: "83.6",
		40: "167.2",
		temperature: "0.1",
	  },
	  {
		0: "1",
		10: "42",
		20: "83.6",
		40: "167.2",
		temperature: "0.5",
	  },
	  {
		0: "1",
		10: "42",
		20: "83.6",
		40: "167.2",
		temperature: "0.01",
	  },
	];
	// ///////////

*/

/**
 *
 * @param arr
 * @returns 针对于上个函数的反解
 */
export function mergeObjects(arr: any, plus: string = "") {
  let result: Array<any> = [];
  arr.forEach((obj: any) => {
    let temp = obj.temperature.replace(plus, "");

    Object.entries(obj).forEach(([key, value]) => {
      if (key !== "temperature") {
        let existingObj = result.find(item => item.hasOwnProperty(key));

        if (existingObj) {
          existingObj[key][temp] = value;
        } else {
          let newObj = {
            [key]: {
              [temp]: value,
            },
          };
          result.push(newObj);
        }
      }
    });
  });
  return result;
}
