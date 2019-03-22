import { loadCards } from '../service/home'

const state = {
   cardList: [],
}

const getters = {}

const mutations = {
   ['SET_CARDS'](state, data) {
      state.cardList = data
   }
}

const actions = {
   // 获取就诊卡片
   async getCards({ commit, state }, { update = false } = {}) {
      // loadCards(data).then(res => {

      // })

      if (state.cardList.length && !update) return

      const res = await loadCards()
      if (res.code != 200) return console.error('获取就诊卡片失败: ', res)

      commit('SET_CARDS', res.rows)
   }
}

export default {
   state,
   getters,
   mutations,
   actions,
}