import request from '/@/utils/request';

/**
 * 出力预测接口
 * @method queryZoneList 台区列表接口
 * @method queryStationList 电站列表接口
 * @method queryPowerList 功率曲线接口
 */
export function wetherApi() {
	const baseUrl = '/dev-api/system/info';
	return {
		//台区列表接口
		queryZoneList: (data: object) => {
			return request({
				url: baseUrl + '/getRegionList',
				method: 'post',
				data,
			});
		},
		//电站列表接口(获取所有电站)
		getStationList: (data: object) => {
			return request({
				url: '/dev-api/tStationSystem/tsInfo/stationList',
				method: 'post',
				data,
			});
		},
		//电站列表接口(获取台区下的电站)
		queryStationList: (data: object) => {
			return request({
				url: baseUrl + '/getRegionAndPowerById',
				method: 'post',
				data,
			});
		},
		//功率曲线接口
		queryPowerData: (data?: object) => {
			return request({
				url: baseUrl + '/getDataById',
				method: 'post',
				data,
			});
		},
	};
}
