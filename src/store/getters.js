// 模块属性
const getters = {
  // 取模块属性 便捷访问
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.userInfo.username,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  userInfo: state => state.user.userInfo
}
export default getters
