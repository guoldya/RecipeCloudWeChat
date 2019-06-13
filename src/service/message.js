import axios from 'axios';
// 加载消息
 
export const loadMessage= (data = {}) => axios.put('/app/bizMessage/read/page', data).then(res => res.data)
