import axios from "axios";
import qs from "qs";
import { Message } from "element-ui";
import auth from "../auth"

const Axios = axios.create({
  baseURL: "/", // 因为我本地做了反向代理
  timeout: 10000,
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // 序列化
      config.data = qs.stringify(config.data);
    }
    // 若是有做鉴权token , 就给头部带上token
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token;
    }
    return config;
  },
  error => {
    Message({  //  饿了么的消息弹窗组件,类似toast
      showClose: true,
      message: error,
      type: "error.data.error"
    });
    return Promise.reject(error.data.error.message);
  }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    //对响应数据做些事
    if (res.data && res.data.status !== 'SUCCESS') {
      if(res.data.message){
        Message({ //  饿了么的消息弹窗组件,类似toast
          showClose: true,
          message: res.data.message,
          type: "error"
        });
      }else{
        Message({ //  饿了么的消息弹窗组件,类似toast
          showClose: true,
          message: "登陆失效，请登陆后重试！",
          type: "error"
        });
        auth.removeToken()
        window.$router.push({ path: "/login" } )
      }

      return Promise.reject(res.data.message || "error");
    }
    return res.data;
  },
  error => {
    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    // if (!auth.loggedIn()) {
    //   // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
    //   window.$router.push({
    //     path: "/login"
    //   });
    // } else {
    //   // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
    //   // 乖乖的返回去登录页重新登录
    //   let lifeTime =
    //     JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime * 1000;
    //   let nowTime = (new Date()).getTime(); // 当前时间的时间戳
    //   if (nowTime > lifeTime) {
    //     Message({
    //       showClose: true,
    //       message: "登录状态信息过期,请重新登录",
    //       type: "error"
    //     });
    //     window.$router.push({
    //       path: "/login"
    //     });
    //   }
    // }
    // 返回 response 里的错误信息
    return Promise.reject(error.data);
  }
);

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default Axios;
