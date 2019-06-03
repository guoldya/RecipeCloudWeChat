import axios from 'axios';

// 获取用户信息
export const loadUserInfo = (data = {}) => axios.put('/app/sysPatient/read/myDetailed', data).then(res => res.data)
