import request from '/@/utils/request';

/**
 *
 * 登录api接口集合
 * @method getDictItems 数据字典查询接口
 */
export function systemApi() {
	let sysUserUrl = '/dev-api/system/user';
	let sysRoleUrl = '/dev-api/system/role';
	let sysOrganizationUrl = '/dev-api/system/dept';
	let menuUrl = '/dev-api/system/menu';
	return {
		//获取角色列表
		queryUserList: (params?: object) => {
			return request({
				url: '/dev-api/system/role/optionselect',
				method: 'get',
				params,
			});
		},
		//获取组织列表
		queryOrganizationList: (params?: object) => {
			return request({
				url: sysOrganizationUrl + '/list',
				method: 'get',
				params,
			});
		},
		//新增用户信息
		addUser: (data?: object) => {
			return request({
				url: sysUserUrl,
				method: 'post',
				data,
			});
		},
		//修改用户信息
		editUser: (data?: object) => {
			return request({
				url: sysUserUrl,
				method: 'put',
				data,
			});
		},
		//重置密码
		resetPwdUser: (data?: object) => {
			return request({
				url: sysUserUrl + '/resetPwd',
				method: 'put',
				data,
			});
		},
		//启用用户
		enableUser: (data?: object) => {
			return request({
				url: sysUserUrl + '/changeStatus',
				method: 'put',
				data,
			});
		},
		//禁用用户
		disableUser: (data?: object) => {
			return request({
				url: sysUserUrl + '/changeStatus',
				method: 'put',
				data,
			});
		},
		//删除用户信息
		removeUser: (data?: string) => {
			return request({
				url: sysUserUrl + '/' + data,
				method: 'delete',
			});
		},
		//用户分页列表数据接口
		queryUser: (params?: object) => {
			return request({
				url: sysUserUrl + '/list',
				method: 'get',
				params,
			});
		},
		//用户信息导入
		importUser: (data?: object) => {
			return request({
				url: sysUserUrl + '/import',
				method: 'post',
				data,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		},
		//用户模版下载
		exportUser: () => {
			return request({
				url: sysUserUrl + '/downTemplate',
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
				},
				responseType: 'blob',
			});
		},

		// ----------------------------------------------------------------
		//新增角色信息
		addRole: (data?: object) => {
			return request({
				url: sysRoleUrl,
				method: 'post',
				data,
			});
		},
		//修改角色信息
		editRole: (data?: object) => {
			return request({
				url: sysRoleUrl,
				method: 'put',
				data,
			});
		},
		//启用角色
		enableRole: (data?: object) => {
			return request({
				url: sysRoleUrl + '/changeStatus',
				method: 'put',
				data,
			});
		},
		//禁用角色
		disableRole: (data?: object) => {
			return request({
				url: sysRoleUrl + '/changeStatus',
				method: 'put',
				data,
			});
		},
		//删除角色信息
		removeRole: (data?: string) => {
			return request({
				url: sysRoleUrl + '/' + data,
				method: 'delete',
			});
		},
		//根据ID获取角色的信息
		getRoleById: (params?: string) => {
			return request({
				url: sysRoleUrl + `/${params}`,
				method: 'get',
			});
		},
		//角色分页列表数据接口
		queryRole: (params?: object) => {
			return request({
				url: sysRoleUrl + '/list',
				method: 'get',
				params,
			});
		},
		//分配菜单--查询
		roleMenuTreeselect: (params?: string) => {
			return request({
				url: menuUrl + `/roleMenuTreeselect/${params}`,
				method: 'get',
			});
		},

		// ----------------------------------------------------------------
		//新增组织信息
		addOrganization: (data?: object) => {
			return request({
				url: sysOrganizationUrl,
				method: 'post',
				data,
			});
		},
		//修改组织信息
		editOrganization: (data?: object) => {
			return request({
				url: sysOrganizationUrl,
				method: 'put',
				data,
			});
		},
		//删除组织信息
		removeOrganization: (data?: string) => {
			return request({
				url: sysOrganizationUrl + '/' + data,
				method: 'delete',
			});
		},
		//组织分页列表数据接口
		queryOrganization: (params?: object) => {
			return request({
				url: sysOrganizationUrl + '/list',
				method: 'get',
				params,
			});
		},
	};
}
