import { loadCards } from '../service/home'
import { loadUserInfo } from '../service/my'

const state = {
   cardList: [],
   cardTotal: 0,
   userInfo: '',
}

const getters = {}

const mutations = {
   ['SET_CARDS'](state, { list, total }) {
      state.cardList = list || []
      state.cardTotal = total || 0
   },
   ['SET_USERINFO'](state, { list }) {
      state.userInfo = list || ''
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

      commit('SET_CARDS', { list: res.rows, total: res.total })
   },
   async getUserInfo({ commit, state }, { update = false } = {}) {
      
      
       if (state.userInfo.account && !update) return
 
      const res = await loadUserInfo()
      console.log(res,"gggg")
      if (res.code != 200) return console.error('获取就诊卡片失败: ', res)

      commit('SET_USERINFO', { list: res.data })
   }
}

export default {
   state,
   getters,
   mutations,
   actions,
}