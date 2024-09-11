import request from '/@/utils/request';
import {UnwrapRef} from "vue-demi";

export function homeApi() {
	return {
		// 首页-装备统计
		deviceStatistics: () => {
			return request({
				url: '/jeecg-boot/transformer/homePage/deviceStatistics',
				method: 'post',
			});
		},
		// 首页-gis-地图获取装备类型
		getDeviceType: () => {
			return request({
				url: '/jeecg-boot/transformer/homePage/getDeviceType',
				method: 'post',
			});
		},
		// 首页-gis-地图地图统计
		accordingToMapStatistics: (data: { deviceTypes:any }) => {
			return request({
				url: '/jeecg-boot/transformer/homePage/accordingToMapStatistics',
				method: 'post',
				data,
			});
		},
		// 首页-装备测试
		getDeviceTest: (data: { type: UnwrapRef<string> }) => {
			return request({
				url: '/jeecg-boot/transformer/homePage/getDeviceTest',
				method: 'post',
				data,
			});
		},
		// 首页-数据统计
		findOnAllDataCount: ({}) => {
			return request({
				url: '/jeecg-boot/transformer/tdengine/findOnAllDataCount',
				method: 'post',
			});
		},
		// 首页-数据统计
		findOnAllDataDayCount: (data: Object) => {
			return request({
				url: '/jeecg-boot/transformer/tdengine/findOnAllDataDayCount',
				method: 'post',
				data,
			});
		},
		// 首页-数据质量监控统计
		getStatisticsOnTheNumberOfQualityDevice: (data: Object) => {
			return request({
				url: '/jeecg-boot/transformer/tdengine/getStatisticsOnTheNumberOfQualityDevice',
				method: 'post',
				data,
			});
		},
	};
}
