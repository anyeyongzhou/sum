<template>
	<div class="chart">
		<Chart :options="options" id="mapchart" @returnDom="returnDom" />
	</div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import Chart from './chart.vue';

const props = defineProps({
	geoCoordMap: {
		type: Object,
		default: () => ({}),
	},
	mapData: {
		type: Array,
		default: () => [],
	},
	symbolSize: {
		type: Array,
		default: () => [140, 60],
	},
	showUnit: {
		type: Boolean,
		default: false,
	},
	typeWidth: {
		type: Number,
		default: 65,
	},
});

const emit = defineEmits(['map']);

const charts = ref(null);
const options = ref({
	aspectScale: 0.85,
	tooltip: {
		show: false,
	},
	geo: {
		silent: true,
		map: 'js',
		show: false,
		top: '1%',
		label: {
			normal: {
				show: false,
				textStyle: {
					color: '#fff',
				},
			},
			emphasis: {
				textStyle: {
					color: '#fff',
				},
			},
		},
		roam: false,
	},
	series: [
		{
			map: 'js',
			silent: false,
			type: 'map',
			selectedMode: false,
			label: {
				normal: {
					show: false,
					formatter: (params) => {
						return `{img|${params.name}}`;
					},
					rich: {
						img: {
							width: 53,
							height: 20,
							align: 'center',
							fontSize: 16,
							padding: [0, 0, 0, 28],
							backgroundColor: {
								image:
									'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAAApCAYAAAAoEzflAAAAAXNSR0IArs4c6QAABXdJREFUeF7tnGtQE1cUx/8bHgFRCA+RCCIgESgSH5QRUWdAREsKpIAwai34KGj7xS+d1s502mmn7bSd+qGP6XRKawEd6zQgLxEU6mhFHCkKPqhEVGLCQwQ62BASTTbb2aWkUoFGZyPR3vtx8845Z89v77n3nL17KbBt8S5/ONI5YKilAOXKXSNtGjzA6EExLTAy+3Hp+y6KAyMwfw6KmjkN1hCVE3mAYYZhFrxBITrvbTCCOOIlO/MAZW6ksDRPAUrgYmemEXMYs4HCsp1VxBP26QECxz65cFYROM8CHMrHxc05xi9c4Os6m3IQOPL1TIzJbDL36/vvN91WMoOGYb7kPgtyrBo5LBiX5OBVlJPAyVYPzRjNRkNNZwMzYNDZSsfTJtcqOMLkoGgHsZvY1g9H9+p679Wozttaz9Mi3yo4rrkRL/AZyiZzDkObTfqiq7VPi/NsbadVcGZsj0yxtSFj8kf2tR15UrrsXQ+vcNycnLB2XiA2hYUjPiAAp7u7ceiaEsdvqaA1Gq3yBYHzj5t4gRMnnottkZGQBQVDJBSitf8OftFoEO8fgOg5c/Dn/fuoValQdLUNJ7u6poRE4PAIx9vFBeodeVBotfhJ2Y6S6x1oGxy0aAj39EKmRILNC8MQ5OGB8KJCaIa1kwIicHiC4yQQ4OuENchYEIqw4kL8YTBM6vRZzs7oyN2GevUtvFpfBwNNT9iXwOEBzlfxCciSLATr9Lz6OhxUtlukRvv64mdZCnKO1eJMb4/lepZEgn1J62EwmVB58yZ21B9/CBCBwwOcK1tyuPC0p6EBFwf6xzm5MlWOxMBANPb2IOlw6bh7kV7e+GjlSizy9kFo4T4CZ4oZ+LEXBH15O/HZ+WbsvTCaM3oKhZCIPLHczw+frFqNL1ovYPeSZXj3bCMaerpxY+guBgx6ru9rUik+iI3D7O++JXBsAid/F/aeb+YAxfqJUZueAUeKghlAc99trCktQbX8Jaye6w/B39dl5WUcKALHqqzCuqr0REkoG9aqVZ14q+E0PIRC1KVnIlQkQkKJYlyYi/D0wq9Z2dAMD2Pt4RJu0fB+7Aq8HB5Bwtp/MHrssFaZJofBRCP76GhCz4a1ijQ5Qtw98Nz+Ii63ETo4oD1nK/pGdEitrEC/fjSsFa5bj7luM7GubPx8xN4jCwIeFgTvLY9FfpQU834ogJlhOIm7lyzFm8/HQHqgGInzAlGvUePcxk34sa0NH//WZNF6fet2lF7v4EbdvxuBwwMcduI/kZkFeVUF6tVqTmJBYhJkwcHQm0wQu7mhb2QEbC50qrsLW2pruD5sNaEuIxMvVpRNWC0gcHiAw4po2rgZvTodB4ht3ALAPwCHlO34srUF+YukeCUigpuD4ksUXJ9DyTJEevsg6kDxhBGXwOEJjjxkAQ4my5BVfQRHVZ3wmzEDbPHzxt27Fg3zZ7nDaKbRo9NxxdBqefpDSeuDlAgcnuCwYhSyFKwQi5FQqkDH0NCk648gd3ec2pCNy4MDSKkon7QfgcMjHHdnZ5zckMWVcdKrKnHlgaLnmJowT0+Up6bBSJsRX6qYsgZH4PAIhxXFhrPyVDkkIhE+bDqHby5dxD2a5hYDO6OkYFd2aq0WqZXlXHibqhE4PMNhxbk6OnLJ5evSxaOfD64pwRY6QzxEKLh8Ge+cPYNhKz64ETiPCOdR9hBEeftgT0wMkgLn44RGjU+bm9HSf2fK0TJ2k6EZo77o92NWdf4fdLKqQkB230zPm2AVHLJvzY7hsKaRHZ9PHpBVI+fJm0U0cgOCHAGx3xeBwLFfNiAn2+wXzgg5E2q3cOiz5DS1PcKxnKZmjWOPuzuYcrn/EJDDu9OJawSgL8KEYvY/BH8BOgdlHEisr5gAAAAASUVORK5CYII=',
							},
						},
					},
					borderRadius: 10,
					textStyle: {
						color: '#fff',
					},
				},
			},
			top: '1%',
			roam: false,
			itemStyle: {
				normal: {
					areaColor: 'rgba(14, 79, 125,.1)',
					borderColor: '#ffffff',
					borderWidth: 2,
					shadowColor: '#00ffff',
					shadowOffsetX: 0,
					shadowOffsetY: 4,
					shadowBlur: 20,
				},
				emphasis: {
					areaColor: 'transparent',
					textStyle: {
						color: '#fff',
					},
				},
			},
		},
		{
			type: 'lines',
			zlevel: 5,
			effect: {
				show: false,
				symbolSize: 4,
			},
			lineStyle: {
				width: 14,
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 1,
					y2: 0,
					colorStops: [
						{
							offset: 0,
							color: 'rgb(0,255,255, 0.9)',
						},
						{
							offset: 0.3,
							color: 'rgb(0,255,255, 0.25)',
						},
						{
							offset: 0.7,
							color: 'rgb(0,255,255, 0.25)',
						},
						{
							offset: 1,
							color: 'rgb(0,255,255, 0.9)',
						},
					],
				},
				opacity: 1,
				curveness: 0,
			},
			label: {
				normal: {
					backgroundColor: {
						image:
							'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAAA0CAYAAAADvY9SAAAACXBIWXMAAAsTAAALEwEAmpwYAAACfUlEQVR4nO3cXUhTYRzH8d/znDPbBjbnmBIWRQVdzIuKrJvAQRAUoxgUkRClEF3Yi1E3jYywi6CoMChCGhJFzDIiahfRG7OrYlIEkwyLUpOiMZfT3Ot5usjB6saL1D8c/x84nPFwDvz43uzuiKq3Bko0AQiCzax8/iB0/UrpkV7yey2UOjt2ruVYpic8PsfTTMviWed0nOk8JaQYhtQeFM/l1L0SwN30k+5Ojj6zcrHoaKo9cA2GEQSwoXgup65b+c/90VT7iU9kC00sE3n49Vd3Rwj5fBjASuBP9FY1kapKtvhf0M4zt4mbl96lex49VrnsMwBuWfg+XJ4M7AmpXNaY9m32X1IXjkdysWifykzeF6JmeRP+/pNls0lIUbbe65Tg6HNLGSr76nlCTv8kmw0cngiHJ8LhiXB4IhyeCIcnwuGJcHgiHJ4IhyfC4YlweCIcngiHJ8LhiXB4IhyeCIcnwuGJcHgiHJ4IhyfC4YlweCIcngiHJ8LhiXB4IhyeCIcnwuGJcHgiHJ4IhyfC4YlI6LqgHjEfaa5Q7w1htY3lYtE49Zj5QFjKpHWTf4kmq2vK7bsPHSl8G4oVvnxIUQ8zO0dbcLt145bVWn7wY69WvXiRfeeBxmw08tpIxrPU48zK3nDYY623bS0MDfilezyQTl0OnMy9f/PS0RZslk53GfVAM7LU1jntO/bvNX6MNFhq64ZE8UNBcb9nacXFe12QUhtt9l2HMhTxVtMQNrtW2fH0KHTLbbnQeRoAROkXmhKN9WsqznfdUdnMpBpPJol2mo5wuFzS4RoRVttmAAr4JzwA/Gzd51vg3baLYqBZ6Ss8/fqyVVcBJIpnvwERLbaOWdKrEgAAAABJRU5ErkJggg==',
					},
					padding: [2, 10],
					show: false,
					formatter: function (params) {
						if (params.data.type[0] == 1) {
							let name = '区域:';
							let name1 = '重点企业:';
							return `{area|${params.name}}:{carbonValue|${params.data.type[1]}}\n{area|${name1}}:{carbonValue|${params.data.type[2]}}`;
						} else {
							return '';
						}
					},
					rich: {
						area: {
							color: '#fff',
							width: 50,
							padding: [5, 2],
						},
						carbonValue: {
							color: '#f7d134',
						},
					},
				},
			},
		},
		{
			type: 'scatter',
			coordinateSystem: 'geo',
			geoIndex: 0,
			zlevel: 5,
			label: {
				normal: {
					position: 'top',
					offset: [0, 0],
					show: true,
					formatter: function (params) {
						return `{carbonValue|${params.data[3]}}`;
					},
					rich: {
						area: {
							color: '#c1e8f4',
							fontSize: 12,
						},
						carbonValue: {
							color: '#fff',
							fontSize: 14,
						},
						carbonValue1: {
							color: '#f7d134',
							fontSize: 12,
						},
					},
				},
			},
			symbol: 'circle',
			symbolSize: [14, 4],
			itemStyle: {
				color: 'rgb(0,255,255, 0.9)',
				opacity: 1,
			},
		},
		{
			type: 'scatter',
			coordinateSystem: 'geo',
			geoIndex: 0,
			zlevel: 4,
			label: {
				formatter: '{b}',
				position: 'bottom',
				color: 'rgba(0,255,255, 1)',
				fontSize: 12,
				distance: 5,
				show: true,
			},
			symbol: 'circle',
			symbolSize: [14, 4],
			itemStyle: {
				color: 'rgb(0,255,255, 0.9)',
				opacity: 1,
			},
			silent: true,
		},
	],
});

