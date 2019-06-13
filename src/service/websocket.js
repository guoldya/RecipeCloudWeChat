import store from '../store/store'
import router from '../router'

const websocketConfig = () => {
  new Fingerprint2({
    screen_resolution: true
  }).get((uuid) => {
    connectWebsoket(uuid)
  })
}

// function connectWebsoket () {
//   // console.log(store.state.userInfo.id, "我是缓存的id")
//   let id = store.state.userInfo.id;
//   let chatQueue = store.state.chat.chatQueue;
//   // 张老师
//   // let websocket = new WebSocket("ws://192.168.0.122:8888/?userid=" + 12 + "&uuid=" + uuid);
//   // 唐老师
//   let websocket = new WebSocket("ws://192.168.0.22:8888/?userid=" + 12 + "&uuid=" + "123");
//   // console.log(store.state.userInfo.id, "我是缓存的id", websocket)
//   store.commit('chat/setWebsocket', websocket)
//   console.log("websocket"+store.state.chat.websocket)
//   websocket.onopen = function(e){
// 		console.log("onopen"+e.data)
// 	};
// 	websocket.onerror = function(e){
// 		console.log(e)
// 	};
//   websocket.onmessage = evt => {
//     console.log(store.state.chat.historyNews.length+"条消息!!!!!!")
//     console.log(evt.data+"evt!!!!!!")
//     let friend = JSON.parse(evt.data)
//     console.log(friend.command+"friend.command!!!!!!")
//     if (friend.command == 11) { // 获取好友传过来的消息
//       store.commit('chat/updateChatQueue', friend.data)
//       // console.log('获取好友传过来的消息')
//       // console.log(friend.data.from, store.state.chat.friendId, "我是两个id")
//       if (friend.data.from == store.state.chat.friendId) {
//       // if (friend.data.from == 12) {
//         // 把当前消息放在当前好友的历史消息（现在的消息）
//         // console.log('获取好友传过来的消息2')
//         let newsArr = []
//         newsArr.push(friend.data)
//         console.log(newsArr, "所有数据")
//         store.commit('chat/setHistoryNews', newsArr)
//       }

//     } else if (friend.command == 20 && friend.code == 10018) {
//       // console.log(friend.data.friends, "这里是历史小i下")
//       // 处理历史记录
//       store.commit('chat/setHistoryNews', friend.data.friends[store.state.chat.friendId])
//       router.push({
//         path: `/inquiryOnline/${store.state.chat.friendId}`
//       });
//     } else if (friend.command == 20 && friend.code == 10016) { // 处理离线消息
//       // 把离线消息的最后一条加入消息队列中
//       let offNews = friend.data.friends
//       for (let i in offNews) {
//         let obj = {}
//         let number = offNews[i].length
//         obj = JSON.parse(JSON.stringify(offNews[i][offNews[i].length - 1]))
//         obj.newNews = number
//         obj.isRead = false
//         store.commit('chat/updateChatQueue', obj)
//       }
//     } else if (friend.command == 6) { // 登录命令返回成功处理
//       var userCmd = "{\"cmd\":17,\"type\":\"0\",\"userid\":\"" + id + "\"}";
//       var msgCmd = "{\"cmd\":19,\"type\":\"0\",\"userId\":\"" + id + "\"}";
//       websocket.send(userCmd); //获取登录用户信息;
//       websocket.send(msgCmd); //获取用户离线消息(好友+群组);
//     } else if (friend.command == 18) {
//       //获取用户信息响应处理; 
//       // console.log('用户信息', friend)
//     }
//   }
// }


var logDiv;
var username = 125;
// var onSelected;
// var curUser;
// var friends = [];
// var groups = [];
function connectWebsoket(){
	// if(curUser){
	// 	alert("当前已登录,请先退出登录!");
	// 	return;
	// }
	// var ip = document.getElementById("serverIp").value;
	// var port = document.getElementById("port").value;
	// username = document.getElementById("username").value;
  // var password = document.getElementById("password").value;
  let id = store.state.userInfo.id;
	logDiv = document.getElementById("logs");
	var host="ws://192.168.0.22:8888/?userid="+username+"&uuid="+"123";
  let websocket = new WebSocket(host);
  store.commit('chat/setWebsocket', websocket)
	websocket.onopen = function(e){
		
	};
	websocket.onerror = function(e){
		logDiv.innerHTML+="<font color='red' size='1'>异常:"+e+"</font><br>";
		scrollToBottom();
	};
	websocket.onclose = function(e){
		// curUser = null;
		// // logDiv.innerHTML+="<font color='green' size='1'>关闭连接...</font><br>";
		// // document.getElementById("onlinePanel").innerHTML="&nbsp;在线成员(0/0)";
		// scrollToBottom();
	};
	websocket.onmessage = function(evt){
    console.log(store.state.chat.historyNews.length+"条消息!!!!!!")
    // console.log(evt.data+'aaa')
    let friend = JSON.parse(evt.data)
    // console.log(friend.command+"friend.command!!!!!!")
    if (friend.command == 11) { // 获取好友传过来的消息
      store.commit('chat/updateChatQueue', friend.data)
      // console.log(friend.data+'获取好友传过来的消息')
      // console.log(friend.data.from, store.state.chat.friendId, "我是两个id")
      if (friend.data.from == store.state.chat.friendId) {
      
        // 把当前消息放在当前好友的历史消息（现在的消息）
        console.log('获取好友传过来的消息2')
        let newsArr = JSON.parse(JSON.stringify(store.state.chat.historyNews));
        newsArr.push(friend.data)
        console.log(newsArr, "所有数据")
        store.commit('chat/setHistoryNews', newsArr)

        // let msg = {
        //   cmd: 19,
        //   type: 1,
        //   fromUserId: 12,
        //   userId: 125,
        //   //userId:item.from  == 125 ? 123 :125
        // };
        // store.state.chat.websocket.send(JSON.stringify(msg));
      }

    } else if (friend.command == 20 && friend.code == 10018) {
      // console.log(friend.data.friends, "这里是历史小i下")
      // 处理历史记录
      store.commit('chat/setHistoryNews', friend.data.friends[store.state.chat.friendId])
      router.push({
        path: `/inquiryOnline/${store.state.chat.friendId}`
      });
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