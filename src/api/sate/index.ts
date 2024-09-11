import request from '/@/utils/request';

/**
 * 卫星云图接口
 * @method querySatePicture 获取卫星云图图片接口
 */
export function sateApi() {
	const baseUrl = '/dev-api/system/info';
	return {
		//获取卫星云图图片
		querySatePicture: (data: object) => {
			return request({
				url: baseUrl + '/getImgUrlByDate',
				method: 'post',
				data,
			});
		},
	};
}
