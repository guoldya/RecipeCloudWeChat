import axios from 'axios';

// 加载就诊卡片
export const loadAccount = (data = {}) => axios.put('/app/sysPatient/read/myDetailed', data).then(res => res.data)
