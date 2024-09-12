import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { Session } from "/@/utils/storage";
import { useLoginApi } from "/@/api/login";

const useLoginApis = useLoginApi();

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore("userInfos", {
  state: (): UserInfosState => ({
    userInfos: {
      userId: "", //用户ID
      userName: "", //姓名
      nickName: "", //用户名
      photo: "", //用户头像
      time: 0, //创建时间
      phonenumber: "", //联系方式
      roles: [], //角色
      dept: "", //所属组织
      deptId: "", //所属组织ID
      email: "", //邮件
      loginDate: "", //登陆时间
      loginIp: "", //登陆IP
      sex: "", //性别
      authBtnList: [], //按钮权限
    },
  }),
  actions: {
    updateUserInfo(val: any) {
      this.userInfos.nickName = val.nickName;
      this.userInfos.phonenumber = val.phonenumber;
    },
    async setUserInfos() {
      // 存储用户信息到浏览器缓存
      if (Session.get("userInfos")) {
        this.userInfos = Session.get("userInfos");
      } else {
        const userInfos = <UserInfos>await this.getApiUserInfo();
        this.userInfos = userInfos;
      }
    },
    async getApiUserInfo() {
      return new Promise(resolve => {
        // const userName = Cookies.get('userName');
        // // 模拟数据
        // let defaultRoles: Array<string> = [];
        // let defaultAuthBtnList: Array<string> = [];
        // // admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
        // let adminRoles: Array<string> = ['admin'];
        // // admin 按钮权限标识
        // let adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
        // // test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
        // let testRoles: Array<string> = ['common'];
        // // test 按钮权限标识
        // let testAuthBtnList: Array<string> = ['btn.add', 'btn.link'];
        // // 不同用户模拟不同的用户权限
        // if (userName === 'admin') {
        // 	defaultRoles = adminRoles;
        // 	defaultAuthBtnList = adminAuthBtnList;
        // } else {
        // 	defaultRoles = testRoles;
        // 	defaultAuthBtnList = testAuthBtnList;
        // }
        // // 用户信息模拟数据
        // const userInfos = {
        // 	userName: userName,
        // 	photo: '',
        // 	time: '',
        // 	roles: defaultRoles,
        // 	authBtnList: defaultAuthBtnList,
        // };
        // Session.set('userInfo', userInfos);
        // resolve(userInfos);

        useLoginApis
          .getInfo()
          .then(res => {
            let user = res.user;
            let roles = res.roles;
            let permissions = res.permissions;

            const userInfos = {
              userId: user.userId,
              userName: user.userName,
              nickName: user.nickName,
              photo: user.avatar,
              time: user.createTime,
              phonenumber: user.phonenumber,
              roles: roles,
              dept: user.dept.deptName,
              deptId: user.dept.deptId,
              email: user.email,
              loginDate: user.loginDate,
              loginIp: user.loginIp,
              sex: user.sex,
              authBtnList: permissions,
            };
            Session.set("userInfos", userInfos);
            resolve(userInfos);
          })
          .catch(err => {});
      });
    },
  },
});
