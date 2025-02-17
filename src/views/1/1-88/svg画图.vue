<template>
	<div class="home">
		<div id="svgContainer" style="width: 1920px; height: 1080px"></div>
		<div style="position: fixed; right: 50px; bottom: 10px">
			<svg id="mySvg" width="400" height="300">
				<g transform="translate(300, 250)">
					<line x1="0" y1="10" x2="20" y2="10" stroke="red" stroke-width="2" />
					<text x="30" y="15" font-family="Arial" font-size="12">主干线</text>

					<line x1="0" y1="40" x2="20" y2="40" stroke="blue" stroke-width="2" />
					<text x="30" y="45" font-family="Arial" font-size="12">大分支</text>
				</g>
			</svg>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import aaaSVG from './aaa.svg';

const svgContent = ref();

// 获取SvgDom中的Polyline Cge中的ObjjctID
function getSvgDomPolylineCgeObjId(metadata) {
	const gLinkRef = metadata.getElementsByTagName('cge:GLink_Ref');
	let ObjectIDS = [];
	for (let index = 0; index < gLinkRef.length; index++) {
		ObjectIDS.push(gLinkRef[index].getAttribute('ObjectID'));
	}
	return ObjectIDS;
}

const loadSvg = async () => {
	try {
		// 使用 Axios 获取 SVG 文件
		const response = await axios.get(aaaSVG, {
			responseType: 'text', // 确保获取文本格式
		});
		svgContent.value = response.data; // 将 SVG 内容赋值给 svgContent
		console.log('svgContent', svgContent.value);
		const svgContainer = document.getElementById('svgContainer');
		// 将 SVG 内容插入到 DOM 中
		const svgElement = document.createElement('div');

		svgElement.innerHTML = svgContent.value;
		console.log(svgElement.lastChild);

		svgContainer.appendChild(svgElement.lastChild);

		const polyline2 = svgContainer.querySelector('#PD_20100000_2103194 polyline');
		polyline2.classList.add('blue-highlight');
		polyline2.setAttribute('stroke-dasharray', 'none');
		// 获取特定 g 标签下的 polyline 元素
		const polyline = document.querySelector('#PD_20100000_2284004 polyline');
		// 修改 stroke-width 属性
		polyline.setAttribute('stroke-width', '10');
	} catch (error) {
		console.error('Error loading SVG:', error);
	}
};

onMounted(() => {
	loadSvg();
});
</script>

<style lang="scss" scoped>
.home {
	height: 110%;
	width: 100%;
	background-color: #fff;
	position: relative;
	overflow-y: scroll;
}
</style>
