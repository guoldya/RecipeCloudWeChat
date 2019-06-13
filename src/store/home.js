import { loadCards } from '../service/home'
import { loadDepart } from '../service/choosedepart'

const state = {
   cardList: [],
   cardTotal: 0,
   departList: [],
   departTotal: 0,
}

const getters = {}

const mutations = {
   ['SET_CARDS'](state, { list, total }) {
      state.cardList = list || []
      state.cardTotal = total || 0
   },

}

const actions = {

   // 获取就诊卡片
   async getCards({ commit, state }, { update = false } = {}) {
      // loadCards(data).then(res => {

      // })

      if (state.cardList.length && !update) return

      const res = await loadCards()
      if (res.code != 200) return console.error('获取就诊卡片失败: ', res)

      commit('SET_CARDS', { list: res.rows, total: res.total })
   },

   // 获取科室列表
   async getDepart({ commit, state }) {
      if (state.departList.length) return

      const res = await loadDepart()
      if (res.code != 200) return console.error('获取科室列表: ', res)

      commit('SET_DEPART', { list: res.rows, total: res.total, })
   },
}

export default {
   state,
   getters,
   mutations,
   actions,
}