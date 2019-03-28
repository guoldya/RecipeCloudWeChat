export default {
  updateUser({ commit }, data) {
    commit('updateUser', data)
  },
  updateToken({ commit }, data) {
    commit('updateToken', data)
  }
}