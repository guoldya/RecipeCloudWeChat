import axios from 'axios';

// 加载个人信息
export const loadAccount = (data = {}) => axios.put('/api/bas/sysPatient/read/myDetailed', data).then(res => res.data)
