import axios from 'axios';

// 加载就诊卡片
export const loadDpart= (data = {}) => axios.put('/app/bdHospitalOrg/read/selectClinicListByHospitalArea', data).then(res => res.data)
