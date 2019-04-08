export default {
  setWebsocket({ commit }, data) {
    commit('setWebsocket', data)
  },
  updateChatQueue({ commit }, data) {
    commit('updateChatQueue', data)
  },
  setHistoryNews({ commit }, data) {
    commit('setHistoryNews', data)
  },
  setFriendId({ commit }, data) {
    commit('setFriendId', data)
  },
  setChatQueue({ commit }, data) {
    commit('setChatQueue', data)
  },
  setPatienDetail({ commit }, data) {
    commit('setPatienDetail', data)
  }

  
}