const lineMaxHeight = computed(() => {
	const maxValue = Math.max(...props.mapData.map((item) => item.value));
	return 0.14 / maxValue;
});

const lineData = computed(() => {
	let tempArray = [];
	props.mapData.forEach((item) => {
		if (props.geoCoordMap[item.name]) {
			tempArray.push({
				coords: [
					props.geoCoordMap[item.name],
					[props.geoCoordMap[item.name][0], props.geoCoordMap[item.name][1] + item.value * lineMaxHeight.value],
				],
				type: [1, item.value, item.value1, item.name],
			});
		}
	});
	return tempArray;
});

const scatterData = computed(() => {
	let tempArray = [];
	let total = props.mapData.reduce((prev, item) => {
		if (item.value) {
			prev += item.value * 1;
		}
		return prev;
	}, 0);
	let tempRateTotal = 0;

	props.mapData.forEach((item, index) => {
		if (props.geoCoordMap[item.name]) {
			let rate = 0;
			if (item.value && index <= props.mapData.length - 2) {
				rate = parseFloat((item.value * 100) / total).toFixed(2);
				tempRateTotal = tempRateTotal + rate * 1;
			} else if (index === props.mapData.length - 1) {
				rate = parseFloat(100 - tempRateTotal).toFixed(2);
			}
			tempArray.push([
				props.geoCoordMap[item.name][0],
				props.geoCoordMap[item.name][1] + item.value * lineMaxHeight.value,
				1,
				item.value,
				rate,
			]);
		}
	});
	return tempArray;
});

const scatterData2 = computed(() => {
	let tempArray = [];
	props.mapData.forEach((item) => {
		if (props.geoCoordMap[item.name]) {
			tempArray.push({ name: item.name, value: props.geoCoordMap[item.name] });
		}
	});
	return tempArray;
});

watch(
	() => props.mapData,
	(newData) => {
		if (newData && newData.length > 0) {
			options.value.series[1].data = lineData.value;
			options.value.series[2].data = scatterData.value;
			options.value.series[3].data = scatterData2.value;
		}
	},
	{ immediate: true }
);

const returnDom = (e) => {
	charts.value = e;
	if (charts.value) {
		charts.value.on('click', (res) => {
			if (res.componentSubType === 'lines' && res.data.type[3]) {
				emit('map', res.data.type[3]);
			} else if (res.componentSubType === 'map' && res.name !== '') {
				emit('map', res.name);
			}
		});
	}
};
</script>

<style scoped lang="scss">
.chart {
	width: 100%;
	height: 100%;
	border: 1px solid green;
}
</style>
