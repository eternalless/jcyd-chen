import axios from '../axios/axios'

let base = 'api'

/** 获取当前显示频信息 **/
export const getRedirectUrl = () => { return axios.get(`${base}/flights/getRedirectUrl`, {}) }

/**离港航班动态信息**/
export const listDepFlights = () => { return axios.get(`${base}/flights/listDepFlights`, {}) }

/** 到港航班动态信息 **/
export const listArrFlights = () => { return axios.get(`${base}/flights/listArrFlights`, {}) }

/** 登机航班信息 **/
export const listBorFlights = () => { return axios.get(`${base}/flights/listBorFlights`, {}) }

/** 行李转盘航班信息 bybeltNo **/
export const listBeltFlightsBybeltNo = (beltNo) => { return axios.get(`${base}/flights/listBeltFlights?beltNo=`+beltNo, {}) }

/** 行李转盘航班信息 **/
export const listBeltFlights = () => { return axios.get(`${base}/flights/listBeltFlights`, {}) }

/** 获取滚动提示信息 **/
export const getAlertMessage = (param) => { return axios.post(`${base}/flights/getAlertMessage`, param) }

/** 到达航班状态列表 **/
export const listArrFlightsByStatus = (param) => { return axios.post(`${base}/flights/listArrFlightsByStatus`, param) }

/** 获取系统参数列表 **/
export const listAllParameters = () => { return axios.get(`${base}/admin/listAllParameters`, {}) }

/** 修改系统参数 **/
export const updateParameter = (param) => { return axios.post(`${base}/admin/updateParameter`, param) }

/** 获取系统参数列表 **/
export const listAllRoutes = () => { return axios.get(`${base}/admin/listAllRouteInfos`, {}) }

/** 修改系统参数 **/
export const updateRoute = (param) => { return axios.post(`${base}/admin/updateRouteInfo`, param) }

/** 航班在转盘上的显示控制 **/
export const updateDisplay = (param) => { return axios.post(`${base}/admin/updateDisplayBaggage`, param) }

/** 修改密码 **/
export const updatePassword = (param) => { return axios.post(`${base}/admin/updatePassword`, param) }

/** 查询当前登陆用户信息 **/
export const getUserInfo = () => { return axios.get(`${base}/admin/getUserInfo`, {}) }

export const demoHello = () => { return axios.get(`${base}/demo/hello`, {}) }

/** 获取航班维护信息列表 **/
export const listAllFlightInfos = () => { return axios.get(`${base}/admin/listAllFlightInfos`, {}) }

/** 修改航班维护信息 **/
export const updateFlightInfo = (flightInfo) => { return axios.post(`${base}/admin/updateFlightInfo`, flightInfo) }

/** 删除航班维护信息 **/
export const deleteFlightInfo = (id) => { return axios.get(`${base}/admin/deleteFlightInfo?id=`+id, {}) }

/** 新增航班维护信息 **/
export const addFlightInfo = (flightInfo) => { return axios.post(`${base}/admin/addFlightInfo`, flightInfo) }

/** 获取用户列表 **/
export const listAllUsers = () => { return axios.get(`${base}/admin/listAllUsers`, {}) }

/** 修改用户信息 **/
export const updateUser = (userInfo) => { return axios.post(`${base}/admin/updateUser`, userInfo) }

/** 修改用户状态 **/
export const updateUserStatus = (param) => { return axios.post(`${base}/admin/updateUserStatus`, param) }

/** 重置密码 **/
export const resetPassword = (param) => { return axios.post(`${base}/admin/resetPassword`, param) }

/** 新增用户 **/
export const addUser = (userInfo) => { return axios.post(`${base}/admin/addUser`, userInfo) }

/** 删除用户 **/
export const deleteUser = (id) => { return axios.get(`${base}/admin/deleteUser?id=`+id, {}) }

/** 审计监控列表 **/
export const listAllLogs = (param) => { return axios.post(`${base}/admin/listAllLogs`, param) }

/** 删除屏显信息 **/
export const deleteRouteInfo = (id) => { return axios.get(`${base}/admin/deleteRouteInfo?id=`+id, {}) }

/** 新增屏显信息 **/
export const addRouteInfo = (param) => { return axios.post(`${base}/admin/addRouteInfo`, param) }
