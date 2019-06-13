import axios from 'axios';
// 加载消息
export const loadPropaganda = (data = {
   contentClass: 26,
   pageNumber: 1,
   pageSize: 10
}) => axios.put('/app/bizArticle/read/list', data).then(res => res.data)
