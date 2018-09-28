const app = {
  state: {
    pageTimeIndex: 0
  },
  mutations: {
    CANCEL_PAGE_TIME_INDEX: state => {
      if (state.pageTimeIndex > 0) {
        clearInterval(state.pageTimeIndex);
      }
    },
    SET_PAGE_TIME_INDEX: (state, timeIndex) => {
      if (state.pageTimeIndex > 0) {
        clearInterval(state.pageTimeIndex);
        state.pageTimeIndex = timeIndex
      }
    }
  },
  actions: {
    cancelPageTimeIndex: ({commit}) => {
      commit('CANCEL_PAGE_TIME_INDEX')
    },
    setPageTimeIndex: ({commit}, timeIndex) => {
      commit("SET_PAGE_TIME_INDEX",timeIndex)
    }
  }
}
export default app

