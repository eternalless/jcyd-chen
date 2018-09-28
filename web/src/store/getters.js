const getters = {
  getPageTimeIndex: state => state.app.pageTimeIndex,
  getUserName:state => state.user.name,
  getUserInfo:state => state.user,
  getUserToken:state => state.user.token
}
export default getters
