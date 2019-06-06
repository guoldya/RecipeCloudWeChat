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

var socket ;
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
    // console.log(store.state.chat.historyNews.length+"条消息!!!!!!")
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
        let newsArr = []
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


//登陆通知处理
// function COMMAND_LOGIN_RESP(dataObj,data){
// 	 if(10007 == dataObj.code){//登陆成功;
// 		logDiv.innerHTML+="<font color='green' size='1'>连接成功...</font><br>";
// 		var userCmd = "{\"cmd\":17,\"type\":\"0\",\"userid\":\""+username+"\"}";
// 		var msgCmd = "{\"cmd\":19,\"type\":\"0\",\"userId\":\""+username+"\"}";
// 		socket.send(userCmd);//获取登录用户信息;
// 		socket.send(msgCmd);//获取用户离线消息(好友+群组);
// 		scrollToBottom();
// 	 }else if(10008 == dataObj.code){//登录失败;
//          OTHER(data);
// 	}
// }
// function COMMAND_EXIT_GROUP_NOTIFY_RESP(data){
// 	var exitGroupNotify = data.data;
// 	var onlineUserCmd = "{\"cmd\":17,\"type\":\"0\",\"userid\":\""+curUser.id+"\"}";
// 	logDiv.innerHTML+="<font color='#A3A3A3' size='1'>"+exitGroupNotify.user.nick+"("+exitGroupNotify.user.id+")退出群聊...</font><br>";
// 	socket.send(onlineUserCmd);//获取在线用户列表;
// }
// //加入群组的消息通知处理;
// function COMMAND_JOIN_GROUP_NOTIFY_RESP(data){
// 	var joinGroupNotify = data.data;
// 	logDiv.innerHTML+="<font color='#A3A3A3' size='1'>"+joinGroupNotify.user.nick+"("+joinGroupNotify.user.id+")加入群聊...</font><br>";
// 	var onlineUserCmd = "{\"cmd\":17,\"type\":\"0\",\"userid\":\""+curUser.id+"\"}";
// 	socket.send(onlineUserCmd);//获取在线用户列表;
// }
// //加入群组响应状态处理;
// function COMMAND_JOIN_GROUP_RESP(data){
// 	  //成功加入群组响应信息;
// }
// //发送聊天请求发送状态处理;
// function COMMAND_CHAT_RESP_SEND_STATUS(data){
//      //发送成功后的状态处理...
// }
// //获取用户信息响应处理;
// function COMMAND_GET_USER_RESP(data){
//    	var user =  data.data;
//    	curUser = user;
// 	initOnlineUsers();
// }
// //接收到聊天响应处理;
// function COMMAND_CHAT_RESP(data){
//     var chatObj = data.data;
//    	var createTime = new Date(chatObj.createTime).Format("yyyy/MM/dd HH:mm:ss");
// 	var from = chatObj.from;
// 	if(from == username)
// 		return;
// 	var content = chatObj.content;
// 	var user = null;//getOnlineUserById(from);
// 	if(user){
// 		 logDiv.innerHTML+="<font color='#009ACD' size='1' style='font-weight: bold'>"+user.nick+"("+user.id+")"+" "+createTime+"</font><br>";
// 	}else{
// 		 logDiv.innerHTML+="<font color='#009ACD' size='1' style='font-weight: bold'>"+from+" "+createTime+"</font><br>";
// 	}
//     //处理数据
//     logDiv.innerHTML+="<font color='#FFFFFF' size='1'>&nbsp;"+content+"</font><br>";
// }
// //处理用户同步+持久化消息
// function COMMAND_GET_MESSAGE_RESP(data,msgFlag){
// 	var msgObj = data.data;
// 	friendOfflineMessage(msgObj,msgFlag);
// 	groupOfflineMessage(msgObj,msgFlag);
// }
// //好友消息
// function friendOfflineMessage(msgObj,msgFlag){
// 	var friends = msgObj.friends;
// 	for (var key in friends) {
// 	   var chatDatas = friends[key];
//        for(var index in chatDatas){
//     	   var user_id = chatDatas[index].from;
//     	   var createTime = new Date(chatDatas[index].createTime).Format("yyyy/MM/dd HH:mm:ss");
//     	   logDiv.innerHTML+="<font color='	#009ACD' size='1' style='font-weight: bold'>"+user_id+"</font><font color='#DC143C' size='1' style='font-weight: bold'>(好友"+msgFlag+")</font>"+"<font color='#009ACD' size='1' style='font-weight: bold'>"+createTime+"</font><br>";
//     	   logDiv.innerHTML+="<font color='#FFFFFF' size='1'>&nbsp;"+chatDatas[index].content+"</font><br>";
//        }
//     }
// }
// //群组消息
// function groupOfflineMessage(msgObj,msgFlag){
// 	var groups = msgObj.groups;
// 	for (var key in groups) {
// 	   var chatDatas = groups[key];
//        for(var index in chatDatas){
//     	   var user_id = chatDatas[index].from;
//     	   var createTime = new Date(chatDatas[index].createTime).Format("yyyy/MM/dd HH:mm:ss");
//     	   logDiv.innerHTML+="<font color='	#009ACD' size='1' style='font-weight: bold'>"+user_id+"</font><font color='#DC143C' size='1' style='font-weight: bold'>(群聊["+chatDatas[index].group_id+"]"+msgFlag+")</font>"+"<font color='#009ACD' size='1' style='font-weight: bold'>"+createTime+"</font><br>";
//     	   logDiv.innerHTML+="<font color='#FFFFFF' size='1'>&nbsp;"+chatDatas[index].content+"</font><br>";
//        }
// 	}
// }
// //其它信息处理;
// function OTHER(data){
// 	//处理数据
// 	logDiv.innerHTML+="<font color='green' size='1'>"+data+"</font><br>";
// }
// function getOnlineUserById(id){
// 	var groups = curUser.groups;
// 	var onlineUserStr = "";
// 	for(var g = 0 ; g < groups.length ; g++){
// 		var group = groups[g];
// 		var users = group.users;
// 	   	for(var u = 0 ; u < users.length ; u++){
// 			var user = users[u];
// 			if(user.id == id){
// 				return user;
// 			}
// 	   	}
// 	}
// }
// function initOnlineUsers(){
// 	var groups = curUser.groups;
// 	var onlineUserStr = "";
// 	for(var g = 0 ; g < groups.length ; g++){
// 		var group = groups[g];
// 		var users = group.users;
// 		onlineUserStr += "&nbsp;"+group.name+"在线成员("+users.length+"/"+users.length+")";
// 	   	for(var u = 0 ; u < users.length ; u++){
// 			var user = users[u];
// 			onlineUserStr +="<div id=\""+user.id+"\" nick=\""+user.nick+"\" style=\"line-height: 25px;margin: 5px 5px 0 5px;padding-left:15px;cursor:pointer;\" onclick=\"onlineDb(this);\" onmouseover=\"onlineMove(this);\"  onmouseleave=\"onlineLeave(this);\"><img alt=\""+user.id+"\" src=\""+user.avatar+"\" height=\"25px\" width=\"25px;\" style=\"float:left\">&nbsp;<font size='2'>"+user.nick+"("+user.id+")</font></div>";
// 	   	}
// 	}
// 	if(!onlineUserStr){
// 		onlineUserStr = "&nbsp;在线成员(0/0)";
// 	}
// 	document.getElementById("onlinePanel").innerHTML = onlineUserStr;
// }
// function disConnect(){
// 	socket.close(); 
// }

