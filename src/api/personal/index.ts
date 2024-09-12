import request from '/@/utils/request';

/**
 * 个人信息的设置接口
 * @method getPersonalInfo 获取用户信息
 * @method submmitPersonInfo 提交用户信息
 */
export function personalApi() {
	const personalUrl = '/dev-api/system/user';
	return {
		//获取用户信息
		getPersonalInfo: (params?: object) => {
			return request({
				url: '',
				method: 'get',
				params,
			});
		},
		//修改用户信息
		submitPersonInfo: (data: object) => {
			return request({
				url: personalUrl + '/profile',
				method: 'put',
				data,
			});
		},
		//修改密码
		modifyPwd: (data: object, dataStr: string) => {
			return request({
				url: personalUrl + '/profile/updatePwd?' + dataStr,
				method: 'put',
				data,
			});
		},
	};
}
