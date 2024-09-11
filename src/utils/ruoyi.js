/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/');
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}

// 添加日期范围
export function addDateRange(params, dateRange) {
  var search = params;
  search.beginTime = "";
  search.endTime = "";
  if (null != dateRange && '' != dateRange) {
    search.beginTime = dateRange[0];
    search.endTime = dateRange[1];
  }
  return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  var actions = [];
  Object.keys(datas).some((key) => {
    if (datas[key].dictValue == ('' + value)) {
      actions.push(datas[key].dictLabel);
      return true;
    }
  })
  return actions.join('');
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
  var actions = [];
  var currentSeparator = undefined === separator ? "," : separator;
  var temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some((val) => {
    Object.keys(datas).some((key) => {
      if (datas[key].dictValue == ('' + temp[val])) {
        actions.push(datas[key].dictLabel + currentSeparator);
      }
    })
  })
  return actions.join('').substring(0, actions.join('').length - 1);
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments, flag = true, i = 1;
  str = str.replace(/%s/g, function () {
    var arg = args[i++];
    if (typeof arg === 'undefined') {
      flag = false;
      return '';
    }
    return arg;
  });
  return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  if (!str || str == "undefined" || str == "null") {
    return "";
  }
  return str;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
  id = id || 'id'
  parentId = parentId || 'parentId'
  children = children || 'children'
  rootId = rootId || Math.min.apply(Math, data.map(item => { return item[parentId] })) || 0
  //对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data))
  //循环所有项
  const treeData = cloneData.filter(father => {
    let branchArr = cloneData.filter(child => {
      //返回每一项的子级数组
      return father[id] === child[parentId]
    });
    branchArr.length > 0 ? father.children = branchArr : '';
    //返回第一层
    return father[parentId] === rootId;
  });
  return treeData != '' ? treeData : data;
}

export function valid(value, number = 32) {
  value = value.replace(/[`～*~@#$^&*——<>\+={}|/'\\[\]~@#￥&*――\+={}|【】‘]/g, '').replace(/\s/g, "");
  if (value.length > number) {
    this.$message1({
      type: "warning",
      message: `输入内容不能超过${number}个字符`
    });
    // return value.substring(0,number);
    return value.slice(0, number);
  }
  return value;
};

export function validSe(value, number = 32) {
  value = value.replace(/[`～*~!@#$%^&*()——<>\+=?:"{}|,./;'\\[\]・~！@#￥%……&*（）――\+={}|《》？：“”【】\-\_、；‘'，。、]/g, '').replace(/\s/g, "");
  if (value.length > number) {
    this.$message1({
      type: "warning",
      message: `输入内容不能超过${number}个字符`
    });
    // return value.substring(0,number);
    return value.slice(0, number);
  }
  return value;
};

export function validTi(value, number = 32) {
  value = value.replace(/[`*@#$^&*<>\+={}|/'\\[\]@#￥&*\+={}|【】‘]/g, '').replace(/\s/g, "");
  if (value.length > number) {
    this.$message1({
      type: "warning",
      message: `输入内容不能超过${number}个字符`
    });
    // return value.substring(0,number);
    return value.slice(0, number);
  }
  return value;
};

export function validatorNum(rule, value, callback) {
  if (value) {
    if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
      callback(new Error("请输入数字值"));
    }
    if (String(value).indexOf(".") == -1) {
      if (value.length > 8) {
        return callback(new Error(rule.name + "若为整数，不能超过8位"));
      }
    }
    if (String(value).indexOf(".") > -1) {
      if (String(value).split(".")[1].length > 2) {
        return callback(new Error(rule.name + "小数点后不能超过2位"));
      }
      if (String(value).split(".")[0].length > 8) {
        return callback(new Error(rule.name + "小数点前不能超过8位"));
      }
    }
    callback();
  } else {
    callback();
  }
};

//经度校验规则
export function validatorLng(rule, value, callback) {
  if (value) {
    if (!/^-?([1]?[0-7]?[0-9]|[8][0-0])(\.[0-9]{1,6})?$/.test(value)) {
      callback(new Error("请输入-180.0~+180.0之间的值,且小数点后最大6位"));
    }
    callback();
  } else {
    callback();
  }
};

//纬度校验规则
export function validatorLat(rule, value, callback) {
  if (value) {
    if (!/^-?([0-8]?[0-9](\.[0-9]{1,6})?|90(\.0{1,6})?)$/.test(value)) {
      callback(new Error("请输入-90.0~+90.0之间的值,且小数点后最大6位"));
    }
    callback();
  } else {
    callback();
  }
};

//电话号码规则
export function validatorTelphone(rule, value, callback) {
  if (value) {
    if (!/^((12[0-9])|(13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0|1,5-9]))\d{8}$/.test(value)) {
      callback(new Error("请输入正确的手机号码"));
    }
    callback();
  } else {
    callback();
  }
};

//正数，小数点前后不限制
export function validatorNumPositive(rule, value, callback) {
  if (value) {
    if (!/^\d*(\.\d+)?$/.test(value)) {
      callback(new Error("请输入正数"));
    }
    callback();
  } else {
    callback();
  }
};

export function validatorMinusNum(rule, value, callback) {
  if (value) {
    if (!/^(-?\d+(\.\d+)?)$/.test(value)) {
      callback(new Error("请输入数字值"));
    }
    if (String(value).indexOf(".") == -1) {
      if (value.length > 8) {
        return callback(new Error(rule.name + "若为整数，不能超过8位"));
      }
    }
    if (String(value).indexOf(".") > -1) {
      if (String(value).split(".")[1].length > 2) {
        return callback(new Error(rule.name + "小数点后不能超过2位"));
      }
      if (String(value).split(".")[0].length > 8) {
        return callback(new Error(rule.name + "小数点前不能超过8位"));
      }
    }
    callback();
  } else {
    callback();
  }
};

//同环比
export function validatorYoyQoq(rule, value, callback) {
  if (value) {
    if (!/^-?\d+(\.\d+)?$/.test(value)) {
      callback(new Error("请输入正确的值"));
    }
    if (String(value).indexOf(".") == -1) {
      if (value.length > 4) {
        return callback(new Error(rule.name + "若为整数，不能超过4位"));
      }
    }
    if (String(value).indexOf(".") > -1) {
      if (String(value).split(".")[1].length > 4) {
        return callback(new Error(rule.name + "小数点后不能超过4位"));
      }
      if (String(value).split(".")[0].length > 4) {
        return callback(new Error(rule.name + "小数点前不能超过4位"));
      }
    }
    callback();
  } else {
    callback();
  }
};

export function validatorNumMust(rule, value, callback) {
  if (value) {
    if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
      callback(new Error("请输入数字值"));
    }
    if (String(value).indexOf(".") == -1) {
      if (value.length > 8) {
        return callback(new Error(rule.name + "若为整数，不能超过8位"));
      }
    }
    if (String(value).indexOf(".") > -1) {
      if (String(value).split(".")[1].length > 2) {
        return callback(new Error(rule.name + "小数点后不能超过2位"));
      }
      if (String(value).split(".")[0].length > 8) {
        return callback(new Error(rule.name + "小数点前不能超过8位"));
      }
    }
    callback();
  } else {
    return callback(new Error(rule.name + "不能为空"));
  }
};
