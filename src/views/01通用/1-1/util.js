// 获取dom元素的padding值
function getPadding(el) {
  const domCss = window.getComputedStyle(el, null);
  const pl = Number.parseInt(domCss.paddingLeft, 10) || 0;
  const pr = Number.parseInt(domCss.paddingRight, 10) || 0;
  console.log("padding-left:", pl, "padding-right:", pr);
  return {
    left: pl,
    right: pr,
  };
}

// 检测dom元素的宽度，
export function checkLength(dom) {
  // 创建一个 Range 对象
  const range = document.createRange();

  // 设置选中文本的起始和结束位置
  range.setStart(dom, 0), range.setEnd(dom, dom.childNodes.length);

  // 获取元素在文档中的位置和大小信息,这里直接获取的元素的宽度
  let rangeWidth = range.getBoundingClientRect().width;

  // 获取的宽度一般都会有多位小数点，判断如果小于0.001的就直接舍掉
  const offsetWidth = rangeWidth - Math.floor(rangeWidth);
  if (offsetWidth < 0.001) {
    rangeWidth = Math.floor(rangeWidth);
  }

  // 获取元素padding值
  const { left, right } = getPadding(dom);
  const paddingWidth = left + right;

  // status：文本内容是否超出标题盒子；
  // width: 标题盒子真实能够容纳文本内容的宽度
  return {
    status: paddingWidth + rangeWidth > dom.clientWidth,
    width: dom.clientWidth - paddingWidth,
  };
}

// 计算文本长度，当长度之和大于等于dom元素的宽度后，返回当前文字所在的索引，截取时会用到。
export function calcTextLength(text, width) {
  let realLength = 0;
  let index = 0;
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1;
    } else {
      realLength += 2 * 14; // 14是字体大小
    }
    // 判断长度，为true时终止循环，记录索引并返回
    if (realLength >= width) {
      index = i;
      break;
    }
  }
  return index;
}
