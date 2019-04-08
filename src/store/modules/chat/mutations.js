export default {
  setWebsocket(state, websocket) {
    state.websocket = websocket
  },
  updateChatQueue(state, data) { //更新队列
    let friend = data
    let chatQueue = state.chatQueue
    let index = chatQueue.findIndex(msg => msg.from == friend.from)
    if (index != -1) {
      let obj = chatQueue[index]
      console.log(obj, 11)
      console.log(chatQueue[index].newNews, chatQueue[index].newNews + (friend.newNews || 1))
      let num = chatQueue[index].newNews + (friend.newNews || 1)
      obj = friend
      obj.newNews = num
      console.log(num, 'num')
      console.log(obj, 11)
      chatQueue.splice(index, 1, obj)
    } else { // 添加新的队列
      if (!friend.newNews) {
        friend.newNews = 1
      }
      // friend.isRead = false
      chatQueue.unshift(friend)
    }
    state.chatQueue = chatQueue
  },
  setPatienDetail(state, data) { // 设置病人详情
    state.patienDetail = data
  },
  setHistoryNews(state, data) { // 设置历史消息
    state.historyNews = data
  },
  setFriendId(state, data) {
    state.friendId = data
  },
  setChatQueue(state, data) {// 直接设置队列，同于消除红色的圆点
    state.chatQueue = data
  }
}
