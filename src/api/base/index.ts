import request from '/@/utils/request';

/**
 * 基础数据接口
 */
export function baseApi() {
	let baseZoneUrl = '/dev-api/system/info';
	let baseStationUrl = '/dev-api/tStationSystem/tsInfo';
	let baseOutputStationUrl = '/dev-api/tPowerSystem/data';
	return {
		//新增台区信息
		addZone: (data?: object) => {
			return request({
				url: baseZoneUrl + '/add',
				method: 'post',
				data,
			});
		},
		//修改台区信息
		editZone: (data?: object) => {
			return request({
				url: baseZoneUrl + '/edit',
				method: 'post',
				data,
			});
		},
		//删除台区信息
		removeZone: (data?: object) => {
			return request({
				url: baseZoneUrl + '/remove',
				method: 'post',
				data,
			});
		},
		//台区分页列表数据接口
		queryZone: (params?: object) => {
			return request({
				url: baseZoneUrl + '/list',
				method: 'get',
				params,
			});
		},
		//台区信息导入
		importZone: (data?: object) => {
			return request({
				url: baseZoneUrl + '/importData',
				method: 'post',
				data,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		},
		//台区模版下载
		exportZone: () => {
			return request({
				url: baseZoneUrl + '/downTemplate',
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
				},
				responseType: 'blob',
			});
		},
		//下载所属组织模版文件
		exportOrganization: () => {
			return request({
				url: baseZoneUrl + '/downTemplateDept',
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
				},
				responseType: 'blob',
			});
		},

		//------------------------------------------------------------------

		//新增电站信息
		addStation: (data?: object) => {
			return request({
				url: baseStationUrl + '/add',
				method: 'post',
				data,
			});
		},
		//修改电站信息
		editStation: (data?: object) => {
			return request({
				url: baseStationUrl + '/edit',
				method: 'post',
				data,
			});
		},
		//删除电站信息
		removeStation: (data?: object) => {
			return request({
				url: baseStationUrl + '/remove',
				method: 'post',
				data,
			});
		},
		//电站分页列表数据接口
		queryStation: (params?: object) => {
			return request({
				url: baseStationUrl + '/list',
				method: 'get',
				params,
			});
		},
		//电站信息导入
		importStation: (data?: object) => {
			return request({
				url: baseStationUrl + '/importData',
				method: 'post',
				data,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		},
		//电站模版下载
		exportStation: () => {
			return request({
				url: baseStationUrl + '/downTemplate',
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
				},
				responseType: 'blob',
			});
		},

		//------------------------------------------------------------------
		//电站出力信息--树信息
		getTreeData: (data?: object) => {
			return request({
				url: baseStationUrl + '/getZoneStationTree',
				method: 'post',
				data,
			});
		},
		//电站出力信息--表格信息
		queryOutput: (params?: object) => {
			return request({
				url: baseOutputStationUrl + '/list',
				method: 'get',
				params,
			});
		},
		//新增出力信息
		addOutput: (data?: object) => {
			return request({
				url: baseOutputStationUrl + '/add',
				method: 'post',
				data,
			});
		},
		//修改出力信息
		editOutput: (data?: object) => {
			return request({
				url: baseOutputStationUrl + '/edit',
				method: 'post',
				data,
			});
		},
		//移除电站出力
		removeOutput: (data?: object) => {
			return request({
				url: baseOutputStationUrl + '/remove',
				method: 'post',
				data,
			});
		},
		//电站出力信息导入
		importOutput: (data?: object) => {
			return request({
				url: baseOutputStationUrl + '/importData',
				method: 'post',
				data,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		},
		//电站出力信息模版下载
		exportOutput: () => {
			return request({
				url: baseOutputStationUrl + '/downTemplate',
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
				},
				responseType: 'blob',
			});
		},
	};
}
