import Vue from 'vue'
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";

Vue.use(Vuex)

//定义初始化数据
let defaultState = {
  count: 0,
  topics: []
}

//判断当前的开发环境
const inBrowser = typeof window != "undefined";
//ssr 一定要知道你前端那些请求是异步的 后端先把异步的请求执行完
let state = (inBrowser && window.__INITIAL_STATE__) || defaultState;

const mutations = {
  INCREMENT: state => ++state.count,
  DECREMENT: state => --state.count,
  TOPICS_LIST: (state, topics) => {
    console.log("收到的值为",topics);
    state.topics = topics;
  }
}

export function createStore() {
  const store = new Vuex.Store({
    state,
    actions,
    getters,
    mutations
  })
  return store
}