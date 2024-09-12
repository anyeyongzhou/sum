import request from '/@/utils/request';

/**
 *
 * 登录api接口集合
 * @method login 用户登录
 * @method getInfo 获取用户信息
 */
export function useLoginApi() {
	const baseUrl = '/dev-api';
	return {
		// 登录
		login: (data: object) => {
			return request({
				url: baseUrl + '/login',
				method: 'post',
				data,
			});
		},
		// 获取用户信息
		getInfo: () => {
			return request({
				url: baseUrl + '/getInfo',
				method: 'get',
			});
		},
		// 获取菜单权限
		getMenu: (data: object) => {
			return request({
				url: baseUrl + '/menu/get',
				method: 'post',
				data,
			});
		},
		// 获取按钮权限
		getBtn: (data: object) => {
			return request({
				url: baseUrl + '/button/get',
				method: 'post',
				data,
			});
		},
		// 登出
		signOut: (data: object) => {
			return request({
				url: baseUrl + '/user/signOut',
				method: 'post',
				data,
			});
		},
	};
}
