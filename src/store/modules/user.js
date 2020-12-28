import { loginByUsername, loginByPhone, logout, getUserInfo, validateLogin } from '@/http/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    realname: '',
    avatar: '',
    introduction: '',
    roleBing: '',
    applyRole: '',
    applyRoleText:'',
    reviewStatus: '',
    reserveTypeId: '',
    auth:'',
    roles: [],
    perms: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_REAL_NAME: (state, realname) => {
      state.realname = realname
    },
    SET_APPLY_ROLE: (state, applyRole) => {
      state.applyRole = applyRole
    },
    SET_APPLY_ROLE_TEXT: (state, applyRoleText) => {
      state.applyRoleText = applyRoleText
    },
    SET_REVIEW_STATUS: (state, reviewStatus) => {
      state.reviewStatus = reviewStatus
    },
    SET_RESERVE_TYPE_ID: (state, reserveTypeId) =>{
      state.reserveTypeId = reserveTypeId
    },
    SET_AUTH: (state, auth) => {
      state.auth = auth
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLE_BING: (state, roleBing) => {
      state.roleBing = roleBing
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMS: (state, perms) => {
      state.perms = perms
    }
  },

  actions: {
    // cas验证登录
    ValidateLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        validateLogin(userInfo).then(response => {
          // console.log("----cas 登录--------",response);
          if (response.success) {
            // console.log("----cas 登录--------",response);
            const result = response.result
            const userInfo = result.userInfo
            // Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            // Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
            // Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_NAME', userInfo.username)
            commit('SET_REAL_NAME', userInfo.realname)
            commit('SET_APPLY_ROLE', userInfo.applyRole);
            commit('SET_REVIEW_STATUS',result.reviewStatus);
            commit('SET_AVATAR', userInfo.avatar)
            setToken(result.token)
            resolve(response)
          } else {
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password, userInfo.captcha, userInfo.checkKey).then(response => {
          if (response.result) {
            const token = response.result.token
            const userInfo = response.result.userInfo;
            const username = userInfo.username
            const realname = userInfo.realname
            const avatar = userInfo.avatar
            const roleBing = userInfo.roleBing;
            const applyRole = userInfo.applyRole;
            const applyRoleText = userInfo.applyRoleText;

            //授权代表标识
            const auth = response.result.auth;
            commit('SET_TOKEN', token)
            commit('SET_NAME', username)
            commit('SET_REAL_NAME', realname)
            commit('SET_ROLE_BING', roleBing);
            commit('SET_APPLY_ROLE', applyRole);
            commit('SET_APPLY_ROLE_TEXT', applyRoleText);
            commit('SET_REVIEW_STATUS',response.result.reviewStatus);
            commit('SET_AUTH', auth);
            commit('SET_AVATAR', avatar)
            setToken(token)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 手机号登录
    LoginByPhone({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByPhone(userInfo.phone, userInfo.emsCode, userInfo.emsKey).then(response => {
          if (response.result) {
            const token = response.result.token
            const userInfo = response.result.userInfo;
            const username = userInfo.username
            const realname = userInfo.realname
            const avatar = userInfo.avatar
            const roleBing = userInfo.roleBing;
            const applyRole = userInfo.applyRole;
            const applyRoleText = userInfo.applyRoleText;
              //授权代表标识
            const auth = response.result.auth;
            commit('SET_TOKEN', token)
            commit('SET_NAME', username)
            commit('SET_REAL_NAME', realname)
            commit('SET_ROLE_BING', roleBing);
            commit('SET_APPLY_ROLE', applyRole);
            commit('SET_APPLY_ROLE_TEXT', applyRoleText);
            commit('SET_REVIEW_STATUS',response.result.reviewStatus);
            commit('SET_AUTH', auth);
            commit('SET_AVATAR', avatar)
            setToken(token)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },



    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.result
          if (data.menu && data.menu.length > 0) { // 验证返回的perms是否是一个非空数组
            commit('SET_PERMS', data.menu)
            // setStore('userType')
          } else {
            reject('getInfo: perms must be a non-null array !')
          }
          // commit('SET_ROLES', data.roles)
          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          // commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMS', [])
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response;
          commit('SET_ROLES', data.roles)
          commit('SET_PERMS', data.perms)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