// function send(){
//     var toId = document.getElementById("toid").value;
// 	var createTime = new Date().getTime();
// 	var content = document.getElementById('content').value;
// 	if(content == "")
// 		return ;
// 	var msg = "{\"from\": \""+username+"\",\"to\": \""+toId+"\",\"cmd\":11,\"createTime\":"+createTime+",\"chatType\":\"2\",\"msgType\": \"0\",\"content\": \""+content+"\"}";
// 	if(!toId){
// 		alert("请选择要私聊的人!");
// 		return;
// 	}
// 	if(toId == username){
// 		alert("无法给自己发送消息!");
// 		return ;
// 	}
// 	socket.send(msg);
// 	var chatObj = eval("("+msg+")");
// 	var createTime = new Date(chatObj.createTime).Format("yyyy/MM/dd HH:mm:ss");
//   	//处理数据
// 	logDiv.innerHTML+="<font color='#228B22' size='1' style='font-weight: bold'>"+chatObj.from+" "+createTime+"</font><br>";
// 	//处理数据
// 	logDiv.innerHTML+="<font color='#FFFFFF' size='1'>&nbsp;"+chatObj.content+"</font><br>";
// 	document.getElementById('content').value = "";
// }
// function sendGroup(){
// 	var createTime = new Date().getTime();
// 	var content = document.getElementById('content').value;
// 	if(content == "")
// 		return ;
// 	var msg = "{\"from\": \""+username+"\",\"createTime\":"+createTime+",\"cmd\":11,\"group_id\":\"100\",\"chatType\":\"1\",\"msgType\":\"0\",\"content\": \""+content+"\"}";
// 	socket.send(msg);
// 	var chatObj = eval("("+msg+")");
// 	var createTime = new Date(chatObj.createTime).Format("yyyy/MM/dd HH:mm:ss");
//   	//处理数据
// 	logDiv.innerHTML+="<font color='#228B22' size='1' style='font-weight: bold'>"+curUser.nick+"("+curUser.id+")"+" "+createTime+"</font><br>";
// 	//处理数据
// 	logDiv.innerHTML+="<font color='#FFFFFF' size='1'>&nbsp;"+chatObj.content+"</font><br>";
// 	document.getElementById('content').value = "";
// }
// function scrollToBottom(){
// 	var logDiv = document.getElementById('logs');
// 	logDiv.scrollTop = logDiv.scrollHeight;
// }
// function clearLogs(){
// 	var logDiv = document.getElementById('logs');
// 	logDiv.innerHTML="";
// }
// function showServerConfig(obj){
//  	var target = document.getElementById("serverConfigId");
//  	if (target.style.display=="block"){
//         target.style.display="none";
//         obj.value="服务器配置";
//     } else {
//         target.style.display="block";
//         obj.value='关闭配置';
//     }
// }
// function onlineDb(obj){
// 	if(onSelected){
// 		if(onSelected.id != obj.id){
// 			onSelected.style.background = "";
// 		}
// 	}
// 	obj.style.background = "#D4D4D4";
// 	onSelected = obj;
// 	var sendBtn = document.getElementById("sendBtn");
// 　　 sendBtn.style="width: 150px;"
// 	sendBtn.value="发送给:"+onSelected.id;
// }
// function onlineMove(obj){
// 	if("undefined" == typeof(onSelected) || onSelected.id != obj.id){
// 		obj.style.background = "#F0F0F0";
// 	}
// }
// function onlineLeave(obj){
// 	var onlineDiv = document.getElementById("onlinePanel").getElementsByTagName("div");
// 	for(var i =0 ; i < onlineDiv.length ; i++){
// 		if("undefined" == typeof(onSelected) || onSelected.id != onlineDiv[i].id){
// 			onlineDiv[i].style.background = "";
// 		}
// 	}
// }
// function setUserName(){
// 	document.getElementById("username").value = new Date().getTime();
// }
// function keyDown(e) {
// 	var ev= window.event||e;
// 	//13是键盘上面固定的回车键
// 	if (ev.keyCode == 13) {
// 		sendGroup();
// 	}
// }
// function authCmd(){
// 	if(!curUser){
// 		alert("demo中模拟命令需要先登录，请先登录!");
// 	}
// 	var authCmd = "{\"cmd\":3,\"token\":\"校验码\"}";
// 	socket.send(authCmd);
// }
// function heartbeatCmd(){
// 	if(!curUser){
// 		alert("demo中模拟命令需要先登录，请先登录!");
// 	}
// 	var heartbeatCmd = "{\"cmd\":13,\"hbbyte\":\"-127\"}";
// 	socket.send(heartbeatCmd);
// }

// function friendHistoryCmd(){
// 	if(!curUser){
// 		alert("请先登录!");
// 		return;
// 	}
// 	var friend_id = document.getElementById("history_friend_id").value;;
// 	if(friend_id == ""){
// 		alert("请输入要获取的好友ID!");
// 		return;
// 	}
// 	var msgHistoryCmd = "{\"cmd\":19,\"type\":\"1\",\"fromUserId\":\""+friend_id+"\",\"userId\":\""+username+"\"}";
// 	socket.send(msgHistoryCmd);//获取用户历史消息;
// }

// function groupHistoryCmd(){
// 	if(!curUser){
// 		alert("请先登录!");
// 		return;
// 	}
// 	var group_id = document.getElementById("history_group_id").value;;
// 	if(group_id == ""){
// 		alert("请输入要获取的群组ID!");
// 		return;
// 	}
// 	var msgHistoryCmd = "{\"cmd\":19,\"type\":\"1\",\"groupId\":\""+group_id+"\",\"userId\":\""+username+"\"}";
// 	socket.send(msgHistoryCmd);//获取群组历史消息;
// }

export default websocketConfig