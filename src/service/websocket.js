import store from '../store/store'

const websocketConfig = () => {
  new Fingerprint2({
    screen_resolution: true
  }).get((uuid) => {
    connectWebsoket(uuid)
  })
}

var username = store.state.userInfo.id;
console.log("当前用户:"+username)
function connectWebsoket(){
  let id = username;
	var host="ws://192.168.0.22:8888/?userid="+username+"&uuid="+"123";
  let websocket = new WebSocket(host);
  store.commit('chat/setWebsocket', websocket)
	websocket.onopen = function(e){
	};
	websocket.onerror = function(e){
	};
	websocket.onclose = function(e){
    store.commit('chat/setWebsocket', '')
    console.log("退出成功")
	};
	websocket.onmessage = function(evt){
    // console.log(store.state.chat.historyNews.length+"条消息!!!!!!")
    console.log("连接信息："+evt.data)
    let friend = JSON.parse(evt.data)
    if (friend.command == 11) { // 获取好友传过来的消息
      console.log("friend.data:"+friend.data)
      store.commit('chat/updateChatQueue', friend.data)
      // console.log(friend.data+'获取好友传过来的消息')
      // console.log(friend.data.from, store.state.chat.friendId, "我是两个id")
      if (friend.data.from == store.state.chat.friendId) {
        // 把当前消息放在当前好友的历史消息（现在的消息）
        // console.log('获取好友传过来的消息2')
        let newsArr = JSON.parse(JSON.stringify(store.state.chat.historyNews));
        newsArr.push(friend.data)
        store.commit('chat/setHistoryNews', newsArr)
      }

    } else if (friend.command == 20 && friend.code == 10018) {
      // 处理历史记录
      store.commit('chat/setHistoryNews', friend.data.friends[store.state.chat.friendId])
      // router.push({
      //   path: `/inquiryOnline/${store.state.chat.friendId}`
      // });
    } else if (friend.command == 20 && friend.code == 10016) { // 处理离线消息
      // 把离线消息的最后一条加入消息队列中
      let offNews = friend.data.friends
      for (let i in offNews) {
        let obj = {}
        let number = offNews[i].length
        obj = JSON.parse(JSON.stringify(offNews[i][offNews[i].length - 1]))
        obj.newNews = number
        obj.isRead = false
        store.commit('chat/updateChatQueue', obj)
      }
    } else if (friend.command == 6) { // 登录命令返回成功处理
      var userCmd = "{\"cmd\":17,\"type\":\"0\",\"userid\":\"" + id + "\"}";
      var msgCmd = "{\"cmd\":19,\"type\":\"0\",\"userId\":\"" + id + "\"}";
      websocket.send(userCmd); //获取登录用户信息;
      websocket.send(msgCmd); //获取用户离线消息(好友+群组);
    } else if (friend.command == 18) {
      //获取用户信息响应处理; 
      // console.log('用户信息', friend)
    }
	};
}


export default websocketConfig