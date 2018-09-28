import axios from "./axios/axios"

/* globals localStorage */
function pretendRequest(email, pass, cb) {
  axios.post("/api/login.do", {username: email, password: pass}).then((res) => {
    cb({
      authenticated: true,
      userInfo: res.data,
      token: Math.random().toString(36).substring(7)
    })
  })
}

export default {
  login(email, pass, cb) {
    pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(res)
      } else {
        if (cb) cb(false)
      }
    })
  },
  getToken() {
    return localStorage.token
  },
  setToken(token){
    localStorage.token = token
  },
  removeToken(){
    delete localStorage.token
  },
  logout(cb) {
    delete localStorage.token
    if (cb) cb()
  },
  loggedIn() {
    return !!localStorage.token
  }
}
