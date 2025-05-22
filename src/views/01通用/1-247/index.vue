<template>
  <div class="about">
    <button @click="exportClick">an</button>
    <div id="main">
    <div class="article">
        <h1 class="title" style="text-align: center;">我是标题</h1>
        <div class="content">
            <h2 style="color: skyblue;text-align: center;">《滕王阁序》</h2>
            <p>
                豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。时维九月，序属三秋。潦水尽而寒潭清，烟光凝而暮山紫。俨骖騑于上路，访风景于崇阿；临帝子之长洲，得天人之旧馆。层峦耸翠，上出重霄；飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，即冈峦之体势。
            </p>
            <p>
                披绣闼，俯雕甍，山原旷其盈视，川泽纡其骇瞩。闾阎扑地，钟鸣鼎食之家；舸舰弥津，青雀黄龙之舳。云销雨霁，彩彻区明。落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；雁阵惊寒，声断衡阳之浦。
            </p>
        </div>
    </div>
    <table>
        <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
        </tr>
    </table>
</div>
  </div>
</template>

<script>
//npm install --save file-saver
//
import htmlDocx from 'html-docx-js/dist/html-docx';
import saveAs from 'file-saver';
export default {
  methods: {
    css2Style(contentNode) {
        const len = document.styleSheets.length;
        for (let sheetInd = 0; sheetInd < len; sheetInd++) {
            const cssRules = document.styleSheets[sheetInd].cssRules;
            for (let cssInd = 0; cssInd < cssRules.length; cssInd++) {
                const selectorText = cssRules[cssInd].selectorText;
                // const reg = /^([a-z]|\.|\#).+/;
                // if (!selectorText || !reg.test(selectorText)) continue;
                const size = cssRules[cssInd] && cssRules[cssInd].styleMap && cssRules[cssInd].styleMap.size || 0;
                const domList = contentNode.querySelectorAll(selectorText);
                for (let domInd = 0; domInd < domList.length; domInd++) {
                    const dom = domList[domInd];
                    for (let styleInd = 0; styleInd < size; styleInd++) {
                        const styleName = cssRules[cssInd].style[styleInd];
                        dom.style[styleName] = cssRules[cssInd].style[styleName];
                    }
                }
            }
        }
        return contentNode;
    },
    exportClick() {
     let node = document.getElementById('main').cloneNode(true);
     node = this.css2Style(node);
     console.log('node: ', node);
      var content = node.innerHTML;
      var page = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>' + content + '</body></html>'
      var converted = htmlDocx.asBlob(page);
      // 用 FielSaver.js里的保存方法 进行输出
      saveAs(converted, 'test.docx');
    }
  }
}
</script>
<style>
    .down_load{
        width: 90px;
        height: 36px;
        background-color: red;
        text-align: center;
        line-height: 36px;
        color: white;
        position: fixed;
        right: 50px;
        top: 100px;
        z-index: 1999;
    }
    table{
        border-collapse:collapse;
    }
    td{
        border: solid 1px black;
    }
    p{
        text-indent: 2em;
    }
</style